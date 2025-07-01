'use client';
import React from 'react';
import MainContent from './components/MainContent';
import { NextSeo } from 'next-seo';

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="Powered by IA — Transformando ideas en realidad"
        description="Landing personal con IA, visión y código."
        openGraph={{
          title: 'Powered by IA — Transformando ideas en realidad',
          description: 'Landing personal con IA, visión y código.',
          url: 'https://poweredbyia.com/',
          site_name: 'Powered by IA',
        }}
      />
      <MainContent />
    </>
  );
}
