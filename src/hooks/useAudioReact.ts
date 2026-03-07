import { useContext } from 'react';
import { AudioVisualizerContext } from '../components/organisms/AudioVisualizerProvider';
import type { AudioReactConfig } from '../schemas/video.schema';

/**
 * Hook to be used by any component that wants to "pulse" to the beat.
 * Reads the generic context and applies the multiplier from the V3 Schema.
 */
export const useAudioReact = (config?: AudioReactConfig) => {
    const audioData = useContext(AudioVisualizerContext);

    // If there is no AudioReact config or no Audio track Context, return a clean scale of 1
    if (!config || !audioData) {
        return 1;
    }

    // Mix the current analyzed volume (0 to 1) with the desired user multiplier.
    // e.g., if multiplier is 1.5 and volume is 1, return 1.5. If volume is 0, return 1.
    const reactiveScale = 1 + (audioData.currentVolume * (config.multiplier - 1));

    return reactiveScale;
};
