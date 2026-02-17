import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

// Lista completa de canciones
const PLAYLIST = [
  // Soda Stereo
  { id: 1, title: 'Canción Animal', artist: 'Soda Stereo', filename: 'cancion-animal.mp3' },
  { id: 2, title: 'Entre Caníbales', artist: 'Soda Stereo', filename: 'entre-canibales.mp3' },
  { id: 3, title: 'Sobredosis de TV', artist: 'Soda Stereo', filename: 'sobredosis-tv.mp3' },
  { id: 4, title: 'Te para 3', artist: 'Soda Stereo', filename: 'te-para-3.mp3' },
  { id: 5, title: 'La Ciudad de la Furia', artist: 'Soda Stereo', filename: 'la-ciudad-furia.mp3' },
  { id: 6, title: 'Luna Roja', artist: 'Soda Stereo', filename: 'luna-roja.mp3' },
  { id: 7, title: 'Prófugos', artist: 'Soda Stereo', filename: 'profugos.mp3' },
  { id: 8, title: 'Mi Cosita Linda', artist: 'Soda Stereo', filename: 'mi-cosita-linda-ss.mp3' },
  
  // Gustavo Cerati (Solista)
  { id: 9, title: 'Vivo', artist: 'Gustavo Cerati', filename: 'vivo.mp3' },
  { id: 10, title: 'Fantasma', artist: 'Gustavo Cerati', filename: 'fantasma.mp3' },
  { id: 11, title: 'Amor Amarillo', artist: 'Gustavo Cerati', filename: 'amor-amarillo.mp3' },
  { id: 12, title: 'Bocanada', artist: 'Gustavo Cerati', filename: 'bocanada.mp3' },
  { id: 13, title: 'Te Llevo para que me Lleves', artist: 'Gustavo Cerati', filename: 'te-llevo.mp3' },
  { id: 14, title: 'Mi Cosita Linda', artist: 'Gustavo Cerati', filename: 'mi-cosita-linda-gc.mp3' },
  
  // Arctic Monkeys
  { id: 15, title: '7', artist: 'Arctic Monkeys', filename: '7.mp3' },
  { id: 16, title: 'This House is a Circus', artist: 'Arctic Monkeys', filename: 'circus.mp3' },
  { id: 17, title: 'Still Take You Home', artist: 'Arctic Monkeys', filename: 'still-take-home.mp3' },
  { id: 18, title: 'The Jeweller\'s Hands', artist: 'Arctic Monkeys', filename: 'jeweller-hands.mp3' },
  { id: 19, title: 'Dance Little Liar', artist: 'Arctic Monkeys', filename: 'dance-liar.mp3' },
  { id: 20, title: 'She\'s Thunderstorms', artist: 'Arctic Monkeys', filename: 'thunderstorms.mp3' },

  // Minecraft (C418)
  { id: 21, title: 'Minecraft', artist: 'C418 (Minecraft)', filename: 'minecraft.mp3' },
  { id: 22, title: 'Wet Hands', artist: 'C418 (Minecraft)', filename: 'wet-hands.mp3' },
  { id: 23, title: 'Sweden', artist: 'C418 (Minecraft)', filename: 'sweden.mp3' },
  { id: 24, title: 'Key', artist: 'C418 (Minecraft)', filename: 'key.mp3' },
  { id: 25, title: 'The Last Disc', artist: 'C418 (Minecraft)', filename: 'last-disc.mp3' },
  { id: 26, title: 'Calm 1', artist: 'C418 (Minecraft)', filename: 'calm-1.mp3' },
];

// Generar música simple con melodías agradables
const generateMelody = (songIndex = 0, duration = 5, sampleRate = 44100) => {
  const samples = duration * sampleRate;
  const audioData = new Int16Array(samples);
  
  // Diferentes melodías para diferentes canciones (notas musicales reales)
  const melodies = [
    [440, 494, 523, 587], // La, Si, Do, Re
    [523, 587, 659, 740], // Do, Re, Mi, Fa#
    [659, 740, 830, 932], // Mi, Fa#, Sol#, La#
    [294, 330, 349, 392], // Re, Mi, Fa, Sol
    [349, 392, 440, 494], // Fa, Sol, La, Si
    [392, 440, 494, 523], // Sol, La, Si, Do
    [330, 349, 392, 440], // Mi, Fa, Sol, La
    [740, 830, 932, 1047], // Fa#, Sol#, La#, Do#
  ];
  
  const melody = melodies[songIndex % melodies.length];
  const noteDuration = duration / melody.length;
  
  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    const noteIndex = Math.floor((t / noteDuration) % melody.length);
    const frequency = melody[noteIndex];
    
    // Envelope para suavidad
    const notePhase = (t % noteDuration) / noteDuration;
    const envelope = notePhase < 0.1 ? notePhase * 10 : (notePhase > 0.9 ? (1 - notePhase) * 10 : 1);
    
    const wave = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.4;
    audioData[i] = Math.max(-32768, Math.min(32767, Math.round(wave * 32767)));
  }
  
  return createWAV(audioData, sampleRate);
};

