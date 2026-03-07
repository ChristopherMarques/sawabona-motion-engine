import React, { createContext } from 'react';
import { useCurrentFrame, random } from 'remotion';

interface AudioVisualizerData {
    currentVolume: number;
}

export const AudioVisualizerContext = createContext<AudioVisualizerData | null>(null);

interface ProviderProps {
    audioSrc?: string;
    children: React.ReactNode;
}

/**
 * Wraps a Scene to provide audio visualization data to any component inside it.
 * Uses `@remotion/media-utils` in a full setup. Here we provide a deterministic simulated
 * pulse based on the frame to prove the architecture works before adding heavy async decoding.
 */
export const AudioVisualizerProvider: React.FC<ProviderProps> = ({ audioSrc, children }) => {
    const frame = useCurrentFrame();

    // If no audio is present, provide 0 volume.
    if (!audioSrc) {
        return (
            <AudioVisualizerContext.Provider value={{ currentVolume: 0 }}>
                {children}
            </AudioVisualizerContext.Provider>
        );
    }

    // Mocking the audio frequency data deterministically for the V3 prototype
    // In a production app, we use `useAudioData(audioSrc)` from `@remotion/media-utils`
    // and `visualizeAudio({ fps, frame, audioData })`

    // A fake "beat" every 30 frames (gives a very Pomelli-esque heartbeat to the UI)
    const isBeat = frame % 30 < 5;
    const currentVolume = isBeat ? random(`beat-${frame}`) : 0;

    return (
        <AudioVisualizerContext.Provider value={{ currentVolume }}>
            {children}
        </AudioVisualizerContext.Provider>
    );
};
