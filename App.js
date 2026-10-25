const _DEBUGMODE = true;

const incidencias = [
    { id: 1, descripcion: "Incendio forestal en sector sur", gravedad: 5, estado: "pendiente", recursosNecesarios: 3 },
    { id: 2, descripcion: "Fuga menor de agua en vía pública", gravedad: 2, estado: "resuelta", recursosNecesarios: 1 },
    { id: 3, descripcion: "Accidente de tráfico en circunvalación", gravedad: 4, estado: "pendiente", recursosNecesarios: 2 },
    { id: 4, descripcion: "Rescate en ascensor bloqueado", gravedad: 2, estado: "pendiente", recursosNecesarios: 1 },
    { id: 5, descripcion: "Inundación grave en paso subterráneo", gravedad: 5, estado: "pendiente", recursosNecesarios: 4 },
    { id: 6, descripcion: "Falsa alarma de incendio en colegio", gravedad: 1, estado: "resuelta", recursosNecesarios: 1 }
];

let recursosDisponibles = 10;

for (let i = 0; i < incidencias.length; i++) {
    let incidente = incidencias[i];

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

    recursosDisponibles -= incidente.recursosNecesarios;
    console.log(`Recursos restantes: ${recursosDisponibles}`);

    if (recursosDisponibles <= 0) {
        // Para que salga con el icono de advertencia
        console.warn(`¡Recursos agotados! Deteniendo sistema.`);
        break;
    }
}