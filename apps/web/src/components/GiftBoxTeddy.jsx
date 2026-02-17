import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftBoxTeddy = ({ className, onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (onOpen) onOpen();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-rose-900/20 via-pink-900/20 to-purple-900/20 overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-lg"
        aria-label="Cerrar"
      >
        <X size={28} />
      </button>

      <div className={`relative cursor-pointer group ${className}`} onClick={handleClick}>
        {/* 3D Perspective Container */}
        <div style={{ perspective: '1200px' }} className="w-80 h-96 flex items-center justify-center">
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>

            {/* Caja Base (Body) - Rojo intenso */}
            <motion.div
              className="absolute inset-0 rounded-3xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #DC1C3E 0%, #B91D3E 50%, #8B1538 100%)',
                transformStyle: 'preserve-3d',
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? -30 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Corazón frontal decorativo */}
              <div className="absolute inset-0 rounded-3xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                <svg viewBox="0 0 200 180" className="w-48 h-48 drop-shadow-2xl opacity-30">
                  <path
                    d="M100,160 C30,110 10,75 10,55 C10,35 25,25 45,25 C60,25 72,35 85,50 C95,40 105,25 155,25 C175,25 190,35 190,55 C190,75 170,110 100,160 Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>

              {/* Sombra interior */}
              <div className="absolute inset-0 rounded-3xl shadow-inner opacity-40"></div>
            </motion.div>

            {/* Tapa (Lid) - Se desliza hacia arriba */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl shadow-2xl z-10 overflow-hidden"
              style={{
                background: 'linear-gradient(to bottom, #E8305A 0%, #DC1C3E 50%, #B91D3E 100%)',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center bottom',
              }}
              initial={{ y: 0, rotateX: 0 }}
              animate={{ y: isOpen ? -240 : 0, rotateX: isOpen ? 0 : 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              {/* Lado superior de la tapa */}
              <div className="relative w-full h-full rounded-t-3xl overflow-hidden">
                {/* Brillo superior */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-t-3xl"></div>

                {/* Moño Beige/Crema Elegante */}
                <div className="absolute top-8 right-8 w-32 h-32 z-40">
                  {/* Lazos principales */}
                  <motion.div
                    className="absolute w-full h-full"
                    animate={{ rotateZ: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Lazo izquierdo */}
                    <div className="absolute top-0 right-1/2 mr-1 w-14 h-20 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-full shadow-xl"
                         style={{
                           boxShadow: '0 6px 12px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.8)',
                           transform: 'skewY(-15deg)'
                         }}>
                      <div className="absolute top-0 left-0 right-0 h-2 bg-white/40 rounded-full"></div>
                    </div>

                    {/* Lazo derecho */}
                    <div className="absolute top-0 left-1/2 ml-1 w-14 h-20 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-full shadow-xl"
                         style={{
                           boxShadow: '0 6px 12px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.8)',
                           transform: 'skewY(15deg)'
                         }}>
                      <div className="absolute top-0 left-0 right-0 h-2 bg-white/40 rounded-full"></div>
                    </div>

                    {/* Nudo central con textura */}
                    <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full shadow-lg"
                         style={{
                           transform: 'translate(-50%, -50%)',
                           boxShadow: '0 6px 12px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.4), inset -2px -2px 4px rgba(0,0,0,0.1)',
                         }}>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Cinta decorativa beige */}
                <div className="absolute top-1/3 left-0 right-0 h-3 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 shadow-lg z-20"
                     style={{
                       boxShadow: '0 4px 8px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.6)'
                     }}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/50"></div>
                </div>
              </div>

              {/* Lado interior de la tapa (cuando se abre) */}
              <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-t-3xl"
                   style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
              </div>
            </motion.div>

            {/* Interior de la caja visible cuando se abre */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute inset-0 rounded-3xl z-5 overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(to bottom, #F5E6D3 0%, #E8DCC8 100%)',
                  }}
                >
                  {/* Grid de chocolates */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-center">
                    <div className="grid grid-cols-4 gap-3">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-8 h-8 rounded-sm shadow-md"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                          style={{
                            background: i % 3 === 0 
                              ? 'linear-gradient(135deg, #6B4423 0%, #4A2F1A 100%)' 
                              : i % 3 === 1
                              ? 'linear-gradient(135deg, #8B5A3C 0%, #5C3D24 100%)'
                              : 'linear-gradient(135deg, #7A5230 0%, #4A2F1A 100%)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)'
                          }}>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contenido principal (mensaje) */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.7, duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                  {/* Corazón flotante principal */}
                  <motion.div
                    className="text-7xl mb-8 drop-shadow-lg"
                    animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ❤️
                  </motion.div>

                  {/* Mensaje principal */}
                  <div className="text-center space-y-4 px-6">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="text-5xl font-bold bg-gradient-to-r from-red-500 via-rose-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg"
                      style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
                    >
                      Te quiero
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="text-4xl text-red-400 drop-shadow-lg"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      mucho
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.6 }}
                    >
                      <p className="text-rose-300 text-xl font-light drop-shadow-md">
                        Eres más dulce que estos chocolates 🍫
                      </p>
                    </motion.div>
                  </div>

                  {/* Chispas flotantes */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl drop-shadow-lg"
                      initial={{
                        opacity: 0,
                        x: (Math.random() - 0.5) * 140,
                        y: Math.random() * 120 + 50,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: [50, -100],
                        x: (Math.random() - 0.5) * 180,
                      }}
                      transition={{
                        delay: i * 0.12 + 1,
                        duration: 2.8,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint Text */}
            {!isOpen && (
              <motion.div
                className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-sm bg-white/80 px-6 py-3 rounded-full text-red-600 font-bold shadow-lg backdrop-blur-sm whitespace-nowrap"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ¡Abre tu sorpresa! 💝
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftBoxTeddy;
