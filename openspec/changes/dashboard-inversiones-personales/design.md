# Design: Dashboard de Inversiones Personales

## Technical Approach

Se implementará una SPA chica, modular y didáctica con cuatro capas simples: `data` (JSON local), `services` (fetch y normalización mínima), `state` (estado único en memoria + persistencia de favoritos) y `ui` (render y eventos delegados). La idea pedagógica es separar **origen de datos**, **reglas de negocio** y **DOM**, para que el alumno entienda qué problema resuelve cada módulo sin meter frameworks ni complejidad accidental.

## Architecture Decisions

| Decisión | Opciones | Elección | Rationale |
|---|---|---|---|
| Estado global | variables sueltas / store simple | store simple en módulo | Hace visibles las transiciones (`loading`, `error`, `ready`) y evita variables globales dispersas. |
| Render | mutaciones aisladas / render por regiones | render por regiones | Permite explicar resumen, lista y detalle por separado; el resumen usa dataset completo y la lista usa vista derivada. |
| Detalle accesible | `<dialog>` / contenedor con `role="dialog"` | modal con `role="dialog"` + overlay | Es más explícito para enseñar foco, `Escape` y retorno al disparador sin depender de APIs menos conocidas. |
| Seguridad DOM | plantillas con `innerHTML` / nodos seguros | `createElement` + `textContent` | Refuerza prevención básica de XSS y alinea con la spec. |

## Data Flow

`investments.json` → `loadInvestments()` → normalización + merge de favoritos → `store.init(data)` → `renderApp(state)`

Eventos UI:

`input/change/click` → `store.update(...)` → recalcular vista derivada → `renderSummary/ renderList/ renderDetail`

Notas clave:
- El resumen SIEMPRE se calcula con el dataset completo cargado.
- La búsqueda acepta coincidencia parcial case-insensitive por `name` o `symbol`; el símbolo canónico esperado es `AAPL`.
- La tercera métrica es `cantidad de activos`.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Create/Modify | Estructura semántica base y contenedores accesibles. |
| `src/main.js` | Create | Bootstrap de la app y suscripción de eventos. |
| `src/styles.css` | Create | Tailwind imports y ajustes mínimos globales de foco/layout. |
| `src/data/investments.json` | Create | Dataset local base con 10 inversiones. |
| `src/services/investment-service.js` | Create | `fetch`, parseo y error amigable. |
| `src/state/investment-store.js` | Create | Estado, derivaciones, persistencia y transiciones. |
| `src/ui/render-summary.js` | Create | Métricas del dataset completo. |
| `src/ui/render-investment-list.js` | Create | Tarjetas, vacío y botones por delegación. |
| `src/ui/render-detail-panel.js` | Create | Modal/panel accesible con foco controlado. |
| `src/ui/render-filters.js` | Create | Controles etiquetados de búsqueda, riesgo y orden. |
| `src/utils/formatters.js` | Create | Formato de moneda/porcentaje. |
| `src/utils/dom.js` | Create | Helpers chicos para crear nodos seguros. |
| `src/utils/storage.js` | Create | Lectura/escritura de favoritos en `localStorage`. |

## Interfaces / Contracts

```js
// shape normalizado del activo
{
  id: string,
  name: string,
  symbol: string, // ej. AAPL
  category: string,
  riskLevel: 'Bajo' | 'Medio' | 'Alto',
  investedAmount: number,
  currentValue: number,
  dailyChangePercent: number,
  favorite: boolean,
  description: string
}

// estado del store
{
  status: 'loading' | 'error' | 'ready',
  items: Investment[],
  filters: { query: '', risk: 'Todos', sortBy: 'investedAmount' | 'dailyChangePercent' },
  selectedId: string | null,
  lastTrigger: HTMLElement | null,
  errorMessage: string | null
}
```

La vista derivada se obtiene con `getVisibleItems(state)`: filtra por búsqueda y riesgo, luego ordena en descendente. Favoritos se resuelven por `id` y se persisten con clave `investment-favorites`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Formatters, filtros, orden, merge de favoritos | Verificación manual guiada en consola hasta tener runner. |
| Integration | Flujo fetch → store → render | Checklist manual contra escenarios de spec. |
| E2E | Teclado, modal, favoritos tras recarga, estados UI | Recorrido manual en navegador, sin build. |

## Migration / Rollout

No migration required. Se parte de un scaffold mínimo y el cambio puede implementarse por capas sin feature flags.

## Decisions Confirmed

- [x] El detalle se implementará como modal accesible con overlay.
- [x] El dataset inicial tendrá 10 inversiones para equilibrar variedad funcional y legibilidad pedagógica.
