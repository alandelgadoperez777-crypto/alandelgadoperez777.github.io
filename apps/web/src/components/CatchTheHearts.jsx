import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

const CatchTheHearts = () => {
  const [gameState, setGameState] = useState('ready');
  const [basketPosition, setBasketPosition] = useState(50);
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const navigate = useNavigate();
  const gameAreaRef = useRef(null);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setBasketPosition((prev) => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setBasketPosition((prev) => Math.min(90, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90,
        speed: 2 + Math.random() * 2
      };
      setHearts((prev) => [...prev, newHeart]);
    };

    const spawnInterval = setInterval(spawnHeart, 800);
    return () => clearInterval(spawnInterval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const moveHearts = setInterval(() => {
      setHearts((prevHearts) => {
        const updatedHearts = [];
        prevHearts.forEach((heart) => {
          const heartBottom = heart.y || 0;
          const newY = heartBottom + heart.speed;

          if (newY >= 85 && newY <= 95) {
            const heartCenter = heart.x + 5;
            const basketCenter = basketPosition + 5;
            if (Math.abs(heartCenter - basketCenter) < 8) {
              setScore((prev) => prev + 1);
              return;
            }
          }

          if (newY < 100) {
            updatedHearts.push({ ...heart, y: newY });
          }
        });
        return updatedHearts;
      });
    }, 50);

    return () => clearInterval(moveHearts);
  }, [gameState, basketPosition]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(45);
    setHearts([]);
    setBasketPosition(50);
  };

  return (
    <>
      <Helmet>
        <title>Atrapa los Corazones 💕</title>
        <meta name="description" content="Un juego romántico para Ángela" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-300 via-rose-300 to-purple-300">
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
          className="w-full max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-purple-800" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Atrapa los Corazones 💕
          </h1>

          <AnimatePresence mode="wait">
            {gameState === 'ready' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-pink-300 text-center"
              >
                <Heart size={80} fill="#FF69B4" color="#FF69B4" className="mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-purple-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  ¿Lista para jugar?
                </h2>
                <p className="text-gray-700 mb-6">
                  Usa las flechas ← → o las teclas A/D para mover la canasta y atrapar los corazones que caen. 
                  ¡Tienes 45 segundos!
                </p>
                <motion.button
                  onClick={startGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                >
                  ¡Comenzar!
                </motion.button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border-4 border-pink-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-purple-800">
                    Puntos: <span className="text-pink-600">{score}</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-800">
                    Tiempo: <span className="text-pink-600">{timeLeft}s</span>
                  </div>
                </div>

                <div
                  ref={gameAreaRef}
                  className="relative w-full h-96 bg-gradient-to-b from-pink-100 to-purple-100 rounded-2xl overflow-hidden border-2 border-purple-300"
                >
                  {hearts.map((heart) => (
                    <motion.div
                      key={heart.id}
                      className="absolute"
                      style={{
                        left: `${heart.x}%`,
                        top: `${heart.y || 0}%`
                      }}
                    >
                      <Heart size={32} fill="#FF69B4" color="#FF69B4" />
                    </motion.div>
                  ))}

                  <motion.div
                    className="absolute bottom-4 w-20 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-t-full border-4 border-pink-600"
                    style={{ left: `${basketPosition}%` }}
                    animate={{ left: `${basketPosition}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>

                <p className="text-center text-gray-600 mt-4 text-sm">
                  Usa ← → o A/D para mover la canasta
                </p>
              </motion.div>
            )}

            {gameState === 'finished' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border-4 border-pink-300 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={100} fill="#FF69B4" color="#FF69B4" className="mx-auto mb-6" />
                </motion.div>

                <h2 className="text-3xl font-bold text-purple-800 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  ¡Increíble! 💝
                </h2>

                <p className="text-2xl font-bold text-pink-600 mb-6">
                  Atrapaste {score} corazones
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  {score >= 30
                    ? "¡Eres increíble! Así como atrapaste estos corazones, tú atrapaste el mío desde el primer momento. Cada corazón que atrapaste representa un momento especial que hemos compartido. Te amo infinitamente. 💛"
                    : score >= 15
                    ? "¡Muy bien! Cada corazón que atrapaste es como cada vez que me haces sonreír. No importa cuántos sean, todos son especiales porque vienen de ti. Te amo con todo mi corazón. 💛"
                    : "Lo importante no es cuántos corazones atrapaste, sino que mi corazón es completamente tuyo. Cada momento contigo vale más que mil corazones. Te amo más de lo que imaginas. 💛"}
                </p>

                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={startGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  >
                    Jugar de Nuevo
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-700 border-2 border-purple-500 px-6 py-3 rounded-full font-bold shadow-lg"
                  >
                    Volver al Inicio
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default CatchTheHearts;