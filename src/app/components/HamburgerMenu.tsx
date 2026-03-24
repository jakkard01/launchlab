'use client';
import React from 'react';

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
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-slate-900"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
