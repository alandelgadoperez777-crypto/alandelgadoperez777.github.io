import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

/**
 * FLOR MÁGICA / PSYCHEDELIC FLOWER
 * 
 * DEPENDENCIAS NECESARIAS:
 * - gsap (npm install gsap)
 * - framer-motion (npm install framer-motion)
 * - lucide-react (npm install lucide-react) - opcional, para los iconos
 * 
 * INSTALACIÓN EN TU PROYECTO:
 * 1. Copia este archivo a tu carpeta de componentes
 * 2. Instala las dependencias arriba
 * 3. Importa y usa: <PsychedelicFlower />
 */

const PsychedelicFlower = () => {
  const containerRef = useRef(null);
  const stemRef = useRef(null);
  const flowerCenterRef = useRef(null);
  const petalsRef = useRef([]);
  const [hasBloomed, setHasBloomed] = useState(false);

  useEffect(() => {
    // Reset initial state
    const ctx = gsap.context(() => {
      gsap.set(stemRef.current, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(flowerCenterRef.current, { scale: 0, opacity: 0 });
      petalsRef.current.forEach(petal => {
        gsap.set(petal, { scale: 0, opacity: 0, rotation: 0 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const animateFlower = () => {
    if (hasBloomed) return;
    setHasBloomed(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Phase 1: Growth (Stem grows)
      tl.to(stemRef.current, {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
      });

      // Phase 2: Bud appears (Center)
      tl.to(flowerCenterRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      }, "-=0.3");

      // Phase 3: Bloom (Petals expand and rotate)
      petalsRef.current.forEach((petal, i) => {
        const angle = (i * 360) / 12;
        tl.to(petal, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          rotation: angle,
          ease: "elastic.out(1, 0.5)",
        }, `-=${i === 0 ? 0 : 1.1}`);
      });
      
      // Continuous rotation after bloom
      tl.to(".flower-group", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

    }, containerRef);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center" ref={containerRef}>
        <svg viewBox="0 0 400 600" className="w-full h-full overflow-visible">
          {/* Stem */}
          <path
            ref={stemRef}
            d="M200,600 Q200,400 200,300"
            stroke="#4ade80"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Flower Group */}
          <g className="flower-group" transform="translate(200, 300)">
            {/* Petals */}
            {[...Array(12)].map((_, i) => (
              <ellipse
                key={i}
                ref={el => petalsRef.current[i] = el}
                cx="0"
                cy="-60"
                rx="20"
                ry="60"
                fill={`hsl(${320 + (i * 10)}, 80%, 75%)`}
                stroke="white"
                strokeWidth="2"
                transform="scale(0)"
                style={{ transformOrigin: "0 60px" }}
              />
            ))}

            {/* Center */}
            <circle
              ref={flowerCenterRef}
              r="30"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            
            {/* Face details (cute) */}
            <g ref={flowerCenterRef} style={{ opacity: 0 }}> 
              <circle cx="-10" cy="-5" r="3" fill="#000" />
              <circle cx="10" cy="-5" r="3" fill="#000" />
              <path d="M-10,10 Q0,20 10,10" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>

      <div className="z-10 mt-8 text-center space-y-6">
        <h1 className="text-4xl font-serif text-purple-800 mb-2">
          Florece Nuestro Amor
        </h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Como esta flor, mi cariño por ti crece cada día más fuerte y hermoso.
        </p>
        
        {!hasBloomed && (
          <button 
            onClick={animateFlower} 
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            ✨ Ver Florecer
          </button>
        )}
        
        {hasBloomed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-pink-600 font-medium italic text-lg"
          >
            ¡Eres lo más bonito de mi jardín! 🌸
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PsychedelicFlower;
