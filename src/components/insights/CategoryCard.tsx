'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Series } from '@/data/insights';
import { CategoryArt } from './CategoryArt';

/**
 * One tall card = one Insights category. The whole card is the entry point
 * to that category's page, where all of its articles live.
 */
export function CategoryCard({ series, delay = 0 }: { series: Series; delay?: number }) {
  const count = series.articleSlugs.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="h-full"
    >
      <Link
        href={`/insights/category/${series.id}`}
        className="group relative flex flex-col justify-between h-full min-h-[480px] md:min-h-[560px] p-7 md:p-9 overflow-hidden border border-white/10 bg-[#0b0b0c] text-white"
      >
        {/* Original artwork for this category */}
        <CategoryArt
          id={series.id}
          className="absolute inset-0 w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        {/* Top: article count */}
        <div className="relative z-10">
          <span className="type-meta font-bold tracking-[0.2em] uppercase text-white/70">
            {count} Articles
          </span>
        </div>

        {/* Bottom: title, description, call to action */}
        <div className="relative z-10 flex flex-col">
          <h2 className="text-4xl md:text-[2.75rem] font-semibold tracking-tighter leading-[1.05] mb-4 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1">
            {series.title}
          </h2>
          <p className="type-body font-light leading-[1.65] text-white/70 line-clamp-3 mb-8">
            {series.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="type-label font-bold uppercase tracking-widest">Explore</span>
            <span className="flex items-center justify-center w-12 h-12 rounded-full border border-white/25 group-hover:border-[#D02717] group-hover:bg-[#D02717] transition-all duration-300">
              <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Hover line wipe */}
        <span className="absolute left-0 bottom-0 z-10 h-[3px] w-full bg-[#D02717] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
      </Link>
    </motion.div>
  );
}
