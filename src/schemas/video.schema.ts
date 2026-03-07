import { z } from "zod";

// --- Enums and Sub-Schemas ---

export const AnimationTypeSchema = z.enum([
    "fade", "slide-up", "slide-down", "slide-left", "slide-right",
    "spring", "zoom", "rotate", "move", "fade-out", "typewriter",
    "none", "morph", "glass-blur", "glitch"
]);
export type AnimationType = z.infer<typeof AnimationTypeSchema>;

export const FormatTypeSchema = z.enum(["16:9", "9:16", "1:1"]).default("16:9");
export type FormatType = z.infer<typeof FormatTypeSchema>;

export const InteractionSchema = z.object({
    type: z.enum(["click", "move"]),
    target: z.string().optional(), // CSS selector or element ID
    x: z.number().optional(), // Absolute or relative X
    y: z.number().optional(), // Absolute or relative Y
    startFrame: z.number().min(0),
    durationInFrames: z.number().min(1).default(15),
    ripple: z.boolean().default(true),
});
export type InteractionConfig = z.infer<typeof InteractionSchema>;

export const CameraSchema = z.object({
    x: z.number().default(0),
    y: z.number().default(0),
    zoom: z.number().min(0.1).default(1),
    smooth: z.boolean().default(true),
});
export type CameraConfig = z.infer<typeof CameraSchema>;

export const AudioSchema = z.object({
    src: z.string().min(1, "Audio source URL is required"),
    volume: z.number().min(0).max(1).default(1),
    startFrame: z.number().min(0).default(0),
    fadeInFrames: z.number().min(0).default(0),
    fadeOutFrames: z.number().min(0).default(0),
    loop: z.boolean().default(false)
});
export type AudioConfig = z.infer<typeof AudioSchema>;

export const DepthSchema = z.object({
    perspective: z.number().default(1000),
    rotateX: z.number().default(0),
    rotateY: z.number().default(0),
});
export type DepthConfig = z.infer<typeof DepthSchema>;

export const VFXSchema = z.object({
    chromaticAberration: z.boolean().default(false),
    motionBlur: z.boolean().default(false),
});
export type VFXConfig = z.infer<typeof VFXSchema>;

export const AudioReactSchema = z.object({
    multiplier: z.number().default(1.1),
    frequencyRange: z.tuple([z.number(), z.number()]).default([0, 100]), // e.g. low frequencies = [0, 20]
});
export type AudioReactConfig = z.infer<typeof AudioReactSchema>;

export const PhysicsSchema = z.object({
    x: z.number(),
    y: z.number(),
    startFrame: z.number().min(0),
    count: z.number().optional().default(30),
});
export type PhysicsConfig = z.infer<typeof PhysicsSchema>;

/**
 * Definition of a single scene to be rendered.
 * It's agnostic in terms of what component it renders.
 */
export const SceneSchema = z.object({
    id: z.string().min(1, "Scene ID is required"),

    // The component to render (must be serializable or part of a component map if passed from outside CLI, 
    // but for a React component consumer it can be the actual element/node if rendered via Player.
    // For CLI strictly, this needs to specify a registered component name and props).
    componentName: z.string().optional(),
    props: z.record(z.string(), z.any()).optional(),

    // Duration in frames
    durationInFrames: z.number().positive("Duration must be a positive number"),

    // Animation config for the AnimateWrapper
    animation: z.object({
        type: AnimationTypeSchema.default("none"),
        durationInFrames: z.number().optional().default(15),
        delayInFrames: z.number().optional().default(0),
    }).optional().default({ type: "none" }),

    // V2 Expansion: Camera, Cursor Interactions, and per-scene SFX
    camera: CameraSchema.optional(),
    interactions: z.array(InteractionSchema).optional().default([]),
    audio: z.array(AudioSchema).optional().default([]),

    // V3 Expansion: Depth, VFX, and Audio Reactivity
    depth: DepthSchema.optional(),
    vfx: VFXSchema.optional(),
    audioReact: AudioReactSchema.optional(),
    physics: PhysicsSchema.optional(),
});
export type SceneConfig = z.infer<typeof SceneSchema>;

/**
 * Global Video Configuration received by the MotionEngine
 */
export const VideoConfigSchema = z.object({
    // Global remotion composition settings
    fps: z.number().min(1).max(120).default(30),

    // Preset format type - can override width and height if processed
    format: FormatTypeSchema,
    width: z.number().positive().default(1920),
    height: z.number().positive().default(1080),

    // Audio Sync behavior
    syncDurationToAudio: z.boolean().default(false),

    // Global Voiceover / Background Music
    audioTracks: z.array(AudioSchema).optional().default([]),

    // Optional Tailwind global classes to inject in the root layout (e.g. background color)
    globalClasses: z.string().optional(),

    // Array of scenes, rendered sequentially
    scenes: z.array(SceneSchema).min(1, "At least one scene is required"),
});
export type VideoConfig = z.infer<typeof VideoConfigSchema>;
