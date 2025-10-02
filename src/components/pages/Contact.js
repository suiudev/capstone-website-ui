import React from 'react';
import Footer from '../Footer';
import '../Experiences.css';
import './Contact.css';

function Contact() {
  return (
    <>
      <h2 className='page-title'>Contact Us</h2>
      
      {/* Map Section - Same as Home Page */}
      <div className='map-section-home'>
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
      </div>

      <div className='container'>
        
        {/* Contact Information Section */}
        <section className='section'>
          <div className='contact-grid'>
            <div className='contact-info-card'>
              <div className='contact-icon'>
                <i className='fas fa-phone-alt'></i>
              </div>
              <h3>Phone</h3>
              <p><a href='tel:+639285774277'>+63 928 577 4277</a></p>
              <p className='contact-note'>Available 24/7 for reservations and inquiries</p>
            </div>

            <div className='contact-info-card'>
              <div className='contact-icon'>
                <i className='fas fa-envelope'></i>
              </div>
              <h3>Email</h3>
              <p><a href='mailto:wsmansionresort@gmail.com'>wsmansionresort@gmail.com</a></p>
              <p className='contact-note'>We'll respond within 24 hours</p>
            </div>

            <div className='contact-info-card'>
              <div className='contact-icon'>
                <i className='fas fa-map-marker-alt'></i>
              </div>
              <h3>Location</h3>
              <p>Sitio Apan, Purok Fire Tree</p>
              <p>Barangay Sicsican</p>
              <p>Puerto Princesa, Palawan</p>
              <p>Philippines</p>
            </div>
          </div>
        </section>

        {/* Directions Section */}
        <section className='section'>
          <div className='text-content'>
            <div className='directions-info'>
              <h2>Getting Here</h2>
              <p className='description'>
                <strong>From Puerto Princesa City Center:</strong><br/>
                Take the North Road and follow signs to Barangay Sicsican. 
                Our resort is approximately 30 minutes from the city center.
                <br/><br/>
                <strong>From Puerto Princesa International Airport:</strong><br/>
                Approximately 45 minutes by car. Taxi and shuttle services are available.
                <br/><br/>
                <strong>Landmarks:</strong><br/>
                Located near Purok Fire Tree, Sitio Apan area. Look for our signage along the main road.
              </p>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className='section'>
          <div className='text-content'>
            <h1 className='section-title'>Business Hours</h1>
            <div className='hours-grid'>
              <div className='hours-item'>
                <h3>Resort Operating Hours</h3>
                <p>10:00 AM - 9:00 PM</p>
                <p className='contact-note'>Daily</p>
              </div>
              <div className='hours-item'>
                <h3>Front Desk</h3>
                <p>24 Hours / 7 Days a Week</p>
              </div>
              <div className='hours-item'>
                <h3>Check-in</h3>
                <p>2:00 PM onwards</p>
              </div>
              <div className='hours-item'>
                <h3>Check-out</h3>
                <p>12:00 PM (Noon)</p>
              </div>
              <div className='hours-item'>
                <h3>Pool Access</h3>
                <p>10:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className='section'>
          <div className='text-content'>
            <h1 className='section-title'>Send Us a Message</h1>
            <p className='description'>
              Have questions about our facilities, rates, or availability? Fill out the form below 
              and we'll get back to you as soon as possible.
            </p>
            
            <form className='contact-form'>
              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='name'>Name *</label>
                  <input type='text' id='name' name='name' required />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email *</label>
                  <input type='email' id='email' name='email' required />
                </div>
              </div>
              
              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='phone'>Phone</label>
                  <input type='tel' id='phone' name='phone' />
                </div>
                <div className='form-group'>
                  <label htmlFor='subject'>Subject *</label>
                  <input type='text' id='subject' name='subject' required />
                </div>
              </div>
              
              <div className='form-group'>
                <label htmlFor='message'>Message *</label>
                <textarea id='message' name='message' rows='6' required></textarea>
              </div>
              
              <button type='submit' className='submit-btn'>Send Message</button>
            </form>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}

export default Contact;
