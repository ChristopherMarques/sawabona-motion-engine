import { z } from "zod";

// --- Enums and Sub-Schemas ---

export const AnimationTypeSchema = z.enum(["fade", "slide-up", "slide-down", "slide-left", "slide-right", "spring", "zoom", "rotate", "move", "fade-out", "typewriter", "none"]);
export type AnimationType = z.infer<typeof AnimationTypeSchema>;

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
});
export type SceneConfig = z.infer<typeof SceneSchema>;

/**
 * Global Video Configuration received by the MotionEngine
 */
export const VideoConfigSchema = z.object({
    // Global remotion composition settings
    fps: z.number().min(1).max(120).default(30),
    width: z.number().positive().default(1920),
    height: z.number().positive().default(1080),

    // Optional Tailwind global classes to inject in the root layout (e.g. background color)
    globalClasses: z.string().optional(),

    // Array of scenes, rendered sequentially
    scenes: z.array(SceneSchema).min(1, "At least one scene is required"),
});
export type VideoConfig = z.infer<typeof VideoConfigSchema>;
