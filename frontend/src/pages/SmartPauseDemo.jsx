import { useState, useRef, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { RecommendationsAPI } from '../services/api';
import gsap from 'gsap';

const SmartPauseDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

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
    
    // Simular llamada a la API (o hacer llamada real si el backend está corriendo)
    try {
      // Intentar API real (id de Sofía)
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
    setIsPlaying(!isPlaying);
    if (showPopup) {
      setShowPopup(false);
      setRecommendation(null);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="text-center mb-8 gsap-fade-up">
        <h2 className="text-gradient">Demo: Smart Pause</h2>
        <p className="text-secondary mt-2">Simulación de la intervención en tiempo real para el perfil de Sofía (No-Code/Pragmático).</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }} className="gsap-fade-up delay-1">
        
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
            <h3 style={{ color: '#fff', opacity: 0.5 }}>Curso: Intro a Machine Learning</h3>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Tema: Funciones de Costo y Overfitting</p>
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
              <GlassCard className="animate-fade-in-up" style={{ width: '100%', maxWidth: '500px', border: '1px solid var(--accent-platzi)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <Badge variant="platzi">💡 SMART PAUSE</Badge>
                  {recommendation && <span className="text-xs text-muted">Confianza: {(recommendation.confidence * 100).toFixed(0)}%</span>}
                </div>
                
                {loading && !recommendation ? (
                  <div className="text-center py-8">
                    <div className="animate-pulse text-ia mb-4">Analizando telemetría del estudiante...</div>
                    <div className="animate-pulse text-onto">Consultando grafo ontológico (Estilo No-Code)...</div>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-4 text-xl text-primary">{recommendation?.title}</h3>
                    <p className="text-secondary mb-6 text-sm">{recommendation?.content}</p>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                      <div className="text-xs text-muted">
                        Ficha Tácita de: <span className="text-primary font-semibold">{recommendation?.author}</span>
                      </div>
                      <button className="btn btn--primary" style={{ padding: '4px 12px', fontSize: '0.875rem' }} onClick={handlePlayPause}>
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
            padding: '16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
          }}>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '12px', cursor: 'pointer' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-platzi)', borderRadius: '2px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '-4px', top: '-4px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%' }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={handlePlayPause} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <span className="text-xs font-mono text-muted">{(progress * 0.6).toFixed(2).replace('.', ':')} / 10:00</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-secondary">
          Al llegar al 30% del video, se detecta un patrón de confusión y se dispara la intervención híbrida.
        </div>
      </div>
    </div>
  );
};

export default SmartPauseDemo;
