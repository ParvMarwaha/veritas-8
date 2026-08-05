'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';

import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutLeadership } from '@/components/about/AboutLeadership';
import { AboutToday } from '@/components/about/AboutToday';

export default function AboutPage() {
  const [isAppReady, setIsAppReady] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark'); // Hero is dark
  const [isInteractiveBg, setIsInteractiveBg] = useState(false); // Disabled for About page
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, (y) => -y * 0.5);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.2]);
  
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = 80;
      let theme: 'dark' | 'light' = 'dark'; // Default hero theme is dark

      const story = storyRef.current?.getBoundingClientRect();
      const values = valuesRef.current?.getBoundingClientRect();
      const leadership = leadershipRef.current?.getBoundingClientRect();
      const today = todayRef.current?.getBoundingClientRect();
      const cta = ctaRef.current?.getBoundingClientRect();
      const footer = footerRef.current?.getBoundingClientRect();

      // 1. Story is Light
      if (story && story.top <= offset && story.bottom > offset) {
        theme = 'light';
      }
      
      // 2. Values is Dark
      if (values && values.top <= offset && values.bottom > offset) {
        theme = 'dark';
      }
      
      // 3. Leadership is Light
      if (leadership && leadership.top <= offset && leadership.bottom > offset) {
        theme = 'light';
      }

      // 4. Today is Dark
      if (today && today.top <= offset && today.bottom > offset) {
        theme = 'dark';
      }

      // 5. CTA is Dark (since interactive bg is false)
      if (cta && cta.top <= offset) {
        theme = 'dark';
      }

      // 6. Footer is Dark
      if (footer && footer.top <= offset) {
        theme = 'dark';
      }

      setNavTheme(theme);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
      
      <div className="sticky top-0 w-full h-[101vh] z-0 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full h-full">
          <AboutHero />
        </motion.div>
      </div>
      
      <div className="relative z-10">
        <div className="relative w-full z-20">
          <div className="relative w-full bg-white pb-10 rounded-t-3xl md:rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
            <div ref={storyRef}>
              <AboutStory />
            </div>
          </div>
          
          <div ref={valuesRef} className="relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]">
            <AboutValues />
          </div>
        </div>

        <div ref={leadershipRef} className="relative z-40 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <AboutLeadership />
        </div>
        
        <div ref={todayRef} className="relative z-50 bg-[#090909] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
          <AboutToday />
        </div>
        
        <div ref={ctaRef} className="relative z-[60]">
          <CTASection isInteractiveBg={isInteractiveBg} />
        </div>
        <div ref={footerRef} className="relative z-[70]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
