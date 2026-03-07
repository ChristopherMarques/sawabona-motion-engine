import { useCurrentFrame, random } from 'remotion';

export interface ParticleConfig {
    x: number;
    y: number;
    startFrame: number;
    count?: number;
}

/**
 * Generates a deterministic array of particles following a gravity curve for the given frame.
 * Since this needs to execute flawlessly inside Puppeteer during video render, 
 * we use pure math (Projectile Motion) mapped to the absolute frame instead of interval-based React state.
 */
export const usePhysics = (config: ParticleConfig | null) => {
    const frame = useCurrentFrame();

    if (!config) return [];

    const localFrame = frame - config.startFrame;
    if (localFrame < 0) return []; // Hasn't exploded yet

    const count = config.count || 30; // 30 particles by default

    // We use Remotion's `random` with a string seed to be deterministic based on the config startFrame
    const seed = config.startFrame;

    return new Array(count).fill(0).map((_, i) => {
        // Random angle for explosion (full 360 degrees)
        const angle = random(`angle-${seed}-${i}`) * Math.PI * 2;

        // Random velocity between 15 and 45
        const velocity = random(`vel-${seed}-${i}`) * 30 + 15;

        // Projectile motion physics logic
        // x = v * cos(A) * t
        // y = v * sin(A) * t + 0.5 * g * t^2
        const t = localFrame;
        const gravity = 1.8; // Gravity multiplier

        const x = config.x + (velocity * Math.cos(angle) * t);

        // If we want it to explode "upwards" more often, we can tweak the initial Y, 
        // but an isotropic blast is fine. The gravity takes over downwards.
        const y = config.y + (velocity * Math.sin(angle) * t) + (0.5 * gravity * t * t);

        const rotation = t * (random(`rot-${seed}-${i}`) * 10 - 5);

        // Scale down linearly to fade out over 60 frames
        const scale = Math.max(0, 1 - (t / 60));

        const colors = ['#fbbf24', '#f87171', '#60a5fa', '#34d399', '#c084fc'];
        const color = colors[Math.floor(random(`color-${seed}-${i}`) * colors.length)];

        // Randomly pick a shape: circle, square, or a heart-like path
        const shapeType = random(`shape-${seed}-${i}`) > 0.5 ? 'circle' : 'square';

        return { x, y, rotation, scale, color, shapeType };
    }).filter(p => p.scale > 0);
};
