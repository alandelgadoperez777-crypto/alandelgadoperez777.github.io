import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Sunflower = () => {
  const [bloomState, setBloomState] = useState(0); // 0: seed, 1: growing, 2: blooming

  useEffect(() => {
    const t1 = setTimeout(() => setBloomState(1), 500);
    const t2 = setTimeout(() => setBloomState(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Generate petals
  const petals = Array.from({ length: 16 }, (_, i) => i * (360 / 16));

  return (
    <div className="relative w-64 h-80 flex items-end justify-center overflow-visible">
      {/* Main Container with Wind Sway */}
      <motion.div
        className="relative w-full h-full flex items-end justify-center"
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Stem */}
        <motion.div
          className="w-3 bg-gradient-to-t from-green-800 to-green-600 rounded-full origin-bottom relative"
          initial={{ height: 0 }}
          animate={{ height: bloomState >= 1 ? 220 : 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Leaf Left 1 */}
          <motion.div 
            className="absolute left-0 bottom-10 w-10 h-6 bg-green-600 rounded-tr-3xl rounded-bl-3xl origin-right"
            initial={{ scale: 0, x: -10, rotate: -30 }}
            animate={{ scale: bloomState >= 1 ? 1 : 0 }}
            transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
          />
          {/* Leaf Right 1 */}
          <motion.div 
            className="absolute right-0 bottom-24 w-12 h-7 bg-green-600 rounded-tl-3xl rounded-br-3xl origin-left"
            initial={{ scale: 0, x: 10, rotate: 30 }}
            animate={{ scale: bloomState >= 1 ? 1 : 0 }}
            transition={{ delay: 1.3, duration: 0.8, type: "spring" }}
          />
           {/* Leaf Left 2 */}
           <motion.div 
            className="absolute left-0 bottom-40 w-9 h-5 bg-green-500 rounded-tr-3xl rounded-bl-3xl origin-right"
            initial={{ scale: 0, x: -9, rotate: -20 }}
            animate={{ scale: bloomState >= 1 ? 1 : 0 }}
            transition={{ delay: 1.6, duration: 0.8, type: "spring" }}
          />
        </motion.div>

        {/* Flower Head Container - Rotates independently for extra life */}
        <motion.div
          className="absolute bottom-[210px]"
          initial={{ scale: 0 }}
          animate={{ 
            scale: bloomState === 2 ? 1 : bloomState === 1 ? 0.1 : 0,
          }}
          transition={{ 
            scale: { duration: 1.2, delay: 2.0, type: "spring", bounce: 0.5 }
          }}
        >
          <motion.div
             animate={{ rotate: [0, 5, 0, -5, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="relative flex items-center justify-center"
          >
            {/* Petals */}
            {petals.map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-24 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-[100%] origin-bottom shadow-sm"
                style={{ 
                  bottom: 0, 
                  rotate: angle,
                  transformOrigin: '50% 100%'
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ 
                  delay: 2.2 + i * 0.05, 
                  duration: 0.6,
                  ease: "backOut"
                }}
              />
            ))}
            
            {/* Center Disk */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full z-10 flex items-center justify-center shadow-inner border-4 border-amber-900/50">
              {/* Seeds pattern */}
              <div className="w-20 h-20 rounded-full opacity-40" 
                   style={{ 
                     backgroundImage: 'radial-gradient(#5D4037 15%, transparent 16%)',
                     backgroundSize: '8px 8px' 
                   }} 
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sunflower;