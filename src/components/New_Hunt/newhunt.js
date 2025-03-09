import './newhunt.css';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import batura from '../../components/assets/batura2.jpg';
import batura1 from '../../components/assets/batura3.jpg';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg';

const NewHunt = () => {
  // Mock data for the hunts
  const [discountData, setDiscountData] = useState([
    {
      id: 1,
      _id: '1',
      ibexphotos: [{ cloudinary_url: batura }],
      description: 'Passu Ibex Hunt',
      newPrice: 1500,
      priceOld: 2000,
      huntdate: '2023-12-15',
    },
    {
      id: 2,
      _id: '2',
      ibexphotos: [{ cloudinary_url: batura1 }],
      description: 'Batura Ibex Hunt',
      newPrice: 1700,
      priceOld: 2200,
      huntdate: '2023-12-20',
    },
    {
      id: 3,
      _id: '3',
      ibexphotos: [{ cloudinary_url: batura2 }],
      description: 'Himalayan Ibex Hunt',
      newPrice: 1800,
      priceOld: 2500,
      huntdate: '2023-12-25',
    },
    {
      id: 4,
      _id: '4',
      ibexphotos: [{ cloudinary_url: batura3 }],
      description: 'Yunz Ibex Hunt',
      newPrice: 1600,
      priceOld: 2100,
      huntdate: '2023-12-30',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % discountData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? discountData.length - 1 : prevIndex - 1
    );
  };

  // Calculate the number of items to display based on screen size
  const isMobile = window.innerWidth <= 480; // Check if the screen is mobile
  const itemsToShow = isMobile ? 1 : 3; // Show 1 card on mobile, 3 on larger screens
  const visibleImages = [];

  for (let i = 0; i < itemsToShow; i++) {
    visibleImages.push(discountData[(currentIndex + i) % discountData.length]);
  }

  return (
    <div className="newhunt_main_container">
      <div className='newhunt_main_container_slider'>
        <div className='newhunt_main_container_slider_head'>
          <div className='newhunt_main_container_slider_flex'>
            <h2 className='newhunt_main_container_slider_heading'>New hunts</h2>
            <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px' }} icon={faAnglesRight} fontSize={'20px'} />
          </div>
          <p className='newhunt_main_container_slider_para_head'>All New Hunts</p>
        </div>

        <div className="newhunt_main__arrow_left" onClick={handlePrev}>
          <FontAwesomeIcon icon={faAnglesLeft} fontSize={'36px'} />
        </div>

        <div className='newhunt_main__image_container'>
          {visibleImages.map((item) => (
            <Link
              key={item.id}
              to={`/newhunt/${item._id}`}
              state={{ item }}
              className='newhunt_main__image_container_one'
              style={{
                transform: isMobile ? `translateX(-${currentIndex * 100}%)` : 'none', // Slide effect for mobile
              }}
            >
              <img
                className='newhunt_main__image_container_one_image'
                src={item.ibexphotos[0].cloudinary_url}
                alt={item.description}
              />
              <p className='newhunt_main__image_container_one_image_paragraph'>{item.description}</p>
              <div className='newhunt_main__image_container_one_head'>
                <p style={{ color: '#dbb127' }}>price from</p>
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <p style={{ color: '#dbb127' }}>(3.6)</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '71%', color: 'white' }}>
                <div className='discount_main__image_container_two_head'>
                  <p style={{ fontSize: '25px' }}>{'$' + item.newPrice}</p>
                  <p style={{ textDecoration: 'line-through' }}>{'$' + item.priceOld}</p>
                </div>
                <p style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                  {new Date(item.huntdate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className='newhunt_main__arrow_right_hr'>
          <hr />
        </div>

        <div className="newhunt_main__arrow_right" onClick={handleNext}>
          <FontAwesomeIcon icon={faAnglesRight} fontSize={'36px'} />
        </div>
      </div>
    </div>
  );
};

export default NewHunt;