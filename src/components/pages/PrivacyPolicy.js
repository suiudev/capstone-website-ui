import React from 'react';
import Footer from '../Footer';
import '../Experiences.css';

function PrivacyPolicy() {
  return (
    <>
      <h2 className='page-title'>Privacy Policy</h2>
      <div className='container'>
        <section className='section'>
          <div className='text-content'>
            <h1 className='section-title'>Information We Collect</h1>
            <p className='description'>
              <strong>Personal Information:</strong> When you make a booking, we collect your name, email address, phone number, 
              and payment information. This information is necessary to process your reservation and provide our services.
              <br/><br/>
              <strong>Booking Details:</strong> We store information about your bookings, including dates, room/hall preferences, 
              number of guests, and special requests.
              <br/><br/>
              <strong>Usage Data:</strong> We may collect information about how you access and use our website, including your 
              IP address, browser type, pages visited, and time spent on our site.
            </p>

            <h1 className='section-title'>How We Use Your Information</h1>
            <p className='description'>
              <strong>Service Delivery:</strong> We use your information to process bookings, send confirmations, and provide 
              customer support throughout your stay.
              <br/><br/>
              <strong>Communication:</strong> We may send you booking confirmations, updates about your reservation, and important 
              information about our resort and services.
              <br/><br/>
              <strong>Improvement:</strong> We analyze usage data to improve our website, services, and customer experience.
              <br/><br/>
              <strong>Marketing:</strong> With your consent, we may send promotional offers and newsletters. You can opt out at any time.
            </p>

            <h1 className='section-title'>Data Protection</h1>
            <p className='description'>
              <strong>Security Measures:</strong> We implement industry-standard security measures to protect your personal information 
              from unauthorized access, disclosure, or destruction.
              <br/><br/>
              <strong>Payment Security:</strong> All payment transactions are processed through secure, encrypted connections. 
              We do not store complete credit card information on our servers.
              <br/><br/>
              <strong>Data Storage:</strong> Your information is stored on secure servers with restricted access. We retain your 
              data only as long as necessary for the purposes outlined in this policy.
            </p>

            <h1 className='section-title'>Sharing Your Information</h1>
            <p className='description'>
              <strong>Third-Party Services:</strong> We may share your information with trusted third-party service providers 
              who assist us in operating our website and conducting our business (e.g., payment processors, email services).
              <br/><br/>
              <strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid 
              requests by public authorities.
              <br/><br/>
              <strong>No Selling:</strong> We do not sell, trade, or rent your personal information to third parties for marketing purposes.
            </p>

            <h1 className='section-title'>Your Rights</h1>
            <p className='description'>
              <strong>Access:</strong> You have the right to request access to the personal information we hold about you.
              <br/><br/>
              <strong>Correction:</strong> You can request corrections to any inaccurate or incomplete personal information.
              <br/><br/>
              <strong>Deletion:</strong> You may request deletion of your personal information, subject to legal and contractual obligations.
              <br/><br/>
              <strong>Opt-Out:</strong> You can opt out of receiving marketing communications at any time by clicking the unsubscribe 
              link in our emails or contacting us directly.
            </p>

            <h1 className='section-title'>Cookies</h1>
            <p className='description'>
              Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that 
              help us remember your preferences and improve site functionality. You can control cookie settings through your browser.
            </p>

            <h1 className='section-title'>Children's Privacy</h1>
            <p className='description'>
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information 
              from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h1 className='section-title'>Changes to This Policy</h1>
            <p className='description'>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. 
              We encourage you to review this policy periodically.
            </p>

            <h1 className='section-title'>Contact Us</h1>
            <p className='description'>
              If you have questions about this Privacy Policy or how we handle your personal information, please contact us through 
              our official channels.
              <br/><br/>
              <strong>Email:</strong> wsmansionresort@gmail.com<br/>
              <strong>Phone:</strong> +63 928 577 4277<br/>
              <strong>Address:</strong> Sitio Apan, Purok Fire Tree, Barangay Sicsican, Puerto Princesa City, Palawan, Philippines
              <br/><br/>
              <em>Last Updated: September 30, 2025</em>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
