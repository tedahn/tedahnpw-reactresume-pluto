import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'src', 'resumeData.json');
const publicDirectory = path.join(root, 'public');
const data = JSON.parse(await readFile(sourcePath, 'utf8'));

const { main, portfolio } = data;
const canonicalUrl = main.website.replace(/\/$/, '');
const mojibakeMarkers = ['â€”', 'â€“', 'Â·', 'ï»¿', '�'];

const normalizeTextArtifact = (value, { asciiOnly = false, frontmatter = false } = {}) => {
  let normalized = String(value)
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n');

  if (frontmatter) {
    normalized = normalized.replace(/^\s+(?=---\n)/, '');
  }

  if (asciiOnly) {
    normalized = normalized
      .replaceAll('—', ':')
      .replaceAll('–', '-')
      .replaceAll('·', '|');
  }

  return `${normalized.trimEnd()}\n`;
};

const validateTextArtifact = async (filePath, { asciiOnly = false, frontmatter = false } = {}) => {
  const bytes = await readFile(filePath);
  const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);

  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    throw new Error(`${path.basename(filePath)} must not include a UTF-8 BOM.`);
  }

  if (frontmatter && !decoded.startsWith('---\n')) {
    throw new Error(`${path.basename(filePath)} frontmatter must begin at byte zero.`);
  }

  if (!decoded.endsWith('\n')) {
    throw new Error(`${path.basename(filePath)} must end with a newline.`);
  }

  if (asciiOnly && /[^\x00-\x7F]/u.test(decoded)) {
    throw new Error(`${path.basename(filePath)} must remain ASCII-safe for encoding-agnostic AI ingestion.`);
  }

  const mojibakeMarker = mojibakeMarkers.find((marker) => decoded.includes(marker));
  if (mojibakeMarker) {
    throw new Error(`${path.basename(filePath)} contains mojibake marker ${JSON.stringify(mojibakeMarker)}.`);
  }
};

const writeTextArtifact = async (fileName, value, options = {}) => {
  const filePath = path.join(publicDirectory, fileName);
  const normalized = normalizeTextArtifact(value, options);

  await writeFile(filePath, normalized, { encoding: 'utf8' });
  await validateTextArtifact(filePath, options);
};

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const request = data.resumeRequest;
if (!request?.endpoint) throw new Error('resumeRequest.endpoint is required: resume.html is the request page.');

const ko = request.ko || {};
const fieldText = (field) => ({ label: field.label });
const i18n = {
  en: {
    title: `${request.heading} | ${main.name}`, eyebrow: request.eyebrow, heading: request.heading, intro: request.intro,
    languageLabel: request.languageLabel, noteLabel: request.noteLabel, consent: request.consent, privacy: request.privacy,
    submit: request.submit, sending: request.sending, successHeading: request.successHeading, success: request.success,
    invalid: request.invalid, error: request.error, noscript: request.noscript, optional: request.optional,
    home: request.home, skip: request.skip, switchLabel: request.switchLabel,
    ...Object.fromEntries(request.languages.map((lang) => [`hint_${lang.value}`, lang.hint || ''])),
    ...Object.fromEntries(request.fields.map((field) => [`field_${field.name}`, field.label])),
  },
};
i18n.ko = {
  ...i18n.en,
  ...Object.fromEntries(Object.entries(ko).filter(([, value]) => typeof value === 'string')),
  title: `${ko.pageTitle || request.heading} | ${main.name}`,
  ...Object.fromEntries(Object.entries(ko.languageHints || {}).map(([key, value]) => [`hint_${key}`, value])),
  ...Object.fromEntries(Object.entries(ko.fieldLabels || {}).map(([key, value]) => [`field_${key}`, value])),
};
delete i18n.ko.pageTitle;
const t = (key) => `data-i18n="${key}"`;

