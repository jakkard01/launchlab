// src/app/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import IntroVideo from './components/IntroVideo';
import LandingLocal from './components/LandingLocal';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSeen, setVideoSeen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Al cargar, revisa si el video ya fue visto/saltado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('welcomeVideoSeen');
      if (!seen) {
        setShowVideo(true);
      } else {
        setVideoSeen(true);
      }
    }
  }, []);

  // Cuando el usuario termina o salta el video
  const handleVideoFinish = () => {
    setShowVideo(false);
    setVideoSeen(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('welcomeVideoSeen', 'true');
    }
  };

  // Función para hacer scroll suave al Hero
  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mostrar video si showVideo es true
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-0 py-0 relative">
      {showVideo && (
        <IntroVideo
          onFinish={handleVideoFinish}
          onSkip={handleVideoFinish}
        />
      )}
      <LandingLocal
        onShowVideo={() => setShowVideo(true)}
        heroRef={heroRef}
        onScrollToHero={scrollToHero}
      />
    </main>
  );
}
