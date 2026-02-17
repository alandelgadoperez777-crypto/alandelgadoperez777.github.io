import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const FloatingHearts = () => {
  const { theme } = useTheme();
  
  // Generate random hearts
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 10 + Math.random() * 30,
    duration: 15 + Math.random() * 15,
    delay: Math.random() * 10,
    opacity: 0.1 + Math.random() * 0.2
  }));

  const heartColor = theme === 'dark' ? '#FFD700' : '#FF69B4'; // Gold in dark, Pink in day

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            bottom: '-10%',
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            filter: 'blur(1px)'
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, Math.sin(heart.id) * 50, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 24 24" fill={heartColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;