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
    <div ref={mainRef} className="container demo-mx-auto demo-px-4" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', maxWidth: '1600px' }}>
      
      <div className="demo-flex demo-flex-col demo-layout demo-gap-6 demo-w-full gsap-fade-up">
        
        {/* Left Column: My Courses (20%) */}
        <div className="demo-hidden xl:demo-flex demo-flex-col demo-gap-6" style={{ flex: '2', minWidth: '250px' }}>
          <MyCoursesSidebar />
        </div>
        
        {/* Middle Column: Video and Content (55%) */}
        <div className="demo-flex demo-flex-col demo-gap-6" style={{ flex: '5.5' }}>
          
          {/* Real Video Player */}
          <div className="demo-relative demo-w-full demo-bg-black demo-rounded-xl demo-overflow-hidden demo-border demo-border-gray-800 demo-shadow-2xl demo-group">
            
            <video 
              ref={videoRef}
              className="demo-w-full demo-aspect-video demo-object-cover"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Smart Pause Overlay */}
            {showPopup && (
              <div className="demo-absolute demo-inset-0 demo-bg-dark/90 backdrop-blur-md demo-flex demo-items-center demo-justify-center demo-p-6 demo-z-20">
                <GlassCard className="animate-fade-in-up demo-w-full demo-max-w-lg demo-border demo-border-platzi/50 shadow-[0_0_50px_rgba(152,202,63,0.15)] demo-relative demo-overflow-hidden">
                  <div className="demo-absolute demo-top-0 demo-left-0 demo-w-full h-1 demo-bg-gradient-platzi"></div>
                  
                  <div className="demo-flex demo-justify-between demo-mb-4">
                    <Badge variant="platzi">💡 SMART PAUSE DETECTADO</Badge>
                    {recommendation && <span className="demo-text-xs demo-text-platzi demo-font-mono">Confianza: {(recommendation.confidence * 100).toFixed(0)}%</span>}
                  </div>
                  
                  <h3 className="demo-mb-4 demo-text-2xl demo-text-white demo-font-bold demo-tracking-tight">{recommendation?.title}</h3>
                  <p className="demo-text-gray-300 demo-mb-8 demo-text-base demo-leading-relaxed">{recommendation?.content}</p>
                  
                  <div className="demo-flex demo-justify-between demo-items-center demo-border-t demo-border-gray-700/50 demo-pt-5">
                    <div className="demo-flex demo-items-center demo-gap-3">
                      <div className="demo-w-10 demo-h-10 demo-rounded-full demo-bg-onto demo-flex demo-items-center demo-justify-center demo-text-dark demo-font-bold demo-text-lg demo-shadow-lg">
                        {recommendation?.author?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[10px] demo-text-gray-400 demo-uppercase demo-tracking-wider">Ficha extraída de</div>
                        <div className="demo-text-sm demo-font-semibold demo-text-white">{recommendation?.author}</div>
                      </div>
                    </div>
                    <button className="demo-bg-platzi demo-text-dark hover:bg-white hover:demo-text-dark demo-font-bold demo-py-2.5 demo-px-6 demo-rounded-lg demo-transition-all demo-duration-300 transform demo-hover-scale" onClick={togglePlay}>
                      Entendido, continuar
                    </button>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* Custom Video Controls */}
            <div className="demo-absolute demo-bottom-0 demo-left-0 demo-w-full demo-p-4 demo-bg-gradient-fade demo-opacity-0 demo-group-hover:demo-opacity-100 transition-opacity demo-duration-300 demo-z-10">
              <div className="demo-w-full h-1.5 bg-white/20 demo-rounded-full demo-mb-4 demo-cursor-pointer demo-relative demo-group-progress">
                <div 
                  className="demo-absolute demo-top-0 demo-left-0 demo-h-full demo-bg-platzi demo-rounded-full" 
                  style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                >
                  <div className="demo-absolute right-[-6px] top-[-4px] w-3.5 h-3.5 bg-white demo-rounded-full demo-scale-0 demo-group-hover-progress-scale-100 transition-transform"></div>
                </div>
              </div>
              <div className="demo-flex demo-justify-between demo-items-center">
                <div className="demo-flex demo-items-center demo-gap-6">
                  <button onClick={togglePlay} className="demo-text-white hover:demo-text-platzi demo-transition-colors">
                    {isPlaying ? (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <div className="demo-flex demo-items-center demo-gap-3 demo-text-white hover:demo-text-platzi demo-cursor-pointer demo-transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                  </div>
                  <span className="demo-text-sm demo-font-mono demo-text-gray-300">{formatTime(progress)} <span className="demo-text-gray-500 demo-mx-1">/</span> {formatTime(duration)}</span>
                </div>
                <button className="demo-text-white hover:demo-text-platzi demo-transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* SECI Pipeline Real-time visualizer */}
          <SeciPipelineBar status={pipelineStatus} activeStep={activeStep} />

          {/* Platzi-style Tabs */}
          <div className="demo-bg-dark demo-border demo-border-gray-800 demo-rounded-xl demo-flex demo-flex-col demo-overflow-hidden demo-mt-2">
            <div className="demo-flex demo-border-b demo-border-gray-800 demo-px-6 demo-bg-darker">
               <button className="demo-py-4 demo-border-b-2 demo-border-platzi demo-text-platzi demo-font-semibold demo-mr-8 demo-text-sm">Resumen de la Clase</button>
               <button className="demo-py-4 text-secondary hover:demo-text-white demo-mr-8 demo-text-sm demo-transition-colors demo-flex demo-items-center demo-gap-2">
                 Aportes <span className="demo-bg-gray-800 demo-text-xs demo-px-2 demo-py-05 demo-rounded-full">24</span>
               </button>
               <button className="demo-py-4 text-secondary hover:demo-text-white demo-text-sm demo-transition-colors demo-flex demo-items-center demo-gap-2">
                 Recursos <span className="demo-bg-gray-800 demo-text-xs demo-px-2 demo-py-05 demo-rounded-full">3</span>
               </button>
            </div>
            <div className="demo-p-8">
               <h3 className="demo-text-white demo-text-2xl demo-font-bold demo-mb-4">Funciones de Costo y Overfitting</h3>
               <p className="demo-text-base demo-text-gray-400 demo-leading-relaxed demo-mb-6 demo-max-w-4xl">
                 En esta clase exploraremos las matemáticas detrás de las funciones de costo (Loss functions) y cómo los modelos de Machine Learning penalizan el error durante el entrenamiento. También veremos los peligros del Overfitting, cuando nuestro modelo memoriza los datos en lugar de generalizarlos.
               </p>
               <div className="demo-flex demo-gap-3">
                 <Badge variant="ia">Machine Learning</Badge>
                 <Badge variant="onto">Matemáticas</Badge>
               </div>
            </div>
          </div>

        </div>

        {/* Right Column: Playlist (25%) */}
        <div className="demo-flex demo-flex-col demo-relative" style={{ flex: '2.5', minWidth: '300px' }}>
          <CourseSidebar />
        </div>
        
      </div>
    </div>
  );
};

export default SmartPauseDemo;
