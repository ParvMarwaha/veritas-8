'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

import { InsightsHero } from '@/components/insights/InsightsHero';
import { CategoryPanels } from '@/components/insights/CategoryPanels';

export default function InsightsPage() {
  const [isAppReady] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light');
  const [isInteractiveBg, setIsInteractiveBg] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateTheme = () => {
      const offset = 80; // Approximate height of navbar
      let theme: 'dark' | 'light' = 'light'; // Hero is light

      // Sections in scroll order with the tone of each background; later ones win where they overlap.
      const sections: { el: HTMLElement | null; tone: 'dark' | 'light' }[] = [
        { el: heroRef.current, tone: 'light' },
        { el: cardsRef.current, tone: 'dark' },
        { el: ctaRef.current, tone: 'light' },
        { el: footerRef.current, tone: 'dark' },
      ];

      for (const { el, tone } of sections) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) theme = tone;
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

      <div className="relative w-full z-10 bg-[#090909]">

        <div ref={heroRef} className="relative z-10">
          <InsightsHero />
        </div>

        {/* The whole page is just these three panels. Each one opens its own category page. */}
        <div
          ref={cardsRef}
          id="categories"
          className="relative z-20 bg-[#090909] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] py-20 md:py-28 px-6 md:px-16"
        >
          <div className="max-w-[1400px] w-full mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="block text-[#D02717] font-bold tracking-[0.2em] type-label uppercase mb-8 md:mb-10"
            >
              Choose a category
            </motion.span>

            <CategoryPanels />
          </div>
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
