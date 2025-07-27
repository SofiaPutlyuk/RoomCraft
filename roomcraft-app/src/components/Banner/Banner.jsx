import MainVideo from '../../assets/videos/main-video.mp4';
import BedroomVideo from '../../assets/videos/bedroom-video.mp4';
import OutsideVideo from '../../assets/videos/outside house-video.mp4';
import OfficeVideo from '../../assets/videos/game office-video.mp4';
import KidsVideo from '../../assets/videos/kids room-video.mp4';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export const Banner = () => {
    const videoSources = [
      {
        video: MainVideo,
        title: 'Welcome to RoomCraft!',
        description: 'Build your dream home in just a few clicks.',
        showButton: true,
      },
      {
        video: BedroomVideo,
        title: 'Pastel Dream Bedroom',
        description: 'Relax in a cozy space designed just for you.',
        showButton: false,
      },
      {
        video: OutsideVideo,
        title: 'Charming Outdoor Space',
        description: 'Create peaceful patios and beautiful gardens.',
        showButton: false,
      },
      {
        video: OfficeVideo,
        title: 'Creative Office Zone',
        description: 'Design your perfect workspace with style.',
        showButton: false,
      },
      {
        video: KidsVideo,
        title: 'Playful Kids’ Room',
        description: 'Fill your child’s room with imagination and color.',
        showButton: false,
      },
    ];
  
    const [current, setCurrent] = useState(0);
  
    const nextVideo = () => {
      setCurrent((prev) => (prev + 1) % videoSources.length);
    };
  
    const prevVideo = () => {
      setCurrent((prev) => (prev - 1 + videoSources.length) % videoSources.length);
    };
  
    return (
      <div className="banner-wrapper">
        <section className="carousel-container">
          <button className="nav prev" onClick={prevVideo}>←</button>
  
          {videoSources.map((item, index) => (
           <div key={index} className={`video-slide ${index === current ? 'active' : ''}`}>
           <video
             src={item.video}
             autoPlay
             muted
             loop
           ></video>
  
              {index === current && (
                <div className="video-overlay">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <Link to="/register">
                  {item.showButton && <button className="get-started-btn">Get Started</button>}
                  </Link>
                </div>
              )}
            </div>
          ))}
  
          <button className="nav next" onClick={nextVideo}>→</button>
  
          <div className="indicator-container">
            {videoSources.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? 'active-dot' : ''}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </section>
      </div>
    );
  };