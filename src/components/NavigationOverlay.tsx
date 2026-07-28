import React, { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { StaticHeroBackground } from './StaticHeroBackground';
import { InteractiveHeroBackground } from './InteractiveHeroBackground';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isFlipped?: boolean;
  onFlip?: () => void;
  isInteractiveBg?: boolean;
  onToggleBg?: () => void;
}

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ isOpen, onClose, isFlipped = false, onFlip, isInteractiveBg = false, onToggleBg }) => {
  const lenis = useLenis();

  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isOpen, lenis]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col md:flex-row overflow-y-auto overflow-x-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isOpen ? 'opacity-[0.99] pointer-events-auto' : 'opacity-0 pointer-events-none'
      } ${isInteractiveBg ? 'bg-white' : 'bg-[#090909]'}`}
    >
      {/* Left Panel - With StaticHeroBackground Inbuilt */}
      <div className={`flex-1 min-h-[70vh] px-8 md:px-24 pt-20 pb-12 md:py-0 flex flex-col justify-center relative z-10 overflow-hidden shrink-0 ${isInteractiveBg ? 'bg-white' : 'bg-[#090909]'}`}>
        
        {/* Render the hero background fixed so it covers completely without scrolling gaps */}
        <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
          {isOpen && (isInteractiveBg ? <InteractiveHeroBackground layoutMode="menu" /> : <StaticHeroBackground />)}
        </div>
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className={`md:hidden absolute top-8 right-8 ${isInteractiveBg ? 'text-[#18181B]/50' : 'text-white/50'} hover:text-[#D02717] transition-all duration-700 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'} z-20`}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav className="flex flex-col space-y-5 md:space-y-8 relative z-20">
          {[
            'Home',
            'About Us',
            'Our Framework',
            'Insights',
            'Contact Us'
          ].map((item, index) => (
            <div className="overflow-hidden py-1 md:py-2" key={item}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className={`group relative flex items-center w-fit transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${isOpen ? index * 80 : 0}ms` }}
              >
                <span className={`${isInteractiveBg ? 'text-[#18181B]/70 group-hover:text-[#D02717]' : 'text-white/70 group-hover:text-[#D02717]'} font-sans font-medium text-[0.8rem] md:text-[0.85rem] mr-6 md:mr-10 tracking-widest group-hover:-translate-y-[2px] transition-all duration-300 ease-out will-change-transform`}>
                  0{index + 1}
                </span>
                <span className={`text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-sans font-semibold tracking-tight ${isInteractiveBg ? 'text-[#18181B]/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'} group-hover:translate-x-2 transition-all duration-300 ease-out leading-[1.1] will-change-transform`}>
                  {item}
                </span>
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* Right Panel - Solid Black */}
      <div className="w-full md:w-[28.125rem] lg:w-[31.25rem] min-h-full bg-[#090909] flex flex-col justify-center px-6 md:px-16 py-12 md:py-0 relative z-10 shrink-0">
        
        {/* Close Button Desktop */}
        <button 
          onClick={onClose}
          className="hidden md:flex absolute top-8 right-8 text-white/50 hover:text-[#D02717] p-2 transition-colors duration-300 group z-20"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-90">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Promotional Quote */}
        <div className={`relative z-20 flex flex-col items-start w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h3 className="text-white font-sans font-medium w-full text-left text-[1.4rem] md:text-[1.85rem] leading-[1.3] mb-4 tracking-tight drop-shadow-lg break-words">
            "Designing for true business outcomes."
          </h3>
          <p className="text-white/80 font-sans w-full text-left text-[0.9rem] md:text-[0.95rem] leading-relaxed max-w-full font-light drop-shadow-md">
            We help leaders design ownership programs that attract talent, align incentives, and create sustainable value for the long term.
          </p>
        </div>

        {/* Bottom Contact Info */}
        <div className={`relative z-20 flex flex-col md:grid md:grid-cols-2 space-y-8 md:space-y-0 gap-8 pt-8 mt-12 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex flex-col space-y-6">
            <h4 className="text-white/40 font-sans text-[0.65rem] uppercase tracking-[0.2em] font-medium">Connect</h4>
            <ul className="flex flex-col space-y-4 font-sans text-[0.9rem] tracking-tight text-white/80 font-light">
              <li>
                <a href="#" className="inline-block transition-all duration-300 ease-out hover:text-white hover:translate-x-1.5 will-change-transform">
                  LinkedIn
                </a>
              </li>
              <li>
                <button 
                  onClick={onFlip} 
                  className="inline-block text-left transition-all duration-300 ease-out hover:text-[#D02717] hover:translate-x-1.5 will-change-transform"
                >
                  Flip Layout {isFlipped ? '(Active)' : ''}
                </button>
              </li>
              <li>
                <button 
                  onClick={onToggleBg} 
                  className="inline-block text-left transition-all duration-300 ease-out hover:text-[#D02717] hover:translate-x-1.5 will-change-transform"
                >
                  Change Background {isInteractiveBg ? '(Interactive)' : '(Static)'}
                </button>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-6">
            <h4 className="text-white/40 font-sans text-[0.65rem] uppercase tracking-[0.2em] font-medium">Contact Us</h4>
            <ul className="flex flex-col space-y-4 font-sans text-[0.9rem] tracking-tight text-white/80 leading-[1.6] font-light">
              <li>
                <a href="mailto:contact@veritas.in" className="inline-block transition-all duration-300 ease-out hover:text-white hover:translate-x-1.5 will-change-transform">
                  contact@veritas.in
                </a>
              </li>
              <li>+91 9560952022</li>
              <li>Gurugram, Haryana, India</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
