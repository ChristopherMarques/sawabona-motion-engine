# @sawabona/motion-engine LLM Guide

## Introduction
The `Motion Engine` allows AI agents to construct engaging programmatic videos dynamically via a JSON composition. By following this guide, you can write system prompts that instruct an LLM to generate `VideoConfig` payloads that perfectly translate to modern, 3D, and audio-reactive motion graphics (V3).

This engine supports a full node-based architecture using React components. You specify a registered component name, pass custom props to it, and orchestrate it through timelines containing interactions, physics, depth (3D perspective), camera movements, and audio relativity.

## The Complete Payload Strategy

A `VideoConfig` object adheres strictly to the shape defined below. You must ensure the generated JSON strictly follows these typings or the parsing will fail.

```typescript
type VideoConfig = {
    // Global remotion composition settings
    fps: number; // 30 or 60 (recommended for smooth animations)
    format: "16:9" | "9:16" | "1:1"; // The aspect ratio defaults to "16:9".
    width: number; // e.g., 1920
    height: number; // e.g., 1080
    
    syncDurationToAudio?: boolean; // If true, the video length syncs to the longest audio track
    globalClasses?: string; // Optional Tailwind classes (e.g., "bg-neutral-900")
    audioTracks?: Array<AudioConfig>; // Global audio tracks for background music/voiceover

    // Array of sequential scenes
    scenes: Array<SceneConfig>;
};

type SceneConfig = {
    id: string; // Unique ID for tracking
    durationInFrames: number; // Duration of the scene (1 second = fps frames)
    
    componentName?: string; // Name of the registered React component to render
    props?: Record<string, any>; // Arbitrary props passed into the component

    // The entry animation for the component wrapper
    animation?: {
        type: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "spring" | "zoom" | "rotate" | "move" | "fade-out" | "typewriter" | "none" | "morph" | "glass-blur" | "glitch";
        durationInFrames?: number; // Default: 15
        delayInFrames?: number; // Default: 0
    };

    // Virtual Camera (Pan and Zoom)
    camera?: {
        x?: number; // Default: 0
        y?: number; // Default: 0
        zoom?: number; // Default: 1.0
        smooth?: boolean; // Default: true (applies smooth lerping/springs to the movement)
    };

    // Simulated Cursor Interactions
    interactions?: Array<{
        type: "click" | "move";
        target?: string; // CSS selector of the element to interact with (e.g., "#my-btn")
        x?: number; // Absolute/relative X
        y?: number; // Absolute/relative Y
        startFrame: number;
        durationInFrames?: number; // Default: 15
        ripple?: boolean; // Default: true (for clicks)
    }>;

    // Local audio for sound effects inside the scene
    audio?: Array<AudioConfig>;

    // 3D Depth settings (Rotates the entire scene composition in 3D space)
    depth?: {
        perspective?: number; // Default: 1000
        rotateX?: number; // Default: 0
        rotateY?: number; // Default: 0
    };

    // Post-Processing VFX applied to this scene wrapper
    vfx?: {
        chromaticAberration?: boolean; // Adds a subtle RGB split
        motionBlur?: boolean; // Synthesizes blur based on camera movement
    };

    // Audio Reactivity (Scales elements wrapped in a Visualizer based on Audio)
    audioReact?: {
        multiplier?: number; // Default: 1.1
        frequencyRange?: [number, number]; // Default: [0, 100]
    };

    // Local physics simulation overlay (e.g., floating particles)
    physics?: {
        x: number; // Origin X
        y: number; // Origin Y
        startFrame: number;
        count?: number; // Number of particles. Default: 30
    };
};

type AudioConfig = {
    src: string; // URL/Path to the audio file
    volume?: number; // 0 to 1. Default: 1
    startFrame?: number; // Default: 0
    fadeInFrames?: number; // Default: 0
    fadeOutFrames?: number; // Default: 0
    loop?: boolean; // Default: false
};
```

---

## Mastering the New Engine Features

Below are advanced tips for generating rich JSON payloads using the new hooks and ecosystem functionalities:

### 1. Camera Movement
The `camera` object scales and translates the virtual "lens". Use `smooth: true` to get spring-based smoothing over time continuously. This gives life to static UI.
- Example: `{ "camera": { "x": 100, "y": -50, "zoom": 1.2, "smooth": true } }`

### 2. Cursor Interactions
To simulate a user clicking around an app, pass entries into the `interactions` array.
You can target exact coordinates (`x`, `y`) OR pass a CSS selector in the `target` property (e.g., `target: ".login-button"`). The engine will automatically find the element's position on screen and animate the cursor to it.

### 3. Depth (3D Perspective)
Applying `rotateX` and `rotateY` creates a 3D isometric tilt. Useful for showcasing Dashboards or Apps in a modern, Apple-style presentation.
- Example: `{ "depth": { "perspective": 1200, "rotateX": 15, "rotateY": -25 } }`

### 4. Post-Processing (VFX)
Add `"vfx": { "chromaticAberration": true, "motionBlur": true }` to fast-moving scenes to drastically improve visual aesthetics.

### 5. Audio Reactivity
If the scene has an `audioReact` property, you can use the `useAudioReact()` hook *inside* the custom React component you are building to make individual elements bounce to the beat of `scene.audio` or background tracks.

### 6. Animations
The updated `animation.type` supports premium modern animations including `"glass-blur"`, `"morph"`, and `"glitch"`. Combine these with stagger (`delayInFrames`) for cinematic intros.

---

## Complex JSON Output Example

This example demonstrates a 3D, physics-enabled scene with an audio track and a cursor interaction.

```json
{
  "fps": 60,
  "width": 1080,
  "height": 1080,
  "globalClasses": "bg-[#050508] text-white",
  "scenes": [
    {
      "id": "scene-interactive-dashboard",
      "durationInFrames": 180,
      "componentName": "AnalyticsDashboard",
      "animation": { "type": "slide-up", "durationInFrames": 30 },
      "depth": { "perspective": 800, "rotateX": 25, "rotateY": -15 },
      "camera": { "x": -100, "y": 100, "zoom": 1.4, "smooth": true },
      "vfx": { "motionBlur": true, "chromaticAberration": true },
      "interactions": [
        { "type": "move", "x": 880, "y": 110, "startFrame": 30, "durationInFrames": 45 },
        { "type": "click", "target": "#cta-button", "startFrame": 80, "durationInFrames": 20, "ripple": true }
      ],
      "physics": { "x": 880, "y": 110, "startFrame": 80, "count": 60 },
      "audioReact": { "multiplier": 1.2, "frequencyRange": [0, 100] }
    }
  ]
}
```
