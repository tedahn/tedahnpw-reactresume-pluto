import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await readFile(path.join(root, 'src/resumeData.json'), 'utf8'));
const server = await createServer({ root, server: { middlewareMode: true, hmr: false }, appType: 'custom' });

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const html = renderToStaticMarkup(React.createElement(App));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Rendered section IDs must be unique.');
  const hrefs = [...html.matchAll(/\bhref="([^"]+)"/g)].map(match => match[1]);
  for (const href of hrefs.filter(value => value.startsWith('#'))) {
    assert(ids.includes(href.slice(1)), `Missing anchor target: ${href}`);
  }
  assert(hrefs.includes(data.main.resumeResources.printable), 'The primary resume link must render.');
  assert.match(html, /View resume/, 'The resume action must have a human-readable label.');
  for (const resource of Object.values(data.main.resumeResources)) {
    assert(hrefs.includes(resource), `Resume format not reachable: ${resource}`);
    await access(path.join(root, 'public', resource));
  }
  for (const match of html.matchAll(/\bsrc="([^"]+)"/g)) {
    if (!/^(https?:|data:)/.test(match[1])) await access(path.join(root, 'public', match[1]));
  }
  const structured = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const currentEmployers = [...new Set(data.resume.work.filter(role => /present/i.test(role.dates)).map(role => role.company))];
  assert.deepEqual(structured.mainEntity.worksFor.map(org => org.name), currentEmployers);
  const resume = JSON.parse(await readFile(path.join(root, 'public/resume.json'), 'utf8'));
  assert.equal(resume.projects.length, data.portfolio.projects.length);
  for (const project of data.portfolio.projects) {
    assert(project.tradeoff && project.evidence, `Missing project boundaries: ${project.title}`);
    assert(html.includes(project.title), `Missing project: ${project.title}`);
    assert(resume.projects.find(item => item.name === project.title).highlights.includes(project.evidence), 'Exports must preserve project evidence limits.');
    for (const link of [project.url, project.sourceUrl, ...project.evidenceLinks.map(item => item.url)].filter(Boolean)) {
      assert.equal(new URL(link).protocol, 'https:');
      assert(hrefs.includes(link), `Project evidence link not rendered: ${link}`);
    }
  }
  const printable = await readFile(path.join(root, 'public/resume.html'), 'utf8');
  assert(printable.includes('Print / save PDF'));
  assert.match(printable, /href="\.\/">Portfolio/, 'Printable resume must link back using the hosted base path.');
  console.log(`PASS: rendered portfolio; ${ids.length} unique IDs; ${hrefs.length} links; resume resources, local images, current employer, and project evidence.`);
} finally {
  await server.close();
}
