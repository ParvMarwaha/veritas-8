'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CategoryArt } from './CategoryArt';
import { ArticleCard } from './ArticleCard';
import { CategoryCard } from './CategoryCard';
import { SeriesId, getSeriesArticles, series as allSeries } from '@/data/insights';

/** One category: its description plus every article inside it. */
export function CategoryView({ id }: { id: SeriesId }) {
  const category = allSeries.find((s) => s.id === id)!;
  const articles = getSeriesArticles(category);
  const others = allSeries.filter((s) => s.id !== id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const heroRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const othersRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateTheme = () => {
      const offset = 80;
      let theme: 'dark' | 'light' = 'dark';
      const sections: { el: HTMLElement | null; tone: 'dark' | 'light' }[] = [
        { el: heroRef.current, tone: 'dark' },
        { el: listRef.current, tone: 'light' },
        { el: othersRef.current, tone: 'dark' },
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

  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    }),
    []
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } },
    }),
    []
  );

  return (
    <main className="w-full bg-[#090909] text-[#18181B] font-sans selection:bg-[#D02717]/30">
      <Navbar
        isReady
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        theme={navTheme}
        isInteractiveBg={false}
        setIsInteractiveBg={() => {}}
      />

      {/* ---------------- Hero ---------------- */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[calc(75vh*var(--zf,1))] flex flex-col justify-end bg-[#090909] text-white pt-36 md:pt-48 pb-20 md:pb-28 px-6 md:px-16 overflow-hidden"
      >
        {/* The same artwork as this category's panel on the hub, scaled up behind the title */}
        <CategoryArt
          id={category.id}
          className="absolute inset-y-0 right-0 w-full lg:w-[62%] h-full opacity-60 lg:opacity-100 pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_40%)]"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent lg:via-[#090909]/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#090909] to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-30 w-full max-w-[1400px] mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-10 md:mb-14">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 type-meta font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              All Insights
            </Link>
          </motion.div>

          <div className="flex flex-col max-w-[820px]">
            <motion.span
              variants={itemVariants}
              className="text-[#D02717] font-bold tracking-[0.2em] type-label uppercase mb-5"
            >
              {articles.length} Articles
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tighter leading-[0.95] mb-8"
            >
              {category.title}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="max-w-[520px] type-lead font-light tracking-tight leading-[1.55] text-white/75"
            >
              {category.description}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ---------------- All articles in this category ---------------- */}
      <div
        ref={listRef}
        className="relative z-20 bg-[#f8f9fa] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] py-20 md:py-28 px-6 md:px-16"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </div>

      {/* ---------------- Other categories ---------------- */}
      <div
        ref={othersRef}
        className="relative z-30 bg-[#090909] text-white shadow-[0_-20px_50px_rgba(0,0,0,0.3)] py-20 md:py-28 px-6 md:px-16"
      >
        <div className="max-w-[1400px] w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-3 mb-10 md:mb-12"
          >
            <span className="text-[#D02717] font-bold tracking-[0.2em] type-label uppercase">More categories</span>
            <h2 className="text-3xl md:text-[2.5rem] font-semibold tracking-tighter leading-[1.1]">Keep exploring</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {others.map((s, i) => (
              <CategoryCard key={s.id} series={s} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </div>

      <div ref={footerRef} className="relative z-40 border-t border-white/10">
        <Footer />
      </div>
    </main>
  );
}
