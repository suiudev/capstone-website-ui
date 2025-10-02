import React from 'react'
import Footer from '../Footer';
import '../Experiences.css'

function Experiences() {
return (
    <>
    <h2 className='page-title'>Experiences</h2>
    <div className='container'>
{/* Pool Section */}
        <section className='section'>
            <div className='title'>
                <span>Pool</span>
            </div>
            <div className='content-wrapper'>
                <div className='text-content'>
                    <h1 className='section-title'>Open Area Pool</h1>
                    <p className='description'>
                        Dive into relaxation at our beautiful open-area pool, designed to be the centerpiece of your 
                        resort experience. Our expansive pool area features crystal-clear waters perfect for swimming, 
                        playing, and cooling off under the tropical sun. With dedicated sections for both adults and 
                        children, everyone in the family can enjoy safe, supervised fun. Surrounded by lush landscaping 
                        and equipped with comfortable loungers, our pool area provides the perfect setting for sunbathing, 
                        reading, or simply unwinding. The pool is meticulously maintained daily to ensure the highest 
                        standards of cleanliness and safety. Whether you're an early morning swimmer or prefer afternoon 
                        dips, our pool is available throughout the day for your enjoyment.
                    </p>
                    <h2>75 PHP per head</h2>
                </div>
                <div className='image-content'>
                    <img 
                        src='images/pool2.jpg' 
                        alt='Spacious dining hall'
                        className='section-image'
                    />
                </div>
            </div>
        </section>

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
                </div>
            </div>

{/* Event Halls Section */}
        <div className='title'>
            <span>Event Halls</span>
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
                </div>
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
                    <h1 className='section-title'>Pavillon</h1>
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
                </div>
            </div>
    </div>
    <Footer />
    </>
);
}
export default Experiences
