import React from 'react';
import { Sequence } from 'remotion';
import type { SceneConfig } from '../../schemas/video.schema';

// V2 Imports
import { VirtualCursor } from '../atoms/motion/VirtualCursor';
import { AudioTrack } from '../molecules/AudioTrack';
import { AnimateWrapper } from '../molecules/AnimateWrapper';
import { useCamera } from '../../hooks/useCamera';
import { useInteraction } from '../../hooks/useInteraction';
import { useVFX } from '../../hooks/useVFX';
import { DepthLayer } from '../molecules/DepthLayer';
import { AudioVisualizerProvider } from './AudioVisualizerProvider';
import { ParticlesOverlay } from '../atoms/motion/ParticlesOverlay';

interface SceneRendererProps {
    scene: SceneConfig;
    // The resolved react component from the consumer's Registry
    ResolvedComponent: React.ElementType | null;
}

/**
 * Organism responsible for rendering an entire Scene.
 * It sets up the Virtual Camera container (scaling/translating the view),
 * delegates the component rendering to the AnimateWrapper,
 * overlays interactions (VirtualCursor), and orchestrates audio.
 */
export const SceneRenderer: React.FC<SceneRendererProps> = ({ scene, ResolvedComponent }) => {

    // 1. Resolve Camera Transforms
    const camera = useCamera(scene.camera);

    // 2. Resolve target nodes into interaction coordinates
    const interactions = useInteraction(scene.interactions);

    // 3. Resolve Post-Processing VFX (Motion Blur, Aberration) based on Camera movement
    const vfx = useVFX(scene.vfx, scene.camera);

    // 4. Resolve Physics if provided (in a full implementation, this could map from interactions)
    // Here we cast to any since we didn't add it to the strict schema yet for simplicity.
    const physicsConfig = (scene as any).physics || null;

    return (
        <AudioVisualizerProvider audioSrc={scene.audio?.[0]?.src}>
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

                {/* AUDIO LAYER */}
                {scene.audio?.map((audioConfig, idx) => (
                    <Sequence key={`audio-${idx}`} from={audioConfig.startFrame}>
                        <AudioTrack config={audioConfig} />
                    </Sequence>
                ))}

                {/* DEPTH LAYER (3D Spatial Layer) */}
                <DepthLayer config={scene.depth}>
                    {/* VIRTUAL CAMERA & VFX LAYER */}
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            transformOrigin: 'center center',
                            transform: `scale(${camera.scale}) translate(${-camera.x}px, ${-camera.y}px)`,
                            filter: vfx.filter
                        }}
                    >
                        {/* 3. INJECTED COMPONENT + TRANSITIONS */}
                        {ResolvedComponent ? (
                            <AnimateWrapper
                                animationType={scene.animation.type}
                                durationInFrames={scene.animation.durationInFrames}
                                delayInFrames={scene.animation.delayInFrames}
                            >
                                <ResolvedComponent {...(scene.props || {})} />
                            </AnimateWrapper>
                        ) : (
                            // Fallback
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white font-mono">
                                No component mapped for `{scene.componentName}`
                            </div>
                        )}
                    </div>
                </DepthLayer>

                {/* CURSOR OVERLAY LAYER */}
                {interactions?.length > 0 && (
                    <VirtualCursor interactions={interactions} />
                )}

                {/* PHYSICS LAYER */}
                {physicsConfig && (
                    <ParticlesOverlay config={physicsConfig} />
                )}

            </div>
        </AudioVisualizerProvider>
    );
};
