const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

// "May 2022" or "September 2019" -> UTC Date for the first of the month; anything else -> null.
export function parseMonthYear(value) {
  const match = /^\s*([A-Za-z]{3})[a-z]*\.?\s+(\d{4})\s*$/.exec(value || '');
  if (!match) return null;
  const month = MONTHS[match[1].toLowerCase()];
  return month === undefined ? null : new Date(Date.UTC(Number(match[2]), month, 1));
}

function splitRange(dates) {
  const [start = '', end = ''] = (dates || '').split(/\s+[-–—]\s+/);
  return [start.trim(), end.trim()];
}

// "Jul 2024 - Present" -> "2024 — now"; "May 2017 - Dec 2017" -> "2017".
export function yearRange(dates) {
  const [start, end] = splitRange(dates);
  const startYear = parseMonthYear(start)?.getUTCFullYear();
  if (!startYear) return dates || '';
  if (!end || /^present$/i.test(end)) return `${startYear} — now`;
  const endYear = parseMonthYear(end)?.getUTCFullYear();
  if (!endYear || endYear === startYear) return `${startYear}`;
  return `${startYear} — ${endYear}`;
}

// Newest role first by start month; unparseable dates sink to the end in original order.
export function byStartDesc(roles) {
  const start = (role) => parseMonthYear(splitRange(role.dates)[0])?.getTime() ?? -Infinity;
  return [...roles].sort((a, b) => {
    const diff = start(b) - start(a);
    return Number.isNaN(diff) ? 0 : diff;
  });
}
