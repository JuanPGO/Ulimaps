// Importaciones
import { Usuario } from "./Usuario";
import { PuntoExterior } from "./PuntoExterior";

class Mapa {
    constructor(latitud, longitud, usuario=Usuario, puntoExterior=PuntoExterior) {
        this.latitud = latitud;
        this.longitud = longitud;
        this.usuario = usuario;
        this.puntoExterior = puntoExterior
    }
}

export default Mapa;
