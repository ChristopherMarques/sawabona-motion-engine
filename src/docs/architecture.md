# Arquitetura do @sawabona/motion-engine

O pacote `@sawabona/motion-engine` é um motor de renderização programática de vídeos baseado em React e **Remotion**. Ele foi desenhado para expor um componente amigável e agnóstico de front-end que recebe uma configuração via objeto/JSON para gerar vídeos dinâmicos de alta qualidade utilizando estilização com **Tailwind CSS**.

## Design do Sistema

O projeto é arquitetado seguindo os princípios de **Atomic Design** em conjunto com as melhores práticas recomendadas para o ecossistema do **Remotion** e **Shadcn UI**. 

A estrutura base possui a seguinte hierarquia organizacional:

```text
src/
├── components/
│   ├── atoms/
│   │   └── ui/             # Componentes Shadcn UI puros e primitivos Tailwind
│   ├── molecules/          # Elementos de UI combinados para uso interno nas cenas
│   ├── organisms/          # Componentes altamente responsáveis como SceneRenderer e AnimateWrapper
│   └── templates/          # Layouts base do vídeo master (Background, Título, Transições Glovais)
├── core/
│   ├── Composition.tsx     # O "Player" central (ponto de entrada da Composition do Remotion)
│   └── MotionEngine.tsx    # O componente principal Wrapper que será consumido pela aplicação mãe
├── hooks/
│   └── use*.ts             # Custom hooks do Remotion para orquestração de frames (Fade, Slide, Ease)
└── schemas/
    └── video.schema.ts     # Schema de Validação de Configurações (Zod) da API
```

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
