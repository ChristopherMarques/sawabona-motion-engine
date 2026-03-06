import React from "react";
import { type AnimationType } from "../../schemas/video.schema";
import { useFadeIn, useSlideIn, useZoom, useFadeOut, useRotate, useMove, useTypewriter } from "../../hooks/animations";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AnimateWrapperProps {
    children: React.ReactNode;
    animationType?: AnimationType;
    durationInFrames?: number;
    delayInFrames?: number;
}

/**
 * Wraps any React Node and applies the requested entry animation dynamically
 * utilizing Remotion hooks to ensure perfect frame sync.
 */
export const AnimateWrapper: React.FC<AnimateWrapperProps> = ({
    children,
    animationType = "none",
    durationInFrames = 15,
    delayInFrames = 0,
}) => {

    // Conditionally apply the resulted style while always calling hooks 
    // to strictly adhere to React's rules of hooks.

    const fadeOpacity = useFadeIn({ durationInFrames, delayInFrames });
    const fadeOutOpacity = useFadeOut({ durationInFrames, delayInFrames });
    const slideUpTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "up" });
    const slideDownTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "down" });
    const slideLeftTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "left" });
    const slideRightTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "right" });

    const zoomTransform = useZoom({ durationInFrames, delayInFrames });
    const rotateTransform = useRotate({ durationInFrames, delayInFrames });
    const moveTransform = useMove({ durationInFrames, delayInFrames });

    // Typewriter effect only works beautifully if the children is a raw string, 
    // but the hook must be called unconditionally.
    const isStringChild = typeof children === "string";
    const textTypewriter = useTypewriter({
        text: isStringChild ? children : "",
        durationInFrames,
        delayInFrames
    });

    const currentFrame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scaleProgress = spring({
        frame: currentFrame - delayInFrames,
        fps,
        config: { damping: 10, mass: 0.5, stiffness: 100 },
    });

    let style: React.CSSProperties = {};
    let renderedChildren = children;

    switch (animationType) {
        case "fade":
            style = { opacity: fadeOpacity };
            break;
        case "fade-out":
            style = { opacity: fadeOutOpacity };
            break;
        case "slide-up":
            style = { opacity: fadeOpacity, transform: slideUpTransform };
            break;
        case "slide-down":
            style = { opacity: fadeOpacity, transform: slideDownTransform };
            break;
        case "slide-left":
            style = { opacity: fadeOpacity, transform: slideLeftTransform };
            break;
        case "slide-right":
            style = { opacity: fadeOpacity, transform: slideRightTransform };
            break;
        case "spring":
            style = { opacity: fadeOpacity, transform: `scale(${scaleProgress})` };
            break;
        case "zoom":
            style = { opacity: fadeOpacity, transform: zoomTransform };
            break;
        case "rotate":
            style = { opacity: fadeOpacity, transform: rotateTransform };
            break;
        case "move":
            style = { opacity: fadeOpacity, transform: moveTransform };
            break;
        case "typewriter":
            if (isStringChild) {
                renderedChildren = textTypewriter;
            }
            break;
        default:
            break;
    }

    return <div style={style} className="w-full h-full flex flex-col">{renderedChildren}</div>;
};
