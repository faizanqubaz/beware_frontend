import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './review.css';

const reviews = [
  {
    id: 1,
    title: "Good hunting experience",
    owner: "Yvon",
    date: "25 May 2018",
    details: [
      "Their passion shows in everything they do. Accommodations were first class, food was fantastic, and the best part the Bears were huge. We saw multiple bears every day we were there. These guys are a first class operation",
      "Good value for money",
      "Useful"
    ],
    country: "United States",
    verified: true
  },
  {
    id: 2,
    title: "Will Hunt with again!",
    owner: "Daniel",
    date: "13 Dec 2021",
    details: [
      "Find rate all around. Very personal and professional.",
      "Hunt of a lifetime and Grateful to Daniel and Ashley for making it possible.",
      "Planning a return trip!"
    ],
    rating: "10"
  },
  {
    id: 3,
    title: "fuck you!",
    owner: "Daniel",
    date: "13 Dec 2021",
    details: [
      "Find rate all around. Very personal and professional.",
      "Hunt of a lifetime and Grateful to Daniel and Ashley for making it possible.",
      "Planning a return trip!"
    ],
    rating: "100 of 10"
  },
  // Add more reviews as needed
];

function DestinationReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + (window.innerWidth <= 768 ? 1 : 2)) % reviews.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - (window.innerWidth <= 768 ? 1 : 2) + reviews.length) % reviews.length);
  };

  const visibleReviews = window.innerWidth <= 768
    ? [reviews[currentIndex]]
    : reviews.slice(currentIndex, currentIndex + 2);

  return (
    <div className="review_destination_main">
      <h1 className='review_destination_main_heading'>Reviews</h1>
      <div className="reviews-container">
        <button className="review_destination_nav-button left" onClick={handlePrevious}>&lt;</button>
        {visibleReviews.map((review) => (
          <div key={review.id} className={`review_container ${window.innerWidth <= 768 ? 'active' : ''}`}>
            <div className='review_container_left_side'>
              <FontAwesomeIcon icon={faUserCircle} className='review_container_left_side_icon' />
              <h2 className='review_container_left_side_name'>{review.owner}</h2>
              <p className='review_container_left_side_para'>{review.country}</p>
            </div>
            <div className="reviews_container_right_side">
              <h2 className='review_container_description'>{review.title}</h2>
              <p className='review_container_description_para'>Outfitter: <strong>{review.owner}</strong></p>
              <button className="rating-button">{review.rating || '10.0'}</button> <span>of 10</span>
              <ul className='review_container_description_para_ul'>
                {review.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <button className="review_destination_nav-button right" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
}

export default DestinationReviews;