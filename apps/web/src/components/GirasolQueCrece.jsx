import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GirasolQueCrece = ({ onClose }) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // 0-6: 7 fases de crecimiento
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const phases = [
    { title: "Semilla", description: "Una pequeña promesa enterrada en el tiempo..." },
    { title: "Germinación", description: "El sueño rompe la tierra de la esperanza." },
    { title: "Brote Verde", description: "Primeras señales de vida y crecimiento." },
    { title: "Tallo Fuerte", description: "Creciendo hacia la luz con determinación." },
    { title: "Primeras Hojas", description: "Cubriendo el camino del amor." },
    { title: "Capullo de Oro", description: "Guardando la belleza para este momento." },
    { title: "¡GIRASOL RADIANTE!", description: "¡Florece en toda su gloria!" }
  ];

  const handleNextPhase = () => {
    if (phase < 6) {
      setPhase(p => p + 1);
    } else {
      setShowFinalMessage(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleNextPhase();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [phase]);

  const handleClose = () => {
    if (onClose) onClose();
    else navigate('/menu');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100 flex flex-col items-center justify-center overflow-hidden">
      <button 
        onClick={handleClose}
        className="absolute top-6 right-6 p-3 bg-white/80 rounded-full hover:bg-white transition-all z-50 text-amber-600 shadow-lg hover:shadow-xl"
      >
        <X size={28} />
      </button>

      {/* Progress Indicator */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-2 px-4 z-40">
        {phases.map((_, i) => (
          <motion.div 
            key={i}
            className={`rounded-full transition-all duration-500 ${
              i <= phase ? 'bg-gradient-to-r from-yellow-400 to-amber-500 shadow-md' : 'bg-white/60'
            }`}
            animate={{
              width: i <= phase ? 32 : 12,
              height: 6
            }}
          />
        ))}
      </div>

      {/* Title y Description */}
      <div className="absolute top-24 text-center px-4 z-40">
        <motion.h2 
          key={`title-${phase}`}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-amber-800 drop-shadow-lg mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {phases[phase].title}
        </motion.h2>
        <motion.p
          key={`desc-${phase}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-amber-700 font-medium text-lg drop-shadow-sm"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {phases[phase].description}
        </motion.p>
      </div>

      {/* Main Scene */}
      <div 
        className="relative w-full max-w-2xl h-[65vh] flex items-end justify-center cursor-pointer active:scale-95 transition-transform"
        onClick={handleNextPhase}
      >
        {/* Suelo */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-full opacity-80" />
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-b from-amber-600 to-amber-800 opacity-40 blur-lg" />

        {/* SVG Container - Más controlado */}
        <svg 
          viewBox="0 0 200 400" 
          className="relative z-10 w-64 h-full drop-shadow-2xl"
          style={{ maxHeight: '500px' }}
        >
          {/* FASE 0: Semilla */}
          {phase === 0 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <circle cx="100" cy="350" r="8" fill="#8B6F47" />
              <circle cx="100" cy="350" r="8" fill="none" stroke="#D4A574" strokeWidth="2" opacity="0.6" />
            </motion.g>
          )}

          {/* FASE 1: Germinación */}
          {phase >= 1 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Pequeño brote */}
              <motion.line 
                x1="100" y1="350" x2="100" y2="320"
                stroke="#22C55E" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              <ellipse cx="95" cy="315" rx="2" ry="3" fill="#22C55E" />
              <ellipse cx="105" cy="310" rx="2" ry="3" fill="#22C55E" />
            </motion.g>
          )}

          {/* FASE 2: Tallo */}
          {phase >= 2 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.line 
                x1="100" y1="350" x2="100" y2="180"
                stroke="#15803D" strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, type: "spring" }}
              />
            </motion.g>
          )}

          {/* FASE 3: Hojas */}
          {phase >= 3 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* Hoja izquierda */}
              <motion.path
                d="M 100 240 Q 70 235 65 250"
                fill="none"
                stroke="#16A34A"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
              {/* Hoja derecha */}
              <motion.path
                d="M 100 280 Q 130 275 135 290"
                fill="none"
                stroke="#16A34A"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              />
            </motion.g>
          )}

          {/* FASE 4: Capullo Verde */}
          {phase >= 4 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.6 }}
            >
              <ellipse cx="100" cy="160" rx="12" ry="18" fill="#84CC16" />
              <path d="M 95 155 Q 100 150 105 155" fill="#65A30D" />
            </motion.g>
          )}

          {/* FASE 5: Capullo Dorado */}
          {phase >= 5 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <ellipse cx="100" cy="160" rx="14" ry="20" fill="#FCD34D" />
              <motion.circle cx="100" cy="160" r="14" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.5"
                animate={{ r: [14, 16, 14] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.g>
          )}

          {/* FASE 6: GIRASOL COMPLETO */}
          {phase >= 6 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            >
              {/* Pétalos externos (16) */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 20 * Math.cos(rad);
                const y1 = 160 + 20 * Math.sin(rad);
                const x2 = 100 + 50 * Math.cos(rad);
                const y2 = 160 + 50 * Math.sin(rad);
                
                return (
                  <motion.ellipse
                    key={`petal-${i}`}
                    cx={(x1 + x2) / 2}
                    cy={(y1 + y2) / 2}
                    rx="6"
                    ry="16"
                    fill="#FDE047"
                    stroke="#FCD34D"
                    strokeWidth="0.5"
                    opacity="0.95"
                    transform={`rotate(${angle} 100 160)`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  />
                );
              })}

              {/* Pétalos internos (12) */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 25 * Math.cos(rad);
                const y1 = 160 + 25 * Math.sin(rad);
                const x2 = 100 + 40 * Math.cos(rad);
                const y2 = 160 + 40 * Math.sin(rad);
                
                return (
                  <motion.ellipse
                    key={`inner-petal-${i}`}
                    cx={(x1 + x2) / 2}
                    cy={(y1 + y2) / 2}
                    rx="5"
                    ry="12"
                    fill="#FBBF24"
                    opacity="0.8"
                    transform={`rotate(${angle} 100 160)`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.03, duration: 0.3 }}
                  />
                );
              })}

              {/* Centro del girasol */}
              <motion.circle
                cx="100"
                cy="160"
                r="16"
                fill="#92400E"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
              />
              
              {/* Patrón de semillas en el centro */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.circle
                    key={`seed-${i}`}
                    cx={100 + 8 * Math.cos(rad)}
                    cy={160 + 8 * Math.sin(rad)}
                    r="1.5"
                    fill="#D97706"
                    opacity="0.7"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.3 }}
                  />
                );
              })}

              {/* Brillo en el centro */}
              <motion.circle
                cx="96"
                cy="156"
                r="3"
                fill="white"
                opacity="0.3"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.g>
          )}
        </svg>

        {/* Tap Hint */}
        {!showFinalMessage && phase < 6 && (
          <motion.div 
            className="absolute bottom-32 text-amber-700 text-sm font-medium"
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Haz clic para crecer ✨
          </motion.div>
        )}
      </div>

      {/* Final Message */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="bg-gradient-to-br from-white via-yellow-50 to-amber-100 p-8 rounded-3xl shadow-2xl text-center max-w-sm border-4 border-yellow-300"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <motion.div
                className="text-6xl mb-4 drop-shadow-lg"
                animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌻
              </motion.div>
              <h2 className="text-4xl font-bold text-yellow-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                ¡Floreciste!
              </h2>
              <p className="text-xl text-amber-700 mb-6 font-medium" style={{ fontFamily: "'Dancing Script', cursive" }}>
                "Así creciste en mi corazón, iluminando cada rincón con tu amor. Eres mi girasol que siempre busca la luz."
              </p>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-3 rounded-full font-bold hover:from-yellow-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Volver al Menú
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GirasolQueCrece;