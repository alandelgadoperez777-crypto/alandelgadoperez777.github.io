import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FlorMatematica = ({ onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let n = 0;
    const c = 8; // Scaling factor

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      // Don't clear completely to create trail effect, or clear for clean look
      // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // For this effect, let's build it up
      if (n > 2000) return; // Stop after some points

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw a batch of points per frame for speed
      for (let i = 0; i < 5; i++) {
        const a = n * 137.5; // Golden angle
        const r = c * Math.sqrt(n);
        const x = r * Math.cos(a * Math.PI / 180) + centerX;
        const y = r * Math.sin(a * Math.PI / 180) + centerY;

        const hue = (n % 60) + 330; // Pinkish range
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.fill();
        n++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/20 text-white rounded-full hover:bg-white/40 transition-colors z-50"
      >
        <X size={24} />
      </button>
      <canvas ref={canvasRef} className="block" />
      <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 font-light pointer-events-none">
        La belleza de las matemáticas, como la tuya, es infinita.
      </div>
    </div>
  );
};

export default FlorMatematica;