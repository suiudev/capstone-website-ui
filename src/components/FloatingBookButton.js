import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FloatingBookButton.css';

function FloatingBookButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate('/book');
  };

  // Hide button on /book-rooms URL
  if (location.pathname === '/book-rooms') {
    return null;
  }

  return (
    <button className='floating-book-button' onClick={handleClick} aria-label='Book Now'>
      <i className='fas fa-calendar-check'></i>
      <span>Book Now</span>
    </button>
  );
}

export default FloatingBookButton;
