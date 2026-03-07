import { useMemo } from 'react';
import { spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CameraConfig } from '../schemas/video.schema';

/**
 * Hook to handle the 2D Virtual Camera logic.
 * Calculates panning (x, y) and zoom (scale) over the specified timeline.
 */
export const useCamera = (cameraConfig?: CameraConfig) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return useMemo(() => {
        // Defaults if no config provided
        if (!cameraConfig) {
            return {
                x: 0,
                y: 0,
                scale: 1,
            };
        }

        // We assume the camera movement happens during the first N frames of the scene.
        // For a more advanced setup, the config could take an array of keyframes.
        // Currently, it smoothly transitions from 0,0,1 to the target config.

        const progress = spring({
            frame,
            fps,
            config: { damping: 12, mass: 1 },
            durationInFrames: cameraConfig.smooth ? 30 : 1 // 1 sec transition if smooth
        });

        return {
            x: interpolate(progress, [0, 1], [0, cameraConfig.x]),
            y: interpolate(progress, [0, 1], [0, cameraConfig.y]),
            scale: interpolate(progress, [0, 1], [1, cameraConfig.zoom]),
        };

    }, [cameraConfig, frame, fps]);
};
