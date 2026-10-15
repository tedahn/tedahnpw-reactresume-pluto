// Splits copy into text, **strong**, and `figure` tokens. Markers must hug their
// content (no inner edge spaces; backticks not inside a word), so stray markers stay literal.
const PATTERN = /\*\*(?=\S)(.+?)(?<=\S)\*\*|(?<![\w`])`([^`\s][^`]*?)`(?![\w`])/g;

export function tokenize(text) {
  if (!text) return [];
  const tokens = [];
  let last = 0;
  for (const match of text.matchAll(PATTERN)) {
    if (match.index > last) tokens.push({ type: 'text', value: text.slice(last, match.index) });
    tokens.push(match[1] !== undefined
      ? { type: 'strong', value: match[1] }
      : { type: 'figure', value: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) tokens.push({ type: 'text', value: text.slice(last) });
  return tokens;
}
