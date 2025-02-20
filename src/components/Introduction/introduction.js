import './introduction.css';
import React, { useEffect, useRef } from 'react';
import imageA3 from '../assets/hunter5.jpeg';
import image9 from '../assets/hunter2.jpeg'

const IntroductionSlider = () => {
  const introSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the class after a 4-second delay
            setTimeout(() => {
              entry.target.classList.add('in-view');
            }, 1000); // 4000 milliseconds = 4 seconds
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is in view
    );

    if (introSectionRef.current) {
      observer.observe(introSectionRef.current);
    }

    return () => {
      if (introSectionRef.current) {
        observer.unobserve(introSectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={introSectionRef} className="introduction_main_slider">
      <div className="introduction_slider_heading_head">
        <h1 className="introduction_slider_heading">IBEX HUNTING IN Passu AND Batura</h1>
      </div>

      <div className="introduction_slider_para_image_slider">
        {/* First Section */}
        <div className="introduction_slider_para_image_slider_first">
          <img className="introduction_slider_para_image" src={image9} alt="Passu Ibex" />
          <p className="introduction_slider_paragraph">
            We would like to welcome you to the <b>passu ibex community</b>. When you book a hunting trip with the <b>passu ibex community</b>, you will not only book a real mountain hunt, all will receive a very personalized adventure, with a high success hunting rate. You will be able to hunt the most incredible mountain animals in the most beautiful ranges in the world.
            <br /><br />
            The landscape in some of these countries is mountainous, not only rugged and breathtaking, but they are also home to some of the special goats and sheep. Because we have the licenses to hunt in some government game reserves, it is always a possibility to get the opportunity to hunt a big trophy.
          </p>
        </div>

        {/* Second Section */}
        <div className="introduction_slider_para_image_slider_second">
          <p className="introduction_slider_paragraph">
            The stunning landscapes of Passu and Batura offer unmatched hunting experiences. With vast and rugged mountain ranges, this region is home to incredible wildlife. If you’re seeking the ultimate adventure, Passu and Batura are the perfect places for your next hunt.
            We would like to welcome you to the <b>passu ibex community</b>. <br /><br /> When you book a hunting trip with the <b>passu ibex community</b>, you will not only book a real mountain hunt, all will receive a very personalized adventure, with a high success hunting rate. You will be able to hunt the most incredible mountain animals in the most beautiful ranges in the world.
          </p>
          <img className="introduction_slider_para_image" src={imageA3} alt="Batura Ibex" />
        </div>
      </div>
    </div>
  );
};

export default IntroductionSlider;
