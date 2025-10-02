import React, { useEffect, useState, useRef } from 'react';
import './calendar-preview.css';

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(d) {
  // Use local date formatting to avoid timezone issues
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function CalendarPreview({ roomId, hallId, bookingType, selectedStart, selectedEnd, onSelect, visible = true, onClose, onBookedClick }) {
  const isSingleDayMode = bookingType === 'event_hall'; // Event halls only allow single-day selection
  const [bookedRanges, setBookedRanges] = useState([]);
  const [current, setCurrent] = useState(() => {
    const t = new Date();
    t.setDate(1);
    return t;
  });
  const ref = useRef(null);
  // tentative selection states: selection inside calendar that is not yet confirmed
  const [tentativeStart, setTentativeStart] = useState(selectedStart || null);
  const [tentativeEnd, setTentativeEnd] = useState(selectedEnd || null);

  // Keep tentative selection in sync if parent props change (for example when reopening)
  useEffect(() => {
    setTentativeStart(selectedStart || null);
    setTentativeEnd(selectedEnd || null);
  }, [selectedStart, selectedEnd]);

  useEffect(() => {
    if (!roomId && !hallId) return;
    if (!visible) return; // Don't fetch if calendar is not visible

    console.log('🔄 Fetching booked dates from Firestore...');
    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const isHall = Boolean(hallId);
    const apiUrl = isHall
      ? `${apiBase}/api/firestore-bookings/?hall=${hallId}&type=hall`
      : `${apiBase}/api/firestore-bookings/?room=${roomId}&type=room`;

    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        console.log('✅ Fetched bookings:', data);
        // Handle different date field names for rooms vs halls
        const ranges = (data || []).map(b => (
          isHall
            ? { start: b.event_date_start, end: b.event_date_end }
            : { start: b.check_in, end: b.check_out }
        ));
        console.log('📊 Processed ranges:', ranges);
        setBookedRanges(ranges);
      })
      .catch(err => {
        console.error('❌ Failed to fetch bookings:', err);
        setBookedRanges([]);
      });
  }, [roomId, hallId, visible]); // Re-fetch when calendar becomes visible

  useEffect(() => {
    // Intentionally do NOT close on outside clicks. Parent controls visibility and
    // the calendar should only be closed via the close button (×) or explicit Confirm.
    return () => {};
  }, [visible, onClose]);

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const dim = daysInMonth(year, month);

  // Build a map of booked dates for quick lookup
  const parseYmd = (value) => {
    // Accept both Date and string; for strings like YYYY-MM-DD parse as local to avoid timezone drift
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) {
        const y = Number(m[1]);
        const mo = Number(m[2]) - 1;
        const d = Number(m[3]);
        return new Date(y, mo, d);
      }
    }
    const dt = new Date(value);
    return isNaN(dt.getTime()) ? null : dt;
  };

  const bookedSet = new Set();
  bookedRanges.forEach(r => {
    const s = parseYmd(r.start);
    let e = parseYmd(r.end) || s;
    if (!s) return;
    if (e < s) e = s;

    // Treat end date as inclusive for both halls and rooms
    const inclusiveEnd = true;
    const loopEnd = new Date(e);
    if (!inclusiveEnd) {
      loopEnd.setDate(loopEnd.getDate() - 1);
    }
    
    // Mark all dates from start to end (inclusive) as booked
    for (let d = new Date(s); d <= loopEnd; d.setDate(d.getDate() + 1)) {
      bookedSet.add(formatDate(new Date(d)));
    }
  });
  
  // Debug: log booked dates for troubleshooting
  if (bookedSet.size > 0) {
    console.log('Booked dates:', Array.from(bookedSet));
  }

  // helper to check if a date is within selected range
  const inSelectedRange = (d) => {
    if (!selectedStart) return false;
    const s = new Date(selectedStart);
    if (!selectedEnd) return formatDate(d) === formatDate(s);
    const e = new Date(selectedEnd);
    // normalize
    const dn = formatDate(d);
    return dn >= formatDate(s) && dn <= formatDate(e);
  };

  const isPast = (d) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return d < today;
  };

  const handleDateClick = (d) => {
    if (!d) return;
    const key = formatDate(d);
    // ignore clicks on booked dates
    if (bookedSet.has(key)) {
      onBookedClick && onBookedClick(key);
      return;
    }
    
    // For single-day mode (event halls), always set both start and end to the same date
    if (isSingleDayMode) {
      setTentativeStart(key);
      setTentativeEnd(key); // Same as start for single-day bookings
      return;
    }
    
    // Work with tentative selection for multi-day bookings (rooms)
    if (!tentativeStart || (tentativeStart && tentativeEnd)) {
      // start a new tentative selection
      setTentativeStart(key);
      setTentativeEnd(null);
    } else {
      // Compare dates properly by creating new Date objects
      const tentativeStartDate = new Date(tentativeStart);
      if (d < tentativeStartDate) {
        // user picked an earlier date -> restart
        setTentativeStart(key);
        setTentativeEnd(null);
      } else {
        setTentativeEnd(key);
      }
    }
  };

  const weeks = [];
  let day = 1 - firstWeekday;
  while (day <= dim) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (day < 1 || day > dim) {
        week.push(null);
      } else {
        const d = new Date(year, month, day);
        week.push(d);
      }
      day++;
    }
    weeks.push(week);
  }

  if (!visible) return null;

  return (
    <div ref={ref} className="calendar-preview">
      <div className="calendar-header">
        <button onClick={() => setCurrent(new Date(year, month - 1, 1))}>&lt;</button>
        <div>{current.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
        <button onClick={() => setCurrent(new Date(year, month + 1, 1))}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(h => (
          <div key={h} className="cal-cell cal-head">{h}</div>
        ))}
        {weeks.map((week, wi) => (
          week.map((d, di) => {
            if (!d) return <div key={`${wi}-${di}`} className="cal-cell cal-empty" />;
            const key = formatDate(d);
            const isBooked = bookedSet.has(key);
            const selected = (tentativeStart && !tentativeEnd && key === tentativeStart) || (tentativeStart && tentativeEnd && key >= tentativeStart && key <= tentativeEnd) || inSelectedRange(d);
            const past = isPast(d);
            const cellClass = past ? 'cal-past' : (isBooked ? 'cal-booked' : 'cal-available');
            return (
              <div key={key} onClick={() => { if (!past) handleDateClick(d); }} className={`cal-cell ${cellClass} ${selected ? 'cal-selected' : ''}`} title={key}>
                <div className="cal-day">{d.getDate()}</div>
              </div>
            );
          })
        ))}
      </div>
      <div className="calendar-controls">
        <div className="calendar-legend">
        <span><i className="legend-dot available"/> Available</span>
        <span><i className="legend-dot booked"/> Booked</span>
        </div>
        <div className="calendar-action-buttons">
          <button type="button" className="btn-cancel" onClick={() => {
            // clear tentative selection and call onClose if provided
            setTentativeStart(null);
            setTentativeEnd(null);
            onClose && onClose();
          }}>Cancel</button>
          <button type="button" className="btn-confirm" onClick={() => {
            // commit tentative selection
            if (tentativeStart) {
              const start = tentativeStart;
              const end = tentativeEnd || tentativeStart;
              onSelect && onSelect(start, end);
              // keep calendar open decision to caller; typically the parent will close it
            }
          }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
