// Export Schemas
export { VideoConfigSchema, SceneSchema, AnimationTypeSchema } from "./schemas/video.schema";
export type { VideoConfig, SceneConfig, AnimationType } from "./schemas/video.schema";

// Export Core Engine Components
export { MotionEngine } from "./core/MotionEngine";
export type { MotionEngineProps } from "./core/MotionEngine";

export { EngineComposition } from "./core/Composition";
export type { CompositionProps, ComponentRegistry } from "./core/Composition";

// Export Animation Wrappers and Hooks
export { AnimateWrapper } from "./components/organisms/AnimateWrapper";
export type { AnimateWrapperProps } from "./components/organisms/AnimateWrapper";

export { DashboardShowcase } from "./components/templates/DashboardShowcase";

export { useFadeIn, useFadeOut, useSlideIn, useRotate, useMove, useTypewriter, useZoom } from "./hooks/animations";

// Tailwind plugin configuration and utils
export { cn } from "./lib/utils";
