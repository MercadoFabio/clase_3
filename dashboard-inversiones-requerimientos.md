# Dashboard de Inversiones Personales — Requerimientos Base para SDD

## 1. Propósito de la clase

Construir en clase una **single-page app** pequeña pero profesional que permita demostrar, de forma incremental, los temas de la unidad:

- HTML semántico
- accesibilidad básica (WCAG 2.2)
- Tailwind CSS con layouts modernos
- JavaScript modular con ES Modules
- manipulación eficiente del DOM
- delegación de eventos
- Fetch API con estados de carga y error
- persistencia simple con `localStorage`
- prevención básica de XSS

La app debe ser lo bastante visual para motivar a los alumnos y lo bastante acotada para poder evolucionarla fase por fase con SDD.

---

## 2. Nombre del proyecto

**Dashboard de Inversiones Personales**

---

## 3. Resultado final esperado

La aplicación final debe verse como un pequeño panel financiero moderno:

- encabezado con título, descripción y acción principal
- bloque resumen con métricas de cartera
- barra de filtros con búsqueda, perfil de riesgo y ordenamiento
- listado responsive de activos financieros
- posibilidad de marcar favoritos
- panel o modal de detalle accesible
- estados visuales de loading, error y lista vacía

Visualmente debe transmitir una interfaz limpia, oscura o neutra, con tarjetas, buena jerarquía visual, foco visible y responsive desde mobile hasta desktop.

---

## 4. Alcance funcional

La app trabaja con un dataset local simulado de inversiones y NO requiere backend real.

Cada activo representa un instrumento financiero simple con estos campos:

- `id`
- `name`
- `symbol`
- `category`
- `riskLevel` (`Bajo`, `Medio`, `Alto`)
- `investedAmount`
- `currentValue`
- `dailyChangePercent`
- `favorite`
- `description`

---


## 5. Requisitos funcionales

### RF01 — Estructura semántica

La página debe usar HTML semántico e incluir como mínimo:

- `header`
- `main`
- `section` para resumen y filtros
- `search` o `form` para búsqueda/filtros
- `section` o `ul` para el listado
- `article` para cada tarjeta de inversión
- `button` para acciones interactivas reales

### RF02 — Resumen de cartera

La interfaz debe mostrar al menos tres métricas calculadas a partir de los datos cargados:

- total invertido
- valor actual total
- rendimiento diario promedio o cantidad de activos

### RF03 — Carga inicial de datos

Los datos deben cargarse desde un archivo JSON local usando `fetch`.

La aplicación debe mostrar:

- estado de carga
- estado de error amigable
- estado listo cuando la información esté disponible

### RF04 — Render dinámico del listado

El listado de inversiones debe renderizarse dinámicamente con JavaScript a partir de los datos obtenidos.

Cada tarjeta debe mostrar al menos:

- nombre
- símbolo
- categoría
- perfil de riesgo
- monto invertido
- valor actual
- variación diaria

### RF05 — Búsqueda y filtros

La interfaz debe permitir:

- buscar por nombre o símbolo
- filtrar por perfil de riesgo
- ordenar por monto invertido o variación diaria

Los filtros deben actualizar el DOM sin recargar la página.

### RF06 — Favoritos

Cada inversión debe poder marcarse o desmarcarse como favorita.

El estado de favoritos debe persistirse en `localStorage` para conservarse al recargar.

### RF07 — Detalle de inversión

Cada tarjeta debe permitir abrir un panel o modal con información ampliada del activo.

El detalle debe incluir:

- nombre completo
- símbolo
- descripción
- métricas principales
- estado de favorito

### RF08 — Estado vacío

Si la búsqueda o los filtros no encuentran coincidencias, la interfaz debe mostrar un mensaje claro de “sin resultados” y una sugerencia para resetear filtros.

### RF09 — Accesibilidad mínima

La interfaz debe cumplir estas reglas:

- un único `h1`
- labels asociados a controles del formulario
- botones reales para acciones
- foco visible
- texto alternativo o `aria-label` donde corresponda
- modal o panel de detalle navegable por teclado

### RF10 — Seguridad básica

Los textos dinámicos deben renderizarse de forma segura. Debe evitarse el uso de `innerHTML` para contenido controlado por usuario o datos externos sin sanitización.

---

## 6. Requisitos no funcionales

### RNF01 — Stack didáctico

El proyecto debe resolverse con:

- HTML
- Tailwind CSS
- JavaScript vanilla con módulos ES
- Vite como entorno de desarrollo

### RNF02 — Modularidad

El código JavaScript debe separarse en módulos pequeños y con responsabilidad clara.

Ejemplos posibles:

- `services` para carga de datos
- `state` para estado y filtros
- `ui` para render y utilidades DOM

### RNF03 — Responsividad

Debe verse correctamente en mobile y desktop usando Flexbox, Grid y utilidades responsive de Tailwind.

### RNF04 — Mantenibilidad

El naming debe ser descriptivo, evitar variables globales y separar la lógica de negocio de la manipulación directa del DOM.

### RNF05 — Rendimiento

El render de listas debe evitar repaints innecesarios. Se recomienda `DocumentFragment`, `replaceChildren` o técnicas equivalentes.

### RNF06 — Calidad visual

La interfaz debe usar una jerarquía visual clara con tarjetas, badges, espaciado consistente y estados hover/focus visibles.

---

## 7. Criterios de aceptación de alto nivel

1. Al abrir la app, se ve una pantalla de carga y luego el dashboard completo.
2. Las métricas resumen se calculan en base al dataset cargado.
3. Buscar “APPL” o “BONO” filtra correctamente el listado.
4. Cambiar el filtro de riesgo actualiza las tarjetas visibles sin recargar.
5. Ordenar por monto o variación modifica el orden mostrado.
6. Marcar una tarjeta como favorita actualiza su estado visual y persiste tras recargar.
7. Abrir detalle muestra información ampliada y puede cerrarse con botón y teclado.
8. Si no hay coincidencias, aparece un estado vacío claro.
9. La UI mantiene semántica correcta, foco visible y controles accesibles.
10. El proyecto queda con estructura limpia y apta para explicar arquitectura frontend básica.

---

## 8. Restricciones didácticas

- No usar frameworks de componentes.
- No usar APIs reales.
- No usar librerías de estado.
- Mantener el alcance en una sola pantalla.
- Priorizar claridad pedagógica por sobre complejidad funcional.
- Explicar siempre el “por qué” de cada decisión de estructura, estilo y comportamiento.

---

## 9. Estructura inicial sugerida

```text
/
├─ index.html
├─ src/
│  ├─ main.js
│  ├─ styles.css
│  ├─ data/investments.json
│  ├─ services/investment-service.js
│  ├─ state/investment-store.js
│  ├─ ui/render-summary.js
│  ├─ ui/render-investment-list.js
│  ├─ ui/render-detail-panel.js
│  └─ utils/
└─ public/ o assets/
```

La implementación puede ajustar nombres, pero debe sostener una estructura modular y entendible para alumnos de primer tramo.

---

## 10. Enfoque SDD sugerido

La evolución ideal en clase debería ir por estas fases:

1. entender el requerimiento y formalizar propuesta
2. escribir specs verificables
3. definir diseño técnico simple
4. desglosar tareas
5. construir estructura semántica base
6. aplicar layout y estilos con Tailwind
7. cargar datos y renderizar tarjetas
8. agregar filtros, orden y delegación de eventos
9. persistir favoritos y detalle accesible
10. verificar accesibilidad, estados y limpieza final

Este archivo debe usarse como **fuente de verdad inicial** para que open-code genere los artefactos SDD del cambio.
