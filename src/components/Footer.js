
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='map-container'>
        <section className='map-section-home'>
          <div className='map-content'>
            <h2 className='map-title'>Visit Us</h2>
            <p className='map-description'>
              Find us at Sitio Apan, Purok Fire Tree, Barangay Sicsican, Puerto Princesa, Palawan
            </p>
            <div className='map-container-home'>
              <iframe
                title="WS Mansion Resort Location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3923.7856!2d118.71509534915621!3d9.779469158948604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNDYnNDYuMSJOIDExOMKwNDInNTQuMyJF!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className='map-location-code'>Location Code: QPH8+Q3F, Puerto Princesa City, Palawan</p>
          </div>
        </section>
      </div>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Adventure newsletter to receive our best vacation deals
        </p>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/about-us'>About WS Mansion</Link>
            <Link to='/experiences'>Our Facilities</Link>
            <Link to='/gallery'>Gallery</Link>
            <Link to='/terms-and-conditions'>Terms & Conditions</Link>
            <Link to='/privacy-policy'>Privacy Policy</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <a href='tel:+639285774277'>Phone: +63 928 577 4277</a>
            <a href='mailto:wsmansionresort@gmail.com'>Email: wsmansionresort@gmail.com</a>
            <p style={{margin: '8px 0', fontSize: '14px', lineHeight: '1.6'}}>
              Location: Sitio Apan, Purok Fire Tree, Brgy. Sicsican, Puerto Princesa, Palawan
            </p>
            <p style={{margin: '8px 0', fontSize: '14px', lineHeight: '1.6'}}>
              <strong>Operating Hours:</strong> 10:00 AM - 9:00 PM Daily
            </p>
            <Link to='/contact'>View Map</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <a href='https://www.facebook.com/p/WS-Mansion-Resort-61566584889877/' target='_blank' rel='noopener noreferrer'>Facebook</a>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              WS
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>© 2025 WS Mansion Resort. All rights reserved.</small>
          <div class='social-icons'>
            <a
              class='social-icon-link facebook'   
              href='https://www.facebook.com/p/WS-Mansion-Resort-61566584889877/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
