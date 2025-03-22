import React, { useEffect, useRef } from "react";
import "./guide.css";
import video1 from '../assets/batura2.jpg';
import video2 from '../assets/passuv1.mp4';
import video3 from '../assets/video12.mp4';
import { useMediaQuery } from "react-responsive";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
    image: video3,
  },
  {
    name: "Hassan Faqir",
    location: "Newfoundland and Labrador, Canada",
    rating: 9.7,
    reviews: 1,
    description:
      "Hunting Newfoundland for Trophy Moose, Black Bear and Woodland Caribou, is the hunting experience of a lifetime.",
    image: video3,
  },
  {
    name: "Naseer Uddin",
    location: "Newfoundland and Labrador, Canada",
    rating: 9.7,
    reviews: 1,
    description:
      "Hunting Newfoundland for Trophy Moose, Black Bear and Woodland Caribou, is the hunting experience of a lifetime.",
    image: video2,
  },
  {
    name: "Rahmat Karim",
    location: "Cameroon",
    rating: 9.8,
    reviews: 2,
    description:
      "Let us introduce you to two kinds of truly African hunts: forest and savannah. Since 1997, we have been offering outstanding hunts in four safari camps in Cameroon.",
    image: video2,
  },
  {
    name: "Hassan Faqir",
    location: "Alaska, United States",
    rating: 9.8,
    reviews: 4,
    description:
      "With over 40 years of guiding experience in Southeast Alaska and Glacier Bay National Park, we are an exceptional choice for your next hunting adventure.",
    image: video2,
  },
];

const GuideComponent = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const swiperRef = useRef();

  // Suppress ResizeObserver warning
  useEffect(() => {
    const observerErrorHandler = (e) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', observerErrorHandler);

    return () => {
      window.removeEventListener('error', observerErrorHandler);
    };
  }, []);

  const renderMedia = (media) => {
    const isVideo = typeof media === "string" && media.endsWith(".mp4");
    if (isVideo) {
      return (
        <video
          className="guide-media"
          controls
          muted
          autoPlay
          loop
          onLoadedMetadata={() => swiperRef?.current?.swiper?.update()}
        >
          <source src={media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <img className="guide-media" src={media} alt="Guide media" />;
    }
  };

  return (
    <div className="guide-container">
      <div className="guide-title_head">
        <h2 className="guide-title">
          <strong>Meet your</strong> guides »
        </h2>
      </div>
      <Swiper
        ref={swiperRef}
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
              {renderMedia(guide.image)}
            </div>
            <div className="lodge-card">
              <div className="lodge-info">
                <h2 className="lodge-name">{guide.name}</h2>
                <p className="lodge-location">{guide.location}</p>
                <div className="lodge-rating">
                  {[...Array(5)].map((_, idx) => (
                    <FontAwesomeIcon key={idx} icon={faStar} color='#dbb127' />
                  ))}
                  <span className="rating-value">{guide.rating}</span>
                  <span className="review-count">{guide.reviews} review{guide.reviews > 1 ? 's' : ''}</span>
                </div>
                <p className="lodge-description">{guide.description}</p>
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
