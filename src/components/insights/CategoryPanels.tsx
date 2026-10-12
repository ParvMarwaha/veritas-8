'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SeriesId, series } from '@/data/insights';
import { CategoryArt } from './CategoryArt';

/**
 * The Insights hub: three full-height panels side by side. The one under the cursor
 * opens up to show its story; the others fold down to a vertical label.
 * Sharp corners and hairlines, same as the rest of the site. On small screens they stack, all open.
 */
export function CategoryPanels() {
  const [activeId, setActiveId] = useState<SeriesId>(series[0].id);

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:h-[640px]">
      {series.map((s, i) => {
        const active = s.id === activeId;
        const count = s.articleSlugs.length;

        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.12, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            style={{ '--g': active ? 2.3 : 1 } as React.CSSProperties}
            className="min-h-[480px] lg:min-h-0 lg:basis-0 lg:[flex-grow:var(--g)] lg:min-w-0 transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
          >
            <Link
              href={`/insights/category/${s.id}`}
              onMouseEnter={() => setActiveId(s.id)}
              onFocus={() => setActiveId(s.id)}
              className="group relative isolate block h-full min-h-[480px] lg:min-h-0 overflow-hidden border border-white/10 bg-[#0b0b0c] text-white"
            >
              {/* Original artwork for this category */}
              <CategoryArt
                id={s.id}
                className={`absolute inset-0 w-full h-full opacity-60 transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                  active ? 'lg:opacity-100 lg:scale-100' : 'lg:opacity-50 lg:scale-105'
                }`}
              />
              {/* Readability gradient: darkest where the text sits */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/60 to-transparent" />

              {/* Top row: count + arrow */}
              <div className="absolute top-6 left-6 right-6 lg:top-8 lg:left-8 lg:right-8 flex items-center justify-between z-10">
                <span className="type-meta font-bold tracking-[0.2em] uppercase text-white/70">
                  {count} <span className={active ? '' : 'lg:hidden'}>Articles</span>
                </span>
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-white/25 group-hover:border-[#D02717] group-hover:bg-[#D02717] transition-all duration-300">
                  <svg className="w-4 h-4 text-white -rotate-45 transition-transform duration-300 group-hover:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>

              {/* Folded state (desktop): title runs up the side. Rotated with a transform
                  (not writing-mode) so punctuation like the apostrophe in "Let's" stays intact. */}
              <span
                aria-hidden="true"
                className={`hidden lg:block absolute left-8 bottom-8 z-10 origin-bottom-left -rotate-90 translate-x-[1.875rem] text-3xl leading-none font-semibold tracking-tighter whitespace-nowrap transition-opacity duration-500 ${
                  active ? 'opacity-0 delay-0' : 'opacity-100 delay-300'
                }`}
              >
                {s.title}
              </span>

              {/* Open state: fixed width so text never reflows while the panel animates */}
              <div
                className={`absolute z-10 left-6 right-6 bottom-6 lg:left-10 lg:right-auto lg:bottom-10 lg:w-[460px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                  active ? 'lg:opacity-100 lg:translate-y-0 lg:delay-200' : 'lg:opacity-0 lg:translate-y-4 lg:pointer-events-none'
                }`}
              >
                <span className="block w-10 h-[2px] bg-[#D02717] mb-6" />
                <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-semibold tracking-tighter leading-[1.04] mb-4">
                  {s.title}
                </h2>
                <p className="type-body font-light leading-[1.65] text-white/70 max-w-md mb-8">
                  {s.description}
                </p>
                <span className="inline-flex items-center gap-3 type-label font-bold uppercase tracking-widest">
                  Explore articles
                  <span className="w-8 h-[1px] bg-white/40 group-hover:bg-[#D02717] group-hover:w-14 transition-all duration-500" />
                </span>
              </div>

              {/* Hover line wipe */}
              <span className="absolute left-0 bottom-0 z-20 h-[2px] w-full bg-[#D02717] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
