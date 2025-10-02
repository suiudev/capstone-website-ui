import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import FeatureSection from './components/FeatureSection';
import AboutUs from './components/pages/AboutUs';
import Experiences from './components/pages/Experiences';
import Gallery from './components/pages/Gallery';
import Book from './components/pages/Book';
import BookRooms from './components/pages/BookRooms';
import BookingForm from './components/pages/BookingForm';
import BookEventHall from './components/pages/BookEventHall';
import BookingSuccess from './components/pages/BookingSuccess';
import MockInvoice from './components/pages/MockInvoice';
import TermsAndConditions from './components/pages/TermsAndConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';
import FloatingBookButton from './components/FloatingBookButton';
import ScrollToTop from './components/ScrollToTop';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <FloatingBookButton />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<FeatureSection />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/experiences' element={<Experiences />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/book' element={<Book />} />
        <Route path='/book-rooms' element={<BookRooms />} />
        <Route path='/room-booking-process' element={<BookingForm />} />
  <Route path='/booking-success' element={<BookingSuccess />} />
        <Route path='/book-event-hall' element={<BookEventHall />} />
        <Route path='/mock-invoice/:invoiceId' element={<MockInvoice />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
