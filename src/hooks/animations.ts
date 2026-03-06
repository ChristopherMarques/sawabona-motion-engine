import { interpolate, useCurrentFrame, Easing } from "remotion";

interface UseFadeInProps {
    durationInFrames: number;
    delayInFrames?: number;
}

/**
 * Returns an opacity value between 0 and 1, fading in over the specified duration.
 */
export const useFadeIn = ({ durationInFrames, delayInFrames = 0 }: UseFadeInProps) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(
        frame,
        [delayInFrames, delayInFrames + durationInFrames],
        [0, 1],
        {
            easing: Easing.inOut(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return opacity;
};

interface UseSlideInProps {
    durationInFrames: number;
    delayInFrames?: number;
    direction: "up" | "down" | "left" | "right";
    distance?: number;
}

/**
 * Returns a translation string (e.g. translateY(20px)) sliding in using an easing animation.
 */
export const useSlideIn = ({ durationInFrames, delayInFrames = 0, direction, distance = 50 }: UseSlideInProps) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame - delayInFrames,
        [0, durationInFrames],
        [0, 1],
        {
            easing: Easing.bezier(0.16, 1, 0.3, 1), // smooth "Apple-like" ease out
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // Calculate the Start Position (offset distance) based on direction
    const xStart = direction === "right" ? distance : direction === "left" ? -distance : 0;
    const yStart = direction === "down" ? -distance : direction === "up" ? distance : 0;

    // The End position is always 0 (original position in the flow)
    const x = interpolate(progress, [0, 1], [xStart, 0]);
    const y = interpolate(progress, [0, 1], [yStart, 0]);

    return `translate(${x}px, ${y}px)`;
};

interface UseZoomProps {
    durationInFrames: number;
    delayInFrames?: number;
    startScale?: number;
    endScale?: number;
}

/**
 * Returns a scale string (e.g. scale(1.5)) using an easing animation.
 */
export const useZoom = ({
    durationInFrames,
    delayInFrames = 0,
    startScale = 0,
    endScale = 1
}: UseZoomProps) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame - delayInFrames,
        [0, durationInFrames],
        [0, 1],
        {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const scale = interpolate(progress, [0, 1], [startScale, endScale]);

    return `scale(${scale})`;
};

export const useFadeOut = ({ durationInFrames, delayInFrames = 0 }: UseFadeInProps) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(
        frame - delayInFrames,
        [0, durationInFrames],
        [1, 0],
        {
            easing: Easing.inOut(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return opacity;
};

interface UseRotateProps {
    durationInFrames: number;
    delayInFrames?: number;
    degrees?: number;
}

/**
 * Returns a rotation string (e.g. rotate(90deg)) using an easing animation.
 */
export const useRotate = ({ durationInFrames, delayInFrames = 0, degrees = 360 }: UseRotateProps) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame - delayInFrames,
        [0, durationInFrames],
        [0, 1],
        {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const rotation = interpolate(progress, [0, 1], [0, degrees]);

    return `rotate(${rotation}deg)`;
};

interface UseMoveProps {
    durationInFrames: number;
    delayInFrames?: number;
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
}

/**
 * Returns a translation string (e.g. translate(x, y)) moving an element from a start point to an end point.
 */
export const useMove = ({
    durationInFrames,
    delayInFrames = 0,
    startX = 0,
    startY = 0,
    endX = 100,
    endY = 100
}: UseMoveProps) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame - delayInFrames,
        [0, durationInFrames],
        [0, 1],
        {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const x = interpolate(progress, [0, 1], [startX, endX]);
    const y = interpolate(progress, [0, 1], [startY, endY]);

    return `translate(${x}px, ${y}px)`;
};

interface UseTypewriterProps {
    text: string;
    durationInFrames: number;
    delayInFrames?: number;
}

/**
 * Returns a substring of the text simulating a typewriter effect.
 */
export const useTypewriter = ({ text, durationInFrames, delayInFrames = 0 }: UseTypewriterProps) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame,
        [delayInFrames, delayInFrames + durationInFrames],
        [0, text.length],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return text.substring(0, Math.round(progress));
};
