import React from 'react'
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
        <img src='/images/pool4.jpg' alt='Pool' className='hero-image' />
        <h1>Welcome to WS Mansion Resort</h1>
        <p>Your Perfect Escape Awaits</p>
        <p className='hero-subtitle'>Experience luxury, comfort, and unforgettable memories</p>
    </div>
  )
}

export default HeroSection
