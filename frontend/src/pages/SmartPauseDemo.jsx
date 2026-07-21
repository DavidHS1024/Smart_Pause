import { useState, useRef, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { RecommendationsAPI } from '../services/api';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CourseSidebar from '../components/ui/CourseSidebar';
import MyCoursesSidebar from '../components/ui/MyCoursesSidebar';
import SeciPipelineBar from '../components/ui/SeciPipelineBar';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const SmartPauseDemo = () => {
  const mainRef = useRef(null);
  const videoRef = useRef(null);
  useScrollAnimation(mainRef);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [pipelineStatus, setPipelineStatus] = useState('idle'); // idle, processing, complete
  const [activeStep, setActiveStep] = useState(0);
  
  const [showPopup, setShowPopup] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Handle Video Time Update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setProgress(current);
    
    // Simulate Smart Pause trigger at 15 seconds (representing 30% of confusion)
    if (current >= 15 && !hasTriggered) {
      setHasTriggered(true);
      videoRef.current.pause();
      setIsPlaying(false);
      triggerSmartPause();
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const triggerSmartPause = () => {
    setPipelineStatus('processing');
    setActiveStep(1); // Telemetría
    
    // Simulate SECI Engine thinking process
    setTimeout(() => setActiveStep(2), 1000); // IA Colaborativa
    setTimeout(() => setActiveStep(3), 2500); // Grafo Ontológico
    setTimeout(() => {
      setActiveStep(4); // Ficha Generada
      setPipelineStatus('complete');
      setShowPopup(true);
      
      // Static fallback recommendation logic
      setRecommendation({
        type: "knowledge_card",
        title: "Analogía de Negocio: Overfitting",
        content: "Imagina que contratas a un vendedor que memoriza el guion perfecto para 5 clientes, pero no sabe qué decirle a un cliente nuevo. Eso es el Overfitting: el modelo memoriza los datos de entrenamiento pero falla al generalizar.",
        author: "Frida Ruh",
        confidence: 0.92
      });
    }, 4000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      
      if (showPopup) {
        setShowPopup(false);
        setPipelineStatus('idle');
        setActiveStep(0);
      }
    }
  };

  return (
    <div ref={mainRef} className="container mx-auto px-4" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', maxWidth: '1600px' }}>
      
      <div className="flex flex-col xl:flex-row gap-6 w-full gsap-fade-up">
        
        {/* Left Column: My Courses (20%) */}
        <div className="hidden xl:flex flex-col gap-6" style={{ flex: '2', minWidth: '250px' }}>
          <MyCoursesSidebar />
        </div>
        
        {/* Middle Column: Video and Content (55%) */}
        <div className="flex flex-col gap-6" style={{ flex: '5.5' }}>
          
          {/* Real Video Player */}
          <div className="relative w-full bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl group">
            
            <video 
              ref={videoRef}
              className="w-full aspect-video object-cover"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Smart Pause Overlay */}
            {showPopup && (
              <div className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-md flex items-center justify-center p-6 z-20">
                <GlassCard className="animate-fade-in-up w-full max-w-lg border border-platzi/50 shadow-[0_0_50px_rgba(152,202,63,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-platzi to-ia"></div>
                  
                  <div className="flex justify-between mb-4">
                    <Badge variant="platzi">💡 SMART PAUSE DETECTADO</Badge>
                    {recommendation && <span className="text-xs text-platzi font-mono">Confianza: {(recommendation.confidence * 100).toFixed(0)}%</span>}
                  </div>
                  
                  <h3 className="mb-4 text-2xl text-white font-bold tracking-tight">{recommendation?.title}</h3>
                  <p className="text-gray-300 mb-8 text-base leading-relaxed">{recommendation?.content}</p>
                  
                  <div className="flex justify-between items-center border-t border-gray-700/50 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-onto flex items-center justify-center text-[#0a1628] font-bold text-lg shadow-lg">
                        {recommendation?.author?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Ficha extraída de</div>
                        <div className="text-sm font-semibold text-white">{recommendation?.author}</div>
                      </div>
                    </div>
                    <button className="bg-platzi text-[#0a1628] hover:bg-white hover:text-[#0a1628] font-bold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105" onClick={togglePlay}>
                      Entendido, continuar
                    </button>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* Custom Video Controls */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative group/progress">
                <div 
                  className="absolute top-0 left-0 h-full bg-platzi rounded-full" 
                  style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                >
                  <div className="absolute right-[-6px] top-[-4px] w-3.5 h-3.5 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <button onClick={togglePlay} className="text-white hover:text-platzi transition-colors">
                    {isPlaying ? (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <div className="flex items-center gap-3 text-white hover:text-platzi cursor-pointer transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                  </div>
                  <span className="text-sm font-mono text-gray-300">{formatTime(progress)} <span className="text-gray-500 mx-1">/</span> {formatTime(duration)}</span>
                </div>
                <button className="text-white hover:text-platzi transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* SECI Pipeline Real-time visualizer */}
          <SeciPipelineBar status={pipelineStatus} activeStep={activeStep} />

          {/* Platzi-style Tabs */}
          <div className="bg-[#0a1628] border border-gray-800 rounded-xl flex flex-col overflow-hidden mt-2">
            <div className="flex border-b border-gray-800 px-6 bg-[#0f213a]">
               <button className="py-4 border-b-2 border-platzi text-platzi font-semibold mr-8 text-sm">Resumen de la Clase</button>
               <button className="py-4 text-secondary hover:text-white mr-8 text-sm transition-colors flex items-center gap-2">
                 Aportes <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-full">24</span>
               </button>
               <button className="py-4 text-secondary hover:text-white text-sm transition-colors flex items-center gap-2">
                 Recursos <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-full">3</span>
               </button>
            </div>
            <div className="p-8">
               <h3 className="text-white text-2xl font-bold mb-4">Funciones de Costo y Overfitting</h3>
               <p className="text-base text-gray-400 leading-relaxed mb-6 max-w-4xl">
                 En esta clase exploraremos las matemáticas detrás de las funciones de costo (Loss functions) y cómo los modelos de Machine Learning penalizan el error durante el entrenamiento. También veremos los peligros del Overfitting, cuando nuestro modelo memoriza los datos en lugar de generalizarlos.
               </p>
               <div className="flex gap-3">
                 <Badge variant="ia">Machine Learning</Badge>
                 <Badge variant="onto">Matemáticas</Badge>
               </div>
            </div>
          </div>

        </div>

        {/* Right Column: Playlist (25%) */}
        <div className="flex flex-col relative" style={{ flex: '2.5', minWidth: '300px' }}>
          <CourseSidebar />
        </div>
        
      </div>
    </div>
  );
};

export default SmartPauseDemo;
