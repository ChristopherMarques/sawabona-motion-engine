"use client";

import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';
import { ArrowLeft } from 'lucide-react';

export default function DocsPage() {
    const { getDictionary } = useI18n();
    const docs = getDictionary("Docs");

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">


            <main className="pt-32 pb-24 px-8 max-w-4xl mx-auto space-y-12 text-neutral-300">

                <section id="introduction" className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">{docs.title || "Introduction"}</h1>
                    <p className="text-lg leading-relaxed">
                        {docs.desc}
                    </p>
                </section>

                <div className="h-px w-full bg-white/10" />

                <section id="architecture" className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">{docs.architectureTitle}</h2>
                    <p className="leading-relaxed">
                        {docs.architectureDesc}
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Atoms</strong>: {docs.atomDesc}</li>
                        <li><strong>Molecules</strong>: {docs.moleculeDesc}</li>
                        <li><strong>Organisms</strong>: {docs.organismDesc}</li>
                    </ul>
                </section>

                <div className="h-px w-full bg-white/10" />

                <section id="video-config" className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">{docs.configTitle}</h2>
                    <p className="leading-relaxed">
                        {docs.configDesc}
                    </p>
                    <div className="bg-[#111] border border-white/10 rounded-lg p-6 overflow-x-auto mt-4 shadow-xl">
                        <pre className="text-sm font-mono text-indigo-300">
                            {`import { type VideoConfig } from "@sawabona/motion-engine";

const config: VideoConfig = {
  fps: 60,
  width: 1920,
  height: 1080,
  globalClasses: "bg-slate-900 text-white",
  scenes: [
    {
      id: "intro-scene",
      durationInFrames: 150,
      componentName: "MyCustomScene", // Mapped via Registry
      animation: {
        type: "slide-up",
        durationInFrames: 30,
        delayInFrames: 10
      },
      props: { text: "Hello Web App!" }
    }
  ]
};`}
                        </pre>
                    </div>
                </section>

                <div className="h-px w-full bg-white/10" />

                <section id="motion-engine" className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">{docs.engineTitle}</h2>
                    <p className="leading-relaxed">
                        {docs.engineDesc}
                    </p>
                    <div className="bg-[#111] border border-white/10 rounded-lg p-6 overflow-x-auto mt-4 shadow-xl">
                        <pre className="text-sm font-mono text-purple-300">
                            {`import { MotionEngine } from "@sawabona/motion-engine";

export const Root = () => (
  <MotionEngine 
    config={myConfigObject} 
    componentRegistry={{ "MyCustomScene": SceneImplementation }} 
  />
);`}
                        </pre>
                    </div>
                </section>

                <div className="h-px w-full bg-white/10" />

                <section id="hooks" className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">{docs.hooksTitle}</h2>
                    <p className="leading-relaxed">
                        {docs.hooksDesc}
                    </p>
                </section>

                <div className="h-px w-full bg-white/10" />

                <section id="api-reference" className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">{docs.apiRefTitle}</h2>
                    <p className="leading-relaxed">
                        {docs.apiRefDesc}
                    </p>
                    <div className="mt-6">
                        <Link href="https://github.com/ChristopherMarques/sawabona-motion-engine/blob/main/src/schemas/video.schema.ts" target="_blank" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 font-bold transition-colors">
                            {docs.apiRefBtn}
                        </Link>
                    </div>
                </section>

                <div className="h-px w-full bg-white/10" />

                <section id="llm-guide" className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">{docs.llmTitle}</h2>
                    <p className="leading-relaxed">
                        {docs.llmDesc}
                    </p>
                    <div className="mt-6">
                        <Link href="/llm-guide.md" target="_blank" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-bold transition-colors">
                            {docs.llmBtn}
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}
