import React, { useState,useEffect  } from 'react';
import './guide.css'; // CSS file
import image1 from '../assets/passu1.jpg'
import video1 from '../assets/batura.mp4';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const GuideContainer = () => {
  const guides = [
    {
      id: 1,
      name: 'Inayat Nazar',
      location: 'Passu Gojal Hunza',
      rating: 9.7,
      reviews: 5,
      description: 'Our privately owned hunting area is 25 000 Acres in one block with a Boutique Lodge on site...',
      videoSrc: video1,
      contact:'+923554329249',
    },
    {
      id: 2,
      name: 'Habib Ullah',
      location: 'passu gojal hunza',
      rating: 1.8,
      reviews: 6,
      description: 'Small personalized hunting and touring company, owned by Marita and Ernest Dyason...',
      videoSrc: video1,
      contact:'+923554329249',
    },
    {
      id: 3,
      name: 'Hassan Faqir',
      location: 'passu gojal hunza',
      rating: 9.8,
      reviews: 7,
      description: 'We guarantee an unforgettable hunting safari on 17 000 acres of pure African bush...',
      videoSrc: video1,
      contact:'+923554329249',
    },
    {
      id: 4,
      name: 'Ali Shafa',
      location: 'passu gojal hunza',
      rating: 9.6,
      reviews: 10,
      description: 'Hunt wild African game on over 12,000 acres...',
      videoSrc: video1,
      contact:'+923554329249',
    },
    {
      id: 5,
      name: 'Faizan Adil',
      location: 'passu gojal hunza',
      rating: 9.9,
      reviews: 8,
      description: 'Enjoy Kalahari desert game hunting on an expansive private ranch...',
      videoSrc: video1,
      contact:'+923554329249',
    },
    {
      id: 5,
      name: 'Rahmat karim',
      location: 'passu Gojal hunza',
      rating: 9.9,
      reviews: 8,
      description: 'Enjoy Kalahari desert game hunting on an expansive private ranch...',
      videoSrc: video1,
      contact:'+923554329249',
    },
    {
      id: 6,
      name: 'Javaid',
      contact:'+923554329249',
      location: 'passu Gojal hunza',
      rating: 9.9,
      reviews: 8,
      description: 'Enjoy Kalahari desert game hunting on an expansive private ranch...',
      videoSrc: video1,
    }
  ];

  
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = Math.ceil(guides.length / 3);
  const currentSlide = Math.floor(currentGuideIndex / 3) + 1;

  const handleTransition = (newIndex) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentGuideIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with CSS transition duration
  };

  const nextGuides = () => {
    const newIndex = currentGuideIndex + 3 >= guides.length ? 0 : currentGuideIndex + 3;
    handleTransition(newIndex);
  };

  const previousGuides = () => {
    const newIndex = currentGuideIndex === 0 ? guides.length - 3 : currentGuideIndex - 3;
    handleTransition(newIndex);
  };

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextGuides, 5000);
    return () => clearInterval(timer);
  }, [currentGuideIndex]);

  return (
    <div className="guide-container">
      <div>
      <h2 className="title">Meet your guides   
       <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px' }} icon={faAnglesRight} fontSize={'20px'} />
       </h2>      </div>
      <div className="guides-slider-container">
        <div className={`guides-grid ${isTransitioning ? 'transitioning' : ''}`}
             style={{ transform: `translateX(-${(currentGuideIndex / 3) * 100}%)` }}>
          {guides.map(guide => (
            <div className="guide-card" key={guide.id}>
              <div className="guide-video">
                <video width={'100%'} controls>
                  <source src={guide.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="guide-info">
                <div className='guide-info_container'>
                  <div>
                    <h3 className='guide_info_heading'>{guide.name}</h3>
                    <p className='guide_info_para'>{guide.location}</p>
                    
                    <div className="rating">
                      {'★'.repeat(5)} {guide.rating} • {guide.reviews} reviews
                    </div>
                  </div>
                  <img className='rating_guide_image' src={image1} alt="Guide" />
                </div>
                <p className="description">{guide.description}</p>
                <button  onClick={() => window.open(`https://wa.me/${guide.contact.replace(/\+/g, '')}?text=Hello%20${guide.name},%20I'm%20interested%20in%20your%20hunting%20services!`, '_blank')} className="view-page-btn">Contact this guide</button>
              </div>
            </div>
          ))}
        </div>
        
     

        <div className="slider-progress">
          <div 
            className="progress-bar"
            style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
          />
        </div>
      </div>
      <button 
          className="slider-arrow left-arrow" 
          onClick={previousGuides}
          disabled={isTransitioning}
        >
          ‹
        </button>
        <button 
          className="slider-arrow right-arrow" 
          onClick={nextGuides}
          disabled={isTransitioning}
        >
          ›
        </button>
    </div>
  );
};

export default GuideContainer;
