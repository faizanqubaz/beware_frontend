import './discount.css';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import batura from '../../components/assets/batura2.jpg';
import batura1 from '../../components/assets/batura3.jpg';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg';

const Discount = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  // Mock data for the discounts
  const [discountData, setDiscountData] = useState([
    {
      id: 1,
      _id: '1',
      ibexphotos: [{ cloudinary_url: batura }],
      description: 'Passu Ibex Hunt - Special Offer',
      newPrice: 1500,
      priceOld: 2000,
    },
    {
      id: 2,
      _id: '2',
      ibexphotos: [{ cloudinary_url: batura1 }],
      description: 'Batura Ibex Hunt - Limited Time',
      newPrice: 1700,
      priceOld: 2200,
    },
    {
      id: 3,
      _id: '3',
      ibexphotos: [{ cloudinary_url: batura2 }],
      description: 'Himalayan Ibex Hunt - Exclusive Deal',
      newPrice: 1800,
      priceOld: 2500,
    },
    {
      id: 4,
      _id: '4',
      ibexphotos: [{ cloudinary_url: batura3 }],
      description: 'Yunz Ibex Hunt - Early Bird Offer',
      newPrice: 1600,
      priceOld: 2100,
    },
  ]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % discountData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? discountData.length - 1 : prevIndex - 1
    );
  };

  const handleSignInAndRedirect = async (item) => {
    setIsSigningIn(true);
    try {
      console.log('item', item);
      // Simulate a sign-in process (replace with actual logic if needed)
      navigate(`/discount/${item._id}`, { state: { item } });
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('An error occurred during sign-in. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  // Determine the number of items to display based on screen size
  const isMobile = window.innerWidth <= 600; // Check if the screen is mobile
  const itemsToShow = isMobile ? 1 : 3; // Show 1 card on mobile, 3 on larger screens
  const visibleImages = [];

  for (let i = 0; i < itemsToShow; i++) {
    visibleImages.push(discountData[(currentIndex + i) % discountData.length]);
  }

  return (
    <div className="discount_main_container">
      <div className='discount_main_container_slider'>
        <div className='discount_main_container_slider_head'>
          <div className='discount_main_container_slider_flex'>
            <h2 className='discount_main_container_slider_heading'>Top Offers</h2>
            <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px' }} icon={faAnglesRight} fontSize={'20px'} />
          </div>
          <p className='discount_main_container_slider_para_head'>All Offers tips</p>
        </div>

        <div className="discount_main__arrow_left" onClick={handlePrev}>
          <FontAwesomeIcon icon={faAnglesLeft} fontSize={'36px'} />
        </div>

        <div className='discount_main__image_container'>
          {visibleImages.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSignInAndRedirect(item)}
              className='discount_main__image_container_one'
              style={{
                transform: isMobile ? `translateX(-${currentIndex * 100}%)` : 'none', // Slide effect for mobile
              }}
            >
              {/* Check if ibexphotos exists and has at least one element */}
              {item.ibexphotos && item.ibexphotos.length > 0 && (
                <img
                  className='discount_main__image_container_one_image'
                  src={item.ibexphotos[0].cloudinary_url}
                  alt={item.description}
                />
              )}
              <p className='discount_main__image_container_one_image_paragraph'>{item.description}</p>
              <div className='discount_main__image_container_one_head'>
                <p className='discount_main__image_container_one_image_paragraph_main_para'>package price</p>
                <div className='discount_main__image_container_one_image_paragraph_main_para_fsome'>
                  <FontAwesomeIcon icon={faStar} color='#dbb127' />
                  <FontAwesomeIcon icon={faStar} color='#dbb127' />
                  <FontAwesomeIcon icon={faStar} color='#dbb127' />
                  <FontAwesomeIcon icon={faStar} color='#dbb127' />
                  <FontAwesomeIcon icon={faStar} color='#dbb127' />
                  <p style={{ color: '#dbb127' }}>(3.6)</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '71%', color: 'white' }}>
                <div className='discount_main__image_container_two_head'>
                  <p style={{ fontSize: '25px' }}>{'$' + item.newPrice}</p>
                  <p style={{ textDecoration: 'line-through' }}>{'$' + item.priceOld}</p>
                </div>
                <p style={{ fontSize: '14px', textTransform: 'capitalize' }}>between 1 - 31 march 2024</p>
              </div>
            </div>
          ))}
        </div>

        <div className='discount_main__arrow_right_hr'>
          <hr className='discount_main__arrow_right_hr_in_common' />
        </div>

        <div className="discount_main__arrow_right" onClick={handleNext}>
          <FontAwesomeIcon icon={faAnglesRight} fontSize={'36px'} />
        </div>
      </div>
    </div>
  );
};

export default Discount;