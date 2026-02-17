import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Send, Sparkles } from 'lucide-react';

const RomanticQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [selectedResponse, setSelectedResponse] = useState(null); // Stores the response text to show
  const navigate = useNavigate();

  const questions = [
    {
      type: 'choice',
      question: "¿Cómo haces para ser tan linda?",
      options: [
        { text: "Es natural cuando pienso en ti", response: "¡Qué romántica! Me derrites 💕" },
        { text: "No lo sé", response: "¡Pero yo sí lo sé! Es tu esencia 💛" },
        { text: "Magia", response: "¡Tú eres magia para mí! ✨" }
      ]
    },
    {
      type: 'text',
      question: "¿Qué es lo que más te gusta de nosotros?",
      placeholder: "Escribe algo bonito...",
      response: "¡Me encanta eso también! 😍"
    },
    {
      type: 'choice',
      question: "¿Eres magia o eres real?",
      options: [
        { text: "Soy un sueño", response: "¡El mejor sueño de mi vida! 🌙" },
        { text: "Soy real y toda tuya", response: "¡Y yo soy todo tuyo! ❤️" },
        { text: "Soy magia", response: "¡Hechizaste mi corazón! 🪄" }
      ]
    },
    {
      type: 'text',
      question: "Si pudieras pedir un deseo ahora, ¿cuál sería?",
      placeholder: "Mi deseo es...",
      response: "Ojalá se cumpla muy pronto ✨"
    },
    {
      type: 'choice',
      question: "¿Cuál es tu superpoder?",
      options: [
        { text: "Volar", response: "¡Volemos juntos! 🕊️" },
        { text: "Hacerte sonreír", response: "¡Y lo logras cada día! 😊" },
        { text: "Leer mentes", response: "¡Entonces sabes cuánto te amo! 🧠❤️" }
      ]
    }
  ];

  const handleOptionSelect = (response) => {
    setSelectedResponse(response);
    setTimeout(() => {
      setSelectedResponse(null);
      nextQuestion();
    }, 2000); // Show response for 2 seconds
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim().length > 0) {
      setSelectedResponse(questions[currentQuestion].response);
      setTextInput('');
      setTimeout(() => {
        setSelectedResponse(null);
        nextQuestion();
      }, 2000);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cuestionario del Amor 💕</title>
        <meta name="description" content="Responde las preguntas del corazón" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-8 left-8 flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors z-20"
        >
          <ArrowLeft size={24} />
          <span className="font-medium">Volver</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="w-full max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-purple-800 font-handwriting">
            Cuestionario para ti :)
          </h1>

          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div 
                key={currentQuestion} 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -50 }} 
                transition={{ duration: 0.4 }} 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-pink-300 relative overflow-hidden" 
                style={{ transform: 'rotate(-0.5deg)' }}
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-purple-600 font-medium mb-2">
                    <span>Pregunta {currentQuestion + 1}</span>
                    <span>{questions.length} Total</span>
                  </div>
                  <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full" 
                      initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} 
                      transition={{ duration: 0.5 }} 
                    />
                  </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                  {selectedResponse ? (
                    <motion.div
                      key="response"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <Sparkles className="text-yellow-400 w-16 h-16 mb-4" />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold text-pink-600 font-handwriting">
                        {selectedResponse}
                      </h3>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="question"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-8 text-center font-body">
                        {questions[currentQuestion].question}
                      </h2>

                      {questions[currentQuestion].type === 'choice' ? (
                        <div className="space-y-4">
                          {questions[currentQuestion].options.map((option, index) => (
                            <motion.button 
                              key={index} 
                              onClick={() => handleOptionSelect(option.response)} 
                              whileHover={{ scale: 1.02, x: 5 }} 
                              whileTap={{ scale: 0.98 }} 
                              className="w-full p-4 rounded-2xl font-medium text-lg transition-all bg-white border-2 border-purple-200 text-purple-700 hover:border-pink-400 hover:bg-pink-50 hover:shadow-md text-left flex items-center justify-between group"
                            >
                              <span>{option.text}</span>
                              <Heart className="w-5 h-5 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <form onSubmit={handleTextSubmit} className="relative mt-4">
                          <motion.input
                            type="text"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder={questions[currentQuestion].placeholder}
                            className="w-full p-4 pr-14 rounded-2xl border-2 border-purple-300 text-lg focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all bg-white/50 focus:bg-white"
                            autoFocus
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                          />
                          <button 
                            type="submit"
                            disabled={!textInput.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-pink-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600 transition-colors shadow-sm"
                          >
                            <Send size={20} />
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, type: 'spring' }} 
                className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border-4 border-pink-300 text-center"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }} 
                  transition={{ duration: 2, repeat: Infinity }} 
                  className="inline-block mb-6"
                >
                  <Heart size={80} fill="#FF69B4" className="text-pink-500 drop-shadow-lg" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 font-handwriting">
                  ¡Eres Perfecta! 💝
                </h2>

                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-body">
                  Cada respuesta tuya me enamora más. Gracias por ser exactamente como eres: única, mágica y maravillosa.
                  <br/><br/>
                  <span className="font-bold text-pink-600">Te amo infinitamente, Ángela. 💛</span>
                </p>

                <motion.button 
                  onClick={() => navigate('/')} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Volver al Inicio
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default RomanticQuestionnaire;