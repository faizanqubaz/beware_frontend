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

const Gallery = () => {
  const alpineIbexImages = [
    image1, image2, image3, image4, image5, image1 // Add more images if needed
  ];

  const alpineChamoisImages = [
    image1, image2, image3, image4, image5, image1 // Add more images if needed
  ];

  const allImages = [...alpineIbexImages, ...alpineChamoisImages];
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="breadcrumb_gallery">
        <a href="/">Home</a> &gt; Media &gt; Gallery
      </div>
      <div className='gallery-container_head'>
        <h2 className='gallery-container_head_heading'>Photo Gallery</h2>
      </div>
      
      <div className="gallery-container">
        <h1 className="gallery-title">Batura And Passu </h1>
        
        <div className="gallery-section">
          <h2 className="gallery-section-title">YUNZ IBEX</h2>
          <div className="gallery-images">
            {alpineIbexImages.map((image, index) => (
              <div className="image-container" key={index} onClick={() => openLightbox(index)}>
                <img src={image} alt="Alpine Ibex" className="gallery-image" />
                <i className="fas fa-search zoom-icon"></i>
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-section">
          <h2 className="gallery-section-title">YUKXGOZ CHAMOIS</h2>
          <div className="gallery-images">
            {alpineChamoisImages.map((image, index) => (
              <div className="image-container" key={index + alpineIbexImages.length} onClick={() => openLightbox(index + alpineIbexImages.length)}>
                <img src={image} alt="Alpine Chamois" className="gallery-image" />
                <i className="fas fa-search zoom-icon"></i>
              </div>
            ))}
          </div>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={allImages[photoIndex]}
            nextSrc={allImages[(photoIndex + 1) % allImages.length]}
            prevSrc={allImages[(photoIndex + allImages.length - 1) % allImages.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)}
            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % allImages.length)}
          />
        )}
      </div>
      <FooterComponent />
    </>
  );
};

export default Gallery;
