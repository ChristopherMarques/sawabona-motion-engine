import React from 'react';
import { useAudioReact, AnimateWrapper } from '@sawabona/motion-engine';

export const AnalyticsDashboard: React.FC = () => {
    // Drive the central metric "pulsing" with the audio context using V3 hook
    const pulseScale = useAudioReact({ multiplier: 1.1, frequencyRange: [0, 100] });

    return (
        <div
            id="v3-dashboard"
            className="w-full h-full bg-[#050508] p-12 text-white font-sans flex flex-col gap-8 rounded-2xl shadow-2xl border border-white/10"
            style={{
                // A deep background grid specifically for V3 Spatial demonstration
                backgroundImage: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, transparent 70%), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 40px 40px, 40px 40px'
            }}
        >
            {/* Header */}
            <AnimateWrapper animationType="slide-down" durationInFrames={20} delayInFrames={0}>
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                            <span className="font-bold text-lg">S</span>
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight">Sawabona Tech</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                            Exportar Relatório
                        </button>
                        <button id="cta-button" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all z-20 hover:scale-105 active:scale-95">
                            Upgrade V3
                        </button>
                    </div>
                </header>
            </AnimateWrapper>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-6">
                <AnimateWrapper animationType="slide-up" durationInFrames={25} delayInFrames={10}>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-2 h-full">
                        <span className="text-sm text-neutral-400">Receita Recorrente</span>
                        <span className="text-3xl font-light tracking-tight">R$ 1.284.500</span>
                        <span className="text-xs text-emerald-400 font-medium">+14.2% desde o mês passado</span>
                    </div>
                </AnimateWrapper>

                {/* Audio-Reactive V3 Card */}
                <AnimateWrapper animationType="slide-up" durationInFrames={25} delayInFrames={15}>
                    <div
                        className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6 flex flex-col gap-2 relative overflow-hidden h-full"
                        style={{ transform: `scale(${pulseScale})`, transition: 'transform 0.05s ease-out' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent pointer-events-none" />
                        <span className="text-sm text-indigo-300">Licenças Ativas</span>
                        <span className="text-3xl font-medium tracking-tight text-white relative z-10">1.204</span>
                        <span className="text-xs text-indigo-200 font-medium relative z-10">Pulso Áudio-Reativo</span>
                    </div>
                </AnimateWrapper>

                <AnimateWrapper animationType="slide-up" durationInFrames={25} delayInFrames={20}>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-2 h-full">
                        <span className="text-sm text-neutral-400">Taxa de Churn</span>
                        <span className="text-3xl font-light tracking-tight text-neutral-200">1.2%</span>
                        <span className="text-xs text-red-400 font-medium">-0.4% desde o mês passado</span>
                    </div>
                </AnimateWrapper>
            </div>

            {/* Main Chart Area */}
            <AnimateWrapper animationType="fade" durationInFrames={30} delayInFrames={30}>
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-8 flex flex-col mt-auto w-full h-[300px]">
                    <h2 className="text-lg font-medium mb-6">Trajetória de Crescimento</h2>
                    <div className="flex-1 relative flex items-end gap-4 overflow-hidden h-full">
                        {/* Mock Bars */}
                        {[40, 60, 45, 80, 50, 90, 75, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 transition-colors rounded-t-sm" style={{ height: `${h}%` }}>
                                {i === 7 && <div className="w-full h-full bg-indigo-500 rounded-t-sm shadow-[0_0_20px_rgba(99,102,241,0.5)]" />}
                            </div>
                        ))}

                        {/* Overlay Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-white/5" />)}
                        </div>
                    </div>
                </div>
            </AnimateWrapper>
        </div>
    );
};
