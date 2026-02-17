import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const InteractiveEnvelope = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const message = [
    "Mi querida Ángela,",
    "",
    "Cada día contigo es un regalo que atesoro en mi corazón.",
    "Tu sonrisa ilumina mi mundo como el sol ilumina el día,",
    "y tu amor llena cada rincón de mi ser con una felicidad",
    "que nunca imaginé posible.",
    "",
    "Eres mi sol, mi luna, y todas mis estrellas.",
    "Eres la melodía que hace bailar mi alma,",
    "el sueño del que nunca quiero despertar.",
    "",
    "Te amo más de lo que las palabras pueden expresar,",
    "más de lo que el tiempo puede medir,",
    "más de lo que el universo puede contener.",
    "",
    "Con todo mi amor,",
    "Siempre tuyo 💛"
  ];

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowMessage(true), 800);
    }
  };

  return (
    <>
      <Helmet>
        <title>Carta para Ángela 💌</title>
        <meta name="description" content="Una carta especial llena de amor" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200">
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-medium">Volver</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-800" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Una Carta Para Ti 💌
          </h1>

          <div className="relative w-80 h-64 cursor-pointer" onClick={handleClick}>
            <svg width="320" height="256" viewBox="0 0 320 256" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF5F7" />
                  <stop offset="100%" stopColor="#FFE4E9" />
                </linearGradient>
              </defs>

              <rect x="20" y="80" width="280" height="160" fill="url(#envelopeGradient)" stroke="#FFB6C1" strokeWidth="2" />
              
              <motion.g
                animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformOrigin: '160px 80px', transformStyle: 'preserve-3d' }}
              >
                <polygon points="20,80 160,20 300,80" fill="#FFD1DC" stroke="#FFB6C1" strokeWidth="2" />
              </motion.g>

              <polygon points="20,80 160,160 300,80" fill="#FFF" opacity="0.3" />
            </svg>

            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: -20, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 bg-white p-6 rounded-lg shadow-2xl border-2 border-pink-200"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {message.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`${line === '' ? 'h-2' : 'text-sm text-gray-700 leading-relaxed'} ${
                        index === 0 || index === message.length - 2 ? 'font-bold text-purple-700' : ''
                      } ${index === message.length - 1 ? 'text-right italic text-purple-600' : ''}`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isOpen && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center mt-8 text-purple-700 font-medium"
            >
              Haz clic en el sobre para abrirlo
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default InteractiveEnvelope;