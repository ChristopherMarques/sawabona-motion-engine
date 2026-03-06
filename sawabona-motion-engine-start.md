# Prompt de Desenvolvimento: @sawabona/motion-engine

## 1. Contexto e Objetivo
O objetivo é desenvolver um pacote NPM chamado `@sawabona/motion-engine`. Este pacote é um motor de renderização de vídeo baseado em **Remotion** que permite transformar componentes React, estilos Tailwind e textos em vídeos de motion design profissionais de forma programática. O motor deve ser agnóstico, recebendo configurações via objeto/JSON e renderizando cenas dinâmicas com animações de alta fidelidade.

## 2. Stack Tecnológica Obrigatória
- **Framework Core:** React 18+ & Remotion.
- **Linguagem:** TypeScript (Strict Mode).
- **Estilização:** Tailwind CSS (configuração injetável).
- **Componentização:** Shadcn UI (baseado em Radix UI).
- **Animações:** Framer Motion (para transições complexas) e Remotion Hooks (`spring`, `interpolate`).
- **Arquitetura de Pastas:** Atomic Design.
- **Princípios:** SOLID e Clean Code.

## 3. Arquitetura e Estrutura de Pastas
A estrutura deve seguir o **Atomic Design** estritamente:
- `src/components/atoms/ui`: Todos os componentes base do Shadcn.
- `src/components/molecules`: Elementos compostos (ex: Card de texto de cena, Timeline).
- `src/components/organisms`: Cenas completas (ex: SceneRenderer).
- `src/components/templates`: Layouts de vídeo (ex: MasterLayout).
- `src/hooks`: Abstrações de animação (ex: `useSlideIn`, `useFadeIn`).
- `src/docs`: Documentação técnica em Markdown.
- `src/schemas`: Validação de tipos com Zod para os parâmetros do vídeo.

## 4. Requisitos Funcionais (RF)
- **RF01 - Configuração Dinâmica:** O motor deve aceitar um objeto `VideoConfig` contendo: globalStyles, fps, duração total e um array de `scenes`.
- **RF02 - Injeção de Componentes:** Deve ser capaz de renderizar qualquer componente React passado via props como o "corpo" da cena.
- **RF03 - Orquestração de Timeline:** O pacote deve calcular automaticamente os frames de início e fim de cada sequência com base na duração fornecida no JSON.
- **RF04 - Motor de Animação:** Implementar wrappers de animação (Ease-in, Fade, Slide, Spring) que envolvem o componente injetado.
- **RF05 - Suporte a Assets:** Deve lidar com URLs de imagens, vídeos de fundo e fontes externas.

## 5. Requisitos Não Funcionais (RNF)
- **RNF01 - SOLID:** O código deve respeitar o Princípio da Responsabilidade Única (cada animação é um hook/componente isolado) e o Aberto/Fechado (novas animações podem ser adicionadas sem alterar o core).
- **RNF02 - Documentação:** Toda a lógica de funcionamento e os contratos de interface devem estar documentados em `src/docs/`.
- **RNF03 - Performance:** O motor deve ser otimizado para não causar gargalos no Puppeteer durante a renderização de frames pesados.
- **RNF04 - Tipagem:** Exportar tipos completos para que o projeto consumidor (SaaS) tenha autocomplete total ao configurar o vídeo.

## 6. Fluxo de Dados
1. **Input:** O projeto consumidor invoca o componente `<MotionEngine config={config} />`.
2. **Validation:** O motor valida o objeto `config` usando Zod.
3. **Setup:** O `Root.tsx` do Remotion registra a `Composition` com os metadados recebidos.
4. **Rendering:** - O motor mapeia o array de cenas.
   - Para cada cena, ele injeta o `globals.css` fornecido.
   - Aplica o `Sequence` do Remotion para o tempo exato.
   - Renderiza o `AnimateWrapper` (Atomic Organism) que contém o componente do usuário.
5. **Output:** Renderização via CLI para MP4 ou Preview em tempo real.

## 7. Instruções de Implementação para a IA
1. **Fase 1 (Docs):** Comece criando o `src/docs/architecture.md` explicando a escolha do Remotion e a estrutura de diretórios.
2. **Fase 2 (Atoms):** Configure o Tailwind e instale os componentes essenciais do Shadcn em `src/components/atoms/ui`.
3. **Fase 3 (Core Engine):** Desenvolva o componente `Composition` principal que recebe o objeto de configuração.
4. **Fase 4 (Hooks):** Crie os hooks de animação reutilizáveis utilizando a matemática do Remotion (`interpolate` e `spring`).
5. **Fase 5 (Exports):** Configure o `index.ts` para exportar o motor de forma que possa ser instalado como um pacote NPM agnóstico.

---
**Restrição Técnica:** Não utilize bibliotecas de animação externas pesadas que não se integrem bem com o SSR do Remotion. Priorize a matemática nativa do Remotion para garantir a sincronia de frames.