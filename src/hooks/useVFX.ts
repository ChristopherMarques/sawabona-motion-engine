import { useCurrentFrame, interpolate } from 'remotion';
import type { VFXConfig, CameraConfig } from '../schemas/video.schema';

/**
 * Math logic for Post-Processing effects linked to scene movement.
 */
export const useVFX = (vfxConfig?: VFXConfig, cameraConfig?: CameraConfig) => {
    const frame = useCurrentFrame();

    if (!vfxConfig) return {};

    let filter = "";

    // If there is a camera movement, we calculate its peak velocity (roughly middle of the duration)
    // to apply motion blur and chromosomal distorsions dynamically without external CSS libs.
    const isMoving = cameraConfig && cameraConfig.smooth;

    if (vfxConfig.motionBlur && isMoving) {
        // Blur peaks at frame 15, then goes back to 0 at frame 30
        const blurValue = interpolate(frame, [0, 15, 30], [0, 4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        if (blurValue > 0) {
            filter += ` blur(${blurValue}px)`;
        }
    }

    if (vfxConfig.chromaticAberration && isMoving) {
        // Without SVG displacement maps, we fake it with contrast/saturation pumping during high speed
        const abValue = interpolate(frame, [0, 15, 30], [0, 3, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        if (abValue > 0) {
            filter += ` contrast(${100 + abValue * 15}%) saturate(${100 + abValue * 30}%)`;
        }
    }

    return {
        filter: filter.trim() || undefined
    };
};
