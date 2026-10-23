const incidencias = [
    {id:1, descripcion: "Incendio forestal en sector sur", gravedad: 5, estado: "pendiente", recursosNecesarios: 3},
    {id:2, descripcion: "Fuga menor de agua en vía pública", gravedad: 2, estado: "resuelta", recursosNecesarios: 1},
    {id:3, descripcion: "Accidente de tráfico en circunvalación", gravedad: 4, estado: "pendiente", recursosNecesarios: 2}

];

let recursosDisponibles = 10; // Ejemplo de recursos disponibles
const DEBUG_MODE = false;

for (let i=0; i<incidencias.length; i++) {
    let incidente = incidencias[i];
    //Aqui evaluaremos cada caso
    if (incidente.estado === "resuelta") {
        continue; 
    }
    if (incidente.gravedad === 5 && DEBUG_MODE) {
        console.log(` Alerta máxima: Incidencia #${incidente.id} - ${incidente.descripcion}`);
    }

    recursosDisponibles -= incidente.recursosNecesarios;
    if (recursosDisponibles <= 0) {
    break;
    }
}