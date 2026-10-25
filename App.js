const _DEBUGMODE = true;

const incidencias = [
    { id: 1, descripcion: "Incendio forestal en sector sur", gravedad: 5, estado: "pendiente", recursosNecesarios: 3 },
    { id: 2, descripcion: "Fuga menor de agua en vía pública", gravedad: 2, estado: "resuelta", recursosNecesarios: 1 },
    { id: 3, descripcion: "Accidente de tráfico en circunvalación", gravedad: 4, estado: "pendiente", recursosNecesarios: 2 },
    { id: 4, descripcion: "Rescate en ascensor bloqueado", gravedad: 2, estado: "pendiente", recursosNecesarios: 1 },
    { id: 5, descripcion: "Inundación grave en paso subterráneo", gravedad: 5, estado: "pendiente", recursosNecesarios: 4 },
    { id: 6, descripcion: "Falsa alarma de incendio en colegio", gravedad: 1, estado: "resuelta", recursosNecesarios: 1 }
];

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

function procesarIncidente(listaIncidencias, recursosIniciales) {
    let recursosDisponibles = recursosIniciales;

    for (let i = 0; i < incidencias.length; i++) {
        let incidente = incidencias[i];

        // Punto de interrupcion para depurar
        debugger;

        if (incidente.estado === "resuelta") {
            if (_DEBUGMODE) {
                console.log(`Incidencia #${incidente.id} ya resuelta`);
            }
            continue;
        }

        if (incidente.gravedad === 5) {
            // Para que salga con el icono de alerta
            console.error(`¡ALERTA MÁXIMA! Incidencia #${incidente.id} - ${incidente.descripcion}`);
        } else {
            console.log(`Procesando incidencia #${incidente.id}: ${incidente.descripcion} (Gravedad: ${incidente.gravedad})`);
        }

        let recursosNecesarios = calcularRecursos(incidente.gravedad);
        recursosDisponibles -= recursosNecesarios;

        console.log(`Recursos restantes: ${recursosDisponibles}`);

        if (recursosDisponibles <= 0) {
            // Para que salga con el icono de advertencia
            console.warn(`¡Recursos agotados! Deteniendo sistema.`);
            break;
        }
    }
}

// Llamamos a la función para procesar las incidencias
procesarIncidente(incidencias, 10);