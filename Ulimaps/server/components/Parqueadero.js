import { PuntoExterior } from "./PuntoExterior";

class Parqueadero extends PuntoExterior {
    constructor(nombre, latitud, longitud, imagen, tipo) {
        super(nombre, latitud, longitud, imagen);
        this.tipo = tipo;
    }
}

export default Parqueadero;
