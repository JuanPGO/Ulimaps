import {PuntoInterior} from "./PuntoInterior";

export class Piso {
    nivel: string;
    puntosInterior: PuntoInterior[];

    constructor(nivel:string,puntosInterior:PuntoInterior[]){
        this.nivel = nivel
        this.puntosInterior = puntosInterior
    }
}