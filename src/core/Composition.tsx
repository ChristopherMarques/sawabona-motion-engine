import React, { useMemo } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { type VideoConfig } from "../schemas/video.schema";
import { AnimateWrapper } from "../components/organisms/AnimateWrapper";
import { cn } from "../lib/utils";
import "../styles/globals.css";

// This will become a registry in a real-world scenario so users can pass components
// mapped to names over CLI. Or if imported as library, they can pass functional components directly.
export interface ComponentRegistry {
    [key: string]: React.ComponentType<any>;
}

export interface CompositionProps {
    config: VideoConfig;
    registry?: ComponentRegistry;
}

const SceneContentRenderer: React.FC<{ scene: any, registry?: ComponentRegistry }> = ({ scene, registry }) => {
    let ComponentToRender: React.ReactNode = null;

    if (scene.componentName && registry && registry[scene.componentName]) {
        const Comp = registry[scene.componentName];
        ComponentToRender = <Comp {...(scene.props || {})} />;
    } else {
        ComponentToRender = (
            <div className="flex w-full h-full items-center justify-center bg-muted text-muted-foreground p-8">
                <h1 className="text-4xl font-bold">Raw Text Fallback: {scene.id}</h1>
            </div>
        );
    }

    return (
        <AnimateWrapper
            animationType={scene.animation?.type}
            durationInFrames={scene.animation?.durationInFrames}
            delayInFrames={scene.animation?.delayInFrames}
        >
            {ComponentToRender}
        </AnimateWrapper>
    );
};

export const EngineComposition: React.FC<CompositionProps> = ({ config, registry }) => {

    // Calculate the total duration of the video and the start frame of each scene
    const scenesWithTiming = useMemo(() => {
        let currentStartFrame = 0;

        return config.scenes.map((scene) => {
            const startFrame = currentStartFrame;
            currentStartFrame += scene.durationInFrames;

            return {
                ...scene,
                startFrame,
            };
        });
    }, [config.scenes]);

    return (
        <div className={cn("w-full h-full bg-background font-sans", config.globalClasses)}>
            <AbsoluteFill>
                {scenesWithTiming.map((scene, index) => (
                    <Sequence
                        key={scene.id + String(index)}
                        from={scene.startFrame}
                        durationInFrames={scene.durationInFrames}
                    >
                        <SceneContentRenderer scene={scene} registry={registry} />
                    </Sequence>
                ))}
            </AbsoluteFill>
        </div>
    );
};
