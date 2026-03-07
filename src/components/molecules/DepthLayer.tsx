import React from 'react';
import type { DepthConfig } from '../../schemas/video.schema';

interface DepthLayerProps {
    config?: DepthConfig;
    children: React.ReactNode;
}

/**
 * molecule responsible for Spatial UI (Pseudo-3D).
 * Injects perspective and rotation to simulate the components floating in space.
 */
export const DepthLayer: React.FC<DepthLayerProps> = ({ config, children }) => {
    if (!config) return <>{children}</>;

    const perspectiveStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        perspective: `${config.perspective}px`,
        transformStyle: 'preserve-3d',
    };

    const rotationStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        transform: `rotateX(${config.rotateX}deg) rotateY(${config.rotateY}deg)`,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
    };

    return (
        <div style={perspectiveStyle}>
            <div style={rotationStyle}>
                {children}
            </div>
        </div>
    );
};
