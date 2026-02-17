import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Gift, Heart, TreeDeciduous, Flower2, Stars, Gamepad2, Moon, ArrowLeft,
  Sun, Anchor, Music
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';

const ModalSelector = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const items = [
    { id: 'letter', title: 'Carta Interactiva', icon: Mail, color: 'bg-pink-100 text-pink-600', path: '/envelope' },
    { id: 'gift', title: 'Regalo Sorpresa', icon: Gift, color: 'bg-purple-100 text-purple-600', path: '/gift' },
    { id: 'quiz', title: 'Cuestionario', icon: Heart, color: 'bg-red-100 text-red-600', path: '/questionnaire' },
    { id: 'tree', title: 'Árbol de Amor', icon: TreeDeciduous, color: 'bg-green-100 text-green-600', component: 'ArbolDeCorazones' },
    { id: 'flower', title: 'Flor Matemática', icon: Flower2, color: 'bg-yellow-100 text-yellow-600', component: 'FlorMatematica' },
    { id: 'sunflower', title: 'Girasol que Crece', icon: Sun, color: 'bg-amber-100 text-amber-600', path: '/sunflower' },
    { id: 'galaxy', title: 'Galaxia', icon: Stars, color: 'bg-indigo-100 text-indigo-600', component: 'GalaxiaDeCorazones' },
    { id: 'game', title: 'Mini Juego', icon: Gamepad2, color: 'bg-blue-100 text-blue-600', path: '/game' },
    
    // New Items
    { id: 'flower-magic', title: 'Flor Psicodélica', icon: Flower2, color: 'bg-fuchsia-100 text-fuchsia-600', path: '/psychedelic-flower' },
    { id: 'boat', title: 'Aventura Marina', icon: Anchor, color: 'bg-cyan-100 text-cyan-600', path: '/aventura-marina' },
    { id: 'rhythm', title: 'Ritmo Musical', icon: Music, color: 'bg-pink-100 text-pink-600', path: '/ritmo-musical' },

    { id: 'theme', title: 'Modo Día/Noche', icon: Moon, color: 'bg-slate-100 text-slate-600', action: toggleTheme },
  ];

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.action) {
      item.action();
    } else if (item.component) {
      navigate(`/${item.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#1A1A2E] p-6 pt-20 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/')} className="mr-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors dark:text-white">
            <ArrowLeft />
          </button>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white font-handwriting">
            Elige una sorpresa
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-white/80 dark:bg-white/10 backdrop-blur-sm h-full"
                onClick={() => handleItemClick(item)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-40">
                  <div className={`p-3 rounded-full mb-3 ${item.color} dark:bg-opacity-20`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">{item.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalSelector;