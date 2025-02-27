import React, { useState, useRef } from 'react';
import './navbarcontainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import passuA from '../assets/passu1.jpg';
// Import additional images
import passuA1 from '../assets/batura3.jpg';
import passuA2 from '../assets/batura2.jpg';
import passuA3 from '../assets/batura3.jpg';
import passuA4 from '../assets/batura3.jpg';
import passuA5 from '../assets/batura2.jpg';
import passuA6 from '../assets/batura2.jpg';
import passuA7 from '../assets/passu1.jpg';
import passuA8 from '../assets/batura3.jpg';

import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const NavbarContainer = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState('passu'); // Default dropdown open
  const [hoveredItem, setHoveredItem] = useState('passu-item1'); // Default item
  const [menuOpen, setMenuOpen] = useState(false);

  const timeoutRef = useRef(null);

  const handleMouseEnter = (dropdownName) => {
    timeoutRef.current = setTimeout(() => {
      clearTimeout(timeoutRef.current);
      setIsDropdownVisible(dropdownName);
    }, 700);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(null);
      setHoveredItem(null); // Reset hovered item when leaving
    }, 700);
  };

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  const imagesMap = {
    'passu-item1': [passuA, passuA1, passuA2,passuA3,passuA4], // List of images for item1
    'passu-item2': [passuA1, passuA2,passuA5], // List of images for item2
    'batura-item1': [passuA5, passuA7,passuA8], // Replace with real images
    'batura-item2': [passuA2,passuA4,passuA6], // Replace with real images
    // Add more mappings as needed
  };

  return (
    <div className="navbar_container_main">
      <div className="navbar_container_main_slider">
        <div className="navbar_container_main_slider_flex">
          <div className="navbar_container_main_slider_flex_div1">
            <img src={logo} alt="Logo" className="navbar_container_main_slider_flex_logo" />
          </div>
 {/* Hamburger Button */}
 <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </div>
          <div className={`navbar_container_main_slider_flex_div2 ${menuOpen ? 'open' : ''}`}>
            <ul className="navbar_container_main_slider_flex_ul">
              {/* Home Link */}
              <Link to="/" className="navbar_container_main_slider_flex_link">
                <li className="navbar_container_main_slider_flex_ul_active">Home</li>
              </Link>

              {/* Passu Dropdown */}
              <li
                className="dropdown"
                onMouseEnter={() => handleMouseEnter('passu')}
                onMouseLeave={handleMouseLeave}
              >
                Passu <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                {isDropdownVisible === 'passu' && (
                  <>
                    <div
                      className="custom-dropdown"
                      onMouseEnter={() => handleMouseEnter('passu')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="custom-dropdown_main_content_slider">
                        <div className="custom-dropdown_list">
                          <ul>
                            <li onMouseEnter={() => handleItemHover('passu-item1')}>TupopDan</li>
                            <li onMouseEnter={() => handleItemHover('passu-item2')}>Avagadar</li>
                            <li onMouseEnter={() => handleItemHover('passu-item2')}>Passu Glacier Side</li>
                            <li onMouseEnter={() => handleItemHover('passu-item2')}>Khuramabad</li>
                            <li onMouseEnter={() => handleItemHover('passu-item2')}>Surnoabod</li>
                          </ul>
                        </div>
                        <div className="custom-dropdown_images">
                          {imagesMap[hoveredItem]?.map((image, index) => (
                            <div key={index} className='passu_images_container_flex'>
                              <img className='passu_img_class' src={image} alt={`Passu Image ${index + 1}`} />
                              <p>{`Passu ${index + 1}`}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="buffer-area"></div>
                  </>
                )}
              </li>

              {/* Batura Dropdown */}
              <li
                className="dropdown"
                onMouseEnter={() => handleMouseEnter('batura')}
                onMouseLeave={handleMouseLeave}
              >
                Batura <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                {isDropdownVisible === 'batura' && (
                  <>
                    <div
                      className="custom-dropdown"
                      onMouseEnter={() => handleMouseEnter('batura')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="custom-dropdown_main_content_slider">
                        <div className="custom-dropdown_list">
                          <ul>
                            <li onMouseEnter={() => handleItemHover('batura-item1')}>Yunz Valley</li>
                            <li onMouseEnter={() => handleItemHover('batura-item2')}>Yashpert Valley</li>
                            <li onMouseEnter={() => handleItemHover('batura-item2')}>Gucesem Valley</li>
                            <li onMouseEnter={() => handleItemHover('batura-item2')}>YukhGoz Valley</li>
                            <li onMouseEnter={() => handleItemHover('batura-item2')}>Kukhail Valley</li>
                          </ul>
                        </div>
                        <div className="custom-dropdown_images">
                          {imagesMap[hoveredItem]?.map((image, index) => (
                            <div key={index} className='passu_images_container_flex'>
                              <img className='batura_img_class' src={image} alt={`Batura Image ${index + 1}`} />
                              <p>{`Batura ${index + 1}`}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="buffer-area"></div>
                  </>
                )}
              </li>
              <Link to={'/aboutus'} className="navbar_container_main_slider_flex_link">
                <li>About Us</li>
              </Link>

{/* 
              <li>Blog</li> */}




              {/* Media Dropdown */}
              <li
                className="dropdown"
                onMouseEnter={() => handleMouseEnter('media')}
                onMouseLeave={handleMouseLeave}
              >
                Media <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                {isDropdownVisible === 'media' && (
                  <div
                    className="media-dropdown"
                    onMouseEnter={() => handleMouseEnter('media')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="media">
                      <div className="media-dropdown_content">
                        <ul>
                          <Link to={'/video'} className='navbar_container_contactus_style'>
                          <li onMouseEnter={() => handleItemHover('media-item1')}>Videos</li>
                          </Link>
                         
                          <Link to={'/gallery'} className='navbar_container_contactus_style'>
                         
                          <li onMouseEnter={() => handleItemHover('media-item2')}>Gallery</li>

                          </Link>
                        </ul>
                      </div>
                    </div>
                    <div className="buffer-area"></div>
                  </div>
                )}
              </li>
              <Link to={'/projects'} className='navbar_container_contactus_style'>
                <li>Projects</li>
              </Link>

              <Link to={'/terms_and_conditions'} className='navbar_container_contactus_style'>
                <li >Term & Condition</li>
              </Link>

              <Link className='navbar_container_contactus_style' to={'/contactus'}>
                <li>Contact Us</li>
              </Link>

              <Link className='navbar_container_contactus_style' to={'/admin-sigin'}>
                <li>Admin</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarContainer;
