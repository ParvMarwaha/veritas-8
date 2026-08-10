'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { NavigationOverlay } from './NavigationOverlay';
import { usePreloader } from '@/context/PreloaderContext';

export function Navbar({ 
  isReady = true, 
  isMenuOpen, 
  setIsMenuOpen,
  theme = 'dark',
  isInteractiveBg = false,
  setIsInteractiveBg
}: { 
  isReady?: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  theme?: 'dark' | 'light';
  isInteractiveBg?: boolean;
  setIsInteractiveBg?: (val: boolean) => void;
}) {
  const { isPreloaderComplete } = usePreloader();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const isHovered = useRef(false);
  
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Trigger entrance animation after preloader completes
    if (isPreloaderComplete) {
      // Slight delay so the navbar glides in right after the hero content
      const timer = setTimeout(() => setHasMounted(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isPreloaderComplete]);

  useEffect(() => {
    let ticking = false;
    
    const checkScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 50) {
        setIsVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
      } else {
        if (currentScrollY < lastScrollY.current) { 
          setIsVisible(true);
          
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
          
          hideTimeout.current = setTimeout(() => {
            if (window.scrollY > 50 && !isHovered.current && !isMenuOpen) {
              setIsVisible(false);
            }
          }, 1500);
        } 
        else if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [isMenuOpen]);

  // Prevent hiding if menu is explicitly opened
  useEffect(() => {
    if (isMenuOpen) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setIsVisible(true);
    }
  }, [isMenuOpen]);

  const isDark = theme === 'dark';

  return (
    <>
      <NavigationOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
        isInteractiveBg={isInteractiveBg}
        onToggleBg={() => setIsInteractiveBg && setIsInteractiveBg(!isInteractiveBg)}
      />
      
      <header 
        onMouseEnter={() => isHovered.current = true}
        onMouseLeave={() => isHovered.current = false}
        className={`fixed top-0 left-0 w-full z-[90] px-6 md:px-16 py-6 md:py-8 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          !hasMounted ? '-translate-y-full opacity-0' : (isMenuOpen ? 'opacity-0 pointer-events-none translate-y-[-10px]' : (isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-100'))
        }`}
      >
        {/* Permanent dark gradients for dark theme (Split left/right to keep center bright) */}
        <div 
          className={`absolute top-0 left-0 w-[60%] h-[250%] bg-gradient-to-b from-[#090909] via-[#090909]/80 to-transparent -z-20 pointer-events-none transition-opacity duration-500 ${isDark && !isScrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)', maskImage: 'linear-gradient(to right, black 30%, transparent 100%)' }}
        ></div>
        <div 
          className={`absolute top-0 right-0 w-[60%] h-[250%] bg-gradient-to-b from-[#090909] via-[#090909]/80 to-transparent -z-20 pointer-events-none transition-opacity duration-500 ${isDark && !isScrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)', maskImage: 'linear-gradient(to left, black 30%, transparent 100%)' }}
        ></div>
        
        {/* Dark blurred background on scroll for dark theme */}
        <div className={`absolute inset-0 bg-gradient-to-b from-[#090909]/90 to-transparent backdrop-blur-md -z-10 transition-opacity duration-500 ${isScrolled && isDark ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Light blurred background on scroll for light theme */}
        <div className={`absolute inset-0 bg-white/90 backdrop-blur-md -z-10 transition-opacity duration-500 ${isScrolled && !isDark ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`max-w-[1400px] mx-auto w-full flex justify-between items-center transition-all duration-700 ${isFlipped ? 'flex-row-reverse' : 'flex-row'}`}>
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="Veritas Logo" className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto object-contain" />
          </a>
          
          <div className={`flex items-center text-[15px] md:text-base font-sans font-medium uppercase tracking-wide cursor-pointer z-10 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'} ${isFlipped ? 'flex-row-reverse space-x-reverse space-x-8' : 'flex-row space-x-8'}`}>
            <div 
              onClick={() => setIsMenuOpen(true)}
              className={`relative w-14 h-14 rounded-full flex justify-center items-center group cursor-pointer overflow-hidden ${isFlipped ? '-ml-3' : '-mr-3'}`}
            >
              {/* Base Red Background */}
              <div className="absolute inset-0 w-full h-full bg-[#D02717]"></div>
              
              {/* Hover Fill: White circle scaling from center */}
              <div 
                className="absolute inset-0 w-full h-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full origin-center"
              ></div>
              
              {/* Lines container */}
              <div className="relative z-10 w-6 h-[10px] flex flex-col justify-between">
                {/* Top line */}
                <div className="relative w-full h-[2px] overflow-hidden rounded-full">
                  <div className="absolute top-0 -left-full w-[200%] h-full flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1/2 transform-gpu">
                    <div className="w-1/2 h-full bg-[#D02717]"></div>
                    <div className="w-1/2 h-full bg-white"></div>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="relative w-full h-[2px] overflow-hidden rounded-full">
                  <div className="absolute top-0 -left-full w-[200%] h-full flex transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1/2 transform-gpu">
                    <div className="w-1/2 h-full bg-[#D02717]"></div>
                    <div className="w-1/2 h-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
