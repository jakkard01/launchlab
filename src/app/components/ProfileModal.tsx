'use client';

import React from 'react';
import Image from 'next/image';

type ProfileModalProps = {
  onClose: () => void;
};

export default function ProfileModal({ onClose }: ProfileModalProps) {
  return (
    <div
      className="
        fixed inset-0 
        bg-black bg-opacity-75 
        flex items-center justify-center 
        z-50
      "
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="
            absolute top-2 right-2 
            w-8 h-8 
            flex items-center justify-center 
            text-white text-2xl 
            bg-gray-800 bg-opacity-50 
            rounded-full 
            hover:bg-opacity-75
          "
          aria-label="Cerrar"
        >
          &times;
        </button>

        {/* Imagen de perfil */}
        <div className="overflow-hidden rounded-full">
          <Image
            src="/imagenes/perfil/mifoto.jpg"
            alt="Mi foto"
            width={600}
            height={600}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
