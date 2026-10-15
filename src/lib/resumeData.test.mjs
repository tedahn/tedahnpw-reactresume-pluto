import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../resumeData.json', import.meta.url), 'utf8'));

function strings(value, path = '$') {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => strings(item, `${path}[${index}]`));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([key, item]) => strings(item, `${path}.${key}`));
  return [];
}

test('every content string has balanced ** and ` markers', () => {
  const unbalanced = strings(data).filter(([, text]) =>
    (text.match(/\*\*/g) || []).length % 2 !== 0 || (text.match(/`/g) || []).length % 2 !== 0);
  assert.deepEqual(unbalanced, []);
});
