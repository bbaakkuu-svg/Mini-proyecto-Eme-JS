/**
 * @file App.js
 * @description Módulo para la gestión y asignación de recursos ante incidencias de emergencia.
 */

/**
 * Modo de depuración activo.
 * @type {boolean}
 */
const _DEBUGMODE = true;

/**
 * @typedef {Object} Incidencia
 * @property {number} id - Identificador único de la incidencia.
 * @property {string} descripcion - Breve detalle de lo ocurrido.
 * @property {number} gravedad - Nivel de gravedad en escala de 1 a 5.
 * @property {('pendiente'|'resuelta')} estado - Estado actual de la incidencia.
 * @property {number} recursosNecesarios - Cantidad estimada de recursos para su resolución.
 */

/**
 * Listado de incidencias registradas en el sistema.
 * @type {Incidencia[]}
 */
const incidencias = [
    { id: 1, descripcion: "Incendio forestal en sector sur", gravedad: 5, estado: "pendiente", recursosNecesarios: 3 },
    { id: 2, descripcion: "Fuga menor de agua en vía pública", gravedad: 2, estado: "resuelta", recursosNecesarios: 1 },
    { id: 3, descripcion: "Accidente de tráfico en circunvalación", gravedad: 4, estado: "pendiente", recursosNecesarios: 2 },
    { id: 4, descripcion: "Rescate en ascensor bloqueado", gravedad: 2, estado: "pendiente", recursosNecesarios: 1 },
    { id: 5, descripcion: "Inundación grave en paso subterráneo", gravedad: 5, estado: "pendiente", recursosNecesarios: 4 },
    { id: 6, descripcion: "Falsa alarma de incendio en colegio", gravedad: 1, estado: "resuelta", recursosNecesarios: 1 }
];

/**
 * Calcula los recursos necesarios en función del nivel de gravedad asignado.
 *
 * @param {number} gravedad - Nivel de gravedad de la incidencia (1 al 5).
 * @returns {number} Número de recursos requeridos para atender la incidencia.
 */
function calcularRecursos(gravedad) {
    let recursos = 1;
    switch (gravedad) {
        case 5:
            recursos = 3;
            break;
        case 3:
        case 4:
            recursos = 2;
            break;
        case 1:
        case 2:
        default:
            recursos = 1;
            break;
    }
    return recursos;
}

/**
 * Procesa la cola de incidencias evaluando su estado y deduciendo los recursos disponibles.
 *
 * @param {Incidencia[]} listaIncidencias - Colección de incidencias a tramitar.
 * @param {number} recursosIniciales - Cantidad total de recursos asignados al inicio del turno.
 * @returns {void}
 */
function procesarIncidente(listaIncidencias, recursosIniciales) {
    let recursosDisponibles = recursosIniciales;

    for (let i = 0; i < listaIncidencias.length; i++) {
        let incidente = listaIncidencias[i];

        // Punto de interrupción para depurar
        debugger;

        if (incidente.estado === "resuelta") {
            if (_DEBUGMODE) {
                console.log(`Incidencia #${incidente.id} ya resuelta`);
            }
            continue;
        }

        if (incidente.gravedad === 5) {
            console.error(`¡ALERTA MÁXIMA! Incidencia #${incidente.id} - ${incidente.descripcion}`);
        } else {
            console.log(`Procesando incidencia #${incidente.id}: ${incidente.descripcion} (Gravedad: ${incidente.gravedad})`);
        }

        let recursosNecesarios = calcularRecursos(incidente.gravedad);
        recursosDisponibles -= recursosNecesarios;

        console.log(`Recursos restantes: ${recursosDisponibles}`);

        if (recursosDisponibles <= 0) {
            console.warn(`¡Recursos agotados! Deteniendo sistema.`);
            break;
        }
    }
}

// Llamada para procesar las incidencias iniciales
procesarIncidente(incidencias, 10);