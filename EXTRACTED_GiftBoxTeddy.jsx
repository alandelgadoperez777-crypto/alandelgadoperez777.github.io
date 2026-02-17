import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * CAJA REGALO CON OSITO (TEDDY BEAR IN GIFT BOX)
 * 
 * DEPENDENCIAS NECESARIAS:
 * - gsap (npm install gsap)
 * 
 * INSTALACIÓN EN TU PROYECTO:
 * 1. Copia este archivo a tu carpeta de componentes
 * 2. Instala gsap: npm install gsap
 * 3. Importa y usa: <GiftBoxTeddy />
 * 
 * PARÁMETROS:
 * - className: clases CSS adicionales
 * - onOpen: callback que se ejecuta cuando se abre la caja
 */

const GiftBoxTeddy = ({ className, onOpen }) => {
  const containerRef = useRef(null);
  const lidRef = useRef(null);
  const ribbonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpen) onOpen();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ribbon pop
      tl.to(ribbonRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 0.3
      });

      // Lid pop up
      tl.to(lidRef.current, {
        y: -40,
        rotation: -15,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.5)"
      });

    }, containerRef);
  };

  return (
    <div ref={containerRef} className={`relative cursor-pointer group ${className}`} onClick={handleClick}>
      <div className="w-32 h-32 relative flex items-end justify-center">
        
        {/* Box Body */}
        <div className="w-24 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-sm shadow-lg relative z-10 flex justify-center">
           <div className="w-4 h-full bg-red-700/50"></div>
        </div>

        {/* Surprise Item (Hidden inside) */}
        <div className="absolute bottom-2 z-0">
           <span className="text-4xl filter drop-shadow-md">🧸</span>
        </div>

        {/* Lid */}
        <div ref={lidRef} className="absolute bottom-16 w-28 h-6 bg-red-600 rounded-sm shadow-md z-20 flex justify-center items-center">
           <div className="w-4 h-full bg-red-800/50"></div>
           {/* Ribbon Bow */}
           <div ref={ribbonRef} className="absolute -top-4 text-yellow-400 filter drop-shadow-sm">
             <svg width="40" height="20" viewBox="0 0 40 20">
               <path d="M20,10 C10,0 0,10 20,20 C40,10 30,0 20,10" fill="currentColor" />
             </svg>
           </div>
        </div>

        {!isOpen && (
          <div className="absolute -top-8 text-xs bg-white/80 px-2 py-1 rounded-full text-red-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Click!
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftBoxTeddy;
