import React from 'react';
import Footer from '../Footer';
import '../Experiences.css';

function TermsAndConditions() {
  return (
    <>
      <h2 className='page-title'>Terms and Conditions</h2>
      <div className='container'>
        <section className='section'>
          <div className='text-content'>
            <h1 className='section-title'>Booking Terms</h1>
            <p className='description'>
              <strong>1. Reservations:</strong> All bookings must be made through our official website or authorized booking channels. 
              A valid payment method is required to confirm your reservation.
              <br/><br/>
              <strong>2. Payment:</strong> Full payment is required at the time of booking. We accept major credit cards and online payment methods. 
              All prices are in Philippine Pesos (PHP) and are subject to change without prior notice.
              <br/><br/>
              <strong>3. Cancellation Policy:</strong> Cancellations made 48 hours before check-in will receive a full refund minus processing fees. 
              Cancellations within 48 hours are non-refundable. No-shows will be charged the full amount.
              <br/><br/>
              <strong>4. Check-in/Check-out:</strong> Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in or late 
              check-out may be available upon request and subject to availability and additional charges.
            </p>

            <h1 className='section-title'>Guest Responsibilities</h1>
            <p className='description'>
              <strong>5. Conduct:</strong> Guests are expected to conduct themselves in a respectful manner. WS Mansion Resort reserves 
              the right to refuse service or ask guests to leave if behavior is deemed inappropriate or disruptive.
              <br/><br/>
              <strong>6. Damage:</strong> Guests are responsible for any damage to resort property during their stay. Additional charges 
              will be applied for repairs or replacements.
              <br/><br/>
              <strong>7. Capacity:</strong> Maximum occupancy limits must be strictly observed. Additional guests beyond the stated 
              capacity are not permitted without prior arrangement and additional fees.
              <br/><br/>
              <strong>8. Smoking:</strong> WS Mansion Resort is a non-smoking facility. Smoking is only permitted in designated outdoor areas.
            </p>

            <h1 className='section-title'>Liability</h1>
            <p className='description'>
              <strong>9. Personal Belongings:</strong> WS Mansion Resort is not responsible for loss, theft, or damage to personal belongings. 
              Guests are advised to secure their valuables.
              <br/><br/>
              <strong>10. Safety:</strong> While we maintain high safety standards, guests use all facilities at their own risk. 
              Parents/guardians are responsible for supervising children at all times, especially around pool areas.
              <br/><br/>
              <strong>11. Force Majeure:</strong> WS Mansion Resort is not liable for failure to perform obligations due to circumstances 
              beyond our control, including natural disasters, government actions, or other force majeure events.
            </p>

            <h1 className='section-title'>Privacy and Data</h1>
            <p className='description'>
              <strong>12. Information Collection:</strong> We collect personal information necessary for booking and service delivery. 
              Your data is protected and used in accordance with our Privacy Policy.
              <br/><br/>
              <strong>13. Communication:</strong> By booking with us, you consent to receive booking confirmations, updates, and 
              promotional materials. You may opt out of marketing communications at any time.
            </p>

            <h1 className='section-title'>General Terms</h1>
            <p className='description'>
              <strong>14. Modifications:</strong> WS Mansion Resort reserves the right to modify these terms and conditions at any time. 
              Changes will be posted on our website and apply to all future bookings.
              <br/><br/>
              <strong>15. Governing Law:</strong> These terms are governed by the laws of the Philippines. Any disputes shall be 
              resolved in the appropriate courts of the Philippines.
              <br/><br/>
              <strong>16. Contact:</strong> For questions regarding these terms, please contact us through our official channels.
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

export default TermsAndConditions;
