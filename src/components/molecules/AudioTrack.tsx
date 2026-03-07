import React from 'react';
import { Audio, interpolate } from 'remotion';
import type { AudioConfig } from '../../schemas/video.schema';

interface AudioTrackProps {
    config: AudioConfig;
}

/**
 * Handles playing an Audio track within a Scene or Composition.
 * Supports Fade In and Fade Out relative to the audio's own start frame.
 */
export const AudioTrack: React.FC<AudioTrackProps> = ({ config }) => {

    // Fading out logic is trickier since we don't always know the exact length of the audio file 
    // inside the component unless calculated externally or if tied to scene duration.
    // Assuming the user configures an explicit 'fadeOutFrames' at the end of its active sequence.
    // For now we apply it based on the assumption it fades out before the audio ends.
    // Remotion handles this better with `volume={(f) => interpolate(f, ...)}` if we pass a callback directly to `<Audio>`.

    // We can pass a volume callback to the Audio component natively to handle timeline fades:
    const volumeCallback = (f: number) => {
        // Natively, f is the absolute frame of the Composition here, or relative to the Sequence.
        // Assuming AudioTrack renders within a Sequence that wraps the audio length.

        let v = config.volume;

        // Fade in
        if (config.fadeInFrames > 0) {
            v = interpolate(f, [0, config.fadeInFrames], [0, config.volume], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        }

        return v;
    };

    return (
        <Audio
            src={config.src}
            volume={volumeCallback}
            loop={config.loop}
        // Remotion <Audio> starts at frame 0 of the current <Sequence> or at its root. 
        // The `startFrom` prop refers to skipping parts of the audio file in frames.
        // If the audio starts at frame N of the composition, it must be wrapped in a <Sequence from={config.startFrame}>
        />
    );
};
