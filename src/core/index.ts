import React from "react";
import { registerRoot } from "remotion";
import { EngineComposition } from "./Composition";
import { VideoConfig } from "../schemas/video.schema";

// Default dummy config for Remotion Studio preview
const defaultConfig: VideoConfig = {
    fps: 30,
    width: 1920,
    height: 1080,
    globalClasses: "bg-slate-900 text-white",
    scenes: [
        {
            id: "scene-1",
            durationInFrames: 60, // 2 secs
            animation: { type: "slide-up", durationInFrames: 15, delayInFrames: 0 },
        },
        {
            id: "scene-2",
            durationInFrames: 90, // 3 secs
            animation: { type: "fade", durationInFrames: 15, delayInFrames: 0 },
        }
    ]
};

// Root entry for CLI preview `npm run preview`
registerRoot(() => (
    <EngineComposition config= { defaultConfig } />
));
