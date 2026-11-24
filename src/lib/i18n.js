// Site language: English by default, Korean when asked for or preferred.
export const LANGS = ['en', 'ko'];
export const STORAGE_KEY = 'siteLang';

// Order: ?lang= in the link, then the visitor's saved switch choice, then the browser's
// preferred languages (first ko or en wins). Anything else falls back to English.
export function detectLang({ search = '', saved = null, languages = [] } = {}) {
  const param = new URLSearchParams(search).get('lang');
  if (LANGS.includes(param)) return param;
  if (LANGS.includes(saved)) return saved;
  for (const code of languages) {
    const lower = String(code || '').toLowerCase();
    if (lower.startsWith('ko')) return 'ko';
    if (lower.startsWith('en')) return 'en';
  }
  return 'en';
}

const workKey = (role) => `${role.company} | ${role.dates}`;
const overlay = (item, patch) => (patch ? { ...item, ...patch } : item);

// Returns the site data with the Korean overlay (data.ko) applied. English returns data as is.
// Overlays are keyed by stable identifiers so the English source stays the single list of items.
export function localize(data, lang) {
  const ko = data.ko;
  if (lang !== 'ko' || !ko) return data;
  const showcase = data.portfolio?.showcase || {};
  const cards = ko.showcase || {};
  return {
    ...data,
    main: { ...data.main, ...ko.main, photo: overlay(data.main.photo, ko.main?.photo) },
    resume: {
      ...data.resume,
      work: data.resume.work.map((role) => overlay(role, ko.work?.[workKey(role)])),
      patents: (data.resume.patents || []).map((patent) => overlay(patent, ko.patents?.[patent.number])),
    },
    portfolio: {
      ...data.portfolio,
      showcase: Object.fromEntries(Object.entries(showcase).map(([group, items]) => [
        group, items.map((item) => overlay(item, cards[item.title])),
      ])),
      fieldNotes: (data.portfolio?.fieldNotes || []).map((note) => overlay(note, ko.fieldNotes?.[note.title])),
    },
  };
}

// Interface labels for the chosen language, falling back to English per key.
export function uiText(data, lang) {
  return { ...(data.ui || {}), ...(lang === 'ko' ? data.ko?.ui : {}) };
}

export { workKey };
