import React from 'react'
import '../Gallery.css';
import Footer from '../Footer';

function Gallery() {
return (
    <>
    <h2 className='page-title'>Gallery</h2>
    <div className='gallery-container'>
    {/* First Section */}
    <section className='gallery-section'>
    <div className='content-wrapper'>
        <div className='gallery-text-content'>
        <h1 className='gallery-section-title'>Enjoy the Majestic and Clean Pool Area</h1>
        <p className='gallery-description'>
            Immerse yourself in the beauty of our resort's crown jewel - a sparkling pool area designed for 
            relaxation and fun. Our meticulously maintained pool features separate sections for adults and children, 
            surrounded by lush tropical landscaping and comfortable lounging areas. Whether you're taking a morning 
            swim, enjoying a lazy afternoon float, or watching the sunset from the water, our pool provides the 
            perfect backdrop for your vacation memories. With crystal-clear water, ample deck space, and shaded 
            areas for rest, it's the ideal spot to spend your day.
        </p>
        </div>
        <div className='gallery-image-content'>
        <img 
            src='images/pool4.jpg' 
            alt='Tranquil pool area'
            className='gallery-section-image'
        />
        <img 
            src='images/kids_pool.jpg' 
            alt='Tranquil pool area'
            className='gallery-section-image'
        />
        </div>
    </div>
    </section>

    {/* Second Section */}
    <section className='gallery-section reverse'>
    <div className='content-wrapper'>
        <div className='gallery-image-content'>
        <img 
            src='images/hallll.png' 
            alt='Spacious dining hall'
            className='gallery-section-image'
        />
        <img 
            src='images/event hall.jpg' 
            alt='Tranquil pool area'
            className='gallery-section-image'
        />
        </div>
        <div className='gallery-text-content'>
        <h1 className='gallery-section-title'>Event Halls</h1>
        <p className='gallery-description'>
            Transform your special occasions into unforgettable celebrations in our elegant event halls. From 
            intimate gatherings to grand celebrations, our versatile spaces adapt to your vision. The Rooftop Area 
            offers breathtaking open-air ambiance perfect for sunset celebrations, while the Pavilion provides a 
            covered venue ideal for any weather. Both halls come fully equipped with tables, chairs, kitchen access, 
            and grilling stations - everything you need to host the perfect event. With flexible layouts and 
            professional service, we make event planning effortless.
        </p>
        </div>
    </div>
    </section>

    {/* Third Section */}
    <section className='gallery-section'>
    <div className='content-wrapper'>
                <div className='gallery-text-content'>
        <h1 className='gallery-section-title'>Rooms</h1>
        <p className='gallery-description'>
            Discover comfort and style in our thoughtfully designed accommodations. Each room type - from the 
            spacious La Familia perfect for families, to the cozy Tres Ramu for small groups, and the romantic 
            Amor De Pareja for couples - features modern amenities including air conditioning, private bathrooms, 
            flat-screen TVs, and complimentary Wi-Fi. Wake up to garden or poolside views, enjoy your private 
            space, and experience the perfect blend of comfort and convenience. All rooms include free pool access, 
            making your stay even more enjoyable.
        </p>
        </div>
        <div className='gallery-image-content'>
        <img 
            src='images/lafam.jpg' 
            alt='Tranquil pool area'
            className='gallery-section-image'
        />
        <img 
            src='images/Couple.jpg' 
            alt='Tranquil pool area'
            className='gallery-section-image'
        />
        </div>

    </div>
    </section>
</div>
<Footer/>
</>
);

}
export default Gallery
