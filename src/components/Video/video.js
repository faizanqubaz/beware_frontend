import React, { useState } from 'react';
import './video.css';
import video1 from '../assets/batura1.mp4';
import video2 from '../assets/batura.mp4';
import video3 from '../assets/passu.mp4';
import FooterComponent from '../Footer/footer';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const VideoGallery = () => {
  const alpineIbexVideos = [
    { src: video1, title: 'Batura Video 1' },
    { src: video2, title: 'Batura Video 2' },
    { src: video3, title: 'Passu Video 1' },
    { src: video1, title: 'Batura Video 1' }, 
    { src: video2, title: 'Batura Video 2' },
    { src: video3, title: 'Passu Video 2' },
    { src: video3, title: 'Passu Video 2' }
  ];

  const alpineChamoisVideos = [
    { src: video1, title: 'Batura Video 1' },
    { src: video2, title: 'Batura Video 2' },
    { src: video3, title: 'Passu Video 1' }
  ];

  const allVideos = [...alpineIbexVideos, ...alpineChamoisVideos];

  const [isOpen, setIsOpen] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // Track the visible range of videos

  const videosToShow = 5; // Number of videos to show at a time

  const openLightbox = (index) => {
    setVideoIndex(index);
    setIsOpen(true);
  };

  const slideLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - videosToShow, 0));
  };

  const slideRight = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + videosToShow, allVideos.length - videosToShow)
    );
  };

  return (
    <>
      <div className="breadcrumb_video">
        <a href="/">Home</a> &gt; Media &gt; Videos
      </div>
      <div className='video-container_head'>
        <h2 className='video-container_head_heading'>Video Gallery</h2>
      </div>

      <div className="video-container">
        

        <div className="video-slider">
          {startIndex > 0 && (
            <button className="arrow left-arrow" onClick={slideLeft}>
              &#8249;
            </button>
          )}

          <div className="video-thumbnails">
            {allVideos.slice(startIndex, startIndex + videosToShow).map((video, index) => (
              <div className="video-item" key={index + startIndex} onClick={() => openLightbox(index + startIndex)}>
                <video className="video-thumbnail" controls>
                  <source src={video.src} type="video/mp4" />
                </video>
                <p className="video-title-text">{video.title}</p>
              </div>
            ))}
          </div>

          {startIndex + videosToShow < allVideos.length && (
            <button className="arrow right-arrow" onClick={slideRight}>
              &#8250;
            </button>
          )}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={allVideos[videoIndex].src}
            nextSrc={allVideos[(videoIndex + 1) % allVideos.length].src}
            prevSrc={allVideos[(videoIndex + allVideos.length - 1) % allVideos.length].src}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setVideoIndex((videoIndex + allVideos.length - 1) % allVideos.length)}
            onMoveNextRequest={() => setVideoIndex((videoIndex + 1) % allVideos.length)}
          />
        )}
      </div>

      <FooterComponent />
    </>
  );
};

export default VideoGallery;
