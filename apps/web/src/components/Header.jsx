import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSound } from '@/contexts/SoundContext';
import { Sun, Moon, Volume2, VolumeX, Home, Music } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute, volume, setVolume, isMusicPlaying, toggleMusic } = useSound();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-30 p-4 flex justify-between items-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-2">
        {location.pathname !== '/' && (
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors dark:text-white text-gray-800 shadow-sm"
          >
            <Home size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 pointer-events-auto bg-white/10 backdrop-blur-md p-2 rounded-full shadow-sm border border-white/20">
        {/* Volume Control Group */}
        <div className="flex items-center gap-2 px-2 border-r border-white/20 pr-3">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors dark:text-white text-gray-800"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <div className="w-20 flex items-center">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[isMuted ? 0 : volume * 100]}
              max={100}
              step={1}
              onValueChange={(val) => setVolume(val[0] / 100)}
              disabled={isMuted}
            >
              <Slider.Track className="bg-gray-400/50 relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-pink-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-3 h-3 bg-white shadow-[0_2px_10px] shadow-black/20 rounded-[10px] hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Volume"
              />
            </Slider.Root>
          </div>
          <span className="text-xs font-medium w-8 text-right dark:text-white text-gray-800">
            {isMuted ? 0 : Math.round(volume * 100)}%
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full hover:bg-white/20 transition-colors dark:text-white text-gray-800"
          title={theme === 'day' ? "Modo Noche" : "Modo Día"}
        >
          {theme === 'day' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;