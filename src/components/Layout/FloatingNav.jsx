import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import MagneticButton from '../UI/MagneticButton';

// Floating Navigation Component
const FloatingNav = ({ scrolled, isMenuOpen, setIsMenuOpen, navigationItems }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const scrollToWaitlist = () => {
    const waitlist = document.getElementById('waitlist-text');
    if (waitlist) {
      waitlist.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled
        ? "top-6 w-auto min-w-[340px] rounded-full bg-white/80 backdrop-blur-xl border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-3"
        : "top-6 w-[92%] max-w-7xl rounded-2xl bg-transparent border border-transparent px-0 py-4"
        }`}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 p-0.5`}>
            <img src="/new11.png" alt="Astrivya Logo" className="w-full h-full object-contain" />
          </div>
          <span className={`text-lg font-bold tracking-tight transition-opacity duration-300 ${scrolled ? "hidden md:block" : "text-black"}`}>
            ASTRIVYA
          </span>
        </Link>

        {isLandingPage && (
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${scrolled
                  ? "text-zinc-600 hover:text-orange-600 hover:bg-orange-50"
                  : "text-zinc-600 hover:text-black"
                  }`}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center pl-2 gap-2">
          {!scrolled && isLandingPage && (
            <Link
              to="/signin"
              className="hidden md:block text-zinc-900 hover:text-orange-600 transition-colors text-sm font-medium px-4 py-2"
            >
              Sign In
            </Link>
          )}
          {isLandingPage ? (
            <MagneticButton>
              <button
                onClick={scrollToWaitlist}
                className={`rounded-full transition-all duration-300 flex items-center text-sm font-medium shadow-lg hover:shadow-xl ${scrolled
                  ? "w-9 h-9 p-0 justify-center bg-black text-white"
                  : "px-5 py-2.5 bg-black text-white"
                  }`}
              >
                {scrolled ? <ChevronRight className="w-4 h-4" /> : <span>Get Access</span>}
              </button>
            </MagneticButton>
          ) : (
            <Link to="/">
              <MagneticButton>
                <div className="rounded-full px-5 py-2.5 bg-black text-white transition-all duration-300 flex items-center text-sm font-medium shadow-lg hover:shadow-xl">
                  <span>Home</span>
                </div>
              </MagneticButton>
            </Link>
          )}

          <div className="md:hidden ml-2 text-zinc-900 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 mt-4 w-full bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col space-y-4 shadow-xl md:hidden">
          {isLandingPage && navigationItems.map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-xl font-medium text-black">{item}</a>
          ))}
          <Link to="/signin" className="text-xl font-medium text-orange-600">Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default FloatingNav;
