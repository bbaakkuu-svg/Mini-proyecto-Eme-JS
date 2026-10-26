# Central de Emergencias Eme-JS

Sistema de simulación y despacho de recursos para la gestión de incidencias de emergencias (bomberos, ambulancias y rescates). Este proyecto implementa un motor lógico en JavaScript desacoplado, documentado bajo el estándar JSDoc y preparado para auditoría mediante herramientas de depuración (Chrome DevTools / VS Code).

---

## 1. Descripción del Proyecto

El sistema evalúa una cola de alertas registradas en el parque de emergencias, discriminando aquellas que ya han sido solventadas y asignando vehículos/dotaciones según el nivel de riesgo de cada suceso. Cuando la reserva de recursos se agota, el sistema activa una parada de seguridad para no comprometer el servicio.

---

## 2. Arquitectura y Funcionamiento

El núcleo del sistema reside en `src/App.js`, vinculado a la interfaz visual `src/index.html`.

### 2.1. Modelo de Datos (`Incidencia`)

Cada evento registrado contiene la siguiente estructura tipada:

* `id` *(number)*: Identificador correlativo único.
* `descripcion` *(string)*: Detalle del suceso.
* `gravedad` *(number)*: Nivel de severidad en escala de 1 a 5.
* `estado` *(string)*: Estado de tramitación (`'pendiente'` o `'resuelta'`).

### 2.2. Flujo Lógico y Funciones Clave

1. **`calcularRecursos(gravedad)`**:
   * Determina las dotaciones requeridas según la severidad mediante una estructura `switch`.
   * Gravedad 5 $\rightarrow$ 3 recursos.
   * Gravedad 3 y 4 $\rightarrow$ 2 recursos.
   * Gravedad 1 y 2 (o por defecto) $\rightarrow$ 1 recurso.
2. **`procesarIncidente(listaIncidencias, recursosIniciales)`**:
   * Itera sobre la lista de incidencias.
   * **Filtro de resueltas:** Si el estado es `'resuelta'`, se omite su procesamiento mediante `continue`.
   * **Alerta máxima:** Las incidencias con `gravedad === 5` emiten una notificación crítica por consola (`console.error`) y activan el punto de interrupción de depuración (`debugger;`).
   * **Cálculo y deducción:** Deduce del inventario disponible los recursos calculados.
   * **Corte de seguridad:** Si los recursos descienden a $\le 0$, se dispara una advertencia (`console.warn`) y el bucle finaliza de inmediato con `break`.

---

## 3. Documentación del Código (JSDoc)

Todo el código fuente se encuentra tipado y comentado bajo el estándar oficial **JSDoc 3+**:

* Definición de esquemas de datos mediante `@typedef` y `@property`.
* Documentación de funciones con etiquetas `@param` (indicando tipos primitivos y referencias a modelos) y `@returns`.
* Tipado estricto de constantes con `@type`.

---

## 4. Guía de Ejecución y Comprobaciones

### Opción 1: Ejecución en Navegador Web 

1. Abre el archivo `src/index.html` en tu navegador (doble clic o mediante *Live Server*).
2. Pulsa `F12` (o `Ctrl + Shift + I`) para desplegar las **Herramientas de Desarrollador (DevTools)**.
3. **Comprobación en Consola:**
   * Accede a la pestaña **Console**.
   * Verifica los mensajes informativos (`console.log`), las alertas rojas de máxima gravedad (`console.error`) y el aviso de recursos agotados (`console.warn`).
4. **Comprobación de la Depuración (`debugger;`):**
   * Con las DevTools abiertas, recarga la página (`F5`).
   * El navegador se detendrá automáticamente en la pestaña **Sources** en la línea del `debugger;`.
   * Inspecciona en el panel derecho:
     * **Scope $\rightarrow$ Local:** El objeto `incidente` activo (`gravedad: 5`) y las variables de control.
     * **Call Stack:** La pila de llamadas activa ejecutando `procesarIncidente`.

### Opción 2: Ejecución en Terminal con Node.js

Desde la raíz del repositorio, ejecuta:

```bash
node src/App.js
```

El motor imprimirá directamente el flujo de ejecución completo y la traza de recursos en la consola de comandos.

---

## 5. Documentación Complementaria

Para consultar las evidencias fotográficas de depuración y la reflexión metodológica del trabajo en pareja (*Driver/Navigator*), consulta el archivo:

* Diario de depuración: [DIARIO_DEPURACION.md](./DIARIO_DEPURACION.md)
