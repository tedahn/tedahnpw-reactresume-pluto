import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from './inlineFormat.js';

test('plain text is a single text token', () => {
  assert.deepEqual(tokenize('hello'), [{ type: 'text', value: 'hello' }]);
});

test('empty and missing input produce no tokens', () => {
  assert.deepEqual(tokenize(''), []);
  assert.deepEqual(tokenize(undefined), []);
});

test('**bold** becomes a strong token', () => {
  assert.deepEqual(tokenize('I **patented** it'), [
    { type: 'text', value: 'I ' },
    { type: 'strong', value: 'patented' },
    { type: 'text', value: ' it' },
  ]);
});

test('`figure` becomes a figure token', () => {
  assert.deepEqual(tokenize('at `4M+/day`.'), [
    { type: 'text', value: 'at ' },
    { type: 'figure', value: '4M+/day' },
    { type: 'text', value: '.' },
  ]);
});

test('adjacent markers are both parsed', () => {
  assert.deepEqual(tokenize('**a**`b`'), [
    { type: 'strong', value: 'a' },
    { type: 'figure', value: 'b' },
  ]);
});

test('a stray ** before real bold stays literal', () => {
  assert.deepEqual(tokenize('C++ ** note and **bold**'), [
    { type: 'text', value: 'C++ ** note and ' },
    { type: 'strong', value: 'bold' },
  ]);
});

test('an in-word backtick before a real figure stays literal', () => {
  assert.deepEqual(tokenize('it`s `4M` fast'), [
    { type: 'text', value: 'it`s ' },
    { type: 'figure', value: '4M' },
    { type: 'text', value: ' fast' },
  ]);
});

test('unmatched markers stay literal', () => {
  assert.deepEqual(tokenize('C++ ** note and `tick'), [
    { type: 'text', value: 'C++ ** note and `tick' },
  ]);
});
