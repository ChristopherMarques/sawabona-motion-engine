import React, { useMemo } from "react";
import { VideoConfigSchema } from "../schemas/video.schema";
import { EngineComposition, ComponentRegistry } from "./Composition";

export interface MotionEngineProps {
    config: unknown; // Takes raw input to validate internally against zod
    componentRegistry?: ComponentRegistry;
}

/**
 * Root level exported wrapper for registering and wrapping the Remotion App Pipeline.
 * Useful when integrating into other apps.
 */
export const MotionEngine: React.FC<MotionEngineProps> = ({ config, componentRegistry }) => {
    // 1. Zod Validation
    const validatedConfig = useMemo(() => {
        try {
            return VideoConfigSchema.parse(config);
        } catch (e: any) {
            console.error("VideoConfig Validation Error:", e.errors);
            return null;
        }
    }, [config]);

    if (!validatedConfig) {
        return (
            <div className="w-full p-4 bg-destructive/10 text-destructive text-sm font-semibold border border-destructive/20 rounded-md">
                MotionEngine: Invalid Video Configuration Props. Check console.
            </div>
        )
    }

    // 2. Render Composition Context
    // In a real application, if this is called from an App router/Browser, we only render Player.
    // By returning EngineComposition, this component can be directly embedded in <Player /> 
    // or wrapped in a <Composition /> for the Remotion CLI.
    return (
        <EngineComposition config={validatedConfig} registry={componentRegistry} />
    );
};
