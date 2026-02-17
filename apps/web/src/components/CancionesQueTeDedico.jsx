import React from 'react';
import { motion } from 'framer-motion';
import { X, Music, ExternalLink, Heart, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CancionesQueTeDedico = () => {
  const navigate = useNavigate();

  const songs = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      message: "Porque eres perfecta para mí, en cada sentido.",
      link: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0eMD4v",
      color: "bg-rose-100 text-rose-800 border-rose-200"
    },
    {
      title: "Just the Way You Are",
      artist: "Bruno Mars",
      message: "Nunca cambies, me encantas tal como eres.",
      link: "https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ",
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      title: "All of Me",
      artist: "John Legend",
      message: "Te doy todo de mí, porque tú me das todo de ti.",
      link: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a",
      color: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      message: "Te amaré hasta que tengamos 70 años... y más allá.",
      link: "https://open.spotify.com/track/34gCuhDGsG4bRPIf9bb02f",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDF2F8] p-6 pt-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <Music className="absolute top-20 left-10 w-32 h-32 text-pink-500 rotate-12" />
        <Music className="absolute bottom-40 right-20 w-48 h-48 text-purple-500 -rotate-12" />
        <Heart className="absolute top-1/2 left-1/2 w-64 h-64 text-red-500 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      </div>

      <button 
        onClick={() => navigate('/menu')}
        className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-50 text-gray-700"
      >
        <X size={24} />
      </button>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 font-handwriting mb-4">
            Canciones para Ti 🎵
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "La música expresa lo que no puede ser dicho y aquello sobre lo que es imposible permanecer en silencio."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {songs.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl border-2 shadow-sm hover:shadow-md transition-all ${song.color} bg-white/80 backdrop-blur-sm`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{song.title}</h3>
                  <p className="text-sm font-medium opacity-75 flex items-center gap-2">
                    <Headphones size={14} /> {song.artist}
                  </p>
                </div>
                <a 
                  href={song.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
                  title="Escuchar"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              
              <div className="bg-white/50 p-4 rounded-xl italic text-sm leading-relaxed">
                "{song.message}"
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          Cada nota me recuerda a ti... ❤️
        </motion.div>
      </div>
    </div>
  );
};

export default CancionesQueTeDedico;