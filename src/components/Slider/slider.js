import React, { useState, useEffect, useRef } from 'react';
import './slider.css';
import hunt0 from '../assets/video44.mp4'
import hunt1 from '../assets/batura.mp4'
import hunt2 from '../assets/video9.MP4'
import hunt3 from '../assets/video10.MP4'
import hunt4 from '../assets/video11.MP4'
import hunt5 from '../assets/video22.MP4'
import hunt6 from '../assets/video23.MP4'

const SliderContainer = () => {
  const videos = [
    { url: hunt0, description: 'The Passu Ibex: resilient, agile, majestic, Karakoram, wild, iconic, powerful.' },
    { url: hunt1, description: 'The Batura Ibex: resilient, agile, majestic, Karakoram, wild, iconic, powerful.' },
    { url: hunt2, description: 'The Avdagar Ibex: resilient, agile, majestic, Karakoram, wild, iconic, powerful.' },
    { url: hunt3, description: 'The Himilayan Ibex: resilient, agile, majestic, Karakoram, wild, iconic, powerful.' },
    { url: hunt4, description: 'The Yunz Ibex: resilient, agile, majestic, Karakoram, wild, iconic, powerful.' },
    { url: hunt5, description: 'The YeshPert Ibex: resilient, agile, majestic, Karakoram, wild, iconic, powerful.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);  // Reference to the video element

  // Automatically move to the next video when the current one ends
  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // Play the current video when the component mounts or the index changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <div className="slide">
        <video
          ref={videoRef}
          src={videos[currentIndex].url}
          muted
          controls
          autoPlay
          onEnded={handleVideoEnd}
          className="video-player"
        />
        <div className="text-overlay">{videos[currentIndex].description}</div>
      </div>
    </div>
  );
};

export default SliderContainer;
