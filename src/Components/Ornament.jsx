import React from 'react';

const NODES = [[5, 9], [17, 4], [29, 9], [17, 14]];

// Section divider: a small node-and-edge mark between two hairlines.
const Ornament = () => (
  <div className="ornament" aria-hidden="true">
    <span className="ornament-rule" />
    <svg width="34" height="18" viewBox="0 0 34 18">
      <path d="M5 9 L17 4 L29 9 M17 4 L17 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {NODES.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="currentColor" />)}
    </svg>
    <span className="ornament-rule" />
  </div>
);

export default Ornament;
