import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { detectLang, localize, uiText, workKey } from './i18n.js';

const data = JSON.parse(readFileSync(new URL('../resumeData.json', import.meta.url), 'utf8'));

test('detectLang prefers the link, then the saved choice, then the browser', () => {
  assert.equal(detectLang({ search: '?lang=ko', saved: 'en', languages: ['en-US'] }), 'ko');
  assert.equal(detectLang({ search: '?lang=xx', saved: 'ko', languages: ['en-US'] }), 'ko');
  assert.equal(detectLang({ languages: ['ko-KR', 'en-US'] }), 'ko');
  assert.equal(detectLang({ languages: ['ja-JP', 'ko'] }), 'ko');
  assert.equal(detectLang({ languages: ['en-GB', 'ko-KR'] }), 'en');
  assert.equal(detectLang({ languages: ['fr-FR'] }), 'en');
  assert.equal(detectLang(), 'en');
});

test('English returns the source data unchanged', () => {
  assert.equal(localize(data, 'en'), data);
});

test('every Korean overlay matches an item in the English source', () => {
  const ko = data.ko;
  const titles = Object.values(data.portfolio.showcase).flat().map((item) => item.title);
  assert.deepEqual(Object.keys(ko.showcase).filter((key) => !titles.includes(key)), []);
  const roles = data.resume.work.map(workKey);
  assert.deepEqual(Object.keys(ko.work).filter((key) => !roles.includes(key)), []);
  const notes = data.portfolio.fieldNotes.map((note) => note.title);
  assert.deepEqual(Object.keys(ko.fieldNotes).filter((key) => !notes.includes(key)), []);
  const patents = data.resume.patents.map((patent) => patent.number);
  assert.deepEqual(Object.keys(ko.patents).filter((key) => !patents.includes(key)), []);
});

test('Korean covers every role, card summary and interface label', () => {
  const ko = localize(data, 'ko');
  ko.resume.work.forEach((role, index) => assert.notEqual(role.summary, data.resume.work[index].summary));
  Object.values(ko.portfolio.showcase).flat().forEach((item, index) => {
    assert.notEqual(item.summary, Object.values(data.portfolio.showcase).flat()[index].summary);
  });
  assert.deepEqual(Object.keys(data.ko.ui).sort(), Object.keys(data.ui).sort());
  assert.equal(uiText(data, 'ko').about, '소개');
  assert.equal(uiText(data, 'en').about, 'About');
});
