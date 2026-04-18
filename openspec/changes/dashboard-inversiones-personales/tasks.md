# Tasks: Dashboard de Inversiones Personales

## Fase 1: Scaffold y base semántica

- [x] 1.1 **[CRÍTICA]** Crear `package.json` y estructura mínima `src/` para Vite + Tailwind, sin ejecutar build. Destraba todo el cambio.
- [x] 1.2 **[CRÍTICA]** Crear `index.html` con `header`, `main`, regiones para resumen, filtros, listado, estados y raíz del modal. Dep: 1.1.
- [x] 1.3 Crear `src/styles.css` con import de Tailwind y reglas mínimas de foco visible, overlay y layout responsive. Dep: 1.1.

## Fase 2: Datos, utilidades y estado

- [x] 2.1 **[CRÍTICA]** Crear `src/data/investments.json` con 10 inversiones válidas y ticker canónico `AAPL`. Dep: 1.1.
- [x] 2.2 Crear `src/utils/formatters.js` para moneda y porcentaje, y `src/utils/dom.js` para nodos seguros con `textContent`. Dep: 1.1.
- [x] 2.3 Crear `src/utils/storage.js` para leer/escribir favoritos con clave `investment-favorites`. Dep: 1.1.
- [x] 2.4 Crear `src/services/investment-service.js` para `fetch`, parseo, normalización y mensaje amigable de error. Dep: 2.1, 2.2, 2.3.
- [x] 2.5 **[CRÍTICA]** Crear `src/state/investment-store.js` con `loading/error/ready`, filtros, orden, favorito, `selectedId` y derivación `getVisibleItems()`. Dep: 2.3, 2.4.

## Fase 3: UI por regiones

- [x] 3.1 Crear `src/ui/render-summary.js` para total invertido, valor actual total y cantidad de activos usando dataset completo. Dep: 2.5.
- [x] 3.2 Crear `src/ui/render-filters.js` con búsqueda, riesgo y orden descendente etiquetados y accesibles. Dep: 2.5.
- [x] 3.3 Crear `src/ui/render-investment-list.js` para tarjetas, botón de favorito, botón de detalle y estado vacío sin `innerHTML`. Dep: 2.2, 2.5.
- [x] 3.4 Crear `src/ui/render-detail-panel.js` como modal accesible con overlay, cierre por botón/Escape y retorno de foco. Dep: 2.2, 2.5.

## Fase 4: Integración e interacciones

- [x] 4.1 **[CRÍTICA]** Implementar `src/main.js` para bootstrap inicial, transición `loading → ready/error` y render por regiones. Dep: 1.2, 1.3, 2.4, 2.5, 3.1-3.4.
- [x] 4.2 Conectar eventos delegados de filtros y orden para actualizar store y rerenderizar listado sin recarga. Dep: 4.1.
- [x] 4.3 Conectar toggle de favoritos con persistencia y rehidratación tras recarga. Dep: 4.1.
- [x] 4.4 Conectar apertura/cierre del modal desde listado y teclado, preservando foco del disparador. Dep: 4.1.

## Fase 5: Verificación manual pedagógica

- [x] 5.1 Verificar layout semántico, labels, foco visible y nombres accesibles recorriendo toda la pantalla con teclado. Dep: 4.4.
- [x] 5.2 Verificar escenarios de `loading`, `error`, `ready` y `empty`, incluyendo mensaje sin resultados y ausencia de tarjetas en error. Dep: 4.4.
- [x] 5.3 Verificar búsqueda `AAPL`, filtro por riesgo, ordenamiento, favoritos persistidos y resumen calculado sobre dataset completo. Dep: 4.4.
- [ ] 5.4 Hacer repaso pedagógico final: responsabilidades por carpeta (`data`, `services`, `state`, `ui`, `utils`) y puntos críticos para clase. Dep: 5.1-5.3.
