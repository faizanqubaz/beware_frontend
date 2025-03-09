import './popularhunt.css';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import batura from '../../components/assets/batura2.jpg';
import batura1 from '../../components/assets/batura3.jpg';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg'; 
import batura4 from '../../components/assets/focus.jpg'; 

const PopularHunt = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for the popular hunts
  const [discountData, setDiscountData] = useState([
    {
      id: 1,
      _id: '1',
      ibexphotos: [{ cloudinary_url: batura }],
      description: 'Passu Ibex Hunt - Popular Choice',
      newPrice: 1500,
      priceOld: 2000,
      huntdate: '2023-12-15',
    },
    {
      id: 2,
      _id: '2',
      ibexphotos: [{ cloudinary_url: batura2 }],
      description: 'Batura Ibex Hunt - Best Seller',
      newPrice: 1700,
      priceOld: 2200,
      huntdate: '2023-12-20',
    },
    {
      id: 3,
      _id: '3',
      ibexphotos: [{ cloudinary_url: batura3 }],
      description: 'Himalayan Ibex Hunt - Top Rated',
      newPrice: 1800,
      priceOld: 2500,
      huntdate: '2023-12-25',
    },
    {
      id: 4,
      _id: '4',
      ibexphotos: [{ cloudinary_url: batura4 }],
      description: 'Yunz Ibex Hunt - Highly Recommended',
      newPrice: 1600,
      priceOld: 2100,
      huntdate: '2023-12-30',
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

  // Calculate the number of items to display (up to 3)
  const totalItems = discountData.length;
  const itemsToShow = Math.min(3, totalItems);
  const visibleImages = [];

  for (let i = 0; i < itemsToShow; i++) {
    visibleImages.push(discountData[(currentIndex + i) % totalItems]);
  }

  return (
    <div className="popularhunt_main_container">
      <div className='popular_main_container_slider'>
        <div className='popular_main_container_slider_head'>
          <div className='popular_main_container_slider_flex'>
            <h2 className='popular_main_container_slider_heading'>Popular hunts</h2>
            <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px' }} icon={faAnglesRight} fontSize={'20px'} />
          </div>
          <p className='popular_main_container_slider_para_head'>All Offers</p>
        </div>

        <div className="popular_main__arrow_left" onClick={handlePrev}>
          <FontAwesomeIcon icon={faAnglesLeft} fontSize={'36px'} />
        </div>

        <div className='popular_main__image_container'>
          {visibleImages.map((item) => (
            <Link
              key={item.id}
              to={`/popularhunt/${item._id}`}
              state={{ item }}
              className='popular_main__image_container_one'
            >
              <img
                className='popular_main__image_container_one_image'
                src={item.ibexphotos[0].cloudinary_url}
                alt={item.description}
              />
              <p className='popular_main__image_container_one_image_paragraph'>{item.description}</p>
              <div className='popular_main__image_container_one_head'>
                <p style={{ color: '#dbb127', fontSize: '12px' }}>package price</p>
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <FontAwesomeIcon icon={faStar} color='#dbb127' />
                <p style={{ color: '#dbb127' }}>({4.5})</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '71%', color: 'white' }}>
                <div className='discount_main__image_container_two_head'>
                  <p style={{ fontSize: '25px' }}>{'$' + item.newPrice}</p>
                  <p style={{ textDecoration: 'line-through' }}>{'$' + item.priceOld}</p>
                </div>
                <p style={{ fontSize: '14px', textTransform: 'capitalize' }}>{new Date(item.huntdate).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className='popular_main__arrow_right_hr'>
          <hr className='popular_main__arrow_right_hr_common' />
        </div>

        <div className="popular_main__arrow_right" onClick={handleNext}>
          <FontAwesomeIcon icon={faAnglesRight} fontSize={'36px'} />
        </div>
      </div>
    </div>
  );
};

export default PopularHunt;