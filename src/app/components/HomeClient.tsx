'use client';

import { useRef } from 'react';
import LandingLocal from './LandingLocal';

export default function HomeClient() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleScrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LandingLocal
      heroRef={heroRef}
      onScrollToHero={handleScrollToHero}
    />
  );
}
