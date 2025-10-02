import React from 'react'
import Footer from '../Footer';
import '../Experiences.css'
import { useNavigate } from 'react-router-dom';

function BookEventHall() {
    const navigate = useNavigate();

    // Event Hall Data
    const eventHalls = {
        rooftopArea: {
            id: 1,
            name: 'Rooftop Area',
            price: 8000, // Price for first 5 hours
            capacity: 150, 
            image: 'images/event hall.jpg',
            type: 'event_hall', 
            duration: '5 hours' 
        },
        pavilion: {
            id: 2,
            name: 'Pavilion',
            price: 4500, 
            capacity: 70, 
            image: 'images/hallll.png',
            type: 'event_hall',
            duration: '5 hours'
        }
    };

    // Navigate to booking form with selected event hall data
    const handleBookEventHall = (hallKey) => {
        const selectedHall = eventHalls[hallKey];
        navigate('/room-booking-process', {
            state: { room: selectedHall }
        });
    };

return (
    <>
    <h2 className='page-title'>Book</h2>
    <div className='container'>
{/* Rooms Section */}
        <div className='title'>
            <span>Event Hall</span>
        </div>
            <div className='content-wrapper'>
                <div className='image-content'>
                    <img 
                        src='images/event hall.jpg' 
                        alt='La Fam Room'
                        className='section-image'
                    />
                </div>
                <div className='text-content'>
                    <h1 className='section-title'>Rooftop Area</h1>
                    <ul className='description'>
                        <p>Capacity: 100-150 pax maximum capacity<br/>
                        Room Size: Approximately 25–30 sqm<br/>
                        View: Garden or Poolside (subject to availability)<br/><br/>
                        Amenities:</p>
                            <ul>
                                <li>Free use of table, chairs, and kitchen</li>
                                <li>Flat-screen TV</li>
                                <li>No corkage fee</li>
                                <li>Free Grilling Station</li>
                                <li>Accepting Exclusive Events</li>
                            </ul> <br/>
                        <p>Notes:</p>
                            <ul>
                                <li>Perfect for large group celebrations with open-air ambiance and sunset views</li>
                                <li>Reservation required in advance for exclusive use</li>
                            </ul>
                        <h2>8000 PHP/1st five hours</h2>
                    </ul>
                    {/* Book Now Button */}
                    <div className='booking-action' style={{marginTop: '20px'}}>
                            <button 
                            onClick={() => handleBookEventHall('rooftopArea')}
                            style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }}>
                                Book Rooftop Area
                            </button>
                    </div>
                </div>
            </div>

            <div className='content-wrapper'>
                <div className='image-content'>
                    <img 
                        src='images/hallll.png' 
                        alt='Tres Ramu Room'
                        className='section-image'
                    />
                </div>
                <div className='text-content'>
                    <h1 className='section-title'>Pavilion</h1>
                    <ul className='description'>
                        <p>Capacity: 30-70 pax maximum capacity<br/>
                        Room Size: Approximately 25–30 sqm<br/>
                        View:Garden or Poolside (subject to availability)<br/><br/>
                        Amenities:</p>
                            <ul>
                                <li>Free use of table, chairs, and kitchen</li>
                                <li>No corkage fee of food and beverage</li>
                                <li>Free Grilling Station</li>
                                <li>Accepting Exclusive Events</li>
                                <li>Ideal for wedding, birthday parties, seminars, corporate events, team building, ceremonies, meetings and anniversaries</li>
                            </ul> <br/>
                        <p>Notes:</p>
                            <ul>
                                <li>Covered venue suitable for any weather</li>
                                <li>Cozy setup for intimate gatherings and celebrations</li>
                            </ul>
                        <h2>4500 PHP/1st five hours</h2>
                    </ul>
                    {/* Book Now Button */}
                    <div className='booking-action' style={{marginTop: '20px'}}>
                            <button 
                            onClick={() => handleBookEventHall('pavilion')}
                            style={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }}>
                                Book Pavillon
                            </button>
                    </div>
                </div>
            </div>
    </div>
    <Footer />
    </>
);
}
export default BookEventHall;