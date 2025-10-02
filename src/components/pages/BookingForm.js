import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import '../BookingForm.css';
import CalendarPreview from '../ui/CalendarPreview';
import Notification from '../ui/Notification';
import ClockOverlay from '../ui/ClockOverlay';

function BookingForm() {
    const location = useLocation();

    // Get room data from navigation state 
    const [selectedRoom] = useState(location.state?.room || {
        name: 'La Familia',
        price: 2000,
        capacity: 4,
        image: 'images/lafam.jpg'
    });

    const isEventHall = selectedRoom.type === 'event_hall'; 

    const [formData, setFormData] = useState({
        // Guest Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        
        // Booking Details
        checkIn: '',
        checkOut: '',
        guests: 1,
        
        // Special Requests
        specialRequests: '',
        extraBedding: false,
        
        // Contact Preferences
        contactMethod: 'email',

        // Event hall time details (used when booking halls)
        eventTimeStart: '',
        eventTimeEnd: '',
        durationHours: 0
    });

    const [errors, setErrors] = useState({});
    const [totalNights, setTotalNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculate nights and total price
    useEffect(() => {
        if (formData.checkIn && formData.checkOut) {
            const checkInDate = new Date(formData.checkIn);
            const checkOutDate = new Date(formData.checkOut);
            const timeDiff = checkOutDate - checkInDate;
            const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            
            if (nights > 0) {
                setTotalNights(nights);
                setTotalPrice(nights * selectedRoom.price);
            }
        }
    }, [formData.checkIn, formData.checkOut, selectedRoom.price]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required field validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
        // Rooms require check-out; halls only need one date
        if (!isEventHall && !formData.checkOut) newErrors.checkOut = 'Check-out date is required';
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        // Date validation
        if (!isEventHall && formData.checkIn && formData.checkOut) {
            const checkInDate = new Date(formData.checkIn);
            const checkOutDate = new Date(formData.checkOut);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (checkInDate < today) {
                newErrors.checkIn = 'Check-in date cannot be in the past';
            }
            
            if (checkOutDate <= checkInDate) {
                newErrors.checkOut = 'Check-out date must be after check-in date';
            }
        }
        
        // Guest capacity validation
        if (formData.guests > selectedRoom.capacity) {
            newErrors.guests = `Maximum ${selectedRoom.capacity} guests for this room`;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [submitting, setSubmitting] = useState(false);
    const [notif, setNotif] = useState({ open: false, type: 'info', message: '' });
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarAnchorRef = React.useRef(null);
    const [showClockOverlay, setShowClockOverlay] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (submitting) return;
        setSubmitting(true);

        // Build payload for API (map form fields to backend serializer fields)
        let payload;
        let apiEndpoint;
        
        if (isEventHall) {
                // Hall booking payload
                // Compute duration_days from selected dates if user picked a range; otherwise 1
                const durationDays = (() => {
                    if (formData.checkIn && formData.checkOut) {
                        const s = new Date(formData.checkIn);
                        const e = new Date(formData.checkOut);
                        const diff = Math.round((e - s) / (1000*60*60*24));
                        return Math.max(1, diff || 1);
                    }
                    return 1;
                })();

                payload = {
                guest_name: `${formData.firstName} ${formData.lastName}`,
                guest_email: formData.email,
                hall: selectedRoom.id || 1,
                event_date_start: formData.checkIn,
                    duration_days: durationDays,
                number_of_guests: formData.guests || 1,
                // Include time and duration if provided via ClockOverlay
                duration_hours: formData.durationHours || undefined,
                event_time_start: formData.eventTimeStart || undefined,
                event_time_end: formData.eventTimeEnd || undefined
            };
            apiEndpoint = '/api/book-hall/';
        } else {
            // Room booking payload
            payload = {
                guest_name: `${formData.firstName} ${formData.lastName}`,
                guest_email: formData.email,
                room: selectedRoom.id || 1,
                check_in: formData.checkIn,
                check_out: formData.checkOut,
                number_of_guests: formData.guests || 1,
                additional_beddings: formData.extraBedding ? 1 : 0,
            };
            apiEndpoint = '/api/book-room/';
        }

        try {
            // Create booking via Django API
            console.log('Sending request to:', `${process.env.REACT_APP_API_URL || 'https://wsmansionresort.pythonanywhere.com${apiEndpoint}`);
            console.log('Payload:', payload);
            
            const res = await fetch(`${process.env.REACT_APP_API_URL || 'https://wsmansionresort.pythonanywhere.com'}${apiEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            // Parse response safely (some errors may return non-JSON)
            let data;
            try {
                data = await res.json();
            } catch (parseErr) {
                const text = await res.text().catch(() => null);
                console.error('Failed to parse booking response JSON', parseErr, text);
                setNotif({ open: true, type: 'error', message: `Booking API error: HTTP ${res.status} - ${text || 'No response body'}` });
                setSubmitting(false);
                return;
            }

            if (!res.ok) {
                console.error('Booking creation failed', res.status, data);
                setNotif({ open: true, type: 'error', message: data.error || `Failed to create booking (HTTP ${res.status})` });
                setSubmitting(false);
                return;
            }

            // On success, open a single invoice: if an invoice already exists, reuse it; otherwise create.
            const bookingReference = data.booking_reference;
            const baseUrl = (process.env.REACT_APP_API_URL || 'https://wsmansionresort.pythonanywhere.com');
            try { localStorage.setItem('last_booking_ref', bookingReference); } catch (_) {}

            // First, try to load existing invoice id saved earlier for this booking
            let existingInvoiceId = null;
            try { existingInvoiceId = localStorage.getItem(`invoice_for_${bookingReference}`); } catch (_) {}

            let invoiceUrlToOpen = null;
            if (existingInvoiceId) {
                // We don't have a direct endpoint to fetch invoice details by id on backend yet, so attempt status to verify
                const statusRes = await fetch(`${baseUrl}/api/payment-status/${encodeURIComponent(bookingReference)}/`);
                const statusData = await statusRes.json().catch(() => ({}));
                if (statusRes.ok && statusData.payment_status === 'pending') {
                    // Fall back to creating a payment if URL is not known; backend will reuse existing invoice if implemented
                } else if (statusRes.ok && statusData.payment_status === 'paid') {
                    // Already paid → go to success page
                    window.location.href = `/booking-success?ref=${encodeURIComponent(bookingReference)}`;
                    setSubmitting(false);
                    return;
                }
            }

            // Create or reuse payment invoice
            let payRes = await fetch(`${baseUrl}/api/create-payment/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ booking_reference: bookingReference })
            });
            if (payRes.status === 404) {
                try {
                    payRes = await fetch(`${baseUrl}/api/create-payment`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ booking_reference: bookingReference })
                    });
                } catch (_) {}
            }
            const payData = await payRes.json().catch(() => ({}));
            if (!payRes.ok) {
                setNotif({ open: true, type: 'error', message: payData.error || `Failed to create payment (HTTP ${payRes.status})` });
                setSubmitting(false);
                return;
            }
            invoiceUrlToOpen = payData.invoice_url || payData.invoice?.invoice_url;
            const invoiceId = payData.invoice_id || payData.id || payData.invoice?.id;
            if (invoiceId) { try { localStorage.setItem(`invoice_for_${bookingReference}`, String(invoiceId)); } catch (_) {} }

            if (invoiceUrlToOpen) {
                window.location.href = invoiceUrlToOpen;
            } else {
                setNotif({ open: true, type: 'error', message: 'Payment link not available. Please try again.' });
            }

        } catch (err) {
            console.error('Unexpected error creating booking/payment', err);
            // Show a more helpful notification when unexpected exceptions occur
            setNotif({ open: true, type: 'error', message: `Unexpected error: ${err?.message || String(err)}. Check console for details.` });
        } finally {
            setSubmitting(false);
        }
    };

    // Today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <h2 className='page-title'>Book Your Stay</h2>
            <div className='container'>

                {/* Selected Room Summary */}
                <div className='booking-summary'>
                    <h3>Selected {isEventHall ? 'Event Hall' : 'Room'}: {selectedRoom.name}</h3>
                    <div className='room-summary'>
                        <img 
                            src={selectedRoom.image} 
                            alt={selectedRoom.name}
                            style={{width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px'}}
                        />
                        <div style={{marginLeft: '20px'}}>
                            <p><strong>Capacity:</strong> Up to {selectedRoom.capacity} guests</p>
                            <p><strong>Price:</strong> ₱{selectedRoom.price.toLocaleString()}/{isEventHall ? '5 hours' : 'night'}</p>
                            {isEventHall && <p><strong>Duration:</strong> First 5 hours included</p>}
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className='booking-form'>
                    
                    {/* Guest Information Section */}
                    <div className='form-section'>
                        <h3>Guest Information</h3>
                        
                        <div className='form-row'>
                            <div className='form-group'>
                                <label htmlFor='firstName' className='required-label'>First Name</label>
                                <input
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
                            </div>
                            
                            <div className='form-group'>
                                <label htmlFor='lastName' className='required-label'>Last Name</label>
                                <input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className='error-message'>{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group'>
                                <label htmlFor='email'  className='required-label'>Email Address</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className='error-message'>{errors.email}</span>}
                            </div>
                            
                            <div className='form-group'>
                                <label htmlFor='phone' className='required-label'>Phone Number</label>
                                <input
                                    type='tel'
                                    id='phone'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className='error-message'>{errors.phone}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Booking Details Section */}
                    <div className='form-section'>
                        <h3>Booking Details</h3>
                        
                        <div className='form-row'>
                            {/* Calendar rendered inline centered within Booking Details */}
                            {showCalendar && (
                                <div className="calendar-inline-container" aria-hidden={!showCalendar}>
                                    <div className="calendar-overlay">
                                        <div style={{ position: 'relative' }}>
                                            <button className="calendar-close" aria-label="Close calendar" onClick={() => setShowCalendar(false)}>×</button>
                                            <CalendarPreview
                                                roomId={!isEventHall ? (selectedRoom.id || 1) : null}
                                                hallId={isEventHall ? (selectedRoom.id || 1) : null}
                                                bookingType={isEventHall ? 'event_hall' : 'room'}
                                                selectedStart={formData.checkIn || null}
                                                selectedEnd={formData.checkOut || null}
                                                onSelect={(start, end) => {
                                                    // CalendarPreview will only call onSelect when the user presses Confirm
                                                    // For event halls, use only the start date (single-day booking)
                                                    if (isEventHall) {
                                                        setFormData(prev => ({ ...prev, checkIn: start || prev.checkIn, checkOut: start || prev.checkIn }));
                                                    } else {
                                                        setFormData(prev => ({ ...prev, checkIn: start || prev.checkIn, checkOut: end || prev.checkOut }));
                                                    }
                                                    // Clear date-related errors when user confirms selection
                                                    setErrors(prev => ({ ...prev, checkIn: '', checkOut: '' }));
                                                    // For event halls, open the clock overlay to choose time/duration
                                                    if (isEventHall && start) {
                                                        setShowClockOverlay(true);
                                                    } else {
                                                        // Close calendar after confirm for rooms
                                                        setShowCalendar(false);
                                                    }
                                                }}
                                                onClose={() => setShowCalendar(false)}
                                                onBookedClick={(date) => {
                                                    setNotif({ open: true, type: 'error', message: `The date ${date} is already booked.` });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='form-group date-with-icon' ref={calendarAnchorRef}>
                                <label htmlFor='checkIn' className='required-label'>{isEventHall ? 'Event Date' : 'Check-in Date'}</label>
                                    <div className="date-input-with-icon">
                                        <input
                                            type='text'
                                            id='checkIn'
                                            name='checkIn'
                                            value={formData.checkIn}
                                            onChange={handleInputChange}
                                            readOnly
                                            onFocus={() => setShowCalendar(true)}
                                            placeholder='YYYY-MM-DD'
                                            className={errors.checkIn ? 'error' : ''}
                                        />
                                        <button type="button" className="calendar-icon" aria-label="Open calendar" onClick={() => {
                                            setShowCalendar(true);
                                        }}>📅</button>
                                    </div>
                                {errors.checkIn && <span className='error-message'>{errors.checkIn}</span>}
                            </div>
                            
                            {!isEventHall && (
                                <div className='form-group date-with-icon'>
                                    <label htmlFor='checkOut' className='required-label'>Check-out Date</label>
                                        <div className="date-input-with-icon">
                                            <input
                                                type='text'
                                                id='checkOut'
                                                name='checkOut'
                                                value={formData.checkOut}
                                                onChange={handleInputChange}
                                                readOnly
                                                onFocus={() => setShowCalendar(true)}
                                                placeholder='YYYY-MM-DD'
                                                min={formData.checkIn || today}
                                                className={errors.checkOut ? 'error' : ''}
                                            />
                                            <button type="button" className="calendar-icon" aria-label="Open calendar" onClick={() => {
                                                setShowCalendar(true);
                                            }}>📅</button>
                                        </div>
                                    {errors.checkOut && <span className='error-message'>{errors.checkOut}</span>}
                                    {!errors.checkOut && formData.checkIn && (
                                        <div className="helper">Earliest check-out: <strong>{new Date(new Date(formData.checkIn).getTime() + 24*60*60*1000).toISOString().slice(0,10)}</strong></div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='guests' className='required-label'>Number of Guests</label>
                            <select
                                id='guests'
                                name='guests'
                                value={formData.guests}
                                onChange={handleInputChange}
                                className={errors.guests ? 'error' : ''}
                            >
                                {isEventHall ? (
                                    // For event halls - larger increments
                                    [10, 20, 30, 50, 70, 75, 100, 150]
                                        .filter(num => num <= selectedRoom.capacity)
                                        .map(num => (
                                            <option key={num} value={num}>{num} Guests</option>
                                        ))
                                ) : (
                                    // For rooms - original logic
                                    [...Array(selectedRoom.capacity)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                                    ))
                                )}
                            </select>
                            {errors.guests && <span className='error-message'>{errors.guests}</span>}
                        </div>
                    </div>

                    {/* Additional Options: Only show for rooms, not event halls */}
                    {!isEventHall && (
                        <div className='form-section'>
                            <h3>Additional Options</h3>
                            
                            <div className='form-group checkbox-group'>
                                <input
                                    type='checkbox'
                                    id='extraBedding'
                                    name='extraBedding'
                                    checked={formData.extraBedding}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor='extraBedding'>Request extra bedding (additional charges may apply)</label>
                            </div>
                            
                            <div className='form-group'>
                                <label htmlFor='specialRequests'>Special Requests</label>
                                <textarea
                                    id='specialRequests'
                                    name='specialRequests'
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    rows='3'
                                    placeholder='Any special requests or notes...'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='contactMethod'>Preferred Contact Method</label>
                                <select
                                    id='contactMethod'
                                    name='contactMethod'
                                    value={formData.contactMethod}
                                    onChange={handleInputChange}
                                >
                                    <option value='email'>Email</option>
                                    <option value='phone'>Phone</option>
                                    <option value='both'>Both Email and Phone</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Price Summary */}
                    {totalNights > 0 && (
                        <div className='price-summary'>
                            <h3>Booking Summary</h3>
                            <div className='price-breakdown'>
                                {isEventHall ? (
                                    <>
                                        <p>{selectedRoom.name} - Event Hall Rental</p>
                                        <p>Duration: First 5 hours</p>
                                        <p><strong>Total: ₱{selectedRoom.price.toLocaleString()}</strong></p>
                                    </>
                                ) : (
                                    <>
                                        <p>{selectedRoom.name} × {totalNights} night{totalNights > 1 ? 's' : ''}</p>
                                        <p><strong>Total: ₱{totalPrice.toLocaleString()}</strong></p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className='form-actions'>
                        <Link to='/book-rooms'>
                            <button type='button' className='btn-secondary' disabled={submitting}>
                                Back to Rooms
                            </button>
                        </Link>
                        <button type='submit' className={`btn-primary ${submitting ? 'btn-loading' : ''}`} disabled={submitting}>
                            {submitting ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
            {/* Time selection overlay for event halls */}
            {isEventHall && (
                <ClockOverlay
                    isOpen={showClockOverlay}
                    onClose={() => {
                        setShowClockOverlay(false);
                        setShowCalendar(false);
                    }}
                    onConfirm={({ duration_hours, event_time_start, event_time_end }) => {
                        setFormData(prev => ({
                            ...prev,
                            durationHours: duration_hours,
                            eventTimeStart: event_time_start,
                            eventTimeEnd: event_time_end
                        }));
                        setShowClockOverlay(false);
                        setShowCalendar(false);
                        setNotif({ open: true, type: 'info', message: `Time selected: ${duration_hours}h from ${event_time_start} to ${event_time_end}. Proceed to payment to confirm your booking. Please arrive on time for your selected schedule.` });
                    }}
                    initialHours={selectedRoom?.name?.includes('Rooftop') ? 4 : 4}
                    maxHours={selectedRoom?.name?.includes('Rooftop') ? 4 : 10}
                    hallType={selectedRoom?.name?.includes('Rooftop') ? 'Rooftop' : 'Pavilion'}
                />
            )}
            <Notification open={notif.open} type={notif.type} message={notif.message} onClose={() => setNotif({ open: false, type: 'info', message: '' })} />
        </>
    );
}

export default BookingForm;
