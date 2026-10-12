'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Article, hasPdf, readMinutes } from '@/data/insights';

/** Article card used on a category page (light background). */
export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="h-full"
    >
      <Link
        href={`/insights/${article.slug}`}
        className="group relative flex flex-col justify-between gap-10 h-full min-h-[300px] p-7 md:p-8 border border-[#18181B]/10 bg-white overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500"
      >
        {/* Hover line wipe */}
        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#D02717] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />

        <div className="flex flex-col">
          <span className="type-meta font-bold tracking-[0.2em] uppercase mb-4 text-[#18181B]/45">
            {article.kicker}
          </span>
          <h3 className="text-2xl md:text-[1.65rem] font-semibold tracking-tighter leading-[1.15] mb-4 text-[#18181B] transition-colors duration-500 group-hover:text-[#D02717]">
            {article.title}
          </h3>
          <p className="type-small font-light leading-[1.65] line-clamp-3 text-[#18181B]/60">
            {article.summary}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 type-meta font-bold tracking-widest uppercase text-[#18181B]/45">
            <span>{readMinutes(article)} Min Read</span>
            {hasPdf(article) && (
              <>
                <span className="w-1 h-1 rounded-full bg-current" />
                <span>PDF</span>
              </>
            )}
          </div>
          <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-black/10 group-hover:border-[#D02717] group-hover:bg-[#D02717] transition-all duration-300">
            <svg className="w-4 h-4 text-[#18181B] group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
