import { useState, useEffect } from 'react';
import { useVideoConfig } from 'remotion';
import type { InteractionConfig } from '../schemas/video.schema';

/**
 * Hook to translate element selectors into absolute coordinates for the VirtualCursor.
 * Since Remotion renders DOM, we can use standard getBoundingClientRect.
 * 
 * Note: If the interactions purely use x, y then no translation is needed.
 */
export const useInteraction = (interactionsConfig: InteractionConfig[] | undefined) => {
    // We try to resolve string targets to pixel coordinates
    const [resolvedInteractions, setResolvedInteractions] = useState<InteractionConfig[]>([]);
    const { width: compWidth } = useVideoConfig();

    useEffect(() => {
        if (!interactionsConfig || interactionsConfig.length === 0) {
            setResolvedInteractions([]);
            return;
        }

        // Run once the DOM is mounted to map targets into x, y
        const mapInteractions = () => {
            const mapped = interactionsConfig.map(interaction => {
                if (interaction.target && (!interaction.x || !interaction.y)) {
                    try {
                        const el = document.querySelector(interaction.target);
                        if (el) {
                            // Find the scaling container wrapper created by Remotion
                            const container = el.closest('[data-remotion-container]') ||
                                el.closest('.remotion-absolute-fill') ||
                                document.querySelector('.remotion-player');

                            const rect = el.getBoundingClientRect();

                            // Target the center of the element by default
                            let finalX = rect.left + rect.width / 2;
                            let finalY = rect.top + rect.height / 2;

                            if (container) {
                                const containerRect = container.getBoundingClientRect();
                                // Remotion scale = visually rendered width / actual composition width
                                const scale = containerRect.width / compWidth;

                                finalX = (finalX - containerRect.left) / scale;
                                finalY = (finalY - containerRect.top) / scale;
                            }

                            return {
                                ...interaction,
                                x: finalX,
                                y: finalY,
                            }
                        }
                    } catch (e) {
                        console.warn(`[Motion Engine] Failed to find target: ${interaction.target}`);
                    }
                }

                // Fallback to existing x/y or center of screen if nothing else
                return {
                    ...interaction,
                    x: interaction.x ?? 960,
                    y: interaction.y ?? 540
                };
            });

            setResolvedInteractions(mapped);
        };

        // Small timeout to ensure Remotion has mounted the actual user components
        const timeout = setTimeout(mapInteractions, 100);

        return () => clearTimeout(timeout);
    }, [interactionsConfig, compWidth]);

    // If still resolving, we can optionally return the raw interactions
    return resolvedInteractions.length > 0 ? resolvedInteractions : (interactionsConfig || []);
};
