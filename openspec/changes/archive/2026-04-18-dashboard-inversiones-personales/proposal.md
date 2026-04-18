# Proposal: Dashboard de Inversiones Personales

## Intent

Construir una SPA didáctica y profesional que permita enseñar HTML semántico, accesibilidad, Tailwind, módulos ES, fetch, estado UI y persistencia simple con un caso visual motivador para alumnos.

## Scope

### In Scope
- Estructura semántica base del dashboard con resumen, filtros, listado y detalle accesible.
- Carga de dataset local vía `fetch`, render dinámico, estados de loading/error/vacío.
- Búsqueda, filtro por riesgo, ordenamiento, favoritos con `localStorage` y DOM seguro.

### Out of Scope
- Backend real, autenticación, múltiples pantallas o APIs externas.
- Gráficos avanzados, cálculos financieros complejos o librerías de estado/frameworks.

## Approach

Implementar una arquitectura simple y explicable para alumnos: `services` para datos, `state` para filtros/favoritos, `ui` para render y eventos delegados, usando Tailwind para layout responsive y utilidades accesibles. Priorizar composición incremental por fases y evitar `innerHTML` inseguro.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Estructura semántica principal y contenedores UI |
| `src/main.js` | New/Modified | Bootstrap, fetch inicial y coordinación general |
| `src/data/investments.json` | New | Dataset local simulado |
| `src/services/` | New | Carga de datos y manejo de errores |
| `src/state/` | New | Estado de filtros, orden y favoritos |
| `src/ui/` | New | Resumen, listado, tarjetas y detalle accesible |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No existe scaffold ejecutable actual | High | Definir specs y diseño que contemplen bootstrap mínimo con Vite |
| Modal/panel accesible puede complejizar la clase | Med | Diseñar opción mínima navegable por teclado |
| Ambigüedad en ticker `APPL` y métrica 3 del resumen | Med | Resolver en specs con decisión explícita |

## Rollback Plan

Si la implementación supera el alcance didáctico, volver a una versión base con listado + resumen, dejando filtros avanzados, favoritos y detalle para iteraciones posteriores.

## Dependencies

- Fuente de verdad `dashboard-inversiones-requerimientos.md`
- Contexto INIT híbrido en `openspec/config.yaml` y Engram `sdd-init/clase_3`

## Success Criteria

- [ ] La propuesta deja claro problema, alcance, riesgos y camino pedagógico.
- [ ] La siguiente fase puede escribir specs sin redefinir arquitectura base.
- [ ] Quedan explicitadas las ambigüedades relevantes del requerimiento.
- [ ] El cambio respeta stack didáctico: HTML + Tailwind + JS modular + Vite.
