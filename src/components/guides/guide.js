import React, { useEffect, useRef } from "react";
import "./guide.css";
import video1 from '../assets/batura2.jpg'
import { useMediaQuery } from "react-responsive";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faAnglesRight, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import "swiper/css";
import "swiper/css/pagination";

const guides = [
  {
    name: "Inayat Nazar",
    location: "Newfoundland and Labrador, Canada",
    rating: 9.7,
    reviews: 1,
    description:
      "Hunting Newfoundland for Trophy Moose, Black Bear and Woodland Caribou, is the hunting experience of a lifetime.",
    image: video1,
  },
  {
    name: "Hassan Faqir",
    location: "Newfoundland and Labrador, Canada",
    rating: 9.7,
    reviews: 1,
    description:
      "Hunting Newfoundland for Trophy Moose, Black Bear and Woodland Caribou, is the hunting experience of a lifetime.",
    image: video1,
  },
  {
    name: "Naseer Uddin",
    location: "Newfoundland and Labrador, Canada",
    rating: 9.7,
    reviews: 1,
    description:
      "Hunting Newfoundland for Trophy Moose, Black Bear and Woodland Caribou, is the hunting experience of a lifetime.",
    image: video1,
  },
  {
    name: "Rahmat Karim",
    location: "Cameroon",
    rating: 9.8,
    reviews: 2,
    description:
      "Let us introduce you to two kinds of truly African hunts: forest and savannah. Since 1997, we have been offering outstanding hunts in four safari camps in Cameroon.",
    image: video1,
  },
  {
    name: "Hassan Faqir",
    location: "Alaska, United States",
    rating: 9.8,
    reviews: 4,
    description:
      "With over 40 years of guiding experience in Southeast Alaska and Glacier Bay National Park, we are an exceptional choice for your next hunting adventure.",
    image: video1,
  },
];

const GuideComponent = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="guide-container">
      <div className="guide-title_head">
      <h2 className="guide-title">
        <strong>Meet your</strong> guides »
      </h2>
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={isMobile ? 1 : 3}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="guide-list"
      >
        {guides.map((guide, index) => (
          <SwiperSlide key={index} className="guide-card">
            <div className="guide-image">
              <img src={guide.image} alt={guide.name} />
              <div className="play-button">▶</div>
            </div>
            <div className="lodge-card">
      <div className="lodge-image">
        {/* Replace with your image source */}
        <img src={video1} alt="Deep Country Lodge" />
        <div>
        <h2 className="lodge-name">Hassan Faqir</h2>
        <p className="lodge-location">Newfoundland and Labrador, Canada</p>
        <div className="lodge-rating">
          <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
          <span className="rating-value">9.7</span>
          <span className="review-count">1 review</span>
        </div>
        </div>
      </div>
      <div className="lodge-info">  
        <p className="lodge-description">
          Hunting Newfoundland for Trophy Moose, Black Bear and Woodland Caribou, is the hunting
          experience of a lifetime. Built by some of Newfoundland's greatest hunting and outdoor...
        </p>
        <button className="view-outfitter-btn">View the outfitter page</button>
      </div>
    </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GuideComponent;
