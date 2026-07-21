import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import SmartPauseDemo from './pages/SmartPauseDemo';
import OntologyExplorer from './pages/OntologyExplorer';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<SmartPauseDemo />} />
          <Route path="/ontology" element={<OntologyExplorer />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
