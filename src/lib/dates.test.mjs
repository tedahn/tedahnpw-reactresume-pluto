import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byStartDesc, parseMonthYear, yearRange } from './dates.js';

test('parseMonthYear reads short and long month names', () => {
  assert.equal(parseMonthYear('May 2022').toISOString(), '2022-05-01T00:00:00.000Z');
  assert.equal(parseMonthYear('September 2019').getUTCMonth(), 8);
  assert.equal(parseMonthYear('Present'), null);
  assert.equal(parseMonthYear(''), null);
});

test('yearRange formats current, multi-year and same-year roles', () => {
  assert.equal(yearRange('Jul 2024 - Present'), '2024 — now');
  assert.equal(yearRange('May 2022 - Jul 2024'), '2022 — 2024');
  assert.equal(yearRange('May 2017 - Dec 2017'), '2017');
});

test('yearRange falls back to the raw string when it cannot parse', () => {
  assert.equal(yearRange('Summer internship'), 'Summer internship');
  assert.equal(yearRange(undefined), '');
});

test('byStartDesc orders newest first without mutating input', () => {
  const roles = [
    { id: 'webtoon', dates: 'May 2017 - Dec 2017' },
    { id: 'usaa', dates: 'Sep 2019 - May 2022' },
    { id: 'c1-swe', dates: 'May 2022 - Jul 2024' },
    { id: 'c1-senior', dates: 'Jul 2024 - Present' },
  ];
  assert.deepEqual(byStartDesc(roles).map((r) => r.id), ['c1-senior', 'c1-swe', 'usaa', 'webtoon']);
  assert.equal(roles[0].id, 'webtoon');
});

test('byStartDesc keeps unparseable dates last in original order', () => {
  const roles = [{ id: 'x', dates: '???' }, { id: 'a', dates: 'Jan 2020 - Present' }, { id: 'y', dates: '' }];
  assert.deepEqual(byStartDesc(roles).map((r) => r.id), ['a', 'x', 'y']);
});
