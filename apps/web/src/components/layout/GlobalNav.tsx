"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Globe, ChevronDown, Check } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export const Navbar = () => {
    const { t, locale, setLocale, getDictionary } = useI18n();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 h-20 z-[100] flex items-center justify-between px-8 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' : 'bg-transparent border-transparent'}`}>
            <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center font-black text-lg text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">S</div>
                <span className="font-bold text-xl tracking-tight text-white flex gap-1.5 items-center">
                    Sawabona
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-medium">Motion Engine</span>
                </span>
            </Link>

            <div className="flex items-center gap-6 relative">

                <Link href="/docs" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">{t("Index.viewDocs")}</Link>
                <Link href="/playground" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Playground</Link>

                {/* Custom Language Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all"
                    >
                        <Globe className="w-4 h-4 text-indigo-400" />
                        {locale === 'en' ? 'en' : 'pt'}
                        <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isLangOpen && (
                        <div className="absolute top-full mt-2 right-0 w-48 bg-[#0c0c11] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 py-1">
                            <button
                                onClick={() => { setLocale('pt-BR'); setIsLangOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors ${locale === 'pt-BR' ? 'bg-indigo-500/10 text-indigo-300 font-medium' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <div className="flex items-center gap-2">🇧🇷 Português (BR)</div>
                                {locale === 'pt-BR' && <Check className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => { setLocale('en'); setIsLangOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors ${locale === 'en' ? 'bg-indigo-500/10 text-indigo-300 font-medium' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <div className="flex items-center gap-2">🇺🇸 English (US)</div>
                                {locale === 'en' && <Check className="w-4 h-4" />}
                            </button>
                        </div>
                    )}
                </div>

                <a href="https://github.com/ChristopherMarques/sawabona-motion-engine" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/5">
                    <Github className="w-4 h-4" /> {t("Index.starGithub")}
                </a>


            </div>
        </nav>
    );
};

export const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#050508] py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-4 z-40 relative">
            <span className="text-sm text-neutral-500 font-medium">
                made with love in br ❤️
            </span>
            <a
                href="https://www.sawabona.tech/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 transition-all hover:scale-105 active:scale-95"
            >
                🚀 powered by Sawabona Tech
            </a>
        </footer>
    );
};
