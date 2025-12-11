'use client';

import { useState, useRef } from 'react';
import LandingLocal from './LandingLocal';
import IntroOverlay from './IntroOverlay'; // O IntroVideo, según cuál uses
import { AnimatePresence } from 'framer-motion';

export default function HomeClient() {
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleShowVideo = () => setShowVideo(true);
  const handleCloseVideo = () => setShowVideo(false);
  
  const handleScrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {showVideo && (
          <div className="fixed inset-0 z-[60] bg-black">
            <IntroOverlay 
              src="/video/video.mp4" // Asegúrate que esta ruta es la correcta de tu video
              onClose={handleCloseVideo}
              onEnded={handleCloseVideo}
            />
          </div>
        )}
      </AnimatePresence>

      <LandingLocal 
        onShowVideo={handleShowVideo}
        heroRef={heroRef}
        onScrollToHero={handleScrollToHero}
      />
    </>
  );
}