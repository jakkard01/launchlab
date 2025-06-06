'use client';

import Image from 'next/image';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export default function ProfileImageModal({ isOpen, onClose, imageSrc, alt }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur z-50"
      onClick={onClose}
    >
      <div
        className="relative p-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={400}
          height={400}
          className="rounded-xl shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold bg-black/60 rounded-full p-1"
          aria-label="Cerrar imagen"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
