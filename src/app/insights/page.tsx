'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from "@/components/Navbar";
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

import { InsightsHero } from '@/components/insights/InsightsHero';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { BrowseByTopic } from '@/components/insights/BrowseByTopic';
import { InsightsLibrary } from '@/components/insights/InsightsLibrary';

export default function InsightsPage() {
  const [activeTopic, setActiveTopic] = useState("All Topics");
  const [isAppReady, setIsAppReady] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light'); 
  const [isInteractiveBg, setIsInteractiveBg] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const libraryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const updateTheme = () => {
      const offset = 80; // Approximate height of navbar
      let theme: 'dark' | 'light' = 'light'; // Default hero theme is now light

      const hero = heroRef.current?.getBoundingClientRect();
      const featured = featuredRef.current?.getBoundingClientRect();
      const library = libraryRef.current?.getBoundingClientRect();
      const cta = ctaRef.current?.getBoundingClientRect();
      const footer = footerRef.current?.getBoundingClientRect();

      if (hero && hero.top <= offset && hero.bottom > offset) {
        theme = 'light';
      }
      
      if (featured && featured.top <= offset && featured.bottom > offset) {
        theme = 'light';
      }
      

      if (library && library.top <= offset && library.bottom > offset) {
        theme = 'light';
      }

      if (cta && cta.top <= offset) {
        theme = 'light';
      }

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
    <main className="w-full bg-[#090909] text-white/90 font-sans selection:bg-[#D02717]/30">
      <Navbar 
        isReady={isAppReady} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        theme={navTheme} 
        isInteractiveBg={isInteractiveBg}
        setIsInteractiveBg={setIsInteractiveBg}
      />
      
      <div className="relative w-full z-10 overflow-hidden bg-[#090909]">
        
        <div ref={heroRef} className="relative z-10">
          <InsightsHero />
        </div>
        
        <div ref={featuredRef} className="relative w-full z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] bg-white">
          <FeaturedInsight />
        </div>
        
        <div ref={libraryRef} className="relative w-full z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] bg-white">
          <BrowseByTopic activeTopic={activeTopic} onTopicChange={setActiveTopic} />
          <InsightsLibrary activeTopic={activeTopic} />
        </div>
        
        <div ref={ctaRef} className="relative z-[60]">
          <CTASection isInteractiveBg={true} />
        </div>
        
        <div ref={footerRef} className="relative z-[70]">
          <Footer />
        </div>
        
      </div>
    </main>
  );
}
