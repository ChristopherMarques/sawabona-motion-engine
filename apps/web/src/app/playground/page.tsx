"use client";

import { Player } from '@remotion/player';
import { AnimateWrapper, EngineComposition, type VideoConfig } from '@sawabona/motion-engine';
import { AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { VideoConfigSchema } from '../../../../../src/schemas/video.schema';
import { AnalyticsDashboard } from '../../components/templates/AnalyticsDashboard';
import { ApexifyDashboard } from '../../components/templates/ApexifyDashboard';
import { useI18n } from '../../lib/i18n';

const PlaygroundRegistry = {
    TitleBox: (props: any) => <div className="text-white w-full h-full flex flex-col items-center justify-center gap-4"><div className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">{props.text}</div>{props.sub && <div className="text-2xl text-indigo-400 font-medium tracking-widest uppercase">{props.sub}</div>}</div>,
    BentoGrid: () => (
        <div className="w-full h-full flex items-center justify-center p-24">
            <div className="grid grid-cols-3 gap-6 w-full max-w-6xl h-[600px]">
                <div className="col-span-2 row-span-2">
                    <AnimateWrapper animationType="slide-up" durationInFrames={20} delayInFrames={0}>
                        <div className="w-full h-full bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-10 flex flex-col justify-end relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                            <h3 className="text-4xl font-bold text-white relative z-10">Processamento em Tempo Real</h3>
                            <p className="text-indigo-200 mt-2 relative z-10">Alimentado por matemática determinística.</p>
                        </div>
                    </AnimateWrapper>
                </div>
                <div className="col-span-1">
                    <AnimateWrapper animationType="zoom" durationInFrames={20} delayInFrames={10}>
                        <div className="w-full h-full bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 mb-4 flex items-center justify-center border border-purple-500/30" />
                            <h3 className="text-xl font-bold">Arquitetura de Nós</h3>
                        </div>
                    </AnimateWrapper>
                </div>
                <div className="col-span-1">
                    <AnimateWrapper animationType="fade" durationInFrames={20} delayInFrames={20}>
                        <div className="w-full h-full bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center">
                            <h3 className="text-4xl font-light text-emerald-400">120fps</h3>
                            <p className="text-sm text-neutral-400 mt-1">Velocidade Nativa de Exportação</p>
                        </div>
                    </AnimateWrapper>
                </div>
            </div>
        </div>
    ),
    AnalyticsDashboard: AnalyticsDashboard,
    ApexifyDashboard: ApexifyDashboard,
};

export default function PlaygroundPage() {
    const { t, locale, getDictionary } = useI18n();
    const dictionary = getDictionary("Showcase");

    const [jsonInput, setJsonInput] = useState("");
    const [parsedConfig, setParsedConfig] = useState<VideoConfig | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Reconstruct valid JSON state when translation locales change.
    useEffect(() => {
        const initialConfig: VideoConfig = {
            fps: 60,
            width: 1080,
            height: 1080,
            globalClasses: "bg-[#050508] text-white",
            scenes: [
                // 1. PUNCHY HOOK: Clean 2D Text, fast fade.
                {
                    id: "scene-1-hook",
                    durationInFrames: 60, // 1 second
                    componentName: "TitleBox",
                    animation: { type: "zoom", durationInFrames: 20, delayInFrames: 0 },
                    props: { text: "Esqueça vídeos estáticos.", sub: "O novo padrão visual" },
                    // Continuous slow zoom to avoid dead frames
                    camera: { x: 0, y: 0, zoom: 1.1, smooth: true },
                    interactions: [],
                    audio: [],
                },
                // 2. THE DROP: Extreme 3D Dashboard Reveal with Camera pan
                {
                    id: "scene-2-dashboard-reveal",
                    durationInFrames: 180, // 3 seconds
                    componentName: "ApexifyDashboard",
                    animation: { type: "slide-up", durationInFrames: 30, delayInFrames: 0 },
                    // Extreme angle to show off 3D
                    depth: { perspective: 1200, rotateX: 20, rotateY: -10 },
                    // Aggressive camera movement across the UI to keep it dynamic
                    camera: { x: -400, y: 300, zoom: 1.0, smooth: true },
                    vfx: { motionBlur: true, chromaticAberration: true },
                    audioReact: { multiplier: 1.2, frequencyRange: [0, 100] },
                    interactions: [],
                    audio: [],
                },
                // 3. FAST CUT: Secondary UI (Bento Grid) with Glitch effect
                {
                    id: "scene-3-bento",
                    durationInFrames: 120, // 2 seconds
                    componentName: "BentoGrid",
                    animation: { type: "slide-left", durationInFrames: 20, delayInFrames: 0 },
                    // Slight depth
                    depth: { perspective: 1200, rotateX: 5, rotateY: 5 },
                    camera: { x: 100, y: 0, zoom: 1.1, smooth: true },
                    vfx: { chromaticAberration: true },
                    interactions: [],
                    audio: [],
                },
                // 4. ACTION SHOT: Focus on Interactive cursor and physics
                {
                    id: "scene-4-interactions",
                    durationInFrames: 180, // 3 seconds
                    componentName: "ApexifyDashboard",
                    animation: { type: "fade", durationInFrames: 15, delayInFrames: 0 },
                    // Flat angle for interaction clarity, zooming into the line chart
                    camera: { x: 300, y: 400, zoom: 1.5, smooth: true },
                    vfx: { motionBlur: true },
                    interactions: [
                        { type: "move", x: 880, y: 110, startFrame: 30, durationInFrames: 45 },
                        { type: "click", target: "#cta-button", startFrame: 80, durationInFrames: 20, ripple: true }
                    ],
                    // Fixed Particle Position to better match target CTA
                    physics: { x: 880, y: 110, startFrame: 80, count: 120 },
                    audio: [],
                },
                // 5. THE RESOLVE: Wide shot of the dashboard, clean exit
                {
                    id: "scene-5-wide",
                    durationInFrames: 120, // 2 seconds
                    componentName: "ApexifyDashboard",
                    animation: { type: "fade", durationInFrames: 15, delayInFrames: 0 },
                    depth: { perspective: 2500, rotateX: -5, rotateY: 5 },
                    camera: { x: 0, y: 0, zoom: 0.7, smooth: true },
                    audioReact: { multiplier: 1.05, frequencyRange: [0, 100] },
                    interactions: [],
                    audio: [],
                },
                // 6. OUTRO: Typographic branding
                {
                    id: "scene-6-outro",
                    durationInFrames: 120, // 2 seconds
                    componentName: "TitleBox",
                    animation: { type: "spring", durationInFrames: 40, delayInFrames: 0 },
                    props: { text: "Sawabona Motion Engine.", sub: "V3 Já Disponível." },
                    // Continuous camera push backwards to feel alive
                    camera: { x: 0, y: 0, zoom: 0.8, smooth: true },
                    interactions: [],
                    audio: [],
                }
            ]
        };

        const str = JSON.stringify(initialConfig, null, 2);
        setJsonInput(str);

        try {
            VideoConfigSchema.parse(initialConfig);
            setParsedConfig(initialConfig);
            setError(null);
        } catch (e: any) {
            setError(e.message || "Invalid Config");
        }
    }, [locale, t]);

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setJsonInput(val);
        try {
            const parsed = JSON.parse(val);
            VideoConfigSchema.parse(parsed); // validate strictness
            setParsedConfig(parsed);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Invalid JSON syntax");
        }
    };

    return (
        <div className="h-screen bg-black text-white font-sans flex flex-col pt-20">
            <main className="flex-1 flex overflow-hidden">
                {/* JSON Editor Panel */}
                <div className="w-[450px] border-r border-white/10 flex flex-col bg-[#050508]">
                    <div className="p-4 border-b border-white/10 shrink-0 bg-white/5 flex items-center justify-between">
                        <span className="font-bold text-sm text-indigo-300">VideoConfig.json</span>
                        {error && <span className="text-xs font-bold text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Error</span>}
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={handleJsonChange}
                        className="flex-1 w-full bg-transparent resize-none p-6 font-mono text-sm leading-relaxed focus:outline-none text-neutral-300 placeholder:text-neutral-700"
                        spellCheck={false}
                    />
                </div>

                {/* Player Preview Panel */}
                <div className="flex-1 relative flex items-center justify-center bg-[#0c0c11] p-12">
                    <div className="absolute inset-0 pattern-dots bg-[length:24px_24px] pointer-events-none opacity-5" />

                    {error ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center text-red-400/80 bg-red-500/10 rounded-3xl border border-red-500/20 max-w-lg z-10 font-medium">
                            <AlertCircle className="w-12 h-12 mb-4 text-red-400" />
                            Invalid Payload. Player offline. <br /> Fix the JSON errors in the editor to resume rendering.
                        </div>
                    ) : parsedConfig ? (
                        <div className="w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.15)] border border-white/10 z-10 flex items-center justify-center">
                            <Player
                                component={EngineComposition as any}
                                durationInFrames={parsedConfig.scenes.reduce((acc, s) => acc + s.durationInFrames, 0)}
                                fps={parsedConfig.fps}
                                compositionWidth={parsedConfig.width}
                                compositionHeight={parsedConfig.height}
                                controls
                                acknowledgeRemotionLicense
                                autoPlay
                                loop
                                style={{ width: '100%', height: '100%' }}
                                inputProps={{
                                    config: parsedConfig,
                                    registry: PlaygroundRegistry
                                }}
                            />
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
}
