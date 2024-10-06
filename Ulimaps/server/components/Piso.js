// Importación
import { PuntoInterior } from "./PuntoInterior";

class Piso {
    constructor(nivel, puntosInterior=PuntoInterior) {
        this.nivel = nivel;
        this.puntosInterior = puntosInterior;
    }
}

export default Piso;
