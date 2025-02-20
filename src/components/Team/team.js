
import './team.css';
import samjon from '../../components/assets/samjon.jpeg';
import tariq from '../../components/assets/tariq.jpeg';
import faizan from '../../components/assets/faizan.jpeg';
import mudassir from '../../components/assets/mudasir.jpeg';
import alvi from '../../components/assets/alvi.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const partners = [
  { name: "Tariq Ali", title: "President", img: tariq },
  { name: "Faizan Adil", title: "Finicial Secetatory", img: faizan },
  { name: "Muhammad Alvi", title: "Gen. Secetatory", img: alvi },
  { name: "Samar Jan", title: "RRO to President", img: samjon },
  { name: "Mudasir Aziz", title: "Media", img: mudassir }
];

const PartnersSlider = () => {
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
    <div className="partners-slider">
      <h2 className='partners-slider_h2'>
        Meet Our Team <br />
        <span className="highlight-text">works at Passu conservency 2024-2026</span>
      </h2>
      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img src={partner.img} alt={partner.name} />
            <div className="partner-info">
              <h3>{partner.name}</h3>
              <p>{partner.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnersSlider;

