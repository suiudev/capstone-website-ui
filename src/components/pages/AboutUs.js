import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import Footer from '../Footer';

export default function AboutUs() {
    return (
    <>
    <div className='about-us-container'>
    <section className='feature-section'>
        <div className='text-content'>
        <h1 className='about-us-section-title'>About Us</h1>
        <p className='description'>
            Welcome to WS Mansion Resort, your premier destination for unforgettable getaways and celebrations. 
            Nestled in a serene location, our resort combines modern comfort with warm Filipino hospitality to 
            create the perfect escape from the everyday hustle. Whether you're planning a romantic weekend, a 
            family vacation, or a grand celebration, we offer a range of accommodations and facilities designed 
            to exceed your expectations.
            <br/><br/>
            Our resort features three beautifully appointed room types - La Familia, Tres Ramu, and Amor De Pareja - 
            each thoughtfully designed to provide maximum comfort and relaxation. All rooms come with complimentary 
            pool access, air conditioning, Wi-Fi, and modern amenities to make your stay as comfortable as possible.
            <br/><br/>
            For special events, our versatile event halls can accommodate gatherings from 30 to 150 guests, complete 
            with kitchen facilities, grilling stations, and no corkage fees. Our stunning pool area, available at 
            just ₱75 per person, offers a refreshing retreat for guests of all ages.
            <br/><br/>
            At WS Mansion Resort, we're committed to making every moment of your stay memorable. Book with us today 
            and discover why families, couples, and groups choose us for their most important celebrations and getaways.
        </p>
        </div>
        <div className='image-content'>
        <img 
            src='images/hallll.png' 
            alt='Spacious dining hall'
            className='about-us-section-image'
        />
        </div>
    </section>
    </div>

    <Cards />
    <Footer />
    </>
    );
}