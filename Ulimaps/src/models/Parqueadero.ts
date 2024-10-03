import { PuntoExterior } from "./PuntoExterior";

class Parqueadero extends PuntoExterior {
    tipo: string;
    constructor(nombre:string,latitud:number, longitud:number,imagen: string[],tipo:string){
        super(nombre,latitud,longitud,imagen);
        this.tipo = tipo;
    }
}