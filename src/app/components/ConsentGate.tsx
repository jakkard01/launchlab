'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

type ConsentStatus = 'accepted' | 'rejected';
type ConsentPayload = { v: number; status: ConsentStatus; ts: number };

const KEY = 'launchlab_cookie_consent_v1';

function getConsent(): ConsentPayload | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPayload;
  } catch {
    return null;
  }
}

export default function ConsentGate() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const current = getConsent();
    setAllowed(current?.status === 'accepted');

    const handler = (e: Event) => {
      const ce = e as CustomEvent<ConsentPayload>;
      setAllowed(ce.detail?.status === 'accepted');
    };

    window.addEventListener('cookie-consent', handler);
    return () => window.removeEventListener('cookie-consent', handler);
  }, []);

  if (!allowed) return null;

  // 👇 Aquí metes GA/Meta/etc cuando toque. De momento dejo ejemplo GA.
  return (
    <>
      {/* Ejemplo GA (pon tu ID real en env o directo cuando toque) */}
      {/* <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" /> */}
      {/* <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script> */}
    </>
  );
}
