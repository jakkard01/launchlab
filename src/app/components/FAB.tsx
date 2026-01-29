"use client";
import { useEffect, useState } from "react";
import { buildWhatsappLink } from "../../lib/site";

export default function FAB() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={buildWhatsappLink("fab")}
        className="bg-emerald-400 hover:bg-emerald-300 text-black rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-200"
        aria-label="WhatsApp Business"
        target="_blank"
        rel="noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.52 2 2.02 6.5 2.02 12.02c0 1.92.5 3.79 1.45 5.45L2 22l4.7-1.22c1.61.88 3.42 1.34 5.33 1.34h.01c5.52 0 10.02-4.5 10.02-10.02C22.06 6.5 17.56 2 12.04 2Zm0 18.2h-.01c-1.64 0-3.25-.44-4.67-1.27l-.33-.2-2.79.72.75-2.72-.22-.35a8.05 8.05 0 0 1-1.23-4.33c0-4.45 3.62-8.07 8.08-8.07a8.07 8.07 0 0 1 8.07 8.08c0 4.45-3.62 8.07-8.07 8.07Zm4.42-5.98c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.1-.1.24-.26.36-.39.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.02.4 1.36.52.57.18 1.08.16 1.49.1.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-[rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-150 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Volver arriba"
          style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
        </button>
      )}
    </div>
  );
}
