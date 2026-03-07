import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface RippleOverlayProps {
    x: number;
    y: number;
    startFrame: number;
}

export const RippleOverlay: React.FC<RippleOverlayProps> = ({ x, y, startFrame }) => {
    const frame = useCurrentFrame();
    const localFrame = frame - startFrame;

    // The ripple expands over 30 frames and fades out
    const scale = interpolate(localFrame, [0, 20], [0, 4], {
        extrapolateRight: 'clamp',
    });
    const opacity = interpolate(localFrame, [0, 10, 30], [0, 0.5, 0], {
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                transformOrigin: 'top left', // Coordinates usually target the tip of the cursor
                width: 20,
                height: 20,
                marginLeft: -10,
                marginTop: -10,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
                color: 'var(--primary, #3b82f6)', // Fallback to blue if no css variable
                opacity,
            }}
        />
    );
};
