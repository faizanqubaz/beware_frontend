import './popularhunt.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PopularHunt = () => {
  const [discountData, setDiscountData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://beware-seven.vercel.app/api/v2/ibex?hunttype=populartype`);
        console.log(response.data.data);  // Check the image URLs in the response
        setDiscountData(response.data.data);
      } catch (error) {
        console.error('Error fetching discount data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % discountData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? discountData.length - 1 : prevIndex - 1
    );
  };

  // If data is not yet loaded, return a loading indicator
  if (!discountData.length) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <FontAwesomeIcon icon={faSpinner} spin fontSize={'36px'} color='#dbb127' />
      </div>
    );
  }

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
          {/* Show only 3 images */}
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
