import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimeCounter = ({ startDate = '2024-01-01T00:00:00' }) => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const start = new Date(startDate);
    const calculateTime = () => {
      const now = new Date();
      const diff = now - start;
      
      if (diff < 0) return; // Future date handling if needed

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="absolute text-xl sm:text-3xl font-bold text-gray-800 dark:text-white font-quicksand"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm mt-2 font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-6">
      <TimeUnit value={timeElapsed.days} label="Días" />
      <span className="text-2xl font-bold text-gray-400 -mt-6">:</span>
      <TimeUnit value={timeElapsed.hours} label="Horas" />
      <span className="text-2xl font-bold text-gray-400 -mt-6">:</span>
      <TimeUnit value={timeElapsed.minutes} label="Min" />
      <span className="text-2xl font-bold text-gray-400 -mt-6">:</span>
      <TimeUnit value={timeElapsed.seconds} label="Seg" />
    </div>
  );
};

export default TimeCounter;