# Especificación de Dashboard de Inversiones

## Propósito

Definir el comportamiento verificable del dashboard didáctico de inversiones en una sola pantalla.

## Decisiones visibles

- El símbolo canónico es `AAPL`; `APPL` se interpreta como typo del criterio de aceptación y NO agrega tolerancia a errores.
- La tercera métrica del resumen DEBE ser `cantidad de activos`.
- El resumen DEBE calcularse sobre el dataset cargado completo; filtros y búsqueda solo afectan el listado.
- El orden disponible DEBE ser descendente por `monto invertido` o `variación diaria`.

## Requisitos

### Requisito: Estructura semántica base
La pantalla DEBE incluir un único `h1`, `header`, `main`, sección de resumen, región de filtros con controles etiquetados, región de listado y `article`/`button` para elementos interactivos.

#### Escenario: Layout base disponible
- DADO el dashboard cargado
- CUANDO se inspecciona la estructura principal
- ENTONCES existe una jerarquía semántica navegable sin tags genéricos para acciones reales

### Requisito: Carga inicial y estados UI
La app DEBE cargar el JSON local con `fetch` y exponer estados excluyentes `loading`, `error` y `ready`.

#### Escenario: Carga exitosa
- DADO el inicio de la app
- CUANDO el dataset responde correctamente
- ENTONCES se muestra primero loading y luego el dashboard listo

#### Escenario: Error de carga
- DADO que el `fetch` o el parseo fallan
- CUANDO termina el intento inicial
- ENTONCES se muestra un mensaje amigable de error y no se renderizan tarjetas interactivas

### Requisito: Resumen de métricas
El resumen DEBE mostrar total invertido, valor actual total y cantidad de activos usando los datos cargados.

#### Escenario: Métricas calculadas
- DADO un dataset válido
- CUANDO la vista entra en estado ready
- ENTONCES las tres métricas reflejan la suma y el conteo del dataset completo

### Requisito: Listado dinámico
El listado DEBE renderizar tarjetas desde JavaScript y cada tarjeta DEBE mostrar nombre, símbolo, categoría, riesgo, monto invertido, valor actual y variación diaria.

#### Escenario: Tarjetas visibles
- DADO el estado ready
- CUANDO se renderiza el listado
- ENTONCES cada activo visible expone los campos mínimos requeridos

### Requisito: Búsqueda, filtros y ordenamiento
La UI DEBE permitir búsqueda parcial case-insensitive por nombre o símbolo, filtro por riesgo y orden descendente por monto invertido o variación diaria, sin recargar la página.

#### Escenario: Refinamiento de listado
- DADO un listado cargado
- CUANDO la persona busca `AAPL`, filtra por riesgo o cambia el orden
- ENTONCES el DOM refleja el subconjunto y el orden resultante sin recarga completa

### Requisito: Favoritos persistidos
Cada activo DEBE poder marcarse o desmarcarse como favorito y el estado DEBE persistirse en `localStorage` por `id`.

#### Escenario: Persistencia tras recarga
- DADO un activo marcado como favorito
- CUANDO la página se recarga
- ENTONCES el activo conserva su estado visual y funcional de favorito

### Requisito: Detalle accesible por teclado
Cada tarjeta DEBE permitir abrir un panel o modal con detalle; la apertura, cierre con botón y `Escape`, y retorno de foco DEBEN funcionar con teclado.

#### Escenario: Navegación del detalle
- DADO el foco sobre el botón de detalle
- CUANDO se activa con teclado y luego se cierra
- ENTONCES el foco entra al detalle y vuelve al control que lo abrió

### Requisito: Estado vacío
Si los criterios activos no producen coincidencias, la UI DEBE mostrar un mensaje de sin resultados y una sugerencia para limpiar filtros.

#### Escenario: Sin coincidencias
- DADO una combinación de búsqueda o filtros sin matches
- CUANDO termina el render
- ENTONCES se oculta el listado de tarjetas y aparece el estado vacío

### Requisito: Accesibilidad mínima
La interfaz DEBE mantener labels asociados, foco visible, nombres accesibles en controles icónicos y navegación coherente por teclado.

#### Escenario: Controles accesibles
- DADO una persona usuaria de teclado o lector
- CUANDO recorre filtros, favoritos y detalle
- ENTONCES puede identificar propósito, foco y orden de navegación

### Requisito: Seguridad básica del DOM
Los datos dinámicos DEBEN renderizarse como texto o atributos controlados y NO DEBEN inyectarse como HTML interpretado desde JSON o `localStorage`.

#### Escenario: Contenido externo seguro
- DADO un dato con caracteres HTML en nombre o descripción
- CUANDO se muestra en resumen, lista o detalle
- ENTONCES se visualiza como texto literal y no ejecuta markup o scripts

### Requisito: Restricciones técnicas y modulares
La solución DEBE usar HTML, Tailwind, JavaScript vanilla con ES Modules y Vite; NO DEBE usar frameworks de componentes, APIs reales, librerías de estado ni variables globales compartidas. La organización DEBE separar al menos `services`, `state` y `ui`.

#### Escenario: Estructura explicable
- DADO el código fuente del cambio
- CUANDO se revisan archivos y responsabilidades
- ENTONCES la carga de datos, el estado y el render se entienden como módulos separados
