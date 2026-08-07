'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { FrameworkHero } from '@/components/framework/FrameworkHero';
import { FrameworkPillars } from '@/components/framework/FrameworkPillars';
import { FrameworkLifecycle } from '@/components/framework/FrameworkLifecycle';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function FrameworkPage() {
  const [isAppReady] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light'); // Hero is light
  const [isInteractiveBg, setIsInteractiveBg] = useState(false);
  
  const pillarsRef = useRef<HTMLDivElement>(null);
  const lifecycleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const updateTheme = () => {
      const offset = 80;
      let theme: 'dark' | 'light' = 'light'; // Default hero theme is light

      const pillars = pillarsRef.current?.getBoundingClientRect();
      const lifecycle = lifecycleRef.current?.getBoundingClientRect();
      const cta = ctaRef.current?.getBoundingClientRect();
      const footer = footerRef.current?.getBoundingClientRect();

      // 1. Pillars is Light
      if (pillars && pillars.top <= offset && pillars.bottom > offset) {
        theme = 'light';
      }
      
      // 2. Lifecycle is Dark
      if (lifecycle && lifecycle.top <= offset && lifecycle.bottom > offset) {
        theme = 'dark';
      }
      
      // 3. CTA is Light
      if (cta && cta.top <= offset) {
        theme = 'light';
      }

      // 4. Footer is Dark
      if (footer && footer.top <= offset) {
        theme = 'dark';
      }

      setNavTheme(theme);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTheme();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTheme();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#090909] text-white/90 font-sans selection:bg-[#D02717]/30">
      <Navbar 
        isReady={isAppReady} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        theme={navTheme} 
        isInteractiveBg={isInteractiveBg}
        setIsInteractiveBg={setIsInteractiveBg}
      />
      
      <div className="relative w-full z-10 overflow-hidden">
        <FrameworkHero />
      </div>
      
      <div className="relative z-10 w-full bg-[#090909]">
        <div ref={pillarsRef} className="relative w-full z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] bg-white">
          <FrameworkPillars />
        </div>
        
        <div ref={lifecycleRef} className="relative w-full z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]">
          <FrameworkLifecycle />
        </div>
        
        <div ref={ctaRef} className="relative z-[40]">
          <CTASection isInteractiveBg={true} />
        </div>
        <div ref={footerRef} className="relative z-[50]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
