'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type SortOption = 'Latest' | 'Most Read' | 'Recommended';

const libraryArticles = [
  {
    id: "01",
    topic: "Compliance",
    title: "Navigating ESOP Valuations in 2026",
    summary: "A comprehensive look at how market dynamics are forcing a recalibration of startup valuations and cap table strategies across the tech sector.",
    readTime: "7 Min Read",
    author: "Sarah Jenkins",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "02",
    topic: "Strategy",
    title: "Global Equity Compliance Playbook",
    summary: "Expanding internationally? Here is the definitive playbook for managing cross-border equity compliance without slowing down your operations.",
    readTime: "12 Min Read",
    author: "David Chen",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    topic: "Taxation",
    title: "The Tax Implications of Secondary Sales",
    summary: "Understanding the complex tax landscape when employees sell their vested shares in private secondary markets.",
    readTime: "5 Min Read",
    author: "Elena Rodriguez",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "04",
    topic: "Governance",
    title: "Structuring Your Board for Series B",
    summary: "How to evolve your board of directors and governance structures as you scale from early-stage to growth-stage.",
    readTime: "9 Min Read",
    author: "Michael Chang",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "05",
    topic: "ESOP",
    title: "Refreshing Option Pools Without Dilution",
    summary: "Strategies to top up your employee stock option pool while minimizing the impact on existing shareholders and founders.",
    readTime: "6 Min Read",
    author: "Sarah Jenkins",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "06",
    topic: "Compliance",
    title: "Audit Readiness for Equity Plans",
    summary: "Is your cap table ready for a financial audit? Key areas to review before the auditors knock on your door.",
    readTime: "8 Min Read",
    author: "David Chen",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
  }
];

export function InsightsLibrary({ activeTopic }: { activeTopic: string }) {
  const [sortBy, setSortBy] = useState<SortOption>('Latest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    let filtered = [...libraryArticles];
    if (activeTopic !== "All Topics") {
      filtered = filtered.filter(article => article.topic === activeTopic);
    }
    
    if (sortBy === 'Latest') {
      // Default order, assume array is sorted by newest
    } else if (sortBy === 'Most Read') {
      // Mock: sort by shortest read time
      filtered.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    } else if (sortBy === 'Recommended') {
      // Mock: sort alphabetically by title
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return filtered;
  }, [activeTopic, sortBy]);

  return (
    <section className="w-full bg-white text-[#18181B] py-24 md:py-32 px-6 md:px-16 font-sans relative z-40">
      <div className="max-w-[1400px] w-full mx-auto">
        
        {/* Header and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-24 gap-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[2.5rem] md:text-[3rem] font-semibold tracking-tighter leading-tight"
          >
            Insights Library
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-3 text-[13px] font-medium text-[#18181B]/60">
              <span>Sort by:</span>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-[#18181B] hover:text-[#D02717] transition-colors"
              >
                {sortBy}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-md overflow-hidden z-50 border border-black/5"
                >
                  {(['Latest', 'Most Read', 'Recommended'] as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${sortBy === option ? 'text-[#D02717] bg-black/5' : 'text-[#18181B] hover:bg-black/5'}`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {filteredArticles.map((article, idx) => (
            <Link href={`/insights/${article.id}`} key={article.id} className="block group">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.8, ease: "easeOut" }}
                className="flex flex-col cursor-pointer h-full"
              >
              {/* Image */}
              <div className="w-full aspect-[4/3] bg-[#f0f0f0] overflow-hidden relative mb-8">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 z-10 pointer-events-none" />
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              
              {/* Tag and Read Time */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#D02717] font-bold tracking-[0.15em] text-[10px] uppercase">
                  {article.topic}
                </span>
                <span className="text-[11px] font-medium tracking-wide text-[#18181B]/50 uppercase">
                  {article.readTime}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-semibold tracking-tight leading-[1.25] text-[#18181B] group-hover:text-[#D02717] transition-colors duration-500 mb-4 line-clamp-2">
                {article.title}
              </h3>
              
              {/* Summary */}
              <p className="text-[14px] text-[#18181B]/70 leading-[1.6] mb-6 line-clamp-2 font-light">
                {article.summary}
              </p>
              
              {/* Author */}
              <div className="mt-auto flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#18181B]/10 overflow-hidden">
                  {/* Placeholder for author avatar */}
                </div>
                <span className="text-[13px] font-medium text-[#18181B]/80">{article.author}</span>
              </div>
              
              </motion.div>
            </Link>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-20 flex justify-center">
          <button className="px-8 py-4 border border-black/20 hover:border-black/50 text-[#18181B] text-[12px] font-bold tracking-widest uppercase rounded-full transition-all duration-300">
            Load More Articles
          </button>
        </div>

      </div>
    </section>
  );
}
