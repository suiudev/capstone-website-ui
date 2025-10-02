import React from 'react'
import Footer from '../Footer';
import '../Experiences.css'
import { useNavigate } from 'react-router-dom';

function BookRooms() {
    const navigate = useNavigate();

    // Room Data

    const rooms = {
        laFamilia: {
            id: 2,
            name: 'La Familia',
            price: 2000,
            capacity: 4,
            image: 'images/lafam.jpg'
        },
        tresRamu: {
            id: 1,
            name: 'Tres Ramu',
            price: 1800,
            capacity: 3,
            image: 'images/lafam.jpg' 
        },
        amorDePareja: {
            id: 3,
            name: 'Amor De Pareja',
            price: 1500,
            capacity: 2,
            image: 'images/couple.jpg'
        }
    };
    // Navigate to Booking Form with selected room
        const handleBookRoom = (roomKey) => {
        const selectedRoom = rooms[roomKey];
        navigate('/room-booking-process', {
            state: { room: selectedRoom }
        });
    };


return (
    <>
    <h2 className='page-title'>Book</h2>
    <div className='container'>
{/* Rooms Section */}
        <div className='title'>
            <span>Rooms</span>
        </div>
            <div className='content-wrapper'>
                <div className='image-content'>
                    <img 
                        src='images/lafam.jpg' 
                        alt='La Fam Room'
                        className='section-image'
                    />
                </div>
                <div className='text-content'>
                    <h1 className='section-title'>La Familia</h1>
                    <ul className='description'>
                        <p>Capacity: Good for 4 guests<br/>
                        Bed Configuration: 2 Queen Beds (Additional beddings available upon request)<br/>
                        Room Size: Approximately 25–30 sqm<br/>
                        View: Garden or Poolside (subject to availability)<br/><br/>
                        In-Room Amenities:</p>
                            <ul>
                                <li>Air-conditioning</li>
                                <li>Private bathroom with hot & cold shower</li>
                                <li>Flat-screen TV</li>
                                <li>Complimentary Wi-Fi</li>
                                <li>Towels and basic toiletries</li>
                                <li>Mini table and chairs</li>
                                <li>Closet space and hangers</li>
                            </ul> <br/>
                        <p>Inclusions:</p>
                            <ul>
                                <li>Free pool pass for all registered guests</li>
                                <li>No breakfast included</li>
                            </ul>
                        <li>Ideal for: Families or small groups looking for comfort, space, and access to resort amenities</li>
                        <p>Notes: Extra beddings may incur an additional fee</p>
                        <h2>2000 PHP/night</h2>
                    </ul>
                    {/* Book Now Button */}
                    <div className='booking-action' style={{marginTop: '20px'}}>
                            <button 
                            onClick={() => handleBookRoom('laFamilia')}
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
                                Book La Familia
                            </button>
                    </div>
                </div>
            </div>

            <div className='content-wrapper'>
                <div className='image-content'>
                    <img 
                        src='images/lafam.jpg' 
                        alt='Tres Ramu Room'
                        className='section-image'
                    />
                </div>
                <div className='text-content'>
                    <h1 className='section-title'>Tres Ramu</h1>
                    <ul className='description'>
                        <p>Capacity: Good for 3 guests<br/>
                        Bed Configuration: 1 Queen-Sized Bed + 1 Single Bed (Additional beddings available upon request)<br/>
                        Room Size: Approximately 20–25 sqm<br/>
                        View: Garden view or nearby courtyard<br/><br/>
                        In-Room Amenities:</p>
                            <ul>
                                <li>Air-conditioning</li>
                                <li>Private bathroom with hot & cold shower</li>
                                <li>Wall-mounted flat-screen TV</li>
                                <li>Complimentary Wi-Fi</li>
                                <li>Towels and basic toiletries</li>
                                <li>Small desk or sitting area</li>
                            </ul> <br/>
                        <p>Inclusions:</p>
                            <ul>
                                <li>Free pool pass for all registered guests</li>
                                <li>No breakfast included</li>
                            </ul>
                        <li>Ideal for: Small families or groups of friends who want a cozy yet convenient stay</li>
                        <p>Notes: Additional beddings may be requested with possible charges</p>
                        <h2>1800 PHP/night</h2>
                    </ul>
                    {/* Book Now Button */}
                    <div className='booking-action' style={{marginTop: '20px'}}>
                            <button 
                            onClick={() => handleBookRoom('tresRamu')}
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
                                Book Tres Ramu
                            </button>
                    </div>
                </div>
            </div>


            <div className='content-wrapper'>
                <div className='image-content'>
                    <img 
                        src='images/couple.jpg' 
                        alt='Amor De Pareja Room'
                        className='section-image'
                    />
                </div>
                <div className='text-content'>
                    <h1 className='section-title'>Amor De Pareja</h1>
                    <ul className='description'>
                        <p>Capacity: Up to 2 guests<br/>
                        Bed Configuration: 1 Queen Bed (Additional beddings available upon request)<br/>
                        Room Size: Approximately 18–22 sqm<br/>
                        View: Private corner or pool/garden (depending on room location)<br/><br/>
                        In-Room Amenities:</p>
                            <ul>
                                <li>Air-conditioning</li>
                                <li>En suite bathroom with hot & cold shower</li>
                                <li>Free high-speed Wi-Fi</li>
                                <li>Flat-screen TV</li>
                                <li>Complimentary toiletries and towels</li>
                                <li>Small seating area or vanity table</li>
                            </ul> <br/>
                        <p>Inclusions:</p>
                            <ul>
                                <li>Free pool pass for both guests</li>
                                <li>No breakfast included</li>
                            </ul>
                        <li>Ideal for: Couples or solo travelers looking for a relaxing, romantic, or peaceful stay</li>
                        <p>Notes: Extra bedding can be arranged upon request (subject to availability)</p>
                        <h2>1500 PHP/night</h2>
                    </ul>
                    {/* Book Now Button */}
                    <div className='booking-action' style={{marginTop: '20px'}}>
                            <button 
                            onClick={() => handleBookRoom('amorDePareja')}
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
                                Book Amor De Pareja
                            </button>
                    </div>
                </div>
            </div>
    </div>
    <Footer />
    </>
);
}
export default BookRooms;