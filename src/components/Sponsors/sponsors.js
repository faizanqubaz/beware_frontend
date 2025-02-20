import React, { useState, useEffect } from 'react';
import './sponsors.css';
import passuimage from '../assets/card1.jpg';
import baturaImage from '../assets/passu2.jpg';
import FooterComponent from '../Footer/footer';

const SponsorsComponent = () => {
  // Array of image URLs and relevant information for each sponsor
  const sponsors = [
    { image: passuimage, name: 'Spanish Driven Partridge', url: 'www.example1.com', phone: '+34 123 456 789' },
    { image: baturaImage, name: 'Leupold', url: 'www.example2.com', phone: '+34 987 654 321' },
    { image: passuimage, name: 'Rifles Inc', url: 'www.example3.com', phone: '+34 123 456 789' },
    { image: baturaImage, name: 'Sitka', url: 'www.example4.com', phone: '+34 987 654 321' },
    { image: passuimage, name: 'Wild Sheep Foundation', url: 'www.example5.com', phone: '+34 123 456 789' },
    { image: baturaImage, name: 'Additional Sponsor 1', url: 'www.example6.com', phone: '+34 123 456 000' },
    { image: passuimage, name: 'Additional Sponsor 2', url: 'www.example7.com', phone: '+34 987 654 888' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 5 images starting from the current index
  const visibleSponsors = sponsors.slice(currentIndex, currentIndex + 5).concat(
    sponsors.slice(0, Math.max(0, (currentIndex + 5) - sponsors.length))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 5) % sponsors.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [sponsors.length]);

  return (
    <>
    <div className="breadcrumb_sponsors">
        <a href="/">Home</a> &gt; Sponsors
      </div>
    <div className="blog-container">
     
      <div className="sponsors_image-slider">
        {visibleSponsors.map((sponsor, index) => (
          <div key={index} className="sponsor_slide">
            <img src={sponsor.image} alt={sponsor.name} />
          </div>
        ))}
      </div>
      <div className="sponsor-details">
        <h3>{sponsors[currentIndex].name}</h3>
        <p>
          <a href={`https://${sponsors[currentIndex].url}`} target="_blank" rel="noopener noreferrer">
            {sponsors[currentIndex].url}
          </a>
        </p>
        <p><strong>Telephone:</strong> {sponsors[currentIndex].phone}</p>
        <p>Enjoy hunting the big game of Spain in their natural rugged environment...</p>
      </div>
    </div>
    <FooterComponent />
    </>
  );
};

export default SponsorsComponent;