const createWAV = (audioData, sampleRate) => {
  const numChannels = 1;
  const bitDepth = 16;
  const byteRate = sampleRate * numChannels * bitDepth / 8;
  const blockAlign = numChannels * bitDepth / 8;
  
  const wavBuffer = new ArrayBuffer(44 + audioData.byteLength);
  const view = new DataView(wavBuffer);
  
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + audioData.byteLength, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, audioData.byteLength, true);
  
  const audioDataView = new Int16Array(wavBuffer, 44);
  audioDataView.set(audioData);
  
  const blob = new Blob([wavBuffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

const encodeWAV = (audioData, sampleRate) => {
  const numChannels = 1;
  const bitDepth = 16;
  const byteRate = sampleRate * numChannels * bitDepth / 8;
  const blockAlign = numChannels * bitDepth / 8;
  
  const wavBuffer = new ArrayBuffer(44 + audioData.byteLength);
  const view = new DataView(wavBuffer);
  
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + audioData.byteLength, true);
  writeString(8, 'WAVE');
  
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  
  writeString(36, 'data');
  view.setUint32(40, audioData.byteLength, true);
  
  const audioDataView = new Int16Array(wavBuffer, 44);
  audioDataView.set(audioData);
  
  return wavBuffer;
};

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('soundMuted') === 'true';
  });
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem('soundVolume') || '0.7');
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // Refs
  const musicRef = useRef(null);
  const audioUrlsRef = useRef({});

  // Generar URLs de audio
  useEffect(() => {
    try {
      const urls = {};
      for (let i = 0; i < PLAYLIST.length; i++) {
        const track = PLAYLIST[i];
        // Intentar usar archivo MP3, si no existe usar melodía de prueba
        const audioPath = `/music/${track.filename}`;
        
        // Generar melodía como fallback
        const melodyUrl = generateMelody(i, 5);
        
        // Por defecto usar el archivo MP3, pero con fallback a melodía
        urls[i] = audioPath;
        
        // Intentar cargar el MP3, si falla usar la melodía
        const audio = new Audio();
        audio.src = audioPath;
        audio.onerror = () => {
          urls[i] = melodyUrl;
        };
      }
      audioUrlsRef.current = urls;
    } catch (error) {
      console.error('Error generando URLs:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('soundMuted', isMuted);
    if (musicRef.current) {
      musicRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('soundVolume', volume);
    if (musicRef.current) {
      musicRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('currentTrackIndex', currentTrackIndex);
  }, [currentTrackIndex]);

  useEffect(() => {
    if (musicRef.current && audioUrlsRef.current[currentTrackIndex]) {
      const audioUrl = audioUrlsRef.current[currentTrackIndex];
      musicRef.current.src = audioUrl;
      musicRef.current.volume = volume;
      
      if (isMusicPlaying && !isMuted) {
        musicRef.current.play().catch(err => {
          console.log('Error playing:', err);
        });
      }
    }
  }, [currentTrackIndex, isMusicPlaying, volume, isMuted]);

  const handleTrackEnd = () => {
    nextTrack();
  };

  const toggleMute = () => setIsMuted(!isMuted);
  
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const currentTrack = PLAYLIST[currentTrackIndex];

  return (
    <SoundContext.Provider value={{ 
      isMuted, 
      toggleMute, 
      volume, 
      setVolume, 
      isMusicPlaying,
      toggleMusic,
      currentTrack,
      currentTrackIndex,
      nextTrack,
      musicRef,
      handleTrackEnd,
      playlist: PLAYLIST
    }}>
      {children}
    </SoundContext.Provider>
  );
};