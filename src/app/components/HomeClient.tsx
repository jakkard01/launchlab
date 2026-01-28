'use client';

import { useEffect, useRef, useState } from 'react';
import LandingLocal from './LandingLocal';
import IntroVideo from './IntroVideo';

export default function HomeClient() {
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('welcomeVideoSeen');
      if (!seen) {
        setShowVideo(true);
      }
    }
  }, []);

  const handleVideoFinish = () => {
    setShowVideo(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('welcomeVideoSeen', 'true');
    }
  };

  const handleScrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {showVideo && (
        <IntroVideo
          onFinish={handleVideoFinish}
          onSkip={handleVideoFinish}
        />
      )}
      <LandingLocal
        onShowVideo={() => setShowVideo(true)}
        heroRef={heroRef}
        onScrollToHero={handleScrollToHero}
      />
    </>
  );
}
