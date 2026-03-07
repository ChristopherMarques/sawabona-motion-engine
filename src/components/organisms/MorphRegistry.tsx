import React, { createContext, useState } from 'react';

export interface MorphRect {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface MorphContextType {
    registry: Record<string, MorphRect>;
    registerRect: (id: string, rect: MorphRect) => void;
}

export const MorphContext = createContext<MorphContextType>({
    registry: {},
    registerRect: () => { }
});

/**
 * Organism responsible for maintaining a global registry of element coordinates.
 * This satisfies the "Shared Element Transition" Architecture (Pseudo-Morphing).
 * A component ending its scene lifecycle records its BoundingRect here.
 * The next scene's component with the same ID reads this registry to set its `from` spring coordinate.
 */
export const MorphRegistryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [registry, setRegistry] = useState<Record<string, MorphRect>>({});

    const registerRect = (id: string, rect: MorphRect) => {
        setRegistry(prev => ({ ...prev, [id]: rect }));
    };

    return (
        <MorphContext.Provider value={{ registry, registerRect }}>
            {children}
        </MorphContext.Provider>
    );
};
