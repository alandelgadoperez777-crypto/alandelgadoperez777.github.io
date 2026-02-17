import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

const GalaxiaDeCorazones = ({ onClose }) => {
  const [showMessage, setShowMessage] = useState(false);

  const hearts = Array.from({ length: 120 }, (_, i) => {
    const angle = (i / 120) * Math.PI * 2 * 6; // Spiral arms
    const radius = (i * 3) + 40; // Start further out to leave room for center
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3,
      z: Math.random() * 20 // Parallax depth simulation
    };
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#050510] flex items-center justify-center overflow-hidden perspective-1000">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/30 transition-colors z-50"
      >
        <X size={24} />
      </button>

      {/* Rotating Galaxy Container */}
      <motion.div
        className="relative w-1 h-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute rounded-full bg-pink-400 shadow-[0_0_8px_rgba(255,105,180,0.6)]"
            style={{
              width: h.size,
              height: h.size,
              x: h.x,
              y: h.y,
              opacity: h.opacity,
              transform: `translateZ(${h.z}px)` // 3D depth
            }}
            animate={{ 
              opacity: [h.opacity, 1, h.opacity],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, delay: h.delay, repeat: Infinity }}
          />
        ))}
        
        {/* Galaxy Glow */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-900/20 blur-[60px] rounded-full pointer-events-none" />
      </motion.div>

      {/* Central Heart (Static relative to rotation) */}
      <motion.div
        className="absolute z-20 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMessage(true)}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart 
            size={64} 
            fill="#FF1493" 
            className="text-pink-600 drop-shadow-[0_0_25px_rgba(255,20,147,0.8)]" 
          />
        </motion.div>
      </motion.div>
      
      {/* Special Message Overlay */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-30 bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-pink-500/30 text-center max-w-xs"
            onClick={() => setShowMessage(false)}
          >
            <h3 className="text-2xl font-handwriting text-pink-300 mb-2">Mi Universo</h3>
            <p className="text-white/90 font-light leading-relaxed">
              En esta inmensa galaxia, tú eres la estrella que más brilla. Gracias por iluminar mi vida.
            </p>
            <p className="text-xs text-white/50 mt-4">(Toca para cerrar)</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 text-pink-200/50 font-handwriting text-xl pointer-events-none">
        Toca el corazón central
      </div>
    </div>
  );
};

export default GalaxiaDeCorazones;