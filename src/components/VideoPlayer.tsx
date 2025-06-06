'use client';

import React from 'react';

export default function VideoPlayer() {
  return (
    <video
      src="/videos/intro.mp4"
      controls
      controlsList="nodownload"
      preload="metadata"
      className="rounded-xl w-full max-w-2xl shadow-2xl bg-black"
      aria-label="Video de introducción"
    />
  );
}
