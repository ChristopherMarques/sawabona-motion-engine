import React, { useMemo } from "react";
import { Composition } from "remotion";
import { VideoConfigSchema } from "../schemas/video.schema";
import { EngineComposition, ComponentRegistry } from "./Composition";

export interface MotionEngineProps {
    config: unknown; // Takes raw input to validate internally against zod
    componentRegistry?: ComponentRegistry;
    compositionId?: string;
}

/**
 * Root level exported wrapper for registering and wrapping the Remotion App Pipeline.
 * Useful when integrating into other apps.
 */
export const MotionEngine: React.FC<MotionEngineProps> = ({ config, componentRegistry, compositionId = "MotionEngineComposition" }) => {
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

    // 2. Parse total duration
    const durationInFrames = useMemo(() => {
        return validatedConfig.scenes.reduce((acc, scene) => acc + scene.durationInFrames, 0);
    }, [validatedConfig.scenes]);

    // 3. Render Composition Context
    // In a real application, if this is called from an App router/Browser, we only render Player.
    // We leave it simply exposing the engine Composition logic here which can be mounted by root 
    // or a preview player externally.
    return (
        <Composition
            id={compositionId}
            component={EngineComposition as React.FC<any>}
            durationInFrames={durationInFrames}
            fps={validatedConfig.fps}
            width={validatedConfig.width}
            height={validatedConfig.height}
            defaultProps={{
                config: validatedConfig,
                registry: componentRegistry,
            }}
        />
    );
};
