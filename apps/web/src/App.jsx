import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SoundProvider } from '@/contexts/SoundContext';
import { Toaster } from '@/components/ui/toaster';
import BackgroundMusic from '@/components/BackgroundMusic';

// Pages & Components
import HomePage from '@/pages/HomePage';
import ModalSelector from '@/pages/ModalSelector';
import CartaInteractiva from '@/components/CartaInteractiva';
import RegaloConOsito from '@/components/RegaloConOsito';
import RomanticQuestionnaire from '@/components/RomanticQuestionnaire';
import ArbolDeCorazones from '@/components/ArbolDeCorazones';
import FlorMatematica from '@/components/FlorMatematica';
import GalaxiaDeCorazones from '@/components/GalaxiaDeCorazones';
import GirasolQueCrece from '@/components/GirasolQueCrece';
import MiniJuego from '@/components/MiniJuego';

// New Components
import AventuraMarina from '@/components/AventuraMarina';
import RitmoMusical from '@/components/RitmoMusical';
import PsychedelicFlower from '@/components/PsychedelicFlower';

// Wrapper for components that need to act as pages with close functionality
const ComponentWrapper = ({ Component }) => {
  const navigate = useNavigate();
  return <Component onClose={() => navigate('/menu')} />;
};

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<ModalSelector />} />
            
            {/* Feature Routes */}
            <Route path="/envelope" element={<ComponentWrapper Component={CartaInteractiva} />} />
            <Route path="/gift" element={<ComponentWrapper Component={RegaloConOsito} />} />
            <Route path="/questionnaire" element={<RomanticQuestionnaire />} />
            <Route path="/game" element={<ComponentWrapper Component={MiniJuego} />} />
            
            {/* New Feature Routes */}
            <Route path="/psychedelic-flower" element={<ComponentWrapper Component={PsychedelicFlower} />} />
            <Route path="/aventura-marina" element={<AventuraMarina />} />
            <Route path="/ritmo-musical" element={<RitmoMusical />} />

            {/* Additional Components mapped to routes */}
            <Route path="/tree" element={<ComponentWrapper Component={ArbolDeCorazones} />} />
            <Route path="/flower" element={<ComponentWrapper Component={FlorMatematica} />} />
            <Route path="/sunflower" element={<ComponentWrapper Component={GirasolQueCrece} />} />
            <Route path="/galaxy" element={<ComponentWrapper Component={GalaxiaDeCorazones} />} />
          </Routes>
          <BackgroundMusic />
          <Toaster />
        </BrowserRouter>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;