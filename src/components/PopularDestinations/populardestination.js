import './populardestination.css';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import batura from '../../components/assets/batura2.jpg';
import batura1 from '../../components/assets/batura3.jpg';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg'; 
import batura4 from '../../components/assets/focus.jpg'; 

const PopularDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for the popular hunts
  const [discountData, setDiscountData] = useState([
    {
      id: 1,
      _id: '1',
      ibexphotos: [{ cloudinary_url: batura }],
      name: 'Batura',
      location: {
        lat: 36.5115,
        lng: 74.5716,
      },
    },
    {
      id: 2,
      _id: '2',
      ibexphotos: [{ cloudinary_url: batura2 }],
      name: 'Passu',
      location: {
        lat: 36.5115,
        lng: 74.5716,
      },
    },
    {
      id: 3,
      _id: '3',
      ibexphotos: [{ cloudinary_url: batura3 }],
      name: 'Yunz',
      location: {
        lat: 36.5115,
        lng: 74.5716,
      },
    },
    {
      id: 4,
      _id: '4',
      ibexphotos: [{ cloudinary_url: batura4 }],
      name: 'Avadagar',
      location: {
        lat: 36.5115,
        lng: 74.5716,
      },
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
    <div className="populardestination_main_container">
      <div className='populardestination_main_container_slider'>
        <div className='populardestination_main_container_slider_head'>
          <div className='populardestination_main_container_slider_flex'>
            <h2 className='populardestination_main_container_slider_heading'>Popular Destinations</h2>
            <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px', marginTop: '20px' }} icon={faAnglesRight} fontSize={'20px'} />
          </div>
          <p className='populardestination_main_container_slider_para_head'></p>
        </div>

        <div className="populardestination_main__arrow_left" onClick={handlePrev}>
          <FontAwesomeIcon icon={faAnglesLeft} fontSize={'36px'} />
        </div>

        <div className='populardestination_main__image_container'>
          {visibleImages.map((item) => (
            console.log(item),
            <Link
              key={item.id}
              to={`/populardestinationdetail/${item._id}`}
              state={{ item }}
              className='populardestination_main__image_container_one'
            >
              <div className="populardestination_main__image_wrapper">
                <img
                  className='populardestination_main__image_container_one_image'
                  src={item.ibexphotos[0].cloudinary_url}
                  alt={item.description}
                />
                <div className="populardestination_main__image_overlay">
                  <h3 className="populardestination_main__image_overlay_text">{item.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='populardestination_main__arrow_right_hr'>
          <hr className='populardestination_main__arrow_right_hr_common' />
        </div>

        <div className="populardestination_main__arrow_right" onClick={handleNext}>
          <FontAwesomeIcon icon={faAnglesRight} fontSize={'36px'} />
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;