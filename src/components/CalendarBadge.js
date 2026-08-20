import React from 'react';
import './CalendarBadge.css';

const MONTH_MAP = {
  jan:'JAN',feb:'FEB',mar:'MAR',apr:'APR',may:'MAY',jun:'JUN',
  jul:'JUL',aug:'AUG',sep:'SEP',oct:'OCT',nov:'NOV',dec:'DEC',
  january:'JAN',february:'FEB',march:'MAR',april:'APR',june:'JUN',
  july:'JUL',august:'AUG',september:'SEP',october:'OCT',november:'NOV',december:'DEC',
};

// Each month gets its own gradient so a list of badges reads as varied at a
// glance instead of one repeated color, while staying within the site's palette.
const MONTH_COLORS = {
  JAN: 'linear-gradient(135deg, #7dabff 0%, #4a7fff 100%)',
  FEB: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
  MAR: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)',
  APR: 'linear-gradient(135deg, #86efac 0%, #22c55e 100%)',
  MAY: 'linear-gradient(135deg, #fde68a 0%, #f0b429 100%)',
  JUN: 'linear-gradient(135deg, #fdba74 0%, #f97316 100%)',
  JUL: 'linear-gradient(135deg, #fca5a5 0%, #ef4444 100%)',
  AUG: 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)',
  SEP: 'linear-gradient(135deg, #d8b4fe 0%, #a855f7 100%)',
  OCT: 'linear-gradient(135deg, #fcd34d 0%, #d97706 100%)',
  NOV: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)',
  DEC: 'linear-gradient(135deg, #67e8f9 0%, #06b6d4 100%)',
};

function parseDate(str) {
  if (!str) return {};
  const parts = str.trim().split(/\s+/);
  let day = null, month = null, year = null;

  for (const p of parts) {
    const lower = p.toLowerCase().replace(/[^a-z]/g, '');
    if (MONTH_MAP[lower]) { month = MONTH_MAP[lower]; continue; }
    if (/^\d{4}$/.test(p)) { year = p; continue; }
    if (/^\d{1,2}$/.test(p)) { day = p.padStart(2, '0'); continue; }
  }
  return { day, month, year };
}

export default function CalendarBadge({ date, size = 'md' }) {
  const { day, month, year } = parseDate(date);
  if (!month && !day && !year) return <span className="cal-plain">{date}</span>;

  return (
    <div className={`cal-badge cal-badge-${size}`}>
      {month && <div className="cal-month" style={{ background: MONTH_COLORS[month] }}>{month}</div>}
      {day   && <div className="cal-day">{day}</div>}
      {!day  && year && <div className="cal-year-only">{year}</div>}
      {day   && year && <div className="cal-year">{year}</div>}
    </div>
  );
}
