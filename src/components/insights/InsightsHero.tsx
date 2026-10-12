'use client';

import React, { useMemo, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { InteractiveHeroBackground } from '../InteractiveHeroBackground';
import { pdfGuideCount, series, uniqueArticleCount } from '@/data/insights';

/**
 * The life of an ESOP, as a staircase. Each step is a stage the articles cover and links to the
 * guide most relevant to it, so the hero says what Insights is about and gives a place to start.
 */
const stages = [
  {
    name: 'Grant',
    gloss: 'Who, how much, when',
    topic: 'Choosing a grant strategy',
    href: '/insights/esop-budgeting-choose-the-right-grant-strategy',
    tread: 34,
  },
  {
    name: 'Vest',
    gloss: 'Time, performance, milestones',
    topic: 'Getting vesting right',
    href: '/insights/lets-get-the-vesting-criteria-right',
    tread: 52,
  },
  {
    name: 'Exercise',
    gloss: 'Setting the right price',
    topic: 'Getting the price right',
    href: '/insights/lets-get-the-exercise-price-right',
    tread: 70,
  },
  {
    name: 'Liquidity',
    gloss: 'IPO, sale or buy-back',
    topic: 'Timing for an IPO',
    href: '/insights/pre-ipo-guide-timing-your-plan-for-maximum-impact',
    tread: 88,
  },
];

// Marker path: along each tread, then up the riser to the next one (x and y are % of the staircase box).
const markerLeft = ['3%', '22%', '28%', '47%', '53%', '72%', '78%', '96%'];
const markerBottom = ['34%', '34%', '52%', '52%', '70%', '70%', '88%', '88%'];
const markerTimes = [0, 0.2, 0.26, 0.46, 0.52, 0.72, 0.78, 1];

export function InsightsHero() {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

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
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
      },
    }),
    []
  );

  const jumpToCategories = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('categories');
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[calc(100svh*var(--zf,1))] flex flex-col justify-end bg-white text-[#18181B] pt-32 md:pt-40 pb-14 md:pb-20 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-10 opacity-[18%] pointer-events-auto">
        <InteractiveHeroBackground layoutMode="hero" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-30 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-end"
      >
        {/* ---------- Left: what this is ---------- */}
        <div className="lg:col-span-6 flex flex-col">
          <motion.span
            variants={itemVariants}
            className="text-[#D02717] font-bold tracking-[0.2em] type-label uppercase mb-6 md:mb-8"
          >
            Knowledge Hub
          </motion.span>

          <motion.div variants={itemVariants} style={{ y: textY }} className="transform-gpu will-change-transform">
            <h1 className="text-6xl sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] font-sans font-medium tracking-tighter leading-[0.9] text-[#18181B] mb-8 md:mb-10">
              Insights
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="type-xl font-sans font-light tracking-tight text-[#18181B]/80 max-w-[560px] mb-10 md:mb-12"
          >
            Practical thinking on designing, launching and running ESOPs, from the first grant to the IPO.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 sm:gap-x-5 type-meta font-bold uppercase tracking-[0.2em] text-[#18181B]/55 mb-8">
            <span>{series.length} Series</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#D02717]" />
            <span>{uniqueArticleCount} Articles</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#D02717]" />
            <span>{pdfGuideCount} PDF Guides</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <a
              href="#categories"
              onClick={jumpToCategories}
              className="group inline-flex items-center gap-3 type-label font-bold uppercase tracking-widest text-[#18181B] w-fit hover:translate-x-1 transition-transform duration-300"
            >
              Browse all categories
              <span className="w-8 h-[1px] bg-[#18181B]/30 group-hover:bg-[#D02717] group-hover:w-12 transition-all duration-500" />
            </a>
          </motion.div>
        </div>

        {/* ---------- Right: the life of an ESOP ---------- */}
        <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col">
          <p className="type-small font-light text-[#18181B]/60 mb-5 md:mb-7 lg:text-right">
            The life of an ESOP. Start at any step.
          </p>

          <div className="relative flex items-end h-[380px] md:h-[440px] lg:h-[500px]">
            {stages.map((stage, i) => {
              const isLast = i === stages.length - 1;
              return (
              <motion.div
                key={stage.name}
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ delay: 0.5 + i * 0.22, duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
                style={{ height: `${stage.tread}%` }}
                className="flex-1 min-w-0"
              >
                <Link
                  href={stage.href}
                  aria-label={`${stage.name}: ${stage.topic}`}
                  className={`group relative block h-full border-t border-l transition-colors duration-500 ${
                    isLast
                      ? 'border-r bg-[#18181B] border-[#18181B] text-white hover:bg-[#D02717] hover:border-[#D02717]'
                      : 'border-[#18181B]/30 hover:border-t-[#D02717]'
                  }`}
                >
                  {/* Fill: faint ink, turns red on hover (the last step is solid: the destination) */}
                  {!isLast && (
                    <span className="absolute inset-0 bg-gradient-to-b from-[#18181B]/[0.06] to-transparent group-hover:from-[#D02717]/[0.12] transition-colors duration-500" />
                  )}

                  <span className="relative block p-2 sm:p-4 lg:p-5">
                    <span className={`block text-[13px] sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-tighter leading-tight mb-2 transition-colors duration-500 ${isLast ? '' : 'group-hover:text-[#D02717]'}`}>
                      {stage.name}
                    </span>
                    <span className={`hidden md:block type-small font-light leading-[1.45] ${isLast ? 'text-white/70' : 'text-[#18181B]/60'}`}>
                      {stage.gloss}
                    </span>
                    <span className={`hidden md:flex items-center gap-2 mt-4 type-meta font-bold uppercase tracking-widest opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ${isLast ? 'text-white' : 'text-[#D02717]'}`}>
                      Read the guide
                      <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </motion.div>
              );
            })}

            {/* The marker climbs the staircase once, then rests at liquidity */}
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, left: markerLeft[0], bottom: markerBottom[0] }}
              animate={{ opacity: 1, left: markerLeft, bottom: markerBottom }}
              transition={{
                opacity: { delay: 1.1, duration: 0.4 },
                left: { delay: 1.3, duration: 3.4, times: markerTimes, ease: 'easeInOut' },
                bottom: { delay: 1.3, duration: 3.4, times: markerTimes, ease: 'easeInOut' },
              }}
              className="pointer-events-none absolute z-20 w-3 h-3 -ml-1.5 -mb-1.5 rounded-full bg-[#D02717] ring-4 ring-white"
            >
              <span className="absolute inset-0 rounded-full bg-[#D02717] animate-ping motion-reduce:animate-none" />
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
