'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const articleData: Record<string, any> = {
  "01": {
    topic: "Strategy",
    title: "The Future of Employee Ownership",
    readTime: "8 Min Read",
    author: "Elena Rodriguez",
    date: "September 12, 2026",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
    content: (
      <>
        <p className="text-xl leading-relaxed text-[#18181B]/80 font-light mb-10">
          As the global workforce evolves, traditional equity models are struggling to keep pace. Discover how innovative companies are restructuring ownership to drive sustainable growth and build trust.
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">Moving Beyond Traditional Options</h2>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          For decades, the standard stock option was the gold standard for startup compensation. However, a new generation of workers is demanding more transparency, faster liquidity, and greater alignment with company values.
        </p>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          We are seeing a shift towards RSUs earlier in the company lifecycle, as well as the rise of profit-sharing models and dynamic equity splits that reward performance in real-time.
        </p>

        <blockquote className="border-l-4 border-[#D02717] pl-6 py-2 my-12 text-2xl font-light italic text-[#18181B]">
          "Ownership is no longer just a financial incentive; it's the core cultural pillar that defines a modern organization."
        </blockquote>

        <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">The Transparency Mandate</h2>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          Companies that treat their cap table as a closely guarded secret are losing talent to competitors who offer clear, interactive dashboards explaining the true value of an employee's stake under various exit scenarios. 
        </p>
      </>
    )
  },
  "02": {
    topic: "Compliance",
    title: "Navigating ESOP Valuations in 2026",
    readTime: "7 Min Read",
    author: "Sarah Jenkins",
    date: "August 24, 2026",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
    content: (
      <>
        <p className="text-xl leading-relaxed text-[#18181B]/80 font-light mb-10">
          A comprehensive look at how market dynamics are forcing a recalibration of startup valuations and cap table strategies across the tech sector. 
          Founders are facing unprecedented scrutiny from both auditors and employees regarding the true value of their equity compensation.
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">The Shifting Landscape of 409A Valuations</h2>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          For years, the standard 409A valuation process was seen as a necessary administrative hurdle rather than a strategic inflection point. 
          However, with the volatility observed in the late 2024 and 2025 public markets, private market valuations have had to adjust rapidly.
        </p>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          Companies that raised at peak multiples are now finding their previously established strike prices are underwater, leading to retention 
          challenges and a complex web of repricing decisions.
        </p>

        <blockquote className="border-l-4 border-[#D02717] pl-6 py-2 my-12 text-2xl font-light italic text-[#18181B]">
          "We are entering an era where equity compensation must be radically transparent to be effective. Employees are no longer satisfied with opaque formulas."
        </blockquote>

        <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">Strategic Repricing and Tender Offers</h2>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          When options go underwater, boards have several levers to pull. The most common is a formal repricing, but this carries significant tax implications if not structured correctly. 
          Alternatively, secondary tender offers are emerging as a dual-purpose tool to provide liquidity while resetting the valuation benchmark for the next wave of hires.
        </p>

        <ul className="list-disc pl-6 mb-12 space-y-4 text-[#18181B]/80">
          <li><strong>Option Exchange Programs:</strong> Allowing employees to trade underwater options for a fewer number of at-the-money options.</li>
          <li><strong>RSU Transitions:</strong> Shifting the compensation philosophy from options to Restricted Stock Units for late-stage companies.</li>
          <li><strong>Secondary Liquidity:</strong> Facilitating structured liquidity events to realize value before an IPO.</li>
        </ul>

        <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">Looking Ahead</h2>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          As we move deeper into 2026, the companies that will attract and retain the best talent will be those that view their cap table not just as a ledger, 
          but as a dynamic strategic asset. Proactive management of valuations, paired with clear employee communication, is now a prerequisite for growth.
        </p>
      </>
    )
  },
  "03": {
    topic: "Strategy",
    title: "Global Equity Compliance & Strategy",
    readTime: "12 Min Read",
    author: "David Chen",
    date: "July 15, 2026",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600",
    content: (
      <>
        <p className="text-xl leading-relaxed text-[#18181B]/80 font-light mb-10">
          Expanding internationally? Here is the definitive playbook for managing cross-border equity compliance without slowing down your operations or creating tax liabilities for your distributed team.
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">The Borderless Cap Table</h2>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          With remote work now the standard for high-growth tech companies, cap tables are increasingly distributed across multiple jurisdictions. 
          Issuing equity to a developer in Germany requires entirely different compliance frameworks and tax withholdings than issuing equity to a sales lead in California.
        </p>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          Failure to properly structure these grants can result in massive tax penalties for both the company and the employee, effectively destroying the retention value of the equity.
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-16 mb-6">Navigating Double Taxation</h2>
        
        <p className="mb-6 leading-relaxed text-[#18181B]/80">
          When an employee relocates while vesting, understanding which country has taxing rights over the equity income is critical. We recommend implementing mobility tracking systems that automatically adjust tax withholding ratios based on the days spent in each jurisdiction during the vesting period.
        </p>
      </>
    )
  }
};

export default function ArticlePage() {
  const [isAppReady, setIsAppReady] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light'); 
  const params = useParams();
  
  // Cast params.id to string. If it's an array, take the first element.
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : (rawId as string);
  
  // Fallback to "01" if the article is not found in our mock data
  const article = articleData[id] || articleData["01"];

  useEffect(() => {
    let ticking = false;
    
    const updateTheme = () => {
      // Very simple scroll spy: turn dark when scrolling past the hero image
      const scrollY = window.scrollY;
      setNavTheme(scrollY > 400 ? 'dark' : 'light');
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
    <main className="w-full bg-white text-[#18181B] font-sans selection:bg-[#D02717]/30 min-h-screen">
      <Navbar 
        isReady={isAppReady} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        theme={navTheme} 
        isInteractiveBg={false}
        setIsInteractiveBg={() => {}}
      />
      
      {/* Article Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-[#111111] overflow-hidden pt-32">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={article.img} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        <div className="relative z-20 w-full max-w-[900px] mx-auto h-full flex flex-col justify-end pb-16 px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/insights" className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors mb-8 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Insights
            </Link>

            <div className="flex gap-4 items-center mb-6 text-[12px] font-bold tracking-widest uppercase text-white/70">
              <span className="text-[#D02717]">{article.topic}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.1] mb-8 text-white">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">{article.author}</span>
                <span className="text-xs text-white/60">{article.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="w-full max-w-[900px] mx-auto px-6 md:px-16 py-20 md:py-32">
        <motion.div
          key={id} // Add key to force re-animation when changing routes
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg prose-zinc max-w-none"
        >
          {article.content}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
