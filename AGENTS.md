# AGENTS.md — Dashboard Inversiones Personales

Vanilla JavaScript SPA. Browser-only. Vite 5, Tailwind CSS v4. No TypeScript, no framework, no backend.

## Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview build

# If Vitest is added:
npx vitest run                                    # All tests
npx vitest run src/utils/formatters.test.js       # Single file
npx vitest run -t "formatCurrency"                # By name
```

## Architecture & Layer Rules

```
src/
├── main.js                 # Entry — wires store + UI
├── data/investments.json   # Static seed data
├── services/               # Data access + normalization. No DOM. No state writes.
├── state/                  # Observer store. No DOM.
├── ui/                     # Reads store, writes DOM. No fetch calls.
└── utils/                  # Pure functions. No side effects. No cross-layer imports.
```

## Code Style

**Modules:** Relative imports, explicit `.js` extension always. No path aliases. No barrel files.
```js
import { formatCurrency } from '../utils/formatters.js'; // correct
import { formatCurrency } from '../utils/formatters';    // wrong
```

**Exports:** Named only. Never `export default`.

**Naming:**
- Files: `kebab-case.js`. UI files prefixed `render-`: `render-filters.js`.
- Functions: `camelCase`, verb + subject — `renderInvestmentList`, `toggleFavorite`, `clearElement`.
- Private helpers: `create*`, `normalize*`, `resolve*`, `read*`.

**Variables:** `const` by default, `let` only when needed, never `var`.

**Formatting** (no Prettier — enforce manually): 2-space indent, single quotes, semicolons, trailing commas, ~100 char line limit.

**State:** Always immutable spread — never mutate directly.
```js
state = { ...state, filters: { ...state.filters, category } };
```

**Constants:** `Object.freeze({ ... })`.

**Error handling:** Custom error class with `code` property. Validate inputs defensively. Surface errors to user in Spanish.
```js
export class InvestmentServiceError extends Error {
  constructor(message, code) { super(message); this.name = 'InvestmentServiceError'; this.code = code; }
}
```

**DOM:** Event delegation via `data-action`. Stable selectors via `data-region`. Semantic HTML. ARIA labels required. All UI text in Spanish (`es-AR`).

**CSS:** Tailwind v4 (CSS-first, no config file). BEM for custom components: `metric-card`, `field-group`. Mobile-first responsive.

**Intl:** `new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)` for all formatting.

## Skills

Load before working — skills are in `.agents/skills/`:

| Context | Skill |
|---|---|
| Any feature or bugfix | `test-driven-development` — **no production code without a failing test first** |
| UI / layout | `frontend-design` |
| CSS / Tailwind | `tailwind-design-system` |
| Accessibility | `accessibility` |

## Hard Constraints

- No `export default`.
- No imports without `.js` extension.
- No framework or TypeScript without explicit approval.
- No direct state mutation.
- No `var`.
