import React from 'react';
import { Heart } from 'lucide-react';

const Footer = ({ creatorName = "Tu Amor" }) => {
  return (
    <footer className="w-full py-6 text-center relative z-10 mt-auto">
      <div className="flex items-center justify-center gap-2 text-sm font-medium opacity-70 dark:text-white/60 text-gray-600">
        <span>Hecho con</span>
        <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
        <span>por {creatorName}</span>
      </div>
    </footer>
  );
};

export default Footer;