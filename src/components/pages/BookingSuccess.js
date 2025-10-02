import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookingSuccess.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BookingSuccess() {
  const q = useQuery();
  const ref = q.get('ref');
  const invoiceUrl = q.get('invoice_url');

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have a booking ref, fetch full booking details
    if (!ref) return;
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiBase}/api/booking-details/${encodeURIComponent(ref)}/`);
        if (!res.ok) {
          const text = await res.text().catch(() => null);
          throw new Error(`HTTP ${res.status} ${text || ''}`);
        }
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [ref]);

  return (
    <div className="booking-success-page">
      <div className="bs-container">
        <h1 className="bs-title">Booking Confirmed</h1>

        {ref ? (
          <p className="bs-ref">Your booking reference is <strong>{ref}</strong>.</p>
        ) : (
          <p className="bs-ref">Your booking was created.</p>
        )}

        {loading && <p className="muted">Loading booking details…</p>}
        {error && <p className="error">Could not load booking details: {error}</p>}

        {details ? (
          <div className="bs-card">
            <button className="bs-close" aria-label="Close and return home" onClick={() => window.location.href = '/'}>×</button>
            <h3>Booking Details</h3>
            <div className="bs-grid">
              <div className="bs-col">
                <label>Guest</label>
                <div className="bs-val">{details.guest_name}</div>
                <label>Email</label>
                <div className="bs-val">{details.guest_email}</div>
              </div>

              <div className="bs-col">
                {details.booking_type === 'room' && (
                  <>
                    <label>Room</label>
                    <div className="bs-val">{details.room?.name}</div>

                    <label>Check-in</label>
                    <div className="bs-val">{details.check_in}</div>

                    <label>Check-out</label>
                    <div className="bs-val">{details.check_out}</div>

                    <label>Nights</label>
                    <div className="bs-val">{details.nights}</div>

                    <label>Additional beddings</label>
                    <div className="bs-val">{details.additional_beddings}</div>
                  </>
                )}

                {details.booking_type === 'hall' && (
                  <>
                    <label>Hall</label>
                    <div className="bs-val">{details.hall?.name}</div>
                    <label>Event start</label>
                    <div className="bs-val">{details.event_date_start} {details.event_time_start ? `at ${details.event_time_start}` : ''}</div>
                    <label>Event end</label>
                    <div className="bs-val">{details.event_date_end} {details.event_time_end ? `at ${details.event_time_end}` : ''}</div>
                    <label>Duration</label>
                    <div className="bs-val">{details.duration_days} day{Number(details.duration_days) > 1 ? 's' : ''}{details.duration_hours ? `, ${details.duration_hours} hour${Number(details.duration_hours) > 1 ? 's' : ''}` : ''}</div>
                    {typeof details.overtime_hours !== 'undefined' && Number(details.overtime_hours) > 0 && (
                      <>
                        <label>Overtime</label>
                        <div className="bs-val">{details.overtime_hours} hour{Number(details.overtime_hours) > 1 ? 's' : ''} (+₱{Number(details.overtime_charge || 0).toLocaleString()})</div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="bs-summary">
              <div>
                <label>Total</label>
                <div className="bs-val total">₱{(details.total_price || 0).toLocaleString()}</div>
              </div>
              <div>
                <label>Payment status</label>
                <div className="bs-val">{details.payment_status}</div>
              </div>
            </div>

            {invoiceUrl && (
              <div className="bs-invoice">
                <p>To complete payment, open your invoice:</p>
                <p><a href={invoiceUrl} target="_blank" rel="noopener noreferrer">Open Invoice</a></p>
              </div>
            )}

            <div className="bs-note">We've sent payment instructions to <strong>{details.guest_email}</strong> (check your inbox and spam folder).</div>
          </div>
        ) : (
          !loading && !error && (
            <div className="bs-card">
              {invoiceUrl ? (
                <p>To complete payment, open your invoice: <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">Open Invoice</a></p>
              ) : (
                <p>If you don't see a payment link, check your email for payment instructions.</p>
              )}
            </div>
          )
        )}

        <p className="thank-you">Thank you for booking with WS Mansion Resort.</p>
      </div>
    </div>
  );
}
