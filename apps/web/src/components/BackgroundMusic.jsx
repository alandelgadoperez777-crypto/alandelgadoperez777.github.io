import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/contexts/SoundContext';
import { SkipForward, Volume2 } from 'lucide-react';

const BackgroundMusic = () => {
  const { 
    currentTrack, 
    nextTrack,
    volume,
    setVolume,
    musicRef,
    handleTrackEnd,
    isMuted,
    isMusicPlaying,
    toggleMusic
  } = useSound();

  if (!currentTrack) return null;

  return (
    <>
      {/* Audio element - hidden but playing */}
      <audio
        ref={musicRef}
        onEnded={handleTrackEnd}
        crossOrigin="anonymous"
      />

      {/* Compact Music Player - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-4 left-4 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-3 max-w-xs"
      >
        <div className="flex items-center gap-3">
          {/* Music Icon */}
          <div className="text-2xl animate-bounce">🎵</div>
          
          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">{currentTrack.title}</p>
            <p className="text-xs opacity-80 truncate">{currentTrack.artist}</p>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            className="p-1.5 hover:bg-white/20 rounded-full transition flex-shrink-0"
            title={isMusicPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isMusicPlaying ? '⏸' : '▶️'}
          </button>

          {/* Next Button */}
          <button
            onClick={nextTrack}
            className="p-1.5 hover:bg-white/20 rounded-full transition flex-shrink-0"
            title="Siguiente"
          >
            <SkipForward size={16} />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Volume2 size={14} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-12 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) ${(volume * 100)}%, rgba(255,255,255,0.2) ${(volume * 100)}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BackgroundMusic;

