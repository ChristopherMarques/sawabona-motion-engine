# Contributing to @sawabona/motion-engine

First off, thank you for considering contributing to Motion Engine! It's people like you that make the open-source community such a great place to learn, inspire, and create.

This document details our contribution guidelines.

## 🛠 Setup the Project Locally

Motion Engine uses `npm` as its primary package manager. 

1. **Fork & Clone** the repository:
   ```bash
   git clone https://github.com/sawabona/motion-engine.git
   cd motion-engine
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Watcher**:
   This runs `tsup` in watch mode so your changes instantly compile the package.
   ```bash
   npm run dev
   ```

4. **Testing in the Playground**:
   You can spin up the built-in Next.js showcase web application to visually verify changes to the core engine:
   ```bash
   cd apps/web
   npm run dev
   ```
   Open `http://localhost:3000/playground` to see updates applying live.

## 🧩 Implementing new Features / Animations

If you're suggesting a new animation hook or schema change:

1. Update the `AnimationTypeSchema` in `src/schemas/video.schema.ts`.
2. Add your custom math/interpolation hook logic inside `src/hooks/animations.ts`.
3. Integrate the hook invocation and its CSS `style` interpretation inside the `src/components/organisms/AnimateWrapper.tsx`.
4. Ensure `npm run build` succeeds cleanly and TypeScript types have no errors.

## 📝 Pull Request Process

1. Provide a comprehensive summary of the changes within the PR description.
2. If your change affects the public API or schemas, please try your best to document it or include a generic markdown example.
3. Keep PRs scoped to one specific bug fix or feature.
4. Reference any relevant open issues in your PR.

## 🐞 Reporting Bugs

If you find a bug, please create an Issue and include:
- A clear and descriptive title.
- The exact JSON `VideoConfig` schema payload that triggers the bug.
- Steps to reproduce the bug.
- The version of `@sawabona/motion-engine` you are running.

Thanks again for making this engine better!
