import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/contexts/SoundContext';

const RitmoMusical = () => {
  const navigate = useNavigate();
  const { currentTrack } = useSound();
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [notes, setNotes] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'Perfect!', 'Miss'
  
  const gameLoopRef = useRef();
  const lastSpawnRef = useRef(0);
  const scoreRef = useRef(0);

  // Tempo dinámico basado en la canción (BPM) - por defecto 120 BPM
  const calculateTempo = () => {
    const bpmMap = {
      // Soda Stereo (aprox 110-130 BPM)
      'cancion-animal': 700, // 120 BPM
      'de-musica-ligera': 700,
      'doble-vida': 650, // 130 BPM
      'signos': 700,
      'plata-o-plomo': 680,
      'persiana-americana': 750,
      'hombre-espejo': 700,
      'bajan': 750,
      // Gustavo Cerati (aprox 90-120 BPM)
      'karaoke': 800, // 110 BPM
      'cactus': 800,
      'clocks': 750,
      'crappy-blues': 750,
      'adiós-tristemente': 800,
      'otra-cruz': 800,
      // Arctic Monkeys (aprox 100-140 BPM)
      'brianstorm': 600, // 140 BPM
      'seven': 700, // 130 BPM
      'mardy': 750,
      'when-sun': 750,
      'pretty-visitors': 700,
      'lonesome': 800,
      // Minecraft (aprox 80-100 BPM)
      'minecraft': 1000, // 60 BPM slow
      'wet-hands': 900,
      'sweden': 950,
      'key': 850,
      'last-disc': 1100,
      'calm-1': 1200
    };
    
    const trackName = currentTrack?.filename?.replace('.mp3', '') || '';
    return bpmMap[trackName] || 800; // Default 800ms (120 BPM)
  };

  // Game Constants
  const TARGET_Y = 85; // Percentage down screen
  const HIT_WINDOW = 10; // +/- percentage
  const TEMPO = calculateTempo();

  // Controls
  useEffect(() => {
    const handleInput = (e) => {
      if (gameState !== 'playing') return;
      if (e.type === 'keydown' && e.code !== 'Space') return;
      
      // Check for hits
      let hit = false;
      setNotes(prev => {
        const newNotes = [...prev];
        // Find closest note to target
        const targetNoteIndex = newNotes.findIndex(n => Math.abs(n.y - TARGET_Y) < HIT_WINDOW);
        
        if (targetNoteIndex !== -1) {
          // Hit!
          hit = true;
          const note = newNotes[targetNoteIndex];
          const accuracy = Math.abs(note.y - TARGET_Y);
          
          // Calculate points based on accuracy
          const points = accuracy < 3 ? 100 : 50;
          const feedbackText = accuracy < 3 ? "¡Perfecto!" : "¡Bien!";
          
          setScore(s => s + points + (combo * 10));
          setCombo(c => c + 1);
          setFeedback({ text: feedbackText, id: Date.now() });
          
          // Remove hit note
          newNotes.splice(targetNoteIndex, 1);
        } else {
          // Miss (pressed but no note)
          setCombo(0);
          setFeedback({ text: "¡Ups!", id: Date.now() });
        }
        return newNotes;
      });
    };

    window.addEventListener('keydown', handleInput);
    // Mobile tap handler is on the button
    return () => window.removeEventListener('keydown', handleInput);
  }, [gameState, combo]);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const loop = (timestamp) => {
      // Spawn notes
      if (timestamp - lastSpawnRef.current > TEMPO) { // Tempo dinámico
        setNotes(prev => [...prev, { id: Date.now(), y: -10 }]);
        lastSpawnRef.current = timestamp;
      }

      setNotes(prev => {
        const nextNotes = [];
        let miss = false;

        prev.forEach(note => {
          const newY = note.y + 0.8; // Speed
          if (newY > 100) {
            miss = true; // Note passed without hit
          } else {
            nextNotes.push({ ...note, y: newY });
          }
        });

        if (miss) setCombo(0);
        return nextNotes;
      });

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState]);

  // Timer - Reajustar si cambios la canción
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState('finished');
    }, 45000); // 45 seconds
    return () => clearTimeout(timer);
  }, [currentTrack]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center overflow-hidden">
      {/* Header */}
      <div className="w-full p-4 flex justify-between items-center z-20 bg-slate-800/50 backdrop-blur-md">
        <div className="text-white">
          <div className="text-2xl font-bold">{score}</div>
          <div className="text-sm text-pink-400 font-bold">COMBO x{combo}</div>
          <div className="text-xs text-gray-400 mt-1">{currentTrack?.title || 'Canción'}</div>
        </div>
        <button onClick={() => navigate('/menu')} className="text-white/70 hover:text-white">
          <X size={24} />
        </button>
      </div>

      {/* Game Lane */}
      <div className="relative w-full max-w-md h-full bg-slate-800/30 border-x-2 border-slate-700">
        {/* Target Zone */}
        <div 
          className="absolute w-full h-20 border-y-4 border-pink-500/50 bg-pink-500/10 flex items-center justify-center"
          style={{ top: `${TARGET_Y}%`, transform: 'translateY(-50%)' }}
        >
          <div className="w-full h-1 bg-pink-500/30" />
        </div>

        {/* Notes */}
        {notes.map(note => (
          <div
            key={note.id}
            className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.6)] flex items-center justify-center z-10"
            style={{ top: `${note.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <Music size={24} className="text-white" />
          </div>
        ))}

        {/* Feedback Popup */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1.2, y: -50 }}
              exit={{ opacity: 0 }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 font-bold text-4xl ${
                feedback.text.includes('Perfect') ? 'text-yellow-400' : 
                feedback.text.includes('Ups') ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Button / Desktop Hint */}
      <div className="absolute bottom-8 z-30">
        <button
          className="w-24 h-24 rounded-full bg-pink-600 border-4 border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.5)] active:scale-95 transition-transform flex items-center justify-center"
          onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }))}
        >
          <Zap size={40} className="text-white" />
        </button>
        <p className="text-white/50 text-center mt-4 text-sm">
          Presiona ESPACIO o TOCA el botón
        </p>
      </div>

      {/* Game Over */}
      {gameState === 'finished' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
        >
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-600 text-center max-w-sm w-full">
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">¡Ritmo Perfecto!</h2>
            <div className="text-5xl font-bold text-pink-400 mb-6">{score}</div>
            <p className="text-lg text-gray-300 mb-8 italic">
              "Contigo todo suena mejor, eres mi melodía favorita." 🎵💛
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setScore(0);
                  setCombo(0);
                  setNotes([]);
                  setGameState('playing');
                }}
                className="bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="bg-slate-600 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-500 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RitmoMusical;