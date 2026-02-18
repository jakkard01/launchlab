'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import LandingLocal from './LandingLocal';
import IntroVideo from './IntroVideo';
import { getFeaturedVideo } from '../content/videoPacks';

const allowIntroVideoRoutes = new Set(['/', '/web', '/pricing', '/services']);

export default function HomeClient() {
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!allowIntroVideoRoutes.has(pathname)) {
      setShowVideo(false);
      return;
    }
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
          video={getFeaturedVideo()}
        />
      )}
      <LandingLocal
        heroRef={heroRef}
        onScrollToHero={handleScrollToHero}
      />
    </>
  );
}
