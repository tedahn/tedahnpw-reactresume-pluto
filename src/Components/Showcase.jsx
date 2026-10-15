import React from 'react';
import Inline from './Inline';
import Reveal from './Reveal';
import { yearRange } from '../lib/dates';

// Quiet footnote: "Capital One · 2024 — now".
const CardMeta = ({ item }) => {
  if (!item.org) return null;
  return (
    <p className="card-meta">
      {item.org}
      {item.period && <> · <span className="card-period">{yearRange(item.period)}</span></>}
    </p>
  );
};

const GLYPHS = {
  curve: (
    <svg width="120" height="70" viewBox="0 0 120 70">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 60 Q30 10 60 30 T112 12" />
        <path d="M8 60 L112 60 M8 60 L8 8" opacity=".35" />
      </g>
      <g fill="currentColor"><circle cx="34" cy="26" r="2.5" /><circle cx="60" cy="30" r="2.5" /><circle cx="86" cy="24" r="2.5" /></g>
    </svg>
  ),
  ring: (
    <svg width="120" height="70" viewBox="0 0 120 70">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="60" cy="35" r="22" />
        <circle cx="60" cy="35" r="12" opacity=".5" />
      </g>
      <g fill="currentColor"><circle cx="60" cy="13" r="2.5" /><circle cx="82" cy="35" r="2.5" /><circle cx="60" cy="57" r="2.5" /><circle cx="38" cy="35" r="2.5" /></g>
    </svg>
  ),
  flow: (
    <svg width="120" height="70" viewBox="0 0 120 70">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="10" y="26" width="22" height="18" rx="3" />
        <rect x="49" y="10" width="22" height="18" rx="3" />
        <rect x="49" y="42" width="22" height="18" rx="3" />
        <rect x="88" y="26" width="22" height="18" rx="3" />
        <path d="M32 35 L49 19 M32 35 L49 51 M71 19 L88 35 M71 51 L88 35" />
      </g>
    </svg>
  ),
};

const CardMedia = ({ item }) =>
  item.image ? (
    <img className="card-media" src={item.image} alt={item.imageAlt || ''} loading="lazy" width="640" height="360" />
  ) : (
    <div className="card-media card-glyph" aria-hidden="true">{GLYPHS[item.glyph] || GLYPHS.flow}</div>
  );

const Card = ({ item }) => {
  const content = (
    <>
      <CardMedia item={item} />
      <div className="card-body">
        <h3 className="card-title">
          {item.title}
          {item.url && <span className="card-arrow" aria-hidden="true"> ↗</span>}
        </h3>
        <p className="card-summary"><Inline text={item.summary} /></p>
        <CardMeta item={item} />
      </div>
    </>
  );

  return item.url ? (
    <a className="card" href={item.url} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <div className="card">{content}</div>
  );
};

const Showcase = ({ id, title, items = [], notes = [] }) => {
  if (!items.length && !notes.length) return null;

  return (
    <Reveal className="section" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-label">{title}</h2>
      <div className="section-body">
        {items.length > 0 && (
          <div className="cards">
            {items.map((item) => <Card key={item.title} item={item} />)}
          </div>
        )}
        {notes.length > 0 && (
          <ul className="notes" aria-label="Notes">
            {notes.map((note) => (
              <li key={note.title}>
                <span>
                  <a href={note.links?.[0]?.url} target="_blank" rel="noopener noreferrer">{note.title}</a>
                </span>
                {note.year && <span className="note-year">{note.year}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
};

export default Showcase;
