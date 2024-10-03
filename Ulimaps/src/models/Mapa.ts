import {Usuario} from "./Usuario";
import {PuntoExterior} from "./PuntoExterior"

export class Mapa {
    latitud:number;
    longitud:number;
    usuario: Usuario;
    puntoExterior: PuntoExterior[];
    constructor(latitud:number,longitud:number,usuario:Usuario,puntoExterior:PuntoExterior[]){
        this.latitud = latitud;
        this.longitud = longitud;
        this.usuario = usuario;
        this.puntoExterior = puntoExterior;
    }
}