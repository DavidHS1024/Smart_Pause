import { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { ontologyNodes, ontologyEdges } from '../../data/ontologyNodes';
import { OntologyAPI } from '../../services/api';

const OntologyGraph = () => {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initGraph = async () => {
      try {
        setLoading(true);
        // Intentar obtener del backend, fallback a datos estáticos si falla
        let elements = { nodes: ontologyNodes, edges: ontologyEdges };
        
        try {
          const apiData = await OntologyAPI.getGraph();
          if (apiData && apiData.nodes && apiData.nodes.length > 0) {
            elements = apiData;
          }
        } catch (e) {
          console.warn("Backend no disponible, usando datos estáticos fallback", e);
        }

        if (!mounted || !containerRef.current) return;

        // Limpiar instancia previa si existe
        if (cyRef.current) {
          cyRef.current.destroy();
        }

        cyRef.current = cytoscape({
          container: containerRef.current,
          elements: elements,
          style: [
            {
              selector: 'node',
              style: {
                'label': 'data(label)',
                'font-family': 'Inter, sans-serif',
                'font-size': '12px',
                'color': '#E8ECF1',
                'text-valign': 'bottom',
                'text-margin-y': 5,
                'background-color': '#111D35',
                'border-width': 2,
                'border-color': '#475569',
                'width': 40,
                'height': 40
              }
            },
            {
              selector: 'node[type = "Student"]',
              style: {
                'background-color': '#00B4FF',
                'border-color': '#0085cc',
                'shape': 'round-rectangle'
              }
            },
            {
              selector: 'node[type = "Professor"]',
              style: {
                'background-color': '#00C897',
                'border-color': '#009e77',
                'shape': 'round-rectangle'
              }
            },
            {
              selector: 'node[type = "Concept"]',
              style: {
                'background-color': '#8B5CF6',
                'border-color': '#6d42c8'
              }
            },
            {
              selector: 'node[type = "KnowledgeCard"]',
              style: {
                'background-color': '#F59E0B',
                'border-color': '#c27b08',
                'shape': 'diamond',
                'width': 50,
                'height': 50
              }
            },
            {
              selector: 'edge',
              style: {
                'width': 2,
                'line-color': '#475569',
                'target-arrow-color': '#475569',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'label': 'data(label)',
                'font-size': '8px',
                'color': '#64748B',
                'text-rotation': 'autorotate',
                'text-margin-y': -10
              }
            },
            {
              selector: 'edge[type = "critical"]',
              style: {
                'line-color': '#EF4444',
                'target-arrow-color': '#EF4444',
                'line-style': 'dashed'
              }
            }
          ],
          layout: {
            name: 'cose', // Compound Spring Embedder for organic layout
            idealEdgeLength: 100,
            nodeOverlap: 20,
            refresh: 20,
            fit: true,
            padding: 30,
            randomize: false,
            componentSpacing: 100,
            nodeRepulsion: 400000,
            edgeElasticity: 100,
            nestingFactor: 5,
          },
          userZoomingEnabled: true,
          userPanningEnabled: true,
          boxSelectionEnabled: false
        });

        // Interacciones básicas
        cyRef.current.on('tap', 'node', (evt) => {
          const node = evt.target;
          // Resaltar vecinos
          cyRef.current.elements().removeClass('highlighted faded');
          cyRef.current.elements().addClass('faded');
          node.addClass('highlighted').removeClass('faded');
          node.neighborhood().addClass('highlighted').removeClass('faded');
        });

        cyRef.current.on('tap', (evt) => {
          if (evt.target === cyRef.current) {
            cyRef.current.elements().removeClass('highlighted faded');
          }
        });

        setLoading(false);
      } catch (err) {
        console.error("Error inicializando el grafo", err);
        setLoading(false);
      }
    };

    initGraph();

    return () => {
      mounted = false;
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <div className="badge badge--ia animate-pulse">Cargando Grafo...</div>
        </div>
      )}
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '600px', backgroundColor: '#0D1117' }} 
      />
      
      {/* Leyenda flotante */}
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(10, 22, 40, 0.8)', padding: '12px', borderRadius: '8px', border: '1px solid #162040' }}>
        <h4 style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Nodos</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
          <span style={{ color: '#00B4FF' }}>■ Estudiantes</span>
          <span style={{ color: '#00C897' }}>■ Profesores</span>
          <span style={{ color: '#8B5CF6' }}>● Conceptos</span>
          <span style={{ color: '#F59E0B' }}>◆ Fichas (Conocimiento Tácito)</span>
        </div>
      </div>
    </div>
  );
};

export default OntologyGraph;
