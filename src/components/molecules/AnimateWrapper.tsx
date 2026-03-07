import React from "react";
import { type AnimationType } from "../../schemas/video.schema";
import { useFadeIn, useSlideIn, useZoom, useFadeOut, useRotate, useMove, useTypewriter } from "../../hooks/animations";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

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

    const fadeOpacity = useFadeIn({ durationInFrames, delayInFrames });
    const fadeOutOpacity = useFadeOut({ durationInFrames, delayInFrames });
    const slideUpTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "up" });
    const slideDownTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "down" });
    const slideLeftTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "left" });
    const slideRightTransform = useSlideIn({ durationInFrames, delayInFrames, direction: "right" });

    const zoomTransform = useZoom({ durationInFrames, delayInFrames });
    const rotateTransform = useRotate({ durationInFrames, delayInFrames });
    const moveTransform = useMove({ durationInFrames, delayInFrames });

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

    // Custom V2 Effects
    const localFrame = Math.max(0, currentFrame - delayInFrames);
    const inProgress = Math.min(1, localFrame / (durationInFrames || 15));

    // Glass Blur
    const glassBlurValue = interpolate(inProgress, [0, 0.5, 1], [20, 10, 0], { extrapolateRight: "clamp" });
    const glassOpacityValue = interpolate(inProgress, [0, 0.5, 1], [0, 0.5, 1], { extrapolateRight: "clamp" });

    // Glitch
    // Simple pseudo-random glitch based on frame
    const isGlitching = inProgress < 1 && inProgress > 0 && localFrame % 3 === 0;
    const glitchTranslateX = isGlitching ? Math.sin(localFrame) * 10 : 0;
    const glitchTranslateY = isGlitching ? Math.cos(localFrame) * 10 : 0;
    const glitchSkew = isGlitching ? Math.sin(localFrame) * 5 : 0;

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
        case "glass-blur":
            style = {
                opacity: glassOpacityValue,
                filter: `blur(${glassBlurValue}px)`,
                transform: `scale(${interpolate(inProgress, [0, 1], [1.1, 1], { extrapolateRight: "clamp" })})`
            };
            break;
        case "glitch":
            style = {
                transform: `translate(${glitchTranslateX}px, ${glitchTranslateY}px) skewX(${glitchSkew}deg)`,
                opacity: fadeOpacity,
                filter: isGlitching ? 'hue-rotate(90deg) contrast(150%)' : 'none'
            };
            break;
        case "morph":
            // Fallback generic morph utilizing border-radius and scaling
            const morphScaleX = interpolate(inProgress, [0, 1], [0.1, 1], { extrapolateRight: "clamp" });
            const morphScaleY = interpolate(inProgress, [0, 1], [0.3, 1], { extrapolateRight: "clamp" });
            const morphRadius = interpolate(inProgress, [0, 1], [100, 0], { extrapolateRight: "clamp" });
            style = {
                opacity: fadeOpacity,
                transform: `scaleX(${morphScaleX}) scaleY(${morphScaleY})`,
                borderRadius: `${morphRadius}px`,
                overflow: 'hidden'
            };
            break;
        default:
            break;
    }

    return <div style={style} className="w-full h-full flex flex-col">{renderedChildren}</div>;
};
