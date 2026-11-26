import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanReferrer, deviceType, newVisitorId, optOutChange, shouldTrack, sourceFrom } from './analytics.js';

test('tracks real visitors on tedahn.com only', () => {
  assert.equal(shouldTrack({ hostname: 'www.tedahn.com', ua: 'Mozilla/5.0 (iPhone)' }), true);
  assert.equal(shouldTrack({ hostname: 'tedahn.com' }), true);
  assert.equal(shouldTrack({ hostname: 'localhost' }), false);
  assert.equal(shouldTrack({ hostname: 'localhost', debug: true }), true);
});

test('skips opted-out owners, privacy signals, bots and automation', () => {
  const host = 'www.tedahn.com';
  assert.equal(shouldTrack({ hostname: host, optedOut: true }), false);
  assert.equal(shouldTrack({ hostname: host, gpc: true }), false);
  assert.equal(shouldTrack({ hostname: host, dnt: '1' }), false);
  assert.equal(shouldTrack({ hostname: host, webdriver: true }), false);
  assert.equal(shouldTrack({ hostname: host, ua: 'Mozilla/5.0 (compatible; Googlebot/2.1)' }), false);
  assert.equal(shouldTrack({ hostname: host, ua: 'Mozilla/5.0 HeadlessChrome/120' }), false);
});

test('reads the owner opt-out switch', () => {
  assert.equal(optOutChange('?notrack=1'), 'out');
  assert.equal(optOutChange('?lang=ko&notrack=0'), 'in');
  assert.equal(optOutChange('?lang=ko'), null);
});

test('labels devices', () => {
  assert.equal(deviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)'), 'mobile');
  assert.equal(deviceType('Mozilla/5.0 (iPad; CPU OS 17_0)'), 'tablet');
  assert.equal(deviceType('Mozilla/5.0 (Linux; Android 14) Mobile'), 'mobile');
  assert.equal(deviceType('Mozilla/5.0 (Macintosh)', 1440), 'desktop');
  assert.equal(deviceType('Mozilla/5.0 (X11)', 500), 'mobile');
});

test('summarises campaign tags', () => {
  assert.equal(sourceFrom('?ref=toss'), 'ref:toss');
  assert.equal(sourceFrom('?utm_source=linkedin&utm_medium=social'), 'linkedin / social');
  assert.equal(sourceFrom('?ref=kb&utm_source=email'), 'ref:kb | email');
  assert.equal(sourceFrom(''), '');
});

test('keeps external referrers without query strings', () => {
  assert.equal(cleanReferrer('https://www.linkedin.com/in/someone/?trk=abc', 'www.tedahn.com'), 'https://www.linkedin.com/in/someone/');
  assert.equal(cleanReferrer('https://www.google.com/', 'www.tedahn.com'), 'https://www.google.com');
  assert.equal(cleanReferrer('https://www.tedahn.com/resume.html', 'www.tedahn.com'), '');
  assert.equal(cleanReferrer('not a url', 'www.tedahn.com'), '');
  assert.equal(cleanReferrer('', 'www.tedahn.com'), '');
});

test('makes 16-character hex visitor IDs', () => {
  const id = newVisitorId();
  assert.match(id, /^[0-9a-f]{16}$/);
  assert.equal(newVisitorId(() => 0), '0000000000000000');
});
