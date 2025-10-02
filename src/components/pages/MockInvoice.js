import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MockInvoice() {
  const { invoiceId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('PENDING');
  const [bookingRef, setBookingRef] = useState(null);
  const [details, setDetails] = useState(null);
  const [method, setMethod] = useState(null);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const amountFromDetails = Number(details?.total_price || 0);
  const qrData = (ref) => encodeURIComponent(`PAY TO: WS MANSION\nREF: ${ref}\nAMOUNT: ₱${amountFromDetails.toLocaleString()}`);

  useEffect(() => {
    setLoading(true);
    let ref = null;
    try { ref = localStorage.getItem('last_booking_ref'); } catch (_) {}
    setBookingRef(ref);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [invoiceId]);

  const fetchDetails = async (ref) => {
    if (!ref) return;
    try {
      setLoading(true);
      const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiBase}/api/booking-details/${encodeURIComponent(ref)}/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setDetails(data);
    } catch (e) {
      // noop
    } finally {
      setLoading(false);
    }
  };

  // Removed direct Pay action in mock page; payment is simulated via the method buttons below

  const handleCheckStatus = async () => {
    if (!bookingRef) return;
    try {
      setLoading(true);
      const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiBase}/api/payment-status/${encodeURIComponent(bookingRef)}/`);
      const data = await res.json();
      if (res.ok) {
        if (data.payment_status === 'paid') {
          setStatus('PAID');
          setDetails(data);
        } else {
          setStatus(String(data.payment_status || 'PENDING').toUpperCase());
        }
      } else {
        setError(data.error || `Failed to check status (HTTP ${res.status})`);
      }
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0 }}>Invoice</h2>
              <div style={{ color: '#6b7280' }}>Invoice ID: <strong style={{ color: '#111827' }}>{invoiceId}</strong></div>
            </div>
            <div style={{ fontWeight: 600, color: status === 'PAID' ? '#059669' : '#b45309', background: status === 'PAID' ? '#ecfdf5' : '#fffbeb', border: `1px solid ${status === 'PAID' ? '#a7f3d0' : '#fde68a'}`, padding: '6px 10px', borderRadius: 8 }}>
              {status}
            </div>
          </div>

          <div style={{ padding: '20px 24px' }}>
            {error && <p style={{ color: '#b91c1c', background:'#fee2e2', border:'1px solid #fecaca', padding:'8px 10px', borderRadius:8 }}>{error}</p>}

            {status !== 'PAID' && (
              <div>
                <div style={{ marginBottom: 10, fontWeight:600 }}>Choose a payment method</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))', gap:10 }}>
                  {[
                    { key:'GCASH', label:'GCash', bg:'#0077ff', fg:'#ffffff' },
                    { key:'CREDIT_CARD', label:'Visa / Mastercard', bg:'#1f2937', fg:'#ffffff' },
                    { key:'DEBIT_CARD', label:'Debit Card', bg:'#374151', fg:'#ffffff' },
                    { key:'GRABPAY', label:'GrabPay', bg:'#00b14f', fg:'#ffffff' },
                    { key:'PAYMAYA', label:'Maya', bg:'#00b14f', fg:'#ffffff' },
                    { key:'QRPH', label:'QR Ph', bg:'#ef4444', fg:'#ffffff' },
                    { key:'CEBUANA', label:'Cebuana', bg:'#0ea5a8', fg:'#ffffff' },
                    { key:'SHOPEEPAY', label:'ShopeePay', bg:'#ef6c00', fg:'#ffffff' },
                    { key:'BANK', label:'Bank Transfer', bg:'#0f766e', fg:'#ffffff' },
                  ].map(m => (
                    <button key={m.key} onClick={() => { setMethod(m); setShowMethodModal(true); }} style={{ padding:'12px 12px', background:m.bg, color:m.fg, border:'none', borderRadius:10, cursor:'pointer', fontWeight:600, boxShadow:'0 4px 10px rgba(0,0,0,0.08)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center' }}>
                        {/* simple brand-like badge */}
                        <svg width="22" height="22" viewBox="0 0 22 22" style={{ background:'#fff', borderRadius:6 }}>
                          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="700" fill={m.bg}>
                            {m.label.slice(0,1)}
                          </text>
                        </svg>
                        <span>{m.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 10 }}>
                  <button onClick={handleCheckStatus} style={{ padding: '10px 12px', background: '#f3f4f6', border:'1px solid #e5e7eb', borderRadius:8, cursor:'pointer' }} disabled={loading || !bookingRef}>
                    Check Payment Status
                  </button>
                </div>
                <div style={{ fontSize: 12, color:'#6b7280', marginTop: 6 }}>This is a mock. Selecting a method marks your booking as paid for testing purposes.</div>
              </div>
            )}

            {showMethodModal && method && (
              <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10000 }}>
                <div style={{ background:'#fff', borderRadius:12, width: 'min(92vw, 520px)', padding:20, boxShadow:'0 20px 40px rgba(0,0,0,0.3)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                    <h3 style={{ margin:0 }}>{method.label} Payment</h3>
                    <button onClick={()=>setShowMethodModal(false)} style={{ border:'none', background:'transparent', fontSize:22, cursor:'pointer' }}>×</button>
                  </div>
                  <div>
                    {['GCASH','QRPH'].includes(method.key) && (
                      <div style={{ textAlign:'center' }}>
                        <div style={{ margin:'8px 0', fontSize:13, color:'#6b7280' }}>Account: <strong>WS MANSION</strong></div>
                        <img alt="Mock QR"
                             width="220" height="220"
                             style={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
                             src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrData(bookingRef || 'N/A')}`} />
                        <div style={{ marginTop:8, color:'#374151', fontWeight:600 }}>₱{amountFromDetails.toLocaleString()}</div>
                        <div style={{ fontSize:12, color:'#6b7280' }}>Ref: {bookingRef}</div>
                      </div>
                    )}
                    {['CREDIT_CARD','DEBIT_CARD'].includes(method.key) && (
                      <div>
                        <div className="cc-row" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                          <input placeholder="Card Number" style={{ gridColumn:'1 / span 2', padding:10, border:'1px solid #e5e7eb', borderRadius:8 }} />
                          <input placeholder="MM/YY" style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }} />
                          <input placeholder="CVV" style={{ padding:10, border:'1px solid #e5e7eb', borderRadius:8 }} />
                        </div>
                      </div>
                    )}
                    {['GRABPAY','PAYMAYA','SHOPEEPAY','CEBUANA','BANK'].includes(method.key) && (
                      <div>
                        <div style={{ margin:'8px 0', color:'#6b7280' }}>A mock payment screen for {method.label} will be shown. Click Confirm to complete simulation.</div>
                      </div>
                    )}
                  </div>
                  <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:16 }}>
                    <button onClick={()=>setShowMethodModal(false)} style={{ padding:'10px 12px', background:'#f3f4f6', border:'1px solid #e5e7eb', borderRadius:8, cursor:'pointer' }}>Cancel</button>
                    <button onClick={async ()=>{
                      if (!bookingRef) { setError('No booking reference found.'); return; }
                      try {
                        setLoading(true);
                        const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8000';
                        await fetch(`${apiBase}/api/payment-webhook/`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: 'PAID', external_id: `${bookingRef}_MOCK`, id: invoiceId, payment_channel: method.key })
                        });
                        setShowMethodModal(false);
                        setStatus('PAID');
                        await fetchDetails(bookingRef);
                      } catch (e) {
                        setError(e?.message || String(e));
                      } finally {
                        setLoading(false);
                      }
                    }} style={{ padding:'10px 16px', background:'#111827', color:'#fff', border:'none', borderRadius:8, cursor:'pointer' }}>Confirm Payment</button>
                  </div>
                </div>
              </div>
            )}

            {status === 'PAID' && (
              <div style={{ marginTop: 16, border: '1px solid #e5e7eb', borderRadius: 12, overflow:'hidden' }}>
                <div style={{ padding: '14px 16px', background:'#f9fafb', borderBottom:'1px solid #e5e7eb', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <h3 style={{ margin: 0 }}>Receipt</h3>
                  <button onClick={() => { window.location.href = '/'; }} style={{ padding:'6px 10px', background:'#111827', color:'#fff', border:'none', borderRadius:8, cursor:'pointer' }}>Close</button>
                </div>
                <div style={{ padding: 16 }}>
                  {bookingRef && !details && (
                    <button onClick={() => fetchDetails(bookingRef)} style={{ padding: '8px 12px', background:'#111827', color:'#fff', border:'none', borderRadius:8 }}>Load Receipt Details</button>
                  )}
                  {details && (
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
                      <div>
                        <div style={{ color:'#6b7280' }}>Booking Reference</div>
                        <div style={{ fontWeight:600 }}>{details.booking_reference}</div>
                      </div>
                      <div>
                        <div style={{ color:'#6b7280' }}>Payment Status</div>
                        <div style={{ fontWeight:600 }}>{details.payment_status}</div>
                      </div>
                      <div>
                        <div style={{ color:'#6b7280' }}>Name</div>
                        <div>{details.guest_name}</div>
                      </div>
                      <div>
                        <div style={{ color:'#6b7280' }}>Email</div>
                        <div>{details.guest_email}</div>
                      </div>
                      {details.booking_type === 'room' ? (
                        <>
                          <div>
                            <div style={{ color:'#6b7280' }}>Room</div>
                            <div>{details.room?.name}</div>
                          </div>
                          <div>
                            <div style={{ color:'#6b7280' }}>Dates</div>
                            <div>{details.check_in} → {details.check_out}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div style={{ color:'#6b7280' }}>Hall</div>
                            <div>{details.hall?.name}</div>
                          </div>
                          <div>
                            <div style={{ color:'#6b7280' }}>Schedule</div>
                            <div>{details.event_date_start}{details.event_time_start ? ` ${details.event_time_start}` : ''} → {details.event_date_end}{details.event_time_end ? ` ${details.event_time_end}` : ''}</div>
                          </div>
                        </>
                      )}
                      <div>
                        <div style={{ color:'#6b7280' }}>Total Paid</div>
                        <div style={{ fontWeight:700 }}>₱{Number(details.total_price || 0).toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


