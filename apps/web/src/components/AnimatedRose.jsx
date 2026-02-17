import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedRose = () => {
  const [bloomState, setBloomState] = useState(0); // 0: bud, 1: blooming, 2: full bloom

  useEffect(() => {
    const t1 = setTimeout(() => setBloomState(1), 500);
    const t2 = setTimeout(() => setBloomState(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Petal layers configuration
  const petals = [
    { angle: 0, scale: 1, color: '#D32F2F', delay: 0 },
    { angle: 45, scale: 0.9, color: '#C62828', delay: 0.1 },
    { angle: 90, scale: 0.9, color: '#B71C1C', delay: 0.2 },
    { angle: 135, scale: 0.8, color: '#D32F2F', delay: 0.3 },
    { angle: 180, scale: 0.8, color: '#E53935', delay: 0.4 },
    { angle: 225, scale: 0.7, color: '#F44336', delay: 0.5 },
    { angle: 270, scale: 0.7, color: '#EF5350', delay: 0.6 },
    { angle: 315, scale: 0.6, color: '#E57373', delay: 0.7 },
    // Inner core
    { angle: 10, scale: 0.5, color: '#FFCDD2', delay: 0.8 },
    { angle: 190, scale: 0.4, color: '#FFEBEE', delay: 0.9 },
  ];

  return (
    <div className="relative w-64 h-80 flex items-end justify-center overflow-visible">
      {/* Main Container with Wind Sway */}
      <motion.div
        className="relative w-full h-full flex items-end justify-center"
        animate={{ rotate: [0, 2, 0, -1, 0] }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Stem */}
        <motion.div
          className="w-2 bg-gradient-to-t from-green-900 to-green-600 rounded-full origin-bottom relative"
          initial={{ height: 0 }}
          animate={{ height: bloomState >= 1 ? 200 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Thorns */}
          <motion.div 
            className="absolute left-0 bottom-16 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-green-800"
            style={{ rotate: -45, x: -3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
          <motion.div 
            className="absolute right-0 bottom-32 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-green-800"
            style={{ rotate: 45, x: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          />

          {/* Leaf Left */}
          <motion.div 
            className="absolute left-0 bottom-24 w-10 h-6 bg-green-700 rounded-tr-3xl rounded-bl-3xl origin-right shadow-sm"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: bloomState >= 1 ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          />
          {/* Leaf Right */}
          <motion.div 
            className="absolute right-0 bottom-40 w-12 h-7 bg-green-600 rounded-tl-3xl rounded-br-3xl origin-left shadow-sm"
            initial={{ scale: 0, rotate: 30 }}
            animate={{ scale: bloomState >= 1 ? 1 : 0 }}
            transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
          />
        </motion.div>

        {/* Flower Head Container */}
        <motion.div
          className="absolute bottom-[190px]"
          initial={{ scale: 0 }}
          animate={{ 
            scale: bloomState === 2 ? 1 : bloomState === 1 ? 0.2 : 0,
          }}
          transition={{ 
            scale: { duration: 1.5, delay: 1.2, type: "spring", bounce: 0.4 }
          }}
        >
          <motion.div
             animate={{ rotate: [0, 3, 0, -3, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="relative flex items-center justify-center"
          >
            {/* Sepals (Green base leaves under flower) */}
            {[0, 90, 180, 270].map((angle, i) => (
               <div 
                 key={`sepal-${i}`}
                 className="absolute w-4 h-12 bg-green-700 rounded-full origin-bottom"
                 style={{ transform: `rotate(${angle + 45}deg) translateY(10px)` }}
               />
            ))}

            {/* Petals */}
            {petals.map((petal, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-16 rounded-[50%_50%_40%_40%] origin-bottom shadow-inner border border-white/10"
                style={{ 
                  backgroundColor: petal.color,
                  bottom: 0, 
                  rotate: petal.angle,
                  zIndex: i,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: petal.scale, opacity: 1 }}
                transition={{ 
                  delay: 1.5 + petal.delay, 
                  duration: 1,
                  ease: "backOut"
                }}
              />
            ))}
            
            {/* Center Glow */}
            <div className="absolute w-4 h-4 bg-red-900 rounded-full blur-sm z-20 opacity-50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedRose;