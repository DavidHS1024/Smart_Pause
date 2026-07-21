import { useState, useRef, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { RecommendationsAPI } from '../services/api';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CourseSidebar from '../components/ui/CourseSidebar';
import SeciFlowOverlay from '../components/ui/SeciFlowOverlay';

const formatTime = (percentage) => {
  const totalSeconds = (percentage / 100) * 600; // 10 minutes video = 600s
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const SmartPauseDemo = () => {
  const mainRef = useRef(null);
  useScrollAnimation(mainRef);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simular la pausa inteligente a los 30% de progreso
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          const next = p + 0.5;
          if (next >= 30 && p < 30) {
            triggerSmartPause();
            setIsPlaying(false);
          }
          return next > 100 ? 100 : next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const triggerSmartPause = async () => {
    setLoading(true);
    setShowPopup(true);
    
    // Simular llamada a la API
    try {
      const data = await RecommendationsAPI.triggerSmartPause({
        student_id: "11111111-1111-1111-1111-111111111111",
        events: [
          { event_type: "pause", video_timestamp: 120, metadata: { context: "overfitting math" } },
          { event_type: "test_fail", concept_id: "overfitting" }
        ]
      });
      setRecommendation(data.intervention);
    } catch (e) {
      // Fallback estático
      setTimeout(() => {
        setRecommendation({
          type: "knowledge_card",
          title: "Analogía de Negocio: Overfitting",
          content: "Imagina que contratas a un vendedor que memoriza el guion perfecto para 5 clientes, pero no sabe qué decirle a un cliente nuevo. Eso es el Overfitting: el modelo memoriza los datos de entrenamiento pero falla al generalizar.",
          author: "Frida Ruh",
          confidence: 0.92
        });
        setLoading(false);
      }, 1500);
    }
  };

  const handlePlayPause = () => {
    if (progress >= 100) setProgress(0);
    setIsPlaying(!isPlaying);
    if (showPopup) {
      setShowPopup(false);
      setRecommendation(null);
    }
  };

  return (
    <div ref={mainRef} className="container mx-auto px-4" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh' }}>
      <div className="mb-8 gsap-fade-up">
        <h2 className="text-gradient text-3xl font-bold">Smart Pause en Acción</h2>
        <p className="text-secondary mt-2">Plataforma Simulada. Perfil de estudiante: Sofía (Pragmática / No-Code).</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full gsap-fade-up delay-1">
        
        {/* Left Column: Video and Tabs */}
        <div className="flex flex-col gap-6" style={{ flex: '7' }}>
          
          {/* Video Player Mock */}
          <div style={{ 
            width: '100%', 
            aspectRatio: '16/9', 
            backgroundColor: '#000', 
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--bg-surface)'
          }}>
            {/* Video Placeholder Content */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <h3 style={{ color: '#fff', opacity: 0.3, fontSize: '2rem', fontWeight: 'bold' }}>Platzi Simulador</h3>
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Módulo 1 - Clase 4</p>
            </div>

            {/* Smart Pause Overlay */}
            {showPopup && (
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(10, 22, 40, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'var(--space-6)',
                zIndex: 10
              }}>
                <GlassCard className="animate-fade-in-up shadow-[0_0_40px_rgba(152,202,63,0.15)]" style={{ width: '100%', maxWidth: '500px', border: '1px solid var(--accent-platzi)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Badge variant="platzi">💡 SMART PAUSE DETECTADO</Badge>
                    {recommendation && <span className="text-xs text-muted">Confianza: {(recommendation.confidence * 100).toFixed(0)}%</span>}
                  </div>
                  
                  {loading && !recommendation ? (
                    <div className="text-center py-10">
                      <div className="animate-pulse text-ia mb-4">Esperando respuesta del Motor Híbrido...</div>
                      <div className="text-xs text-secondary">Revisando grafo ontológico en tiempo real.</div>
                    </div>
                  ) : (
                    <>
                      <h3 className="mb-4 text-xl text-white font-bold">{recommendation?.title}</h3>
                      <p className="text-gray-300 mb-6 text-sm leading-relaxed">{recommendation?.content}</p>
                      <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-onto flex items-center justify-center text-[#0a1628] font-bold text-xs">
                            {recommendation?.author?.charAt(0)}
                          </div>
                          <div className="text-xs text-muted">
                            Ficha de: <span className="text-primary font-semibold">{recommendation?.author}</span>
                          </div>
                        </div>
                        <button className="bg-platzi text-[#0a1628] hover:bg-[#a8e046] font-bold py-2 px-4 rounded transition-colors text-sm" onClick={handlePlayPause}>
                          Entendido, continuar
                        </button>
                      </div>
                    </>
                  )}
                </GlassCard>
              </div>
            )}

            {/* Controls */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '100%',
              padding: '16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))'
            }}>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '16px', cursor: 'pointer' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-platzi)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: '-6px', top: '-4px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={handlePlayPause} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    {isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <span className="text-sm font-mono text-gray-300">{formatTime(progress)} / 10:00</span>
                </div>
                
                <div className="flex gap-4 text-gray-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Platzi-style Tabs */}
          <div className="bg-[#0a1628] border border-gray-800 rounded-xl flex flex-col overflow-hidden">
            <div className="flex border-b border-gray-800 px-6 bg-[#0f213a]">
               <button className="py-4 border-b-2 border-platzi text-platzi font-semibold mr-6 text-sm">Resumen de la Clase</button>
               <button className="py-4 text-secondary hover:text-white mr-6 text-sm transition-colors">Aportes (24)</button>
               <button className="py-4 text-secondary hover:text-white text-sm transition-colors">Recursos (3)</button>
            </div>
            <div className="p-6">
               <h3 className="text-white text-xl font-bold mb-3">Funciones de Costo y Overfitting</h3>
               <p className="text-sm text-gray-400 leading-relaxed mb-4">
                 En esta clase exploraremos las matemáticas detrás de las funciones de costo (Loss functions) y cómo los modelos de Machine Learning penalizan el error durante el entrenamiento. También veremos los peligros del Overfitting, cuando nuestro modelo memoriza los datos en lugar de generalizarlos.
               </p>
               <div className="flex gap-2">
                 <Badge variant="ia">Machine Learning</Badge>
                 <Badge variant="onto">Matemáticas</Badge>
               </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar and Flow Overlay */}
        <div className="flex flex-col relative" style={{ flex: '3', minHeight: '500px' }}>
          <CourseSidebar />
          <SeciFlowOverlay isActive={showPopup} />
        </div>
        
      </div>
    </div>
  );
};

export default SmartPauseDemo;
