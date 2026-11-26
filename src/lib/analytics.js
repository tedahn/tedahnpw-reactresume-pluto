// First-party visit log. Each page view (and how long the visitor stayed) is sent to Ted's
// private Apps Script, which appends it to the Visits tab of his private Google Sheet.
// No cookies, no third-party scripts, no IP address. A random visitor ID in localStorage lets
// the log show returning visitors and, if a visitor later requests the résumé, who they are.
// This file is also inlined into public/resume.html by scripts/generate-resume-assets.mjs,
// so it must stay plain browser JavaScript with no imports.

export const VISITOR_KEY = 'tedahn.vid';
export const COUNT_KEY = 'tedahn.visits';
export const SESSION_KEY = 'tedahn.session';
export const OPT_OUT_KEY = 'tedahn.notrack';
export const DEBUG_KEY = 'tedahn.trackdebug';
export const TRACKED_HOSTS = ['tedahn.com', 'www.tedahn.com'];

const BOT_PATTERN = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|embedly|quora link|whatsapp|telegram|discord|slack|vkshare|w3c_validator/i;

// Ted's own devices opt out once with ?notrack=1 (and back in with ?notrack=0).
export function optOutChange(search = '') {
  const value = new URLSearchParams(search).get('notrack');
  if (value === '1') return 'out';
  if (value === '0') return 'in';
  return null;
}

export function shouldTrack({ hostname = '', ua = '', webdriver = false, dnt = null, gpc = false, optedOut = false, debug = false } = {}) {
  if (optedOut) return false;
  if (gpc === true || dnt === '1' || dnt === 'yes') return false;
  if (webdriver && !debug) return false;
  if (BOT_PATTERN.test(ua)) return false;
  return debug || TRACKED_HOSTS.includes(String(hostname).toLowerCase());
}

export function deviceType(ua = '', width = 0) {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return 'tablet';
  if (/mobi|iphone|ipod|android/i.test(ua)) return 'mobile';
  if (width && width < 768) return 'mobile';
  return 'desktop';
}

// Campaign tags: utm_source / utm_medium / utm_campaign, or a short ?ref= tag Ted adds to links he shares.
export function sourceFrom(search = '') {
  const params = new URLSearchParams(search);
  const ref = params.get('ref');
  const utm = ['utm_source', 'utm_medium', 'utm_campaign'].map((key) => params.get(key)).filter(Boolean);
  return [ref ? `ref:${ref}` : '', utm.join(' / ')].filter(Boolean).join(' | ').slice(0, 120);
}

// External referrers only, without their query strings (which can carry other people's data).
export function cleanReferrer(referrer = '', hostname = '') {
  if (!referrer) return '';
  try {
    const url = new URL(referrer);
    if (url.hostname === hostname) return '';
    return `${url.origin}${url.pathname === '/' ? '' : url.pathname}`.slice(0, 300);
  } catch {
    return '';
  }
}

export function newVisitorId(random = Math.random) {
  let id = '';
  for (let i = 0; i < 4; i += 1) id += Math.floor(random() * 0x10000).toString(16).padStart(4, '0');
  return id;
}

function store(kind) {
  try { return window[kind]; } catch { return null; }
}

function read(storage, key) {
  try { return storage ? storage.getItem(key) : null; } catch { return null; }
}

function write(storage, key, value) {
  try { if (storage) storage.setItem(key, value); } catch { /* private mode */ }
}

function remove(storage, key) {
  try { if (storage) storage.removeItem(key); } catch { /* private mode */ }
}

export function visitorId() {
  return read(store('localStorage'), VISITOR_KEY) || '';
}

function send(endpoint, payload) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(endpoint, body)) return;
  } catch { /* fall through */ }
  try {
    fetch(endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body });
  } catch { /* never break the page */ }
}

export function startTracking({ endpoint, page } = {}) {
  if (!endpoint || typeof window === 'undefined') return;
  const local = store('localStorage');
  const session = store('sessionStorage');
  const change = optOutChange(location.search);
  if (change === 'out') write(local, OPT_OUT_KEY, '1');
  if (change === 'in') remove(local, OPT_OUT_KEY);

  const ua = navigator.userAgent || '';
  if (!shouldTrack({
    hostname: location.hostname,
    ua,
    webdriver: navigator.webdriver === true,
    dnt: navigator.doNotTrack || window.doNotTrack || null,
    gpc: navigator.globalPrivacyControl === true,
    optedOut: read(local, OPT_OUT_KEY) === '1',
    debug: read(local, DEBUG_KEY) === '1',
  })) return;

  let vid = read(local, VISITOR_KEY);
  if (!vid || !/^[a-z0-9-]{8,40}$/i.test(vid)) {
    vid = newVisitorId();
    write(local, VISITOR_KEY, vid);
  }
  let visit = Number(read(local, COUNT_KEY)) || 0;
  if (!read(session, SESSION_KEY)) {
    visit += 1;
    write(local, COUNT_KEY, String(visit));
    write(session, SESSION_KEY, '1');
  }

  const base = { vid, visit: Math.max(visit, 1), page: page || location.pathname };
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { /* old browser */ }
  send(endpoint, {
    ...base,
    type: 'view',
    referrer: cleanReferrer(document.referrer, location.hostname),
    source: sourceFrom(location.search),
    lang: navigator.language || '',
    tz,
    device: deviceType(ua, window.innerWidth),
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    ua: ua.slice(0, 300),
  });

  // Time on page: counted while the tab is visible, sent once when the visitor first leaves.
  let visibleSince = document.visibilityState === 'visible' ? Date.now() : null;
  let visibleMs = 0;
  let left = false;
  const leave = () => {
    if (left) return;
    if (visibleSince) visibleMs += Date.now() - visibleSince;
    visibleSince = null;
    if (visibleMs < 1000) return;
    left = true;
    send(endpoint, { ...base, type: 'leave', seconds: Math.round(visibleMs / 1000) });
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') leave();
    else if (!left) visibleSince = Date.now();
  });
  window.addEventListener('pagehide', leave);
}
