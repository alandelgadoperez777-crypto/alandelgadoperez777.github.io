import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

const CartaInteractiva = ({ onClose, message = "Mi querida Ángela,\n\nEres la luz que ilumina mis días y la melodía que alegra mi corazón. Cada momento contigo es un regalo precioso.\n\nTe amo infinitamente." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSound } = useSound();

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOpen = (e) => {
    e.stopPropagation(); // Prevent closing when clicking the letter itself
    if (!isOpen) {
      setIsOpen(true);
      playSound('paper');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose} // Close when clicking outside
    >
      <div className="relative w-full max-w-lg perspective-1000" onClick={(e) => e.stopPropagation()}>
        {/* Close Button - Always visible, high z-index */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Cerrar carta"
        >
          <X size={28} />
        </button>

        <div className="relative w-full h-64 sm:h-80 cursor-pointer group" onClick={handleOpen}>
          
          {/* Envelope Container */}
          <motion.div 
            className="relative w-full h-full"
            initial={{ rotateX: 0 }}
            whileHover={!isOpen ? { scale: 1.02 } : {}}
            transition={{ duration: 0.3 }}
          >
            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-[#f3e5f5] rounded-lg shadow-2xl border border-pink-100" />

            {/* Letter Content (Slides up) */}
            <motion.div
              className="absolute left-4 right-4 bg-white p-6 shadow-md z-10 rounded-sm"
              initial={{ top: 10, height: '90%' }}
              animate={{ 
                top: isOpen ? -180 : 10,
                height: isOpen ? 'auto' : '90%',
                zIndex: isOpen ? 30 : 10
              }}
              transition={{ delay: isOpen ? 0.3 : 0, duration: 0.8, ease: "easeInOut" }}
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="font-handwriting text-gray-800 text-lg sm:text-xl leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    {message}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Front Pocket of Envelope */}
            <div className="absolute inset-0 z-20 pointer-events-none">
               <div 
                 className="absolute bottom-0 w-full h-1/2 bg-[#e1bee7] rounded-b-lg border-t border-pink-200 shadow-inner"
                 style={{ 
                   clipPath: 'polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)',
                   background: 'linear-gradient(to bottom right, #f3e5f5, #e1bee7)'
                 }} 
               />
            </div>

            {/* Flap (Rotates) */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 origin-top z-20"
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="w-full h-full bg-[#ce93d8] rounded-t-lg shadow-md border-b border-pink-300"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(to bottom, #f3e5f5, #ce93d8)',
                  backfaceVisibility: 'hidden' // Hide when rotated
                }}
              />
              {/* Inner side of flap (visible when open) */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#f3e5f5]"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'rotateY(180deg)', // Flip for backface
                  backfaceVisibility: 'hidden'
                }}
              />
            </motion.div>

          </motion.div>
        </div>
        
        {!isOpen && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-white/90 mt-12 font-medium tracking-wide animate-pulse"
          >
            Toca el sobre para leer tu carta
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CartaInteractiva;