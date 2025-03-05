import React, { useState } from 'react';
import './gallery.css';
import image1 from '../assets/passu1.jpg';
import image2 from '../assets/passu1.jpg';
import image3 from '../assets/passu1.jpg';
import image4 from '../assets/passu1.jpg';
import image5 from '../assets/passu1.jpg';
import FooterComponent from '../Footer/footer';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Gallery = () => {
  const alpineIbexImages = [
    image1, image2, image3, image4, image5, image1, // Add more images if needed
  ];

  const alpineChamoisImages = [
    image1, image2, image3, image4, image5, image1, // Add more images if needed
  ];

  const allImages = [...alpineIbexImages, ...alpineChamoisImages];
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // Track the visible range of images

  const imagesToShow = 5; // Number of images to show at a time

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const slideLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - imagesToShow, 0));
  };

  const slideRight = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + imagesToShow, allImages.length - imagesToShow)
    );
  };

  return (
    <>
      <div className="breadcrumb_gallery">
        <a href="/">Home</a> &gt; Media &gt; Gallery
      </div>
      <div className="gallery-container_head">
        <h2 className="gallery-container_head_heading">Photo Gallery</h2>
      </div>

      <div className="gallery-container">
        <h1 className="gallery-title">Batura And Passu</h1>

        <div className="gallery-slider">
          {startIndex > 0 && (
            <button className="arrow left-arrow" onClick={slideLeft}>
              &#8249;
            </button>
          )}

          <div className="gallery-images">
            {allImages.slice(startIndex, startIndex + imagesToShow).map((image, index) => (
              <div
                className="image-container"
                key={index + startIndex}
                onClick={() => openLightbox(index + startIndex)}
              >
                <img src={image} alt="Gallery" className="gallery-image" />
                <i className="fas fa-search zoom-icon"></i>
              </div>
            ))}
          </div>

          {startIndex + imagesToShow < allImages.length && (
            <button className="arrow right-arrow" onClick={slideRight}>
              &#8250;
            </button>
          )}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={allImages[photoIndex]}
            nextSrc={allImages[(photoIndex + 1) % allImages.length]}
            prevSrc={allImages[(photoIndex + allImages.length - 1) % allImages.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)}
            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % allImages.length)}
            enableZoom={false}
            toolbarButtons={[
              <button
                key="prev"
                className="lightbox-nav-button"
                onClick={() => setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>,
              <button
                key="next"
                className="lightbox-nav-button"
                onClick={() => setPhotoIndex((photoIndex + 1) % allImages.length)}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>,
            ]}
          />
        )}
      </div>

      <FooterComponent />
    </>
  );
};

export default Gallery;