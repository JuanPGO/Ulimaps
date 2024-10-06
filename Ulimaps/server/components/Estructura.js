// Importaciones
import { PuntoExterior } from "./PuntoExterior";
import { Tipo } from "./Tipo";

class Estructura extends PuntoExterior {
    constructor(nombre, latitud, longitud, imagen, tipo=Tipo, bloque, imagenes, pisos, imagenesPisos) {
        super(nombre, latitud, longitud, imagen);
        this.tipo = tipo;
        this.bloque = bloque;
        this.imagenes = imagenes;
        this.pisos = pisos;
        this.imagenesPisos = imagenesPisos;
    }
}

export default Estructura;
