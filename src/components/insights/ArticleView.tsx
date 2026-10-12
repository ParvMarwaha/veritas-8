'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Block,
  DISCLAIMER,
  Point,
  getArticle,
  getSeries,
  getSeriesArticles,
  hasPdf,
  readMinutes,
} from '@/data/insights';

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
};

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function PointItem({ point }: { point: Point }) {
  if (typeof point === 'string') {
    return (
      <li className="flex gap-4">
        <span className="mt-[0.8em] w-3 h-[1.5px] shrink-0 bg-[#D02717]" />
        <span>{point}</span>
      </li>
    );
  }
  return (
    <li className="flex gap-4">
      <span className="mt-[0.8em] w-3 h-[1.5px] shrink-0 bg-[#D02717]" />
      <div className="flex flex-col gap-3">
        <span>{point.text}</span>
        <ul className="flex flex-col gap-3 text-[#18181B]/70">
          {point.sub.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 text-[#D02717] text-sm font-bold tabular-nums pt-[0.15em]">
                {point.ordered ? `${i + 1}.` : '•'}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Block renderers                                                     */
/* ------------------------------------------------------------------ */

function BlockView({ block, isLead }: { block: Block; isLead: boolean }) {
  switch (block.type) {
    case 'p':
      return (
        <motion.p
          {...fadeUp}
          className={
            isLead
              ? 'type-xl leading-[1.55] font-light text-[#18181B] max-w-[760px]'
              : 'type-body leading-[1.85] font-light text-[#18181B]/80 max-w-[760px]'
          }
        >
          {block.text}
        </motion.p>
      );

    case 'callout':
      return (
        <motion.blockquote
          {...fadeUp}
          className="border-l-4 border-[#D02717] pl-6 md:pl-8 py-2 my-4 text-xl md:text-[1.6rem] leading-[1.4] font-light tracking-tight text-[#18181B] max-w-[800px]"
        >
          {block.text}
        </motion.blockquote>
      );

    case 'list':
      return (
        <motion.div {...fadeUp} className="max-w-[760px]">
          {block.title && (
            <h3 className="type-meta font-bold tracking-[0.2em] uppercase text-[#18181B]/50 mb-5">{block.title}</h3>
          )}
          <ul className="flex flex-col gap-4">
            {block.items.map((item, i) =>
              block.style === 'check' ? (
                <li key={i} className="flex gap-4 items-start type-body leading-[1.7] text-[#18181B]">
                  <span className="mt-[0.2em] shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#D02717] text-white">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ) : (
                <li key={i} className="flex gap-4 items-start type-body leading-[1.7] text-[#18181B]/80 font-light">
                  <span className="mt-[0.75em] w-1.5 h-1.5 rounded-full shrink-0 bg-[#D02717]" />
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </motion.div>
      );

    case 'groups':
      return (
        <div className="flex flex-col">
          {block.groups.map((g, gi) => (
            <motion.section
              key={gi}
              {...fadeUp}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-5 md:gap-14 py-10 md:py-12 border-t border-[#18181B]/10 last:border-b"
            >
              <div className="flex flex-col gap-2">
                {!g.startAt && (
                  <span className="type-meta font-bold tracking-[0.2em] text-[#D02717] tabular-nums">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                )}
                <h3 className="text-2xl md:text-[1.75rem] font-semibold tracking-tighter leading-[1.15] text-[#18181B]">
                  {g.heading}
                </h3>
                {g.note && (
                  <span className="type-meta font-bold tracking-widest uppercase text-[#18181B]/45">{g.note}</span>
                )}
              </div>

              <div className="flex flex-col gap-5 type-body leading-[1.75] font-light text-[#18181B]/80">
                {g.intro && <p>{g.intro}</p>}
                {g.startAt ? (
                  <ol className="flex flex-col">
                    {g.points.map((p, pi) => (
                      <li
                        key={pi}
                        className="grid grid-cols-[3.25rem_1fr] items-baseline gap-2 py-4 border-b border-[#18181B]/10 first:pt-0 last:border-b-0 last:pb-0"
                      >
                        <span className="text-3xl font-medium tracking-tighter text-[#D02717] tabular-nums leading-none">
                          {String((g.startAt as number) + pi).padStart(2, '0')}
                        </span>
                        <span className="text-xl font-normal tracking-tight text-[#18181B]">
                          {typeof p === 'string' ? p : p.text}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {g.points.map((p, pi) => (
                      <PointItem key={pi} point={p} />
                    ))}
                  </ul>
                )}
              </div>
            </motion.section>
          ))}
        </div>
      );

    case 'table': {
      const cols = block.columns.length;
      const gridCols = cols === 2 ? 'md:grid-cols-[200px_1fr_1fr]' : 'md:grid-cols-[200px_repeat(3,1fr)]';
      return (
        <motion.div {...fadeUp} className="flex flex-col gap-4">
          <div className="overflow-hidden border border-[#18181B]/10 bg-white">
            {/* Header (desktop) */}
            <div className={`hidden md:grid ${gridCols} bg-[#090909] text-white`}>
              <div className="p-6" />
              {block.columns.map((c, i) => (
                <div key={i} className="p-6 border-l border-white/10">
                  <div className="text-lg font-semibold tracking-tight">{c.title}</div>
                  {c.sub && <div className="type-meta font-bold tracking-widest uppercase text-[#D02717] mt-1">{c.sub}</div>}
                </div>
              ))}
            </div>

            {block.rows.map((row, ri) => (
              <div
                key={ri}
                className={`grid grid-cols-1 ${gridCols} border-t first:border-t-0 border-[#18181B]/10 ${ri % 2 === 1 ? 'bg-[#f8f9fa]' : 'bg-white'}`}
              >
                <div className="p-6 md:p-6 flex flex-col gap-1 bg-[#18181B]/[0.03] md:bg-transparent">
                  <span className="type-small font-semibold tracking-tight text-[#18181B]">{row.label}</span>
                  {row.note && <span className="type-meta text-[#18181B]/50 font-light">({row.note})</span>}
                </div>
                {row.cells.map((cell, ci) => (
                  <div key={ci} className="p-6 md:border-l border-[#18181B]/10">
                    {/* Column label (mobile) */}
                    <div className="md:hidden type-meta font-bold tracking-widest uppercase text-[#D02717] mb-3">
                      {block.columns[ci].title}
                      {block.columns[ci].sub ? ` · ${block.columns[ci].sub}` : ''}
                    </div>
                    <ul className="flex flex-col gap-3 type-small leading-[1.7] font-light text-[#18181B]/80">
                      {cell.map((t, ti) => (
                        <li key={ti} className="flex gap-3">
                          <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full shrink-0 bg-[#D02717]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {block.footnote && <p className="type-small text-[#18181B]/50 font-light">{block.footnote}</p>}
        </motion.div>
      );
    }

    case 'pdf':
      return (
        <motion.a
          {...fadeUp}
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between gap-6 p-6 md:p-8 border border-[#18181B]/10 bg-[#f8f9fa] overflow-hidden max-w-[800px] hover:border-[#D02717]/40 transition-colors duration-500"
        >
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#D02717] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          <div className="flex items-center gap-5">
            <span className="flex items-center justify-center w-12 h-12 bg-[#090909] text-white text-[12px] font-bold tracking-widest">
              PDF
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-lg md:text-xl font-semibold tracking-tight text-[#18181B]">{block.label}</span>
              <span className="type-meta font-bold tracking-widest uppercase text-[#18181B]/45">Opens in a new tab</span>
            </div>
          </div>
          <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-black/10 group-hover:border-[#D02717] group-hover:bg-[#D02717] transition-all duration-300">
            <ArrowIcon className="w-4 h-4 text-[#18181B] group-hover:text-white -rotate-45 transition-colors duration-300" />
          </span>
        </motion.a>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function ArticleView({ slug }: { slug: string }) {
  const article = getArticle(slug)!;
  const s = getSeries(article.seriesId);
  const seriesItems = getSeriesArticles(s);
  const position = seriesItems.findIndex((a) => a.slug === article.slug);
  const prev = position > 0 ? seriesItems[position - 1] : null;
  const next = position < seriesItems.length - 1 ? seriesItems[position + 1] : null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateTheme = () => {
      const offset = 80;
      let theme: 'dark' | 'light' = 'dark'; // dark hero
      const hero = heroRef.current?.getBoundingClientRect();
      const footer = footerRef.current?.getBoundingClientRect();
      if (hero && hero.bottom - 40 <= offset) theme = 'light'; // white content area
      if (footer && footer.top <= offset) theme = 'dark';
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

  const minutes = readMinutes(article);

  return (
    <main className="w-full bg-white text-[#18181B] font-sans selection:bg-[#D02717]/30 min-h-screen">
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
        className="relative w-full bg-[#090909] text-white overflow-hidden pt-36 md:pt-48 pb-20 md:pb-28 px-6 md:px-16"
      >
        <div className="pointer-events-none absolute inset-0 z-0 mix-blend-screen" style={{ background: 'radial-gradient(circle 800px at 0px 0px, rgba(208, 39, 23, 0.18), transparent 80%)' }} />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-screen" style={{ background: 'radial-gradient(circle 1000px at 100% 100%, rgba(167, 154, 200, 0.14), transparent 80%)' }} />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 85%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 max-w-[1400px] mx-auto"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 type-meta font-bold tracking-[0.2em] uppercase">
            <Link href="/insights" className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              All Insights
            </Link>
            <Link href={`/insights/category/${s.id}`} className="text-[#D02717] hover:text-white transition-colors">
              {s.title}
            </Link>
          </div>

          <span className="block type-meta font-bold tracking-[0.2em] uppercase text-white/50 mb-5">
            {article.kicker}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-semibold tracking-tighter leading-[1.02] max-w-[1100px] mb-8">
            {article.title}
          </h1>

          <p className="type-lead font-light tracking-tight leading-[1.5] text-white/70 max-w-2xl mb-10">
            {article.summary}
          </p>

          <div className="flex items-center gap-4 type-meta font-bold tracking-widest uppercase text-white/60">
            <span>{minutes} Min Read</span>
            {hasPdf(article) && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#D02717]" />
                <span>PDF Guide</span>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* ---------------- Body ---------------- */}
      <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        <article className="w-full max-w-[1040px] mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="flex flex-col gap-10 md:gap-12">
            {article.blocks.map((b, i) => (
              <BlockView key={i} block={b} isLead={i === 0 && b.type === 'p'} />
            ))}
          </div>

          {/* Feedback + disclaimer */}
          <motion.div {...fadeUp} className="mt-20 md:mt-28 pt-12 border-t border-[#18181B]/10 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-xl md:text-2xl font-light tracking-tight leading-[1.4] max-w-xl text-[#18181B]">
                If you have any comments, thoughts or feedback, please feel free to write to us. We would love to hear from you!
              </p>
              <Link
                href="/contact"
                className="custom-btn custom-btn-brand font-sans font-medium tracking-tight text-[14px] px-8 py-3.5 rounded-full min-w-[160px] flex justify-center w-fit shrink-0"
              >
                <span className="btn-text-1">Get in Touch</span>
                <span className="btn-text-2" aria-hidden="true">Get in Touch</span>
              </Link>
            </div>

            <div>
              <span className="block type-meta font-bold tracking-[0.2em] uppercase text-[#18181B]/40 mb-3">Disclaimer</span>
              <p className="type-small leading-[1.7] font-light text-[#18181B]/50 max-w-[820px]">{DISCLAIMER}</p>
            </div>
          </motion.div>
        </article>

        {/* ---------------- Keep reading ---------------- */}
        <section className="w-full bg-[#f8f9fa] border-t border-[#18181B]/10 py-20 md:py-28 px-6 md:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="flex flex-col gap-3">
                <span className="text-[#D02717] font-bold tracking-[0.2em] type-label uppercase">Keep reading</span>
                <h2 className="text-3xl md:text-[2.5rem] font-semibold tracking-tighter leading-[1.1]">
                  More from {s.title}
                </h2>
              </div>
              <Link
                href={`/insights/category/${s.id}`}
                className="group flex items-center gap-3 type-label font-bold uppercase tracking-widest w-fit hover:translate-x-1 transition-all duration-300"
              >
                View All {seriesItems.length} Articles
                <span className="w-8 h-[1px] bg-[#18181B]/30 group-hover:bg-[#D02717] group-hover:w-12 transition-all duration-500" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{ a: prev, dir: 'Previous' }, { a: next, dir: 'Next' }].map(({ a, dir }) =>
                a ? (
                  <Link
                    key={dir}
                    href={`/insights/${a.slug}`}
                    className="group relative flex flex-col justify-between gap-12 p-8 md:p-10 bg-white border border-[#18181B]/10 overflow-hidden min-h-[260px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500"
                  >
                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#D02717] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    <span className="type-meta font-bold tracking-[0.2em] uppercase text-[#18181B]/45">
                      {dir}
                    </span>
                    <div className="flex items-end justify-between gap-6">
                      <div className="flex flex-col gap-2">
                        <span className="type-meta font-bold tracking-[0.2em] uppercase text-[#18181B]/45">{a.kicker}</span>
                        <span className="text-2xl md:text-[1.75rem] font-semibold tracking-tighter leading-[1.15] group-hover:text-[#D02717] transition-colors duration-500">
                          {a.title}
                        </span>
                      </div>
                      <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-black/10 group-hover:border-[#D02717] group-hover:bg-[#D02717] transition-all duration-300">
                        <ArrowIcon className={`w-4 h-4 text-[#18181B] group-hover:text-white transition-colors duration-300 ${dir === 'Previous' ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div key={dir} className="hidden md:block" />
                )
              )}
            </div>
          </div>
        </section>
      </div>

      <div ref={footerRef} className="relative z-20">
        <Footer />
      </div>
    </main>
  );
}
