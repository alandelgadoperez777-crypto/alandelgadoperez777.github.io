import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, CloudLightning, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AventuraMarina = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('playing'); // playing, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [boatX, setBoatX] = useState(50); // Percentage 0-100
  const [items, setItems] = useState([]); // { id, x, y, type: 'heart' | 'storm' }
  
  const gameLoopRef = useRef();
  const lastSpawnRef = useRef(0);
  const boatRef = useRef(boatX);

  // Sync ref for loop
  useEffect(() => {
    boatRef.current = boatX;
  }, [boatX]);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') setBoatX(prev => Math.max(5, prev - 5));
      if (e.key === 'ArrowRight' || e.key === 'd') setBoatX(prev => Math.min(95, prev + 5));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const loop = (timestamp) => {
      // Spawn items
      if (timestamp - lastSpawnRef.current > 600) {
        const type = Math.random() > 0.7 ? 'storm' : 'heart';
        setItems(prev => [
          ...prev,
          { 
            id: Date.now() + Math.random(), 
            x: Math.random() * 90 + 5, 
            y: -10, 
            type 
          }
        ]);
        lastSpawnRef.current = timestamp;
      }

      setItems(prev => {
        const nextItems = prev
          .map(item => ({ ...item, y: item.y + 0.8 })) // Fall speed
          .filter(item => item.y < 110); // Remove off-screen

        // Collision Detection
        const currentBoatX = boatRef.current;
        const caughtItems = [];
        const remainingItems = [];

        nextItems.forEach(item => {
          // Simple box collision: Boat is roughly at bottom 10%, width ~15%
          const hitY = item.y > 80 && item.y < 95;
          const hitX = Math.abs(item.x - currentBoatX) < 10;

          if (hitY && hitX) {
            caughtItems.push(item);
          } else {
            remainingItems.push(item);
          }
        });

        if (caughtItems.length > 0) {
          caughtItems.forEach(item => {
            if (item.type === 'heart') {
              setScore(s => s + 10);
            } else {
              setScore(s => Math.max(0, s - 20)); // Penalty
            }
          });
        }

        return remainingItems;
      });

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-orange-300 via-pink-300 to-indigo-900 overflow-hidden">
      {/* UI Layer */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-50">
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-white font-bold shadow-lg">
          <div>Puntos: {score}</div>
          <div className="text-sm opacity-80">Tiempo: {timeLeft}s</div>
        </div>
        <button 
          onClick={() => navigate('/menu')}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Background Elements */}
      <div className="absolute bottom-0 w-full h-1/3 bg-blue-600 opacity-50 z-10 animate-pulse" />
      <div className="absolute bottom-0 w-full h-1/4 bg-blue-800 opacity-60 z-20" />
      
      {/* Sun */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-400 rounded-full blur-xl opacity-60" />

      {gameState === 'playing' ? (
        <>
          {/* Falling Items */}
          {items.map(item => (
            <div
              key={item.id}
              className="absolute transition-transform"
              style={{ 
                left: `${item.x}%`, 
                top: `${item.y}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {item.type === 'heart' ? (
                <Heart className="text-red-500 drop-shadow-lg" fill="currentColor" size={28} />
              ) : (
                <CloudLightning className="text-gray-700 drop-shadow-lg" fill="gray" size={32} />
              )}
            </div>
          ))}

          {/* Player Boat */}
          <div 
            className="absolute bottom-10 transition-all duration-100 ease-linear z-30"
            style={{ left: `${boatX}%`, transform: 'translateX(-50%)' }}
          >
            <svg width="80" height="60" viewBox="0 0 100 80">
              {/* Sail */}
              <path d="M50 10 L50 50 L80 50 Z" fill="#FFF" />
              <path d="M45 15 L45 50 L20 50 Z" fill="#EEE" />
              {/* Hull */}
              <path d="M10 50 L90 50 L80 70 L20 70 Z" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
              {/* Mast */}
              <line x1="48" y1="10" x2="48" y2="50" stroke="#5D4037" strokeWidth="3" />
            </svg>
          </div>

          {/* Touch Controls Overlay */}
          <div className="absolute inset-0 z-40 flex">
            <div 
              className="w-1/2 h-full active:bg-white/5 transition-colors"
              onTouchStart={() => {}} // Prevent default
              onClick={() => setBoatX(prev => Math.max(5, prev - 10))}
            />
            <div 
              className="w-1/2 h-full active:bg-white/5 transition-colors"
              onTouchStart={() => {}}
              onClick={() => setBoatX(prev => Math.min(95, prev + 10))}
            />
          </div>
          <div className="absolute bottom-4 w-full text-center text-white/50 text-sm pointer-events-none z-50">
            Toca izquierda / derecha para moverte
          </div>
        </>
      ) : (
        /* Game Over Screen */
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
        >
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-blue-600 font-handwriting mb-2">
              ¡Aventura Completada!
            </h2>
            <div className="text-4xl font-bold text-gray-800 mb-4">{score} pts</div>
            <p className="text-lg text-gray-600 mb-8 italic">
              "Eres la capitana de mi aventura, navegando directo a mi corazón." ⛵💛
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setScore(0);
                  setTimeLeft(45);
                  setItems([]);
                  setGameState('playing');
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors"
              >
                Jugar de nuevo
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AventuraMarina;