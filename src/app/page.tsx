'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { StaticHero } from '@/components/StaticHero';
import { ServicesSection } from '@/components/ServicesSection';
import { InsightsSection } from '@/components/InsightsSection';
import { ClientsSection } from '@/components/ClientsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { StaticHeroBackground } from '@/components/StaticHeroBackground';
import { InteractiveHeroBackground } from '@/components/InteractiveHeroBackground';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function Home() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light');
  const [isInteractiveBg, setIsInteractiveBg] = useState(true);
  
  const { scrollY } = useScroll();
  // Move hero up at 50% scroll speed to make the overlap slower
  const heroY = useTransform(scrollY, (y) => -y * 0.5);
  // Smoothly fade out the hero as the background overlaps it
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.2]);
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = 80; // Navbar trigger offset
      // Default to light for the white hero (if interactive), but switch to dark when scrolling down or if interactive is off
      let theme: 'dark' | 'light' = window.scrollY < window.innerHeight - offset ? (isInteractiveBg ? 'light' : 'dark') : 'dark';

      const services = servicesRef.current?.getBoundingClientRect();
      const insights = insightsRef.current?.getBoundingClientRect();
      const clients = clientsRef.current?.getBoundingClientRect();
      const cta = ctaRef.current?.getBoundingClientRect();

      // Check in chronological scroll order. Later sections override earlier ones if overlapping.
      
      // 1. Services is Light
      if (services && services.top <= offset && services.bottom > offset) {
        theme = 'light';
      }
      
      // 2. Insights is Dark (Overlaps sticky services)
      if (insights && insights.top <= offset && insights.bottom > offset) {
        theme = 'dark';
      }
      
      // 3. Clients is Light
      if (clients && clients.top <= offset && clients.bottom > offset) {
        theme = 'light';
      }

      // 4. CTA and Footer are Dark
      if (cta && cta.top <= offset) {
        theme = 'dark';
      }

      setNavTheme(theme);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInteractiveBg]);

  const handleReady = useCallback(() => {
    setIsAppReady(true);
  }, []);

  return (
    <main className={`w-full ${isInteractiveBg ? 'bg-white' : 'bg-[#090909]'} text-white/90 font-sans selection:bg-[#D02717]/30`}>
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
          <StaticHero 
            onReady={handleReady} 
            isReady={isAppReady} 
            isMenuOpen={isMenuOpen} 
            isInteractiveBg={isInteractiveBg} 
          />
        </motion.div>
      </div>
      
      <div className="relative z-10">
        {/* Sticky Overlap Container */}
        <div className="relative w-full z-20">
          
          {/* Services Section slides over the hero and sticks at the top */}
          <div className="sticky top-0 w-full bg-white pb-10">
            <div ref={servicesRef}>
              <ServicesSection />
            </div>
          </div>
          
          {/* Insights Section slides over the stuck Services Section */}
          <div ref={insightsRef} className="relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]">
            <InsightsSection />
          </div>

        </div>

        <div ref={clientsRef} className="relative z-40 bg-[#F2F2F2]">
          <ClientsSection />
        </div>
        
        <div ref={ctaRef} className="relative w-full overflow-hidden bg-[#090909]">
          <StaticHeroBackground />
          <div className="relative z-10 flex flex-col">
            <CTASection />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
