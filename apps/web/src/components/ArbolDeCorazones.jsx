import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

// This component now implements the "Dynamically Emerging Mathematical Flower"
// replacing the previous tree concept as requested.
const ArbolDeCorazones = ({ onClose }) => {
  const [petals, setPetals] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  const messages = [
    "Eres única", "Mi sol", "Mi luna", "Te adoro", 
    "Mi vida", "Mi amor", "Preciosa", "Mágica",
    "Dulce", "Tierna", "Bella", "Radiante", "Increíble"
  ];

  // Generate petals with golden ratio spiral
  useEffect(() => {
    const newPetals = [];
    const goldenAngle = 137.5;
    const c = 12; // Spacing factor

    for (let i = 0; i < 60; i++) {
      const angle = i * goldenAngle;
      const radius = c * Math.sqrt(i);
      const x = radius * Math.cos(angle * Math.PI / 180);
      const y = radius * Math.sin(angle * Math.PI / 180);
      
      newPetals.push({
        id: i,
        x,
        y,
        angle,
        delay: i * 0.05, // Staggered emergence
        color: `hsl(${330 + (i % 40)}, 80%, ${60 + (i % 20)}%)`, // Pink gradients
        message: messages[i % messages.length]
      });
    }
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0b1a] overflow-hidden">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-50"
      >
        <X size={24} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Central Pulsing Heart */}
        <motion.div
          className="absolute z-20 cursor-pointer"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => setActiveMessage("¡Eres el centro de mi universo!")}
        >
          <Heart size={40} fill="#FFD700" className="text-yellow-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
        </motion.div>

        {/* Mathematical Petals */}
        <div className="relative">
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute w-6 h-6 rounded-full shadow-sm cursor-pointer flex items-center justify-center"
              style={{
                backgroundColor: petal.color,
                left: petal.x,
                top: petal.y,
                marginLeft: -12, // Center offset
                marginTop: -12,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: petal.delay, 
                duration: 0.5, 
                type: "spring" 
              }}
              whileHover={{ scale: 1.5, zIndex: 10 }}
              onClick={() => setActiveMessage(petal.message)}
            >
              <div className="w-1 h-1 bg-white/50 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Message Overlay */}
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full shadow-2xl"
            >
              <p className="text-xl font-bold text-white font-handwriting tracking-wide">
                {activeMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute bottom-8 text-white/30 text-sm font-light">
          Toca los pétalos para descubrir mensajes
        </div>
      </div>
    </div>
  );
};

export default ArbolDeCorazones;