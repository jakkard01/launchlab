'use client';

import React from 'react';
import Image from 'next/image';

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <Image
        src="/imagenes/perfil/mifoto.jpg"
        alt="Foto ampliada"
        width={600}
        height={600}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
}
