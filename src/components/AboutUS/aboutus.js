import React from 'react';
import './aboutus.css'; // CSS file for styling
import aboutImage from '../assets/passu2.jpg'; // Ensure you import the image correctly
import FooterComponent from '../Footer/footer';

const AboutUs = () => {
  return (
    <>
    <div className="about-us-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <a href="/">Home</a> &gt; About us
      </div>
      
      {/* Title Section */}
      <h1 className="about-title">ABOUT US - PASSU BATURA IBEX- (Passu Conservency)</h1>
      
      {/* Main Image */}
      <div className="about-image-container">
        <img src={aboutImage} alt="Valeriano in front of the tent" className="about-image" />
      </div>
      
      {/* Content Section */}
      <div className="about-content">
        <p className='about-content_para'>
          <a href="https://www.ibexhuntspain.com" target="_blank" rel="noreferrer">Passu</a>, 
          village in <a href="https://www.ibexhuntspain.com" target="_blank" rel="noreferrer">Hunza GB</a> ,The Batura Ibex is a subspecies of the Siberian ibex found in the rugged Batura Valley of northern Pakistan. Known for its impressive curved horns and thick coat, it thrives in the harsh mountainous terrain of the Karakoram range. These ibexes are skilled climbers, navigating steep cliffs to evade predators like snow leopards. They primarily graze on alpine vegetation and play a vital role in the region's ecosystem. Due to habitat loss and poaching, conservation efforts are crucial to protecting their population. The Batura Ibex symbolizes the untamed beauty of Pakistan’s high-altitude wilderness, attracting wildlife enthusiasts and researchers alike.
<br /> <br />
Some people who know passu converency, will say that he takes the hunting too seriously, <br /> but it is because of his love of the game, that this is his pleasure in life and because of this, he cares very much about the success of the hunts for his clients and friends.
<br /> <br />
This attitude always shows through when you meet or talk with him and all of his partners follow this passion too, making sure that the clients, no matter whether the hunt is in Europe or Eurasia, will have the fantastic hunting trip of their lives, get what they are looking for, trophies, good accommodation, excellent guides and perhaps lifelong friendships.
        </p>
      </div>
    </div>
    <FooterComponent />
    </>
  );
};

export default AboutUs;
