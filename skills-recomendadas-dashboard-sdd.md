# Skills recomendadas para el proyecto — Dashboard de Inversiones Personales

## Objetivo

Este archivo resume qué skills de [skills.sh](https://skills.sh/) conviene usar para este proyecto y **en qué prompt conviene aplicarlas**.

La idea NO es instalar por instalar. La idea es usar skills que realmente ayuden en la clase a reforzar:

- arquitectura frontend
- diseño visual
- accesibilidad
- TDD
- uso disciplinado de Tailwind

---

## Resumen ejecutivo

Si hubiera que elegir solo las más útiles para esta clase, la selección recomendada es:

1. `anthropics/skills@frontend-design`
2. `wshobson/agents@tailwind-design-system`
3. `addyosmani/web-quality-skills@accessibility`
4. `obra/superpowers@test-driven-development`

---

## Recomendación por prompt

### Prompt 1 — SDD + arquitectura + configuración base

En este prompt conviene priorizar skills que ayuden a definir estructura, disciplina y base técnica.

#### 1. test-driven-development

**Skill**: `obra/superpowers@test-driven-development`

**Por qué sirve acá**:
- fuerza el ciclo `RED -> GREEN -> REFACTOR`
- ayuda a instalar disciplina antes de empezar a programar por ansiedad
- es ideal para cuando prepares el entorno de testing y las primeras tareas implementables

**Cuándo usarla**:
- al definir la estrategia de testing del diseño técnico
- al generar tasks separando RED/GREEN/REFACTOR
- al preparar el setup mínimo de tests

**Instalación**:
```bash
npx skills add obra/superpowers@test-driven-development -g -y
```

**Referencia**:
- https://skills.sh/obra/superpowers/test-driven-development

**Nota importante**:
Esta es probablemente la skill más importante para sostener la narrativa didáctica de SDD + TDD.

---

#### 2. tailwind-design-system

**Skill**: `wshobson/agents@tailwind-design-system`

**Por qué sirve acá**:
- ayuda a pensar Tailwind como sistema y no como mezcla caótica de utilidades
- da criterio para tokens, patrones, estados y consistencia visual
- puede orientar la estructura base de estilos y componentes visuales simples

**Cuándo usarla**:
- al pensar la base visual del proyecto
- al definir patrones de tarjetas, inputs, badges y layout
- al organizar reglas de consistencia con Tailwind

**Instalación**:
```bash
npx skills add wshobson/agents@tailwind-design-system -g -y
```

**Referencia**:
- https://skills.sh/wshobson/agents/tailwind-design-system

**Observación técnica**:
La skill está muy orientada a Tailwind v4. Si en clase usás una configuración más simple o más cercana a v3/vite clásico, tomala como guía conceptual, no como ley absoluta.

---

### Prompt 2 — Desarrollo fino de UI + comportamiento

En este prompt conviene priorizar skills ligadas a interfaz, experiencia visual y calidad de interacción.

#### 3. frontend-design

**Skill**: `anthropics/skills@frontend-design`

**Por qué sirve acá**:
- ayuda a evitar una UI genérica y sin intención
- mejora jerarquía visual, composición, color, tipografía y personalidad
- es ideal para que el dashboard se vea “terminado” y atractivo para clase

**Cuándo usarla**:
- al construir la UI base del dashboard
- al refinar KPIs, tarjetas, filtros y detalle
- al mejorar la presentación general del proyecto

**Instalación**:
```bash
npx skills add anthropics/skills@frontend-design -g -y
```

**Referencia**:
- https://skills.sh/anthropics/skills/frontend-design

**Observación pedagógica**:
Muy buena para levantar el nivel visual, PERO hay que usarla con criterio. Si la dejás correr sola, puede querer ponerse demasiado “creativa”. En esta clase te conviene usarla para calidad visual, no para barroquismo innecesario.

---

#### 4. accessibility

**Skill**: `addyosmani/web-quality-skills@accessibility`

**Por qué sirve acá**:
- alinea perfecto con tu programa de HTML semántico y WCAG 2.2
- cubre labels, foco visible, navegación por teclado, contraste, roles y validaciones manuales
- te da argumentos técnicos sólidos para explicar por qué un `button` real vale más que un `div` clickeable

**Cuándo usarla**:
- al revisar formularios y filtros
- al implementar el panel/modal de detalle
- al validar foco visible, `aria-label`, headings y navegación básica por teclado

**Instalación**:
```bash
npx skills add addyosmani/web-quality-skills@accessibility -g -y
```

**Referencia**:
- https://skills.sh/addyosmani/web-quality-skills/accessibility

**Observación pedagógica**:
Esta skill no es opcional si querés que la demo quede alineada con el enfoque serio de la unidad. Te ayuda a convertir accesibilidad en criterio arquitectónico, no en checklist cosmético.

---

## Orden recomendado de uso real

### Durante Prompt 1

Usar principalmente:

1. `obra/superpowers@test-driven-development`
2. `wshobson/agents@tailwind-design-system`

Porque en esa etapa importa más:
- disciplina de implementación
- estrategia de testing
- consistencia de estructura
- base del sistema visual

---

### Durante Prompt 2

Usar principalmente:

1. `anthropics/skills@frontend-design`
2. `addyosmani/web-quality-skills@accessibility`

Porque en esa etapa importa más:
- calidad visual real
- decisiones de UI
- validación de interacción
- accesibilidad del resultado final

---

## Instalación sugerida

Si querés dejar todo listo de una vez, podés instalar estas cuatro:

```bash
npx skills add anthropics/skills@frontend-design -g -y
npx skills add wshobson/agents@tailwind-design-system -g -y
npx skills add addyosmani/web-quality-skills@accessibility -g -y
npx skills add obra/superpowers@test-driven-development -g -y
```

---

## Referencias verificadas

- Frontend Design  
  https://skills.sh/anthropics/skills/frontend-design

- Tailwind Design System  
  https://skills.sh/wshobson/agents/tailwind-design-system

- Accessibility  
  https://skills.sh/addyosmani/web-quality-skills/accessibility

- Test-Driven Development  
  https://skills.sh/obra/superpowers/test-driven-development

---

## Cierre

La mejor combinación para esta clase no es “la skill más popular”, sino la que mejor refuerza el mensaje docente:

- primero pensar
- después especificar
- después diseñar
- después probar
- recién ahí implementar y refinar la UI

Eso es lo que estas skills te ayudan a sostener.
