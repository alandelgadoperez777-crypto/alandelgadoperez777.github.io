import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TimeCounter from '@/components/TimeCounter';
import AnimatedRose from '@/components/AnimatedRose';
import FloatingHearts from '@/components/FloatingHearts';
import HeartCannon from '@/components/HeartCannon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Para Ángela 💛</title>
      </Helmet>
      
      <div className="min-h-screen relative overflow-hidden bg-[#F5F1E8] dark:bg-[#1A1A2E] transition-colors duration-500 flex flex-col">
        <Header />
        <FloatingHearts />
        
        <main className="flex-grow flex flex-col items-center justify-center relative z-10 p-4 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-center mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 dark:text-white mb-2 font-handwriting text-shadow-romantic">
              Para Angela 🙃🙂
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light tracking-widest uppercase">
              Mi lugar favorito eres tú
            </p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.5, duration: 0.8 }} 
            className="mb-10"
          >
            <TimeCounter startDate="2025-01-01T00:00:00" />
          </motion.div>

          <div className="relative h-80 w-full flex justify-center mb-12">
            <AnimatedRose />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => navigate('/menu')} 
            className="px-10 py-4 bg-gray-800 dark:bg-white text-white dark:text-gray-900 rounded-full text-xl font-bold tracking-wider shadow-xl hover:shadow-2xl transition-all z-20"
          >
            ENTRAR
          </motion.button>
        </main>

        <Footer creatorName="Tu Amor" />
        <HeartCannon />
      </div>
    </>
  );
};

export default HomePage;