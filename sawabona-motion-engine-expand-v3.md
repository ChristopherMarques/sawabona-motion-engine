# 🚀 Gap Analysis: @sawabona/motion-engine vs. Pomelli Style

Para replicar a fluidez e o impacto visual do comercial do Pomelli, precisamos implementar quatro pilares técnicos que ainda não constam no core atual do motor.

---

## 1. O Pilar da Física e Partículas (Dynamics)
No vídeo do Pomelli, vemos elementos (como massas ou ícones) voando de forma orgânica. Atualmente, o motor lida com interpolações lineares ou springs simples.
- **O que falta:** Um `usePhysics` hook.
- **Implementação:** Integrar uma engine de física leve (como `canvas-confetti` adaptada ou lógica de gravidade manual no Remotion).
- **Funcionalidade:** Permitir que, ao "clicar" em um componente, ele dispare "partículas" (corações, moedas, ícones) que seguem uma curva de Bézier ou gravidade.

## 2. Profundidade e Pseudo-3D (Spatial UI)
O vídeo de referência utiliza muita profundidade (Z-axis) e distorções (como o smartphone dobrando). O motor hoje é focado em 2D puro com Tailwind.
- **O que falta:** Suporte a `perspective` e `rotateX/Y` coordenados.
- **Implementação:** Um componente `<DepthLayer />` que aplica automaticamente `perspective: 1000px` e permite que o JSON controle a inclinação dos componentes injetados.
- **Efeito:** Criar a sensação de que o dashboard do seu SaaS está "flutuando" no espaço.

## 3. Pós-Processamento e VFX (Glow & Blur)
A estética do Pomelli é marcada por brilhos (blooms) e desfoques de movimento que tornam a transição "cara".
- **O que falta:** Filtros dinâmicos vinculados à velocidade da animação.
- **Implementação:** - **Motion Blur:** Um hook que calcula a velocidade do elemento e aplica `filter: blur()` proporcionalmente ao movimento.
    - **Glow Tipográfico:** Evoluir o átomo de texto para suportar `text-shadow` animado que "pulsa" conforme o áudio.

## 4. Morphing de Layout (Seamless Transitions)
Atualmente, as cenas no motor parecem blocos independentes que entram um após o outro. No Pomelli, um elemento de uma cena "se transforma" no elemento da próxima.
- **O que falta:** Shared Element Transitions.
- **Implementação:** Criar um `LayoutRegistry` onde o motor identifica componentes com o mesmo `id` em cenas diferentes e interpola sua posição e tamanho entre o fim da Cena A e o início da Cena B.
- **Exemplo:** O ícone da "Sawabona Tech" no centro da tela diminui e voa para o canto superior esquerdo para se tornar o logo da Navbar na cena seguinte.

---

## 🏗️ Roadmap de Novos Hooks Necessários

### `useVFX()` (Visual Effects)
Responsável por gerenciar camadas de "sujeira" visual que dão realismo:
- **Chromatic Aberration:** Leve distorção de cor nas bordas durante zooms rápidos.
- **Dynamic Shadows:** Sombras que mudam de ângulo conforme o componente se move pela tela.

### `useInteractionRipple()` (Impacto)
Diferente do cursor simples, este hook deve emitir uma "onda" que distorce levemente os elementos ao redor do ponto de clique.
- **Lógica:** No frame do clique, aplicar um `scale` de 0.98 seguido de um `spring` de 1.05 em todo o container da UI para simular o impacto físico.

### `useAudioReact()` (Sincronia de Pico)
Fazer com que elementos da UI "vibrassem" no ritmo da batida da trilha sonora.
- **Lógica:** Analisar o buffer de áudio (via `remotion/media-utils`) e extrair o volume para usar como multiplicador nas animações de `scale` dos componentes.

---

## Conclusão de Arquitetura
O @sawabona/motion-engine já resolve a parte difícil: a infraestrutura e o registro de componentes. Para chegar ao nível Pomelli, o foco agora deve sair do **"O QUE"** aparece na tela e focar no **"COMO"** ele se comporta fisicamente. 

A "Syntax Sting" (picada da sintaxe) deve ser refletida em animações que têm peso, inércia e brilho.