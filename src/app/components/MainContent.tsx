'use client';

import React, { useState } from 'react';

import Hero from './hero';
import ProfileModal from './ProfileModal';
import EmbeddedVideo from './EmbeddedVideo';
import EmbeddedBot from './EmbeddedBot';

export default function MainContent() {
  // Flujo simple: init -> video -> bot
  const [step, setStep] = useState<'init' | 'video' | 'bot'>('init');
  const [profileOpen, setProfileOpen] = useState(false);

  const startVideo = () => setStep('video');
  const startBot = () => setStep('bot');
  const reset = () => setStep('init');

  return (
    <main className="min-h-screen px-6 py-10">
      {/* Hero / header */}
      <section className="max-w-5xl mx-auto">
        <Hero onCTA={startVideo} />
      </section>

      {/* Modal perfil */}
      {profileOpen && (<ProfileModal onClose={() => setProfileOpen(false)} />)}

      {/* Contenido principal: video/bot */}
      <section className="max-w-5xl mx-auto mt-10">
        {step === 'init' && (
          <div className="text-sm opacity-80">
            <button className="underline" onClick={startVideo}>
              ▶️ Ver intro
            </button>
          </div>
        )}

        {step === 'video' && (
          <div>
            <EmbeddedVideo onFinish={startBot} onSkip={startBot} onClose={startBot} />
            <div className="flex gap-4 mt-4 text-sm">
              <button className="underline" onClick={startBot}>
                Saltar al bot →
              </button>
              <button className="underline" onClick={reset}>
                Volver al inicio
              </button>
            </div>
          </div>
        )}

        {step === 'bot' && (
          <div>
            <EmbeddedBot />
            <div className="flex gap-4 mt-4 text-sm">
              <button className="underline" onClick={startVideo}>
                🔁 Ver video otra vez
              </button>
              <button className="underline" onClick={reset}>
                ✖ Volver al inicio
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="max-w-5xl mx-auto mt-12 text-xs opacity-60">
        LaunchLab — local preview
      </footer>
    </main>
  );
}