const profiles = main.social.filter((network) => ['github', 'linkedin'].includes(network.name));
const nodeMark = (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 34 18" aria-hidden="true"><path d="M5 9 L17 4 L29 9 M17 4 L17 14" fill="none" stroke="currentColor" stroke-width="1.2"/>${[[5, 9], [17, 4], [29, 9], [17, 14]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="2.4" fill="currentColor"/>`).join('')}</svg>`;

const fieldHtml = (field) => `
          <label class="field">
            <span class="field-label"><span ${t(`field_${field.name}`)}>${escapeHtml(field.label)}</span>${field.required ? '' : ` <em ${t('optional')}>${escapeHtml(request.optional)}</em>`}</span>
            <input name="${escapeHtml(field.name)}" type="${escapeHtml(field.type)}"${field.inputmode ? ` inputmode="${escapeHtml(field.inputmode)}"` : ''}${field.placeholder ? ` placeholder="${escapeHtml(field.placeholder)}"` : ''} autocomplete="${escapeHtml(field.autocomplete || 'off')}" maxlength="${field.name === 'website' ? 300 : 160}"${field.required ? ' required' : ''}>
          </label>`;

const css = `
:root{--ink:#121a26;--panel:#18212f;--field:#0f1620;--cream:#f4f0e6;--muted:#b4ab97;--body-2:#cfc8b8;--rule:#263142;--acc:#6fc3b2;--acc-soft:rgba(111,195,178,.22);--err:#e8968c;--display:'Newsreader','Noto Serif KR',Georgia,serif;--mono:'JetBrains Mono',ui-monospace,monospace;color-scheme:dark}
*,*::before,*::after{box-sizing:border-box}
html{background:var(--ink)}
body{margin:0;background:var(--ink);color:var(--cream);font-family:var(--display);font-size:19px;line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none;transition:color .2s ease}a:hover{color:var(--acc)}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px;border-radius:4px}
.skip-link{position:absolute;left:16px;top:-60px;z-index:10;padding:8px 14px;border-radius:6px;background:var(--acc);color:var(--ink);font-size:16px}.skip-link:focus{top:16px;color:var(--ink)}
.page{max-width:760px;margin:0 auto;padding:26px 32px 46px}
.site-header{display:flex;justify-content:space-between;align-items:center;gap:16px;font-size:16px;line-height:1.4}
.site-header nav{display:flex;gap:22px;color:var(--muted)}
.site-header .right{display:flex;align-items:center;gap:22px}
.switch{display:inline-flex;padding:2px;border:1px solid var(--rule);border-radius:999px;font-family:var(--mono);font-size:12px;letter-spacing:.04em}
.switch button{padding:4px 10px;border-radius:999px;background:transparent;color:var(--muted);font:inherit;box-shadow:none}
.switch button:hover{transform:none;box-shadow:none;color:var(--cream)}
.switch button[aria-pressed=true]{background:var(--acc-soft);color:var(--cream)}
html[lang=ko] body{word-break:keep-all}
html[lang=ko] legend,html[lang=ko] .field-label,html[lang=ko] .eyebrow{font-family:var(--display);font-size:14px;font-weight:500;letter-spacing:.02em;text-transform:none}
html[lang=ko] .lang small{font-family:var(--display);font-size:13px;letter-spacing:0}
html[lang=ko] .lede,html[lang=ko] .done p{line-height:1.75}
.site-mark{display:inline-flex;padding:4px;margin-left:-4px;color:var(--acc);opacity:.85}.site-mark:hover{opacity:1}
.intro{margin-top:40px;text-align:center}
.ring{position:relative;width:96px;height:96px;margin:0 auto;padding:4px;border-radius:50%;border:2px solid var(--acc-soft);box-shadow:inset 0 0 0 1px rgba(244,240,230,.12),0 10px 40px -10px var(--acc-soft)}
.ring::before{content:'';position:absolute;inset:-2px;padding:2px;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg 200deg,var(--acc) 300deg,transparent 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);animation:spin 18s linear infinite;pointer-events:none}
@keyframes spin{to{transform:rotate(360deg)}}
.ring img{width:100%;height:100%;border-radius:50%;object-fit:cover;background:var(--panel)}
.eyebrow{margin:20px 0 4px;color:var(--acc);font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase}
h1{margin:0;font-weight:500;font-size:48px;line-height:1.08;letter-spacing:.2px}
.lede{max-width:520px;margin:14px auto 0;color:var(--body-2);font-size:18px;line-height:1.6}
.ornament{display:flex;align-items:center;justify-content:center;gap:12px;margin:34px 0 30px;color:var(--acc)}
.ornament span{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--acc))}.ornament span:last-child{background:linear-gradient(90deg,var(--acc),transparent)}
.panel{background:var(--panel);border:2px solid var(--acc-soft);border-radius:12px;box-shadow:0 18px 50px -24px var(--acc-soft);padding:30px 32px 28px}
form{display:grid;gap:22px}
fieldset{margin:0;padding:0;border:0;min-width:0}
legend,.field-label{display:block;margin-bottom:8px;color:var(--muted);font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.field-label em,legend em{font-style:normal;text-transform:none;letter-spacing:0;color:#857d6c;margin-left:4px}
.langs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.lang{position:relative;display:block;cursor:pointer}
.lang input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}
.lang span{display:flex;flex-direction:column;gap:2px;padding:14px 16px;border:1.5px solid var(--rule);border-radius:10px;background:var(--field);transition:border-color .2s ease,background .2s ease}
.lang b{font-weight:500;font-size:22px;line-height:1.2}
.lang small{color:var(--muted);font-family:var(--mono);font-size:11.5px;letter-spacing:.04em}
.lang:hover span{border-color:var(--acc-soft)}
.lang input:checked+span{border-color:var(--acc);background:rgba(111,195,178,.08);box-shadow:inset 0 0 0 1px var(--acc)}
.lang input:checked+span b::after{content:'';display:inline-block;width:8px;height:8px;margin-left:10px;border-radius:50%;background:var(--acc);vertical-align:middle}
.lang input:focus-visible+span{outline:2px solid var(--acc);outline-offset:3px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 16px}
.field{display:block;min-width:0}
input[type=text],input[type=email],input[type=tel],textarea{display:block;width:100%;padding:11px 13px;border:1.5px solid var(--rule);border-radius:8px;background:var(--field);color:var(--cream);font:17px/1.4 var(--display);transition:border-color .2s ease}
input::placeholder,textarea::placeholder{color:#6f7a88}
input:hover,textarea:hover{border-color:#34415a}
input:focus,textarea:focus{outline:none;border-color:var(--acc);box-shadow:0 0 0 3px rgba(111,195,178,.18)}
textarea{resize:vertical;min-height:92px}
.tried input:invalid,.tried textarea:invalid{border-color:var(--err)}
.tried .langs.missing .lang span{border-color:var(--err)}
.consent{display:flex;gap:12px;align-items:flex-start;color:var(--body-2);font-size:16px;line-height:1.5;cursor:pointer}
.consent input{flex:none;width:18px;height:18px;margin:3px 0 0;accent-color:var(--acc)}
.privacy{margin:-8px 0 0 30px;color:var(--muted);font-size:14px;line-height:1.5}
.actions{display:flex;flex-wrap:wrap;align-items:center;gap:14px 18px}
button{border:0;border-radius:999px;padding:13px 26px;background:var(--acc);color:var(--ink);font:600 17px/1.2 var(--display);cursor:pointer;transition:transform .2s ease,box-shadow .2s ease}
button:hover{transform:translateY(-1px);box-shadow:0 8px 24px -10px var(--acc)}
button:disabled{opacity:.6;cursor:wait;transform:none}
.status{margin:0;font-size:16px;line-height:1.5}.status.err{color:var(--err)}
.hp{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}
.done{display:none;text-align:center;padding:10px 0}
.done .check{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;border:2px solid var(--acc);color:var(--acc);font:500 24px/1 var(--mono)}
.done h2{margin:14px 0 6px;font-weight:500;font-size:30px;line-height:1.2}
.done p{max-width:440px;margin:0 auto;color:var(--body-2);font-size:17px}
.panel.sent form{display:none}.panel.sent .done{display:block}
.note{margin:22px 0 0;text-align:center;color:var(--muted);font-size:15px}
.site-footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;margin-top:56px;padding-top:18px;border-top:1px solid var(--rule);color:var(--muted);font-size:15px;line-height:1.5}
@media (max-width:768px){body{font-size:17.5px}.page{padding:20px 16px 40px}.site-header nav,.site-header .right{gap:14px}h1{font-size:36px}.panel{padding:22px 18px 22px}.grid{grid-template-columns:1fr}}
@media (max-width:380px){.langs{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){a,button,input,textarea,.lang span{transition:none}.ring::before{animation:none}button:hover{transform:none}}
`;

const script = `
(function () {
  var form = document.getElementById('resume-request');
  if (!form) return;
  var panel = form.closest('.panel');
  var status = form.querySelector('.status');
  var button = form.querySelector('button[type="submit"]');
  var langs = form.querySelector('.langs');
  var lang = 'en';
  var languageTouched = false;
  var storageKey = 'resumePageLang';

  // Page language: ?lang= in the link, then the visitor's own choice, then the browser's preferred languages.
  function detect() {
    var param = new URLSearchParams(location.search).get('lang');
    if (param === 'ko' || param === 'en') return param;
    try { var saved = localStorage.getItem(storageKey); if (saved === 'ko' || saved === 'en') return saved; } catch (e) {}
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i]).toLowerCase();
      if (code.indexOf('ko') === 0) return 'ko';
      if (code.indexOf('en') === 0) return 'en';
    }
    return 'en';
  }

  function apply(next) {
    lang = next;
    var dict = I18N[lang];
    document.documentElement.lang = lang;
    document.title = dict.title;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = dict[el.getAttribute('data-i18n')]; });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', dict[el.getAttribute('data-i18n-aria')]); });
    document.querySelectorAll('.switch button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    if (status.textContent) status.textContent = status.className === 'status err' ? (form.classList.contains('tried') && !form.checkValidity() ? dict.invalid : dict.error) : '';
    // Suggest the matching résumé language until the visitor picks one themselves.
    if (!languageTouched) {
      var radio = form.querySelector('input[name="language"][value="' + lang + '"]');
      if (radio) radio.checked = true;
    }
  }

  document.querySelectorAll('.switch button').forEach(function (b) {
    b.addEventListener('click', function () {
      try { localStorage.setItem(storageKey, b.dataset.lang); } catch (e) {}
      apply(b.dataset.lang);
    });
  });
  langs.addEventListener('change', function () { languageTouched = true; });
  apply(detect());

  function checkLangs() { langs.classList.toggle('missing', !form.querySelector('input[name="language"]:checked')); }
  function recheck() {
    if (!form.classList.contains('tried')) return;
    checkLangs();
    if (form.checkValidity() && status.className === 'status err') { status.className = 'status'; status.textContent = ''; }
  }
  form.addEventListener('change', recheck);
  form.addEventListener('input', recheck);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.classList.add('tried');
    checkLangs();
    if (!form.checkValidity()) { status.className = 'status err'; status.textContent = I18N[lang].invalid; form.reportValidity(); return; }
    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = typeof value === 'string' ? value.trim() : value; });
    data.consent = form.elements.consent.checked;
    data.page = location.pathname;
    button.disabled = true;
    status.className = 'status';
    status.textContent = I18N[lang].sending;
    fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (!result || !result.ok) throw new Error(result && result.error);
        form.reset();
        status.textContent = '';
        panel.classList.add('sent');
        panel.querySelector('.done').focus();
      })
      .catch(function () {
        status.className = 'status err';
        status.textContent = I18N[lang].error;
      })
      .finally(function () { button.disabled = false; });
  });
}());
`;

const photo = main.photo ? `<div class="ring"><img src="${escapeHtml(main.photo.src.replace(/^\//, ''))}" alt="${escapeHtml(main.photo.alt)}" width="96" height="96"></div>` : '';

const resumeHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#121a26">
  <meta name="robots" content="index,follow">
  <meta name="description" content="${escapeHtml(request.pageDescription)}">
  <link rel="canonical" href="${canonicalUrl}/resume.html">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="icon" href="favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Noto+Serif+KR:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
  <title>${escapeHtml(i18n.en.title)}</title>
  <link rel="alternate" hreflang="en" href="${canonicalUrl}/resume.html?lang=en">
  <link rel="alternate" hreflang="ko" href="${canonicalUrl}/resume.html?lang=ko">
  <style>${css.trim()}</style>
</head>
<body>
  <a class="skip-link" href="#request" ${t('skip')}>${escapeHtml(request.skip)}</a>
  <div class="page">
    <header class="site-header">
      <a class="site-mark" href="./" aria-label="${escapeHtml(main.name)}: home">${nodeMark(28, 15)}</a>
      <div class="right">
      <nav aria-label="Site">
        <a href="./" ${t('home')}>${escapeHtml(request.home)}</a>
${profiles.map((network) => `        <a href="${escapeHtml(network.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(network.label || network.name)}</a>`).join('\n')}
      </nav>
      <div class="switch" role="group" aria-label="${escapeHtml(request.switchLabel)}" data-i18n-aria="switchLabel"><button type="button" data-lang="en" lang="en" aria-pressed="true">EN</button><button type="button" data-lang="ko" lang="ko" aria-pressed="false">한국어</button></div>
      </div>
    </header>
    <main>
      <section class="intro" aria-labelledby="request-heading">
        ${photo}
        <p class="eyebrow" ${t('eyebrow')}>${escapeHtml(request.eyebrow)}</p>
        <h1 id="request-heading" ${t('heading')}>${escapeHtml(request.heading)}</h1>
        <p class="lede" ${t('intro')}>${escapeHtml(request.intro)}</p>
      </section>
      <div class="ornament" aria-hidden="true"><span></span>${nodeMark(34, 18)}<span></span></div>
      <div class="panel" id="request">
        <form id="resume-request" data-endpoint="${escapeHtml(request.endpoint)}" novalidate>
          <fieldset class="langs"><legend ${t('languageLabel')}>${escapeHtml(request.languageLabel)}</legend>
${request.languages.map((lang, index) => `            <label class="lang"><input type="radio" name="language" value="${escapeHtml(lang.value)}"${index === 0 ? ' required' : ''}><span><b lang="${escapeHtml(lang.value)}">${escapeHtml(lang.label)}</b><small ${t(`hint_${lang.value}`)}>${escapeHtml(lang.hint || '')}</small></span></label>`).join('\n')}
          </fieldset>
          <div class="grid">${request.fields.map(fieldHtml).join('')}
          </div>
          <label class="field"><span class="field-label"><span ${t('noteLabel')}>${escapeHtml(request.noteLabel)}</span> <em ${t('optional')}>${escapeHtml(request.optional)}</em></span><textarea name="note" rows="3" maxlength="1000"></textarea></label>
          <label class="hp" aria-hidden="true">Company URL<input name="company_url" tabindex="-1" autocomplete="off"></label>
          <label class="consent"><input type="checkbox" name="consent" required><span ${t('consent')}>${escapeHtml(request.consent)}</span></label>
          <p class="privacy" ${t('privacy')}>${escapeHtml(request.privacy)}</p>
          <div class="actions"><button type="submit" ${t('submit')}>${escapeHtml(request.submit)}</button><p class="status" role="status" aria-live="polite"></p></div>
        </form>
        <div class="done" tabindex="-1" role="status"><span class="check" aria-hidden="true">✓</span><h2 ${t('successHeading')}>${escapeHtml(request.successHeading)}</h2><p ${t('success')}>${escapeHtml(request.success)}</p></div>
        <noscript><p class="note">${escapeHtml(request.noscript)}<br><span lang="ko">${escapeHtml(i18n.ko.noscript)}</span></p></noscript>
      </div>
    </main>
    <footer class="site-footer"><a href="mailto:${escapeHtml(main.email)}">${escapeHtml(main.email)}</a><span>© ${new Date().getFullYear()} ${escapeHtml(main.name)}</span></footer>
  </div>
  <script>var I18N = ${JSON.stringify(i18n).replaceAll('<', '\\u003c')};</script>
  <script>${script.trim()}</script>
</body>
</html>`;

const llmsText = `# ${main.name}\n\n> ${main.description}\n\n## Canonical profile\n- ${canonicalUrl}/\n- Résumé by request (form; sent by email after review): ${canonicalUrl}/resume.html\n\n## Work and research\n${portfolio.projects.map((project) => `- ${project.title}${project.url ? `: ${project.url}` : ''}`).join('\n')}\n${(portfolio.fieldNotes || []).flatMap((note) => note.links.map((link) => `- ${note.title}: ${link.label}: ${link.url}`)).join('\n')}\n`;

const robotsText = `User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl}/sitemap.xml\n`;
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['/', '/resume.html'].map((route) => `  <url><loc>${canonicalUrl}${route}</loc></url>`).join('\n')}\n</urlset>\n`;

await Promise.all([
  writeTextArtifact('resume.html', resumeHtml),
  writeTextArtifact('llms.txt', llmsText),
  writeTextArtifact('robots.txt', robotsText),
  writeTextArtifact('sitemap.xml', sitemapXml),
]);

console.log('Generated the résumé request page, llms.txt, robots.txt and sitemap.xml from src/resumeData.json.');
