<div align="center">
  <img src="apps/web/public/favicon.ico" alt="Sawabona Motion Engine Logo" width="80" height="80" />
  <h1>@sawabona/motion-engine</h1>
  <p>The ultimate headless engine for generating dynamic, brand-consistent commercial videos at scale. Powered by Remotion, Tailwind, and Shadcn UI.</p>

  <a href="https://www.npmjs.com/package/@sawabona/motion-engine">
    <img src="https://img.shields.io/npm/v/@sawabona/motion-engine?style=flat-square&color=indigo" alt="NPM Version" />
  </a>
  <a href="https://github.com/sawabona/motion-engine/blob/main/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@sawabona/motion-engine?style=flat-square&color=blue" alt="License" />
  </a>
  <a href="https://www.npmjs.com/package/@sawabona/motion-engine">
    <img src="https://img.shields.io/npm/dt/@sawabona/motion-engine?style=flat-square&color=green" alt="NPM Downloads" />
  </a>
</div>

## ✨ Features

- **Built on React**: Programmatic video creation without needing to learn a new framework or after-effects. If you know React, you know Motion Engine.
- **JSON-Driven Declarative API**: Build entire video compositions by simply passing a deeply-typed JSON configuration payload (perfect for AI & LLMs).
- **Zod Validated Schemas**: Strict out-of-the-box validation.
- **11 Built-In Elegant Animations**: Fluid entering/exiting hooks powered by Remotion Springs (`fade`, `zoom`, `slide-up`, `typewriter`, and more).
- **Tailwind & Shadcn Compatible**: Perfectly syncs with your application's UI design system.

## 🚀 Quick Start

### Installation

No complex peer dependency resolution required. Motion Engine pulls everything you need except React.

```bash
npm install @sawabona/motion-engine
# or
yarn add @sawabona/motion-engine
# or
pnpm add @sawabona/motion-engine
```

### Basic Usage

Define your scenes and configurations inside a JSON payload (validates securely against our `VideoConfigSchema`), and map your custom UI React components to the `MotionEngine` root. 

```tsx
import React from 'react';
import { MotionEngine, type VideoConfig } from '@sawabona/motion-engine';

// 1. Create your custom standard React Components (Scenes/Slides)
const TitleSlide = ({ text }: { text: string }) => (
  <div className="flex w-full h-full items-center justify-center bg-zinc-950">
    <h1 className="text-8xl font-black text-white">{text}</h1>
  </div>
);

// 2. Map the name you will use in your JSON to the Component
const MY_COMPONENT_REGISTRY = {
  "MainTitle": TitleSlide
};

// 3. Define the configuration for the Video Timeline
const myVideoConfig: VideoConfig = {
  fps: 60,
  width: 1920,
  height: 1080,
  scenes: [
    {
      id: "scene-1",
      durationInFrames: 120, // 2 seconds
      componentName: "MainTitle",
      animation: { 
        type: "spring", 
        durationInFrames: 30 
      },
      props: { text: "Hello World!" }
    }
  ]
};

// 4. Render the Engine!
export default function App() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
       <MotionEngine 
          config={myVideoConfig} 
          componentRegistry={MY_COMPONENT_REGISTRY} 
       />
    </div>
  );
}
```

## 📖 Available Built-In Animations

Motion Engine’s `AnimateWrapper` natively intercepts your JSON choices and executes Remotion hooks under the hood:

- `none` / `fade` / `fade-out`
- `slide-up` / `slide-down` / `slide-left` / `slide-right`
- `spring` (bouncy native scale)
- `zoom`
- `rotate`
- `move`
- `typewriter` (Ideal for strings)

For detailed information about API schemas and hooks, see our robust type definitions directly in your IDE.

## 🤝 Contributing & Licensing

We welcome contributions from the community! See our [Contributing Guide](CONTRIBUTING.md) to get started on setting up the local environment.

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.
