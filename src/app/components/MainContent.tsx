'use client';

import React, { useState, useEffect } from 'react';
import HomeContent from './HomeContent';
import IntroOverlay from './EmbeddedVideo';
import { AnimatePresence, motion } from 'framer-motion';

const MainContent: React.FC = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
      setShowContent(true);
    }, 15000); // ⏱️ duración del video en milisegundos (15s)

    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = () => {
    setShowVideo(false);
    setShowContent(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <AnimatePresence>
        {showVideo && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <IntroOverlay onSkip={handleSkipIntro} />
          </motion.div>
        )}
      </AnimatePresence>
      {showContent && <HomeContent />}
    </div>
  );
};

export default MainContent;
