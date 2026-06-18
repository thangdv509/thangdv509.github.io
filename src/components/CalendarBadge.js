import React from 'react';
import './CalendarBadge.css';

const MONTH_MAP = {
  jan:'JAN',feb:'FEB',mar:'MAR',apr:'APR',may:'MAY',jun:'JUN',
  jul:'JUL',aug:'AUG',sep:'SEP',oct:'OCT',nov:'NOV',dec:'DEC',
  january:'JAN',february:'FEB',march:'MAR',april:'APR',june:'JUN',
  july:'JUL',august:'AUG',september:'SEP',october:'OCT',november:'NOV',december:'DEC',
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
      {month && <div className="cal-month">{month}</div>}
      {day   && <div className="cal-day">{day}</div>}
      {!day  && year && <div className="cal-year-only">{year}</div>}
      {day   && year && <div className="cal-year">{year}</div>}
    </div>
  );
}
