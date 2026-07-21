# 🧠 Smart Pause — Sistema Híbrido de Recomendación (IA + Ontologías)

> **MVP** del Sistema Híbrido de Recomendación para la Gestión del Conocimiento Docente y la Personalización Pedagógica.

**Universidad Nacional del Callao** — Facultad de Ingeniería Industrial y de Sistemas  
Gestión del Conocimiento — 2026

---

## 🏗️ Arquitectura

```
┌─────────────────────┐     ┌─────────────────────┐     ┌──────────────────┐
│   Frontend (React)  │────▶│  Backend (FastAPI)   │────▶│   PostgreSQL 16  │
│    Vite + GSAP      │ API │  Motor Híbrido IA    │     │   Docker / RW    │
│    Cytoscape.js     │◀────│  Ontology Traversal  │◀────│   Grafo + CRUD   │
│    Deploy: Vercel   │     │  Deploy: Railway     │     │                  │
└─────────────────────┘     └─────────────────────┘     └──────────────────┘
```

## 📋 Requisitos

- **Node.js** 20+
- **Python** 3.12+
- **Docker** + Docker Compose
- **Git**

## 🚀 Setup Rápido (Desarrollo Local)

### 1. Base de Datos (PostgreSQL en Docker)

```bash
cd database
docker compose up -d
```

Verifica que esté corriendo:
```bash
docker exec -it smart_pause_db psql -U smart_pause_user -d smart_pause -c "SELECT count(*) FROM ontology_entities;"
```

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# Copiar variables de entorno
cp .env.example .env

# Ejecutar servidor
uvicorn app.main:app --reload --port 8000
```

API disponible en: http://localhost:8000  
Documentación Swagger: http://localhost:8000/docs

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

App disponible en: http://localhost:5173

---

## 🌐 Deploy (Producción)

### Frontend → Vercel
1. Conectar repositorio Git a Vercel
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output: `dist`

### Backend → Railway
1. Conectar repositorio Git a Railway
2. Root directory: `backend`
3. Agregar PostgreSQL addon
4. Configurar variables de entorno (DATABASE_URL, CORS_ORIGINS)

---

## 📁 Estructura del Proyecto

```
Smart_Pause/
├── frontend/           # React + Vite (Vercel)
├── backend/            # Python FastAPI (Railway)
├── database/           # PostgreSQL + Docker
├── docs/               # Documentación
└── README.md
```

## 🧪 Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18, Vite, GSAP + ScrollTrigger, Cytoscape.js |
| Backend | Python 3.12, FastAPI, SQLAlchemy 2.0, scikit-learn |
| Base de Datos | PostgreSQL 16 |
| Deploy | Vercel (FE) + Railway (BE + DB) |

---

## 👥 Equipo

- Trujillano Arenas, Edward Alberto
- Medina Flores, Leslie Alexa
- Yáñez Gómez, César Moisés

**Docente:** Huatay Enriquez, Reenaty Amanda

---

*Callao, Perú — 2026*
