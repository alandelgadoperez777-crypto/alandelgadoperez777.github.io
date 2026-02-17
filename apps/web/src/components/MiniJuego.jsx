import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Trophy } from 'lucide-react';

const MiniJuego = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState('playing'); // playing, finished
  const [playerX, setPlayerX] = useState(50); // Percentage
  const [fallingHearts, setFallingHearts] = useState([]);
  const gameLoopRef = useRef();
  const lastSpawnRef = useRef(0);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setPlayerX(prev => Math.max(0, prev - 5));
      if (e.key === 'ArrowRight') setPlayerX(prev => Math.min(95, prev + 5));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const loop = (timestamp) => {
      if (timestamp - lastSpawnRef.current > 800) {
        setFallingHearts(prev => [
          ...prev, 
          { id: Date.now(), x: Math.random() * 90, y: -10 }
        ]);
        lastSpawnRef.current = timestamp;
      }

      setFallingHearts(prev => {
        const next = prev.map(h => ({ ...h, y: h.y + 1 })).filter(h => h.y < 100);
        
        // Collision detection
        const caught = next.filter(h => h.y > 85 && h.y < 95 && Math.abs(h.x - playerX) < 10);
        if (caught.length > 0) {
          setScore(s => s + caught.length);
          return next.filter(h => !(h.y > 85 && h.y < 95 && Math.abs(h.x - playerX) < 10));
        }
        return next;
      });

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, playerX]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-pink-100 to-purple-200 flex flex-col items-center justify-center overflow-hidden">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors z-50"
      >
        <X size={24} />
      </button>

      {gameState === 'playing' ? (
        <>
          <div className="absolute top-4 left-4 text-2xl font-bold text-pink-600">
            Puntos: {score}
          </div>
          <div className="absolute top-4 center text-2xl font-bold text-purple-600">
            Tiempo: {timeLeft}s
          </div>

          {/* Player */}
          <div 
            className="absolute bottom-4 w-16 h-16 bg-pink-500 rounded-t-full flex items-center justify-center transition-all duration-75"
            style={{ left: `${playerX}%` }}
          >
            <div className="w-12 h-12 border-4 border-white rounded-full" />
          </div>

          {/* Hearts */}
          {fallingHearts.map(h => (
            <div 
              key={h.id}
              className="absolute text-red-500"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <Heart fill="currentColor" />
            </div>
          ))}
          
          {/* Mobile Controls Overlay */}
          <div className="absolute inset-0 flex z-40 opacity-0">
            <div className="w-1/2 h-full" onClick={() => setPlayerX(p => Math.max(0, p - 10))} />
            <div className="w-1/2 h-full" onClick={() => setPlayerX(p => Math.min(90, p + 10))} />
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4"
        >
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-pink-600 mb-2">¡Juego Terminado!</h2>
          <p className="text-xl text-gray-700 mb-6">Atrapaste {score} corazones para mí.</p>
          <p className="text-gray-500 italic mb-6">"Ganaste mi corazón hace mucho tiempo..."</p>
          <button 
            onClick={onClose}
            className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors"
          >
            Volver al Menú
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MiniJuego;