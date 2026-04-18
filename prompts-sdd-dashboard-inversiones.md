# Dos prompts para open-code — Dashboard de Inversiones Personales

## Idea de uso en clase

Este archivo deja el trabajo dividido en **dos prompts grandes**, que para esta clase tiene mucho más sentido pedagógico:

1. **Prompt 1**: armar el marco SDD, la arquitectura, la configuración y la base técnica del proyecto.
2. **Prompt 2**: desarrollar la UI y el comportamiento fino sobre esa base ya definida.

Así no mezclás en una sola corrida:

- estrategia
- estructura
- tooling
- specs
- diseño
- implementación visual

Primero levantás el esqueleto arquitectónico. Después pasás a la parte visible.

---

## Prompt 1 — SDD + arquitectura + configuración base

Usá este prompt para que open-code prepare el proyecto de forma seria antes de meterse con la UI final.

```text
Quiero que trabajes sobre este proyecto usando SDD en modo estricto.

Fuente de verdad:
- `./dashboard-inversiones-requerimientos.md`

Nombre del cambio:
- `dashboard-inversiones-personales`

Reglas obligatorias:
- usar artifact store mode `hybrid`
- redactar TODOS los artefactos SDD en español
- trabajar en modo interactivo y pedagógico para mostrarle el proceso a alumnos
- NO avanzar todo de una vez: detenerte al final de cada fase y esperar confirmación
- NO saltear propuesta, specs, diseño ni tasks
- no ejecutar build
- si hay ambigüedad, preguntar antes de avanzar

Objetivo de este prompt:
Quiero que prepares la base arquitectónica y técnica del proyecto, pero SIN meterte todavía en el desarrollo fino de la UI final.

Necesito que avances en este orden:

## Fase 1
- crear o verificar el contexto SDD del proyecto
- dejar explícito que los artefactos deben quedar en español

## Fase 2
- generar la propuesta del cambio

## Fase 3
- escribir las specs formales del dashboard

## Fase 4
- generar el diseño técnico simple y didáctico

## Fase 5
- generar `tasks.md` con tareas chicas, concretas y bien ordenadas

## Fase 6
- preparar la configuración base del proyecto para poder desarrollar después:
  - estructura de carpetas
  - base semántica inicial
  - configuración de Tailwind o integración con el proyecto si hace falta
  - entorno mínimo de testing para trabajar con TDD en frontend vanilla
  - módulos base para estado, servicios y UI si corresponde

Reglas de interacción:
1. antes de cada fase, explicá en pocas líneas qué vas a hacer
2. ejecutá SOLO esa fase
3. al final resumí qué quedó listo
4. frená y pedime confirmación para pasar a la siguiente fase

Condiciones importantes:
- priorizar claridad pedagógica
- dejar una arquitectura fácil de explicar
- separar responsabilidades entre estado, servicios y UI
- preparar el terreno para TDD en las próximas fases
- no hacer todavía la UI detallada final
- no hacer todavía el comportamiento fino completo

Empezá únicamente por la Fase 1.
Primero mostrame un resumen corto de cómo vas a encarar la Fase 1 y luego ejecutala.
Después frenate y esperá mi confirmación.
```

---

## Prompt 2 — Desarrollo fino de UI + comportamiento

Usá este prompt DESPUÉS de terminar el Prompt 1, cuando ya tengas propuesta, specs, diseño, tasks y base técnica preparada.

```text
Continuemos el cambio `dashboard-inversiones-personales` ya preparado previamente.

Quiero que trabajes en modo interactivo, pedagógico y con TDD sobre la base SDD ya existente.

Reglas obligatorias:
- usar artifact store mode `hybrid`
- mantener los artefactos y explicaciones en español
- trabajar fase por fase y detenerte al final de cada una
- antes de implementar, indicar qué requirement/spec/task se cubre
- aplicar TDD cuando corresponda: `RED -> GREEN -> REFACTOR`
- antes del código, mostrar el test, criterio verificable o comportamiento esperado
- diferenciar qué se valida con tests y qué se valida manualmente
- no ejecutar build

Objetivo de este prompt:
Desarrollar la UI, el comportamiento y el refinamiento final del Dashboard de Inversiones Personales sobre la arquitectura ya definida.

Necesito que avances en este orden:

## Fase 1
- completar la UI base con HTML semántico y layout visual usando Tailwind
- asegurar jerarquía visual, responsive design, foco visible y buena estructura

## Fase 2
- implementar carga de datos desde JSON local con `fetch`
- mostrar estados de loading y error
- renderizar resumen y listado inicial

## Fase 3
- implementar búsqueda, filtros y ordenamiento
- actualizar el DOM sin recargar
- aplicar delegación de eventos donde tenga sentido

## Fase 4
- implementar favoritos con persistencia en `localStorage`

## Fase 5
- implementar panel o modal de detalle accesible

## Fase 6
- implementar estado vacío
- revisar accesibilidad general
- hacer refactor final si hace falta

## Fase 7
- verificar el resultado contra proposal, specs, design y tasks

Reglas de interacción:
1. explicá qué fase vas a resolver y qué artifact/spec/task cubrís
2. si aplica TDD, mostrátelo como RED -> GREEN -> REFACTOR
3. implementá SOLO esa fase
4. resumí qué quedó hecho
5. frená y esperá confirmación para continuar

Condiciones de implementación:
- usar funciones chicas y nombres claros
- evitar variables globales
- separar estado, servicio y render
- usar manipulación segura del DOM
- evitar `innerHTML` inseguro
- mantener semántica y accesibilidad
- no agregar features fuera del alcance del archivo de requerimientos

Empezá únicamente por la Fase 1.
Primero mostrame un resumen corto de cómo vas a encarar esta fase y luego ejecutala.
Después frenate y esperá mi confirmación.
```

---

## Orden sugerido real de uso

1. correr **Prompt 1**
2. dejar que genere y estabilice:
   - propuesta
   - specs
   - diseño
   - tasks
   - configuración base
3. recién después correr **Prompt 2**
4. usar las pausas entre fases para explicar decisiones en clase

---

## Beneficio pedagógico de esta división

Esta separación permite mostrar dos cosas distintas:

- **Prompt 1** enseña arquitectura, proceso, especificación y preparación del proyecto.
- **Prompt 2** enseña construcción de UI, DOM, estado, eventos y refinamiento visual.

Y eso está buenísimo porque los alumnos ven que la UI no nace de la nada: primero se diseña el sistema y después se construye la pantalla.
