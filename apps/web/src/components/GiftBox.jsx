import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';

const GiftBox = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isOpening && !isOpened) {
      setIsOpening(true);
      setTimeout(() => setIsOpened(true), 1500);
    }
  };

  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: -50 + Math.random() * 100,
    y: -100 - Math.random() * 100,
    rotation: Math.random() * 360,
    color: ['#FF69B4', '#FFD700', '#FF1493', '#FFA500', '#FF6347'][Math.floor(Math.random() * 5)]
  }));

  return (
    <>
      <Helmet>
        <title>Regalo Especial para Ángela 🎁</title>
        <meta name="description" content="Un regalo lleno de amor y sorpresas" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200">
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-medium">Volver</span>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-800" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Un Regalo Para Ti 🎁
          </h1>

          <div className="relative w-80 h-80 cursor-pointer flex items-center justify-center" onClick={handleClick}>
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF69B4" />
                  <stop offset="100%" stopColor="#FF1493" />
                </linearGradient>
                <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>

              <motion.rect
                x="40"
                y="80"
                width="120"
                height="100"
                fill="url(#boxGradient)"
                stroke="#C71585"
                strokeWidth="2"
                rx="5"
              />

              <motion.rect
                x="95"
                y="80"
                width="10"
                height="100"
                fill="url(#ribbonGradient)"
                animate={isOpening ? { y: -50, opacity: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />

              <motion.rect
                x="40"
                y="125"
                width="120"
                height="10"
                fill="url(#ribbonGradient)"
                animate={isOpening ? { scaleX: 0, opacity: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ transformOrigin: 'center' }}
              />

              <motion.g
                animate={isOpening ? { y: -60, rotateX: -45 } : {}}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                style={{ transformOrigin: '100px 80px' }}
              >
                <rect x="40" y="60" width="120" height="20" fill="url(#boxGradient)" stroke="#C71585" strokeWidth="2" rx="5" />
              </motion.g>

              <motion.path
                d="M 95 60 Q 80 40 95 30 Q 100 25 105 30 Q 120 40 105 60 Z"
                fill="url(#ribbonGradient)"
                stroke="#FFA500"
                strokeWidth="1"
                animate={isOpening ? { scale: 0, opacity: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ transformOrigin: '100px 45px' }}
              />
            </svg>

            <AnimatePresence>
              {isOpened && (
                <>
                  {confetti.map((item) => (
                    <motion.div
                      key={item.id}
                      className="absolute"
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{
                        x: item.x,
                        y: item.y,
                        opacity: 0,
                        rotate: item.rotation
                      }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      style={{ color: item.color }}
                    >
                      <Sparkles size={16} fill="currentColor" />
                    </motion.div>
                  ))}

                  {Array.from({ length: 10 }, (_, i) => (
                    <motion.div
                      key={`heart-${i}`}
                      className="absolute"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{
                        x: -80 + Math.random() * 160,
                        y: -80 - Math.random() * 80,
                        opacity: 0,
                        scale: 1
                      }}
                      transition={{ duration: 2, ease: 'easeOut', delay: i * 0.1 }}
                    >
                      <Heart size={20 + Math.random() * 20} fill="#FF69B4" color="#FF69B4" />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8, type: 'spring' }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl border-4 border-pink-300 max-w-sm"
                  >
                    <h2 className="text-2xl font-bold text-center text-purple-700 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      ¡Sorpresa! 💝
                    </h2>
                    <p className="text-center text-gray-700 leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      El mejor regalo que puedo darte es mi amor eterno. Cada momento contigo es un tesoro que guardo en mi corazón. 
                      Eres mi mayor bendición y mi felicidad más grande. ¡Te amo infinitamente! 💛
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {!isOpening && !isOpened && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center mt-8 text-purple-700 font-medium"
            >
              Haz clic en el regalo para abrirlo
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default GiftBox;