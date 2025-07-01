'use client';
import React from 'react';
import { Menu } from 'lucide-react';

type Props = {
  onClick: () => void;
};

const HamburgerMenu = ({ onClick }: Props) => {
  return (
    <button
      className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
      onClick={onClick}
      aria-label="Abrir menú"
    >
      <Menu size={24} />
    </button>
  );
};

export default HamburgerMenu;
