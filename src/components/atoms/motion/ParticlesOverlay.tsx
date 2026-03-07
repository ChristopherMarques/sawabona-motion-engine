import React from 'react';
import { usePhysics, type ParticleConfig } from '../../../hooks/usePhysics';

interface ParticlesOverlayProps {
    config: ParticleConfig | null;
}

/**
 * Agnostic physical layer to render explosive dynamics over the Timeline.
 * Hooks flawlessly into `usePhysics` ensuring 100% frame reproduction on server render.
 */
export const ParticlesOverlay: React.FC<ParticlesOverlayProps> = ({ config }) => {
    const particles = usePhysics(config);

    if (particles.length === 0) return null;

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 9998 // Just below cursor, but above UI
            }}
        >
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: 12,
                        height: 12,
                        backgroundColor: p.color,
                        borderRadius: p.shapeType === 'circle' ? '50%' : '2px',
                        transform: `scale(${p.scale}) rotate(${p.rotation}deg)`,
                        transformOrigin: 'center center',
                        boxShadow: `0 0 10px ${p.color}80` // subtle bloom
                    }}
                />
            ))}
        </div>
    );
};
