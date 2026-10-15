import React from 'react';
import { tokenize } from '../lib/inlineFormat';

// Renders copy containing **bold** and `figure` markers.
const Inline = ({ text }) =>
  tokenize(text).map((token, index) => {
    if (token.type === 'strong') return <strong key={index}>{token.value}</strong>;
    if (token.type === 'figure') return <span key={index} className="figure">{token.value}</span>;
    return <React.Fragment key={index}>{token.value}</React.Fragment>;
  });

export default Inline;
