# Arquitetura do @sawabona/motion-engine

O pacote `@sawabona/motion-engine` é um motor de renderização programática de vídeos baseado em React e **Remotion**. Ele foi desenhado para expor um componente amigável e agnóstico de front-end que recebe uma configuração via objeto/JSON para gerar vídeos dinâmicos de alta qualidade utilizando estilização com **Tailwind CSS**.

## Design do Sistema (V2)

O projeto é arquitetado seguindo os princípios de **Atomic Design** em conjunto com as melhores práticas recomendadas para o ecossistema do **Remotion** e **Shadcn UI**. 

A estrutura base possui a seguinte hierarquia organizacional:

```text
src/
├── components/
│   ├── atoms/
│   │   ├── ui/             # Componentes Shadcn UI puros e primitivos Tailwind
│   │   └── motion/         # Elementos de Overlay agnósticos (VirtualCursor, RippleOverlay)
│   ├── molecules/          # Elementos de UI / Wrappers (AnimateWrapper, AudioTrack)
│   ├── organisms/          # Componentes altamente responsáveis como SceneRenderer e containers de Câmera
│   └── templates/          # Layouts base do vídeo master (Background, Título, Transições Globais)
├── core/
│   ├── Composition.tsx     # O "Player" central (ponto de entrada da Composition do Remotion)
│   └── MotionEngine.tsx    # O componente principal Wrapper que será consumido pela aplicação mãe
├── hooks/                  # Abstrações matemáticas (useCamera, useInteraction, useFadeIn)
└── schemas/                # Schema de Validação de Configurações (Zod) da API
```

### Novas Capacidades da V2
1. **Virtual Camera:** Transforma o `SceneRenderer` em um espaço 2D navegável via Zoom e Pan.
2. **Interaction Emulator:** Hooks como `useInteraction` criam overlays de cursos de mouse virtuais e ripples que interagem de forma agnóstica com os componentes da UI.
3. **Audio Sync:** Infraestrutura de `<AudioTrack>` nativa conectada ao ciclo de cena para suporte a Voiceovers e trilhas sonoras.

## Por que Remotion?

O **Remotion** permite desenvolver sequências de vídeo da mesma forma que desenhamos UIs com o ReactJS.
1. **Controle Parametrizado:** Permite gerenciar frames com precisão absoluta através dos hooks `useVideoConfig` e `useCurrentFrame`, sincronizando as animações React (através de interpolação e springs) sem risco de desalinhar a métrica do MP4 final.
2. **Pipelines SSV (Server-Side-Video):** Como toda a engine se reduz a um componente React renderizável, facilita a injeção do pacote num micro-serviço e geração usando Puppeteer (Browser headless) ou `@remotion/lambda`.
3. **Semântico:** Facilita a escalabilidade para introduzir Tailwind CSS, Fontes Externas e manipulação de estado do framerate, essencial em SaaS onde a fluidez importa.

## Animações e Sincronização
**NÃO utilizamos frameworks de Motion pesados.** Pela recomendação fundamental de performance dentro de renderização frame-a-frame sem drop, todas as funções de **Fade-In, Transformações, Escalonamentos e Envelopamento de Timing** foram escritas baseando-se explicitamente na importação das funções low-level do remotion: `interpolate()` e `spring()`.

- **Atomic Hooks:** Temos ganchos injetáveis como `useFadeIn()` que expõe valores prontos dependendo da duração passada na configuração da cena.
- **Orquestração de Cena:** O `<SceneRenderer>` do motor cuida de injetar a `<Sequence>` relativa do Remotion utilizando lógica de soma encadeada do tempo baseado na tabela de Scenes definidas na `VideoConfig`.

## Contrato do Consumidor

O pacote exportará três items principais:
- O componente `<MotionEngine config={VideoConfig} />`
- Os tipos `VideoConfig`, `Scene`, `AnimationType` em TypeScript.
- Uma API de importação para temas Tailwind injetáveis.
