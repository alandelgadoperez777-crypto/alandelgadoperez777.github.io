import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';
import SparklingParticles from './SparklingParticles';

const RegaloConOsito = ({ onClose, message = "¡Sorpresa! Un abrazo virtual para ti." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSound } = useSound();

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      playSound('gift');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md flex flex-col items-center">
        <button 
          onClick={onClose}
          className="absolute -top-16 right-0 text-white hover:text-pink-200 transition-colors z-50"
        >
          <X size={32} />
        </button>

        <div className="relative w-72 h-72 cursor-pointer mt-10" onClick={handleOpen}>
          
          {/* Teddy Bear Container */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-48 h-56 z-0 bottom-20"
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: isOpen ? 0 : 100, 
              opacity: isOpen ? 1 : 0 
            }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            {/* Animated Bear SVG */}
            <motion.svg 
              viewBox="0 0 200 220" 
              className="w-full h-full drop-shadow-lg"
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Ears */}
              <circle cx="40" cy="50" r="25" fill="#8D6E63" />
              <circle cx="160" cy="50" r="25" fill="#8D6E63" />
              <circle cx="40" cy="50" r="15" fill="#D7CCC8" />
              <circle cx="160" cy="50" r="15" fill="#D7CCC8" />
              
              {/* Head */}
              <ellipse cx="100" cy="80" rx="70" ry="60" fill="#A1887F" />
              
              {/* Snout */}
              <ellipse cx="100" cy="95" rx="25" ry="20" fill="#D7CCC8" />
              <ellipse cx="100" cy="85" rx="10" ry="8" fill="#3E2723" /> {/* Nose */}
              
              {/* Eyes (Blinking) */}
              <motion.g
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                style={{ transformOrigin: 'center' }}
              >
                <circle cx="70" cy="70" r="6" fill="#3E2723" />
                <circle cx="130" cy="70" r="6" fill="#3E2723" />
              </motion.g>
              
              {/* Body */}
              <path d="M50 130 Q30 180 50 210 L150 210 Q170 180 150 130 Z" fill="#A1887F" />
              <ellipse cx="100" cy="170" rx="30" ry="40" fill="#D7CCC8" opacity="0.6" />

              {/* Arms holding heart */}
              <motion.g
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ellipse cx="40" cy="150" rx="20" ry="40" fill="#8D6E63" transform="rotate(30 40 150)" />
                <ellipse cx="160" cy="150" rx="20" ry="40" fill="#8D6E63" transform="rotate(-30 160 150)" />
                
                {/* Heart */}
                <path 
                  d="M100 170 L85 155 Q75 145 85 135 Q90 130 100 140 Q110 130 115 135 Q125 145 115 155 Z" 
                  fill="#FF5252" 
                  stroke="#D32F2F" 
                  strokeWidth="2"
                />
              </motion.g>
            </motion.svg>
          </motion.div>

          {/* Box Body */}
          <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-pink-500 to-pink-600 rounded-lg shadow-2xl z-10 flex items-center justify-center border border-pink-400">
            <div className="w-12 h-full bg-pink-400/50 border-x border-pink-300/30" />
          </div>

          {/* Box Lid */}
          <motion.div
            className="absolute bottom-36 -left-4 w-[112%] h-16 bg-pink-600 rounded-md shadow-lg z-20 flex items-center justify-center border-b-4 border-pink-800"
            animate={{ 
              y: isOpen ? -200 : 0, 
              rotate: isOpen ? -15 : 0,
              opacity: isOpen ? 0 : 1
            }}
            transition={{ duration: 0.6, ease: "backIn" }}
          >
            <div className="w-12 h-full bg-pink-500 border-x border-pink-400" />
            {/* Bow */}
            <div className="absolute -top-6 w-20 h-10 bg-pink-400 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </motion.div>
          
          {isOpen && <SparklingParticles count={30} />}
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="mt-12 bg-white/95 backdrop-blur-md p-6 rounded-2xl text-center max-w-sm shadow-xl border-2 border-pink-200"
          >
            <p className="text-2xl font-handwriting text-pink-600 mb-2">¡Para ti!</p>
            <p className="text-gray-700 font-medium">{message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RegaloConOsito;