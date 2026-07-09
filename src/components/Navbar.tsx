'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { NavigationOverlay } from './NavigationOverlay';

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
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const isHovered = useRef(false);
  
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
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
        className={`fixed top-0 left-0 w-full z-[90] px-6 md:px-16 py-8 transition-all duration-500 ease-out ${
          isMenuOpen ? 'opacity-0 pointer-events-none translate-y-[-10px]' : (isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-100')
        }`}
      >
        {/* Permanent dark gradients for dark theme (Split left/right to keep center bright) */}
        <div 
          className={`absolute top-0 left-0 w-[60%] h-[250%] bg-gradient-to-b from-[#090909] via-[#090909]/80 to-transparent -z-20 pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
          style={{ WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)', maskImage: 'linear-gradient(to right, black 30%, transparent 100%)' }}
        ></div>
        <div 
          className={`absolute top-0 right-0 w-[60%] h-[250%] bg-gradient-to-b from-[#090909] via-[#090909]/80 to-transparent -z-20 pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
          style={{ WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)', maskImage: 'linear-gradient(to left, black 30%, transparent 100%)' }}
        ></div>
        
        {/* Dark blurred background on scroll for dark theme */}
        <div className={`absolute inset-0 bg-gradient-to-b from-[#090909]/90 to-transparent backdrop-blur-md -z-10 transition-opacity duration-500 ${isScrolled && isDark ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Light blurred background on scroll for light theme */}
        <div className={`absolute inset-0 bg-white/90 backdrop-blur-md -z-10 transition-opacity duration-500 ${isScrolled && !isDark ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`max-w-[1400px] mx-auto w-full flex justify-between items-center transition-all duration-700 ${isFlipped ? 'flex-row-reverse' : 'flex-row'}`}>
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="Veritas Logo" className="h-9 md:h-11 lg:h-[3rem] w-auto object-contain" />
          </a>
          
          <div className={`flex items-center text-[14px] font-sans font-medium uppercase tracking-tight cursor-pointer z-10 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'} ${isFlipped ? 'flex-row-reverse space-x-reverse space-x-8' : 'flex-row space-x-8'}`}>
            <AnimatedButton 
              variant="text" 
              className="px-0 py-0 transition-colors duration-500"
              style={{
                '--btn-text': isDark ? '#ffffff' : '#090909',
                '--btn-hover-text': isDark ? '#ffffff' : '#090909'
              } as React.CSSProperties}
            >
              Get in Touch
            </AnimatedButton>
            <div 
              onClick={() => setIsMenuOpen(true)}
              className={`w-12 h-12 flex justify-center items-center group cursor-pointer ${isFlipped ? '-ml-3' : '-mr-3'}`}
            >
              <div className={`w-6 h-2 flex flex-col justify-between ${isFlipped ? 'items-start' : 'items-end'}`}>
                <div 
                  className={`w-full h-[1px] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-50 ${isFlipped ? 'origin-left group-hover:translate-x-1' : 'origin-right group-hover:-translate-x-1'} will-change-transform transform-gpu`}
                  style={{ backgroundColor: isDark ? '#ffffff' : '#090909' }}
                ></div>
                <div 
                  className={`w-2/3 h-[1px] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isFlipped ? 'origin-left' : 'origin-right'} group-hover:scale-x-150 will-change-transform transform-gpu`}
                  style={{ backgroundColor: isDark ? '#ffffff' : '#090909' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
