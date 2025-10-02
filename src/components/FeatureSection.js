import React from 'react'
import './FeatureSection.css';

function FeatureSection() {
return (
    <div className='feature-container'>
    {/* First Section */}
    <section className='feature-section'>
    <div className='content-wrapper'>
        <div className='text-content'>
        <h1 className='section-title'>Enjoy Spacious Event Halls</h1>
        <p className='description'>
            Host your most memorable celebrations in our elegant event halls. Whether you're planning 
            a wedding, birthday party, corporate event, or family reunion, our versatile spaces can 
            accommodate gatherings from intimate groups of 30 to grand celebrations of up to 150 guests. 
            Each hall features modern amenities including complimentary use of tables, chairs, and kitchen 
            facilities, plus a free grilling station for your convenience. With no corkage fees and 
            flexible booking options, we make it easy to create the perfect event. Our Rooftop Area 
            offers stunning sunset views and open-air ambiance, while the Pavilion provides a covered 
            venue suitable for any weather. Both spaces are perfect for creating unforgettable memories 
            with your loved ones.
        </p>
        </div>
        <div className='image-content'>
        <img 
            src='images/hallll.png' 
            alt='Spacious dining hall'
            className='section-image'
        />
        </div>
    </div>
    </section>

    {/* Second Section */}
    <section className='magazine-section reverse'>
    <div className='content-wrapper'>
        <div className='image-content'>
        <img 
            src='images/cccc.png' 
            alt='Tranquil pool area'
            className='section-image'
        />
        </div>
        <div className='text-content'>
        <h1 className='section-title'>Dive into Tranquility</h1>
        <p className='description'>
            Escape to paradise in our pristine open-area pool, where crystal-clear waters and lush 
            surroundings create the perfect tropical retreat. Our spacious pool area features both 
            adult and children's sections, ensuring fun and safety for the whole family. Relax on 
            comfortable loungers under swaying palms, or take a refreshing dip to beat the heat. 
            At just ₱75 per person, enjoy unlimited access to our pool facilities throughout your stay. 
            Whether you're swimming laps, playing with the kids, or simply floating under the sun, 
            our pool area offers a serene escape from everyday life. Complimentary pool access is 
            included for all room guests, making it easy to cool off anytime during your visit. 
            Perfect for families, couples, and groups looking to unwind in a beautiful outdoor setting.
        </p>
        </div>
    </div>
    </section>
</div>
);
}
export default FeatureSection
