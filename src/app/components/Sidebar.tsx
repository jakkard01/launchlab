'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (section: string) => void;
};

const Sidebar = ({ isOpen, onClose, onSelect }: Props) => {
  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 80, damping: 20, when: 'beforeChildren', staggerChildren: 0.08 } },
    exit: { x: '-100%', transition: { type: 'spring', stiffness: 80, damping: 20 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="sidebar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          className="fixed top-0 left-0 h-full w-64 z-40 transition-transform backdrop-blur-lg bg-white/30 border-r border-white/30 shadow-xl"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', borderRadius: '0 20px 20px 0' }}
        >
          <div className="p-4 font-bold border-b border-white/30 text-gray-900">Powered by IA</div>
          <nav className="flex flex-col p-4 space-y-2">
            <motion.button
              variants={buttonVariants}
              className="text-left px-4 py-2 rounded-lg transition-all duration-200 bg-white/40 hover:bg-white/60 hover:shadow-[0_0_8px_2px_rgba(0,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-300"
              onClick={() => onSelect('home')}
            >
              Inicio
            </motion.button>
            <motion.button
              variants={buttonVariants}
              className="text-left px-4 py-2 rounded-lg transition-all duration-200 bg-white/40 hover:bg-white/60 hover:shadow-[0_0_8px_2px_rgba(0,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-300"
              onClick={() => onSelect('about')}
            >
              Quiénes somos
            </motion.button>
            <motion.button
              variants={buttonVariants}
              className="text-left px-4 py-2 rounded-lg transition-all duration-200 bg-white/40 hover:bg-white/60 hover:shadow-[0_0_8px_2px_rgba(0,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-300"
              onClick={() => onSelect('bot')}
            >
              Bot en progreso
            </motion.button>
            <motion.button
              variants={buttonVariants}
              className="text-left px-4 py-2 rounded-lg transition-all duration-200 bg-white/40 hover:bg-white/60 hover:shadow-[0_0_8px_2px_rgba(0,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-300"
              onClick={() => onSelect('cursos')}
            >
              Cursos IA
            </motion.button>
            <motion.button
              variants={buttonVariants}
              className="mt-4 text-red-600 px-4 py-2 rounded-lg transition-all duration-200 bg-white/40 hover:bg-white/60 hover:shadow-[0_0_8px_2px_rgba(255,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={onClose}
            >
              Cerrar
            </motion.button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
