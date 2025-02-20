import React from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  const phoneNumber = '3554329249'; // your phone number
  const countryCode = '92'; // country code
  const email = 'faizanquba@gmail.com'; // recipient email address

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${countryCode}${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className='navbar_slider_main'>
      <div className='navbar_slider_main_dividor'>
        <div className='navbar_slider_dividor_headings_slider'>
          <p 
            className='navbar_slider_dividor_headings_slider_paragraph' 
            onClick={handleWhatsAppClick} 
            style={{ cursor: 'pointer' }}
          >
            Phone: (+92) 3554329249
          </p>
          <p 
            className='navbar_slider_dividor_headings_slider_email' 
            onClick={handleEmailClick} 
            style={{ cursor: 'pointer' }}
          >
            faizanquba@gmail.com
          </p>
        </div>
        <div className='navbar_slider_dividor_icons_slider'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon className='navbar_slider_dividor_icons_slider_icon' icon={faFacebook} size="1x" style={{ color: 'white', fontSize: '18px' }} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon className='navbar_slider_dividor_icons_slider_icon' icon={faYoutube} size="1x" style={{ color: 'white' }} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon className='navbar_slider_dividor_icons_slider_icon' icon={faInstagram} size="1x" style={{ color: 'white' }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
