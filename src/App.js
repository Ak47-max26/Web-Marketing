import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticleField from './components/Animation/ParticleField';
import CursorTrail from './components/Animation/CursorTrail';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import WelcomePage from './pages/WelcomePage';
import useMousePosition from './hooks/useMousePosition';
import './styles/animations.css';

/* --- MAIN APP COMPONENT --- */

// PropTypes validation
AstrivyaLanding.propTypes = {
  className: PropTypes.string
};

export default function AstrivyaLanding({ className = '' }) {
  const mousePos = useMousePosition();

  return (
    <Router>
      <div className={`min-h-screen bg-[#FAFAFA] text-[#0a0a0a] font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden relative cursor-default ${className}`}>
        {/* GLOBAL MOTION LAYERS */}
        <CursorTrail />
        <ParticleField />

        {/* DYNAMIC BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange-300/20 rounded-full mix-blend-multiply filter blur-[90px] animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-amber-200/20 rounded-full mix-blend-multiply filter blur-[90px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-rose-200/20 rounded-full mix-blend-multiply filter blur-[90px] animate-blob animation-delay-4000"></div>

          <div
            className="absolute inset-0 spotlight-grid z-10 opacity-40"
            style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` }}
          ></div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </div>
    </Router>
  );
}
