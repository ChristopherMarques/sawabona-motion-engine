import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { InteractionConfig } from '../../../schemas/video.schema';
import { RippleOverlay } from './RippleOverlay';

interface VirtualCursorProps {
    interactions: InteractionConfig[];
}

export const VirtualCursor: React.FC<VirtualCursorProps> = ({ interactions }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // The cursor needs to keep track of its last position to interpolate to the next.
    // For simplicity, we calculate the absolute position at the current frame based on intervals.

    const currentPosition = useMemo(() => {
        // Initial defaults (bottom right corner for instance)
        let pos = { x: 1000, y: 800 };
        let currentInteractionIndex = -1;

        // Find the interaction that is currently active or the last one that finished
        for (let i = 0; i < interactions.length; i++) {
            if (frame >= interactions[i].startFrame) {
                currentInteractionIndex = i;
            }
        }

        if (currentInteractionIndex === -1) return pos; // No interactions started yet

        const activeInt = interactions[currentInteractionIndex];
        const prevInt = currentInteractionIndex > 0 ? interactions[currentInteractionIndex - 1] : null;

        // Origin for the current movement
        const startX = prevInt?.x ?? pos.x;
        const startY = prevInt?.y ?? pos.y;

        // Target for the current movement
        const targetX = activeInt.x ?? startX;
        const targetY = activeInt.y ?? startY;

        // Progress of the current movement
        const localFrame = frame - activeInt.startFrame;

        // Use a spring for realistic cursor movement
        const progress = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, mass: 0.8 },
            durationInFrames: activeInt.durationInFrames
        });

        // Interpolate purely based on spring progress (0 to 1)
        pos.x = interpolate(progress, [0, 1], [startX, targetX]);
        pos.y = interpolate(progress, [0, 1], [startY, targetY]);

        return pos;
    }, [frame, interactions, fps]);

    // Check if we should render a ripple right now
    const activeRipple = useMemo(() => {
        const clickingInteraction = interactions.find(
            (int) => int.type === 'click' &&
                int.ripple &&
                frame >= int.startFrame + int.durationInFrames &&
                frame <= int.startFrame + int.durationInFrames + 30 // Ripple lasts 30 frames
        );

        if (clickingInteraction) {
            return {
                x: clickingInteraction.x ?? 0,
                y: clickingInteraction.y ?? 0,
                startFrame: clickingInteraction.startFrame + clickingInteraction.durationInFrames
            };
        }
        return null;
    }, [frame, interactions]);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 9999, // Ensure it's above everything
            }}
        >
            {activeRipple && (
                <RippleOverlay
                    x={activeRipple.x}
                    y={activeRipple.y}
                    startFrame={activeRipple.startFrame}
                />
            )}

            {/* Virtual Cursor SVG */}
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
                    // A slight shadow for realism
                    filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))'
                }}
            >
                <path
                    d="M11.6667 27.6667L6.33333 4.33333L26.3333 15L15.6667 17L11.6667 27.6667Z"
                    fill="black"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};
