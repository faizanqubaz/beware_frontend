
import './partners.css';
import pdo from '../../components/assets/pdo.jpg';
import pyeso from '../../components/assets/pyseo.jpg';
import psa from '../../components/assets/psa.jpg';
import pmc from '../../components/assets/pcc.jpg'; 
import focus from '../../components/assets/focus.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const partners = [
  { name: "Passu Development Organization", title: "PAssu Development Organization", img: pdo },
  { name: "PassuYouth and Sport Organization", title: "Finicial Organization", img: pyeso },
  { name: "Passu Student Association", title: "Committee", img: psa },
  { name: "Passu Conservation Committee", title: "RRO", img: pmc },
  { name: "Focus Team Passu", title: "Assistant Hunter", img: focus }
];

const PartnersComponent = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="partners_component-slider">
      <h2 className='partners-slider_h2'>
        Meet Our Partners <br />
        <span className="highlight-text">associated with Passu conservency 2024-2026</span>
      </h2>
      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img src={partner.img} alt={partner.name} />
            <div className="partner-info">
              <h3>{partner.name}</h3>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnersComponent;

