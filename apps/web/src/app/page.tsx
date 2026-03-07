"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { Player } from '@remotion/player';
import { useI18n } from '../lib/i18n';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner classnames
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { DashboardShowcase } from '../../../../src/components/templates/DashboardShowcase';

const fadeFromDown = {
  hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
  }
};

const fadeFromRight = {
  hidden: { opacity: 0, x: 60, scale: 1.1, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Home() {
  const { t, locale, getDictionary } = useI18n();
  const dictionary = useMemo(() => getDictionary("Showcase"), [locale, getDictionary]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0C0B0C] text-white font-sans overflow-x-hidden pt-24 font-['var(--font-wix-madefor)']">

      {/* Decorative Blur Orbs - Parallax Effect */}
      <motion.div style={{ y: yBg }} className="absolute top-[-20%] left-[20%] w-[600px] h-[500px] bg-[#000060]/30 blur-[150px] rounded-full pointer-events-none" />
      <motion.div style={{ y: yBg }} className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-[#7322F2]/20 blur-[150px] rounded-full pointer-events-none" />

      {/* 1. HERO BLOCK */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center z-10 w-full max-w-7xl mx-auto">
        <motion.div
          style={{ opacity: opacityHero }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#9780FF]/30 bg-[#9780FF]/10 text-[#E296FF] text-sm md:text-base font-medium mb-10 shadow-[0_0_20px_rgba(151,128,255,0.2)]"
        >
          ✨ <span className="h-4 w-px bg-[#9780FF]/30 mx-1" /> {t("Index.heroEyebrow")}
        </motion.div>

        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1] text-white max-w-5xl"
        >
          {t("Index.heroHeadline").split(' ').map((word: string, i: number) =>
            word.match(/Triplicar|Editor|Triple|Hiring/) ?
              <motion.span variants={fadeFromRight} key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-[#9780FF] via-[#E296FF] to-[#7322F2] inline-block hover:scale-105 transition-transform duration-500 cursor-default px-2"> {word} </motion.span>
              : <motion.span variants={fadeFromDown} key={i} className="inline-block"> {word}&nbsp;</motion.span>
          )}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeFromDown}
          className="mt-8 text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed font-light"
        >
          {t("Index.heroSubheadline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-14 flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/pricing" className="group relative flex items-center justify-center gap-3 bg-[#9780FF] text-white hover:bg-white hover:text-black px-10 py-5 rounded-[2rem] font-bold text-lg md:text-xl transition-all duration-300 shadow-[0_10px_40px_rgba(151,128,255,0.4)] hover:shadow-white/20 hover:-translate-y-1">
            {t("Index.heroCTA")}
            <div className="absolute inset-0 rounded-[2rem] bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>
          <div className="flex flex-col items-center sm:items-start text-sm text-white/60">
            <span className="font-['var(--font-tiro-kannada)'] italic text-[#E296FF]/80">{t("Index.heroTrust")}</span>
          </div>
        </motion.div>

        {/* Video Showcase Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-32 w-full rounded-[2.5rem] p-1 bg-gradient-to-br from-[#7322F2]/40 via-[#000060]/20 to-[#E296FF]/30 shadow-[0_0_120px_rgba(115,34,242,0.15)] transform transition-transform duration-700 hover:scale-[1.01] hover:shadow-[0_0_150px_rgba(151,128,255,0.3)]"
        >
          <div className="w-full h-full rounded-[2.4rem] bg-[#0C0B0C] overflow-hidden border border-white/10 relative">
            <div className="border-b border-white/5 bg-[#1C1B1E] p-4 flex items-center justify-between">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase truncate px-4">
                Sawabona Headless Engine Live
              </div>
              <div className="w-14" />
            </div>
            <div className="relative aspect-video w-full bg-[#0C0B0C]">
              {mounted && <Player
                component={DashboardShowcase}
                durationInFrames={900}
                fps={60}
                compositionWidth={1920}
                compositionHeight={1080}
                controls
                autoPlay
                loop
                acknowledgeRemotionLicense
                style={{ width: '100%', height: '100%' }}
                inputProps={{ dictionary }}
              />}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. PROBLEM-AGITATE BLOCK */}
      <section className="relative px-6 py-24 bg-gradient-to-b from-transparent to-[#1C1B1E] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex-1 space-y-10"
          >
            <motion.h2 variants={fadeFromDown} className="text-4xl md:text-5xl font-black text-white leading-tight">
              A Faca na Ferida.
            </motion.h2>
            <div className="space-y-6">
              {[t("Index.problem1"), t("Index.problem2"), t("Index.problem3")].map((prob, i) => (
                <motion.div variants={fadeFromRight} key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#7322F2]/20 flex items-center justify-center shrink-0 border border-[#7322F2]/30">
                    <span className="text-[#E296FF] text-xl font-bold">{i + 1}</span>
                  </div>
                  <p className="text-xl text-white/80 pt-2 font-medium">{prob}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex-1 p-10 rounded-[2rem] bg-[#0C0B0C] border border-[#FF5F56]/20 shadow-[0_0_50px_rgba(255,95,86,0.05)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5F56]/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-2xl font-bold text-[#FF5F56] mb-6 font-['var(--font-tiro-kannada)'] italic">The Pain of Scaling...</h3>
            <p className="text-xl text-white/90 leading-relaxed font-light">
              {t("Index.agitate")}
            </p>
            <div className="mt-10 p-6 rounded-2xl bg-[#9780FF]/10 border border-[#9780FF]/20">
              <p className="text-lg font-semibold text-[#E296FF]">
                {t("Index.problemTransition")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. VALUE STACK BLOCK */}
      <section className="relative px-6 py-32 overflow-hidden bg-[#1C1B1E]">
        <div className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/682d7c4461a6cad665ede828/682d7c4461a6cad665ede888_stack-tablet.webp')] bg-no-repeat bg-cover bg-center opacity-5 mix-blend-overlay" />
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto relative z-10 text-center"
        >
          <motion.h2 variants={fadeFromDown} className="text-5xl md:text-7xl font-black mb-16 text-white tracking-tight">O Que Você Leva.</motion.h2>
          <div className="grid gap-6 text-left">
            <motion.div variants={fadeFromDown} className="p-8 rounded-[2rem] bg-gradient-to-r from-[#000060]/30 to-[#7322F2]/10 border border-white/5 flex items-center gap-6 hover:border-[#9780FF]/40 transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#9780FF] flex items-center justify-center shrink-0 shadow-[0_0_30px_#9780FF]">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              <p className="text-2xl font-bold text-white">{t("Index.valueItem1")}</p>
            </motion.div>
            <motion.div variants={fadeFromDown} className="p-8 rounded-[2rem] bg-[#0C0B0C]/50 border border-white/5 flex items-center gap-6 backdrop-blur-sm hover:border-white/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <span className="text-2xl">🎁</span>
              </div>
              <p className="text-2xl font-bold text-white/90">{t("Index.valueItem2")}</p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeFromDown}
            className="mt-20 p-12 rounded-[3rem] bg-gradient-to-b from-[#7322F2]/20 to-[#0C0B0C] border border-[#9780FF]/30 shadow-[0_20px_80px_rgba(115,34,242,0.2)] hover:shadow-[0_20px_100px_rgba(151,128,255,0.4)] transition-shadow duration-500"
          >
            <p className="text-2xl text-white/50 line-through mb-4 font-['var(--font-tiro-kannada)'] italic">{t("Index.valueTotal")}</p>
            <p className="text-4xl md:text-5xl font-black text-white">{t("Index.valuePrice")}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. SOCIAL PROOF BLOCK */}
      <section className="px-6 py-32 bg-[#0C0B0C] text-center border-t border-white/5">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeFromDown}
          className="text-4xl md:text-6xl font-black mb-20 text-white"
        >
          {t("Index.socialProofTitle")}
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[t("Index.socialProof1"), t("Index.socialProof2"), t("Index.socialProof3")].map((proof, idx) => (
            <motion.div
              variants={fadeFromDown}
              key={idx}
              className="p-10 rounded-[2rem] bg-[#1C1B1E] border border-white/5 text-left hover:border-[#9780FF]/40 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-6">
                {"★★★★★".split('').map((star, i) => <span key={i} className="text-[#FFBD2E] text-2xl">{star}</span>)}
              </div>
              <p className="text-xl text-white/80 font-light leading-relaxed font-['var(--font-tiro-kannada)'] italic">"{proof.replace(/"/g, '')}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7322F2]/30 flex items-center justify-center">
                  <span className="text-white/80 font-bold">U{idx + 1}</span>
                </div>
                <div>
                  <div className="font-bold text-white">Agency Owner</div>
                  <div className="text-sm text-[#E296FF]">Verified User</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. TRANSFORMATION BLOCK */}
      <section className="relative px-6 py-32 bg-[#1C1B1E]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={fadeFromDown} className="text-5xl md:text-7xl font-black mb-20 text-white tracking-tighter text-center">O Futuro Inevitável</motion.h2>
          <div className="grid gap-8 border-l-2 border-[#9780FF]/30 pl-8 ml-4 md:ml-0 md:pl-0 md:border-none md:grid-cols-2 lg:grid-cols-4">

            <motion.div variants={fadeFromDown} className="relative md:p-8 md:border-l-2 md:border-[#9780FF]/30">
              <div className="absolute left-[-2.4rem] md:left-[-1px] top-0 w-4 h-4 rounded-full bg-[#E296FF] shadow-[0_0_15px_#E296FF]" />
              <h4 className="text-2xl font-bold text-[#9780FF] mb-4">Em 2 Dias</h4>
              <p className="text-lg text-white/80">{t("Index.transQuickWin")}</p>
            </motion.div>

            <motion.div variants={fadeFromDown} className="relative md:p-8 md:border-l-2 md:border-[#9780FF]/30">
              <div className="absolute left-[-2.4rem] md:left-[-1px] top-0 w-4 h-4 rounded-full bg-[#9780FF] shadow-[0_0_15px_#9780FF]" />
              <h4 className="text-2xl font-bold text-[#E296FF] mb-4">Em 4 Semanas</h4>
              <p className="text-lg text-white/80">{t("Index.transCompound")}</p>
            </motion.div>

            <motion.div variants={fadeFromDown} className="relative md:p-8 md:border-l-2 md:border-[#7322F2]/50">
              <div className="absolute left-[-2.4rem] md:left-[-1px] top-0 w-4 h-4 rounded-full bg-[#7322F2] shadow-[0_0_15px_#7322F2]" />
              <h4 className="text-2xl font-bold text-[#E296FF] mb-4">Vantagem Desleal</h4>
              <p className="text-lg text-white/80">{t("Index.transAdvantage")}</p>
            </motion.div>

            <motion.div variants={fadeFromDown} className="relative md:p-8 md:border-l-2 md:border-white/50">
              <div className="absolute left-[-2.4rem] md:left-[-1px] top-0 w-5 h-5 rounded-full bg-white shadow-[0_0_20px_white]" />
              <h4 className="text-2xl font-bold text-white mb-4">Resultado 10x</h4>
              <p className="text-lg text-white/80">{t("Index.trans10x")}</p>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 7. SECONDARY CTA BLOCK */}
      <section className="px-6 py-32 bg-[#0C0B0C] border-t border-white/5 relative overflow-hidden text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#7322F2]/20 blur-[150px] rounded-full pointer-events-none origin-center"
        />
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeFromDown} className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="text-white/80 font-medium">{t("Index.secBandwagon")}</span>
          </motion.div>
          <motion.h2 variants={fadeFromDown} className="text-5xl md:text-7xl font-black text-white mb-12 leading-[1.1]">{t("Index.secQuestion")}</motion.h2>
          <motion.div variants={fadeFromDown}>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-[#9780FF] hover:text-white px-12 py-6 rounded-[3rem] font-bold text-xl md:text-2xl transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_50px_rgba(151,128,255,0.5)] hover:-translate-y-2">
              {t("Index.secCTA")}
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
