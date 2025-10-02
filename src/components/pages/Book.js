import React from 'react'
import Footer from '../Footer'
import '../Book.css'
import { useNavigate } from 'react-router-dom';

function Book() {
    const navigate = useNavigate();

  const handleRoomClick = () => {
    console.log('Room button clicked'); // Room Booking
    navigate('/book-rooms');
  };
  
  const handleEventClick = () => {
    console.log('Event button clicked'); // Event hall Booking
    navigate('/book-event-hall');
  };
  return (
    <>
      <div className='book-container'>
        <img src='/images/pool4.jpg' alt='Pool' className='book-image' />
        <h1> What would you like to book?</h1>
            <div className='book-options'>
              <button 
                  className='btn btn--primary book-button'
                  onClick={handleRoomClick}
                >
                  Room
                </button>
                <button 
                  className='btn btn--primary book-button'
                  onClick={handleEventClick}
                >
                  Event Hall
                </button>
            </div>
    </div>

    <Footer />
    </>
  )
}

export default Book
