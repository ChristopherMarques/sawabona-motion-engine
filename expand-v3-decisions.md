# 💎 @sawabona/motion-engine: O Guia Definitivo de Engenharia (V1 a V3)

Este documento consolida a arquitetura técnica, os requisitos e o roadmap de evolução do motor de vídeo programático `@sawabona/motion-engine`. O objetivo é permitir a criação de comerciais de produtos digitais com o nível de sofisticação do Google Labs, mantendo a fidelidade técnica do código React original.

---

## 1. Estado Atual: O Core do Motor (V1)

O `@sawabona/motion-engine` já opera como um motor "headless" robusto sobre o Remotion.

* **Motor Driven-by-JSON**: Utiliza um objeto de configuração (`VideoConfig`) altamente tipado e validado via Zod para definir a estrutura do vídeo.
* **Timeline Automática**: Gerencia sequências de cenas baseadas em `durationInFrames`, abstraindo cálculos manuais de tempo.
* **Registro de Componentes**: Permite que o usuário cadastre componentes UI (React + Tailwind + Shadcn) em um dicionário para serem injetados dinamicamente no vídeo.
* **Animações Nativas**: Inclui transições de `fade`, `zoom` (via springs), `slide`, `rotate`, `move` e um efeito `typewriter` para textos.

---

## 2. Requisitos de Evolução Profissional (V2)

Para elevar a qualidade das produções, a V2 foca na simulação de interação e controle cinematográfico.

### 2.1 Interação e UX
* **Virtual Interaction System**: Renderização de um cursor virtual que se move programaticamente entre elementos da UI.
* **Agnostic Ripple Overlay**: Implementação de efeitos de clique (ondas de choque) como overlays visuais, garantindo que o motor funcione com qualquer componente sem necessidade de mocks internos.

### 2.2 Sistema de Câmera e Foco
* **Virtual Camera (2D Lens)**: Envolve as cenas em um container de transformação global para permitir efeitos de zoom e pan.
* **Dynamic Focus**: Capacidade de focar em coordenadas específicas (`x, y`) ou IDs de elementos para destacar funcionalidades do SaaS.

---

## 3. Evolução Cinematográfica: O Padrão V3 (Estilo Pomelli)

Para atingir a fluidez de comerciais de alto nível (ex: Google Pomelli), o motor implementará os seguintes pilares de física e sincronia.

### 3.1 Physics Engine (`usePhysics`)
* **Requisito**: Implementar um sistema de partículas leve (baseado em `canvas-confetti` ou lógica de springs nativa).
* **Objetivo**: Garantir sincronia perfeita de quadros (frame sync) durante a renderização no Puppeteer, evitando quedas de performance.
* **Uso**: Disparar elementos orgânicos (ícones, corações, notificações) que reagem à gravidade ou explosões após interações.

### 3.2 Audio Reactivity (`useAudioReact`)
* **Requisito**: Implementar o `<AudioVisualizerContext>` utilizando `@remotion/media-utils`.
* **Mecânica**: O motor decodifica o arquivo de áudio no momento do render e fornece dados de frequência/volume em tempo real.
* **Funcionalidade**: Qualquer componente inscrito no contexto pode ter sua escala (`scale`) ou propriedades visuais (como brilho/glow) dirigidas pela batida ou picos da narração.

### 3.3 Layout Morphing (Shared Elements)
* **Requisito**: Implementar um `LayoutRegistry` para transições fluidas entre cenas.
* **Mecânica (Pseudo-Morphing)**: O motor identifica elementos com IDs compartilhados entre cenas diferentes, duplica-os e realiza o "voo" (vía posicionamento absoluto) entre as posições de origem e destino.
* **Objetivo**: Criar a sensação de que o produto é um organismo único em constante transformação, em vez de cortes secos.

---

## 4. Arquitetura de Software e Hooks (SOLID)



### 4.1 Hooks Fundamentais
1.  **`useInteraction`**: Gerencia o estado e trajetória do cursor virtual e gatilhos de ripple.
2.  **`useCamera`**: Fornece os valores de `interpolate` para o container de zoom global.
3.  **`useAudioReact`**: Permite que componentes assinem dados de áudio para animações reativas.
4.  **`useVFX`**: Gerencia efeitos de pós-processamento como Chromatic Aberration e Motion Blur dinâmico.

### 4.2 Estrutura Atômica
* **Atoms**: `Cursor`, `Ripple`, `Particle`, `TextChar`.
* **Molecules**: `AnimateWrapper`, `AudioTrack`, `FocusSpotlight`.
* **Organisms**: `SceneRenderer` (conecta o componente do usuário ao sistema de animação).
* **Templates**: `ProductWalkthrough` (layout padrão com narração e destaque lateral).

---

## 5. Roadmap de Construção

1.  **Fase 1 (Sincronia)**: Implementação do `AudioVisualizerContext` para permitir que o vídeo "pulse" com a música.
2.  **Fase 2 (Física)**: Integração do sistema de partículas para efeitos de feedback visual em cliques e transições.
3.  **Fase 3 (Movimento)**: Refinamento do `LayoutRegistry` para permitir que elementos (como logos ou botões) naveguem entre cenas de forma contínua.
4.  **Fase 4 (Documentação)**: Escrita dos guias técnicos em `src/docs/` detalhando o uso de cada novo hook para o ecossistema open-source.

---
**Nota Técnica**: A flag `syncDurationToAudio: boolean` será o novo padrão para garantir que as demonstrações de funcionalidades nunca terminem antes da explicação em áudio.