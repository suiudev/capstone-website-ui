import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './navbar.css';



function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
        setButton(false);
        } else {
        setButton(true);
        }
    };

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
    showButton();
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    window.addEventListener('resize', showButton);

return (
<>
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
    <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <span className="logo-full">WS Mansion Resort</span>
        <span className="logo-short">WS Mansion</span>
        {/* <a href="/">
        <img src="/images/small_logo.png" alt="Logo" className="logo" />
        </a> */}
        </Link>
        <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
            <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>
            About Us
            </Link>
        </li>
        <li className='nav-item'><Link to='/experiences'className='nav-links'onClick={closeMobileMenu}>
            Experiences
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/gallery' className='nav-links' onClick={closeMobileMenu}>
            Gallery
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
            Contact
            </Link>
        </li>
        <li>
            <Link to='/book'className='nav-links-mobile' onClick={closeMobileMenu}>
            BOOK NOW
            </Link>
        </li>
        </ul>
        <Link to='/book'>
        <Button buttonStyle='btn--outline'>BOOK NOW</Button>
        </Link>
    </div>
    </nav>
</>
);
}

export default Navbar;