import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

const HeartCannon = () => {
  const [hearts, setHearts] = useState([]);
  const { playSound } = useSound();

  const shoot = () => {
    playSound('shoot');
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      angle: -45 - Math.random() * 90, // Upwards spread
      velocity: 10 + Math.random() * 10,
      size: 15 + Math.random() * 20,
      color: ['#FF69B4', '#FF1493', '#FFB6C1', '#FFD700'][Math.floor(Math.random() * 4)]
    }));
    setHearts(prev => [...prev, ...newHearts]);
    
    // Cleanup
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.includes(h)));
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={shoot}
        className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg shadow-pink-500/30 transition-colors"
      >
        <Heart className="fill-current" />
      </motion.button>

      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ 
              x: Math.cos(heart.angle * Math.PI / 180) * 200,
              y: Math.sin(heart.angle * Math.PI / 180) * 200,
              opacity: 0,
              scale: 1
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-0 pointer-events-none"
          >
            <Heart size={heart.size} fill={heart.color} color={heart.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartCannon;