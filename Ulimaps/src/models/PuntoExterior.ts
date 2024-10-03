
export class PuntoExterior {
    nombre:string;
    latitud:number;
    longitud:number;
    imagen:string;

    constructor(nombre:string,latitud:number,longitud:number,imagen:string){
        this.nombre = nombre
        this.latitud = latitud
        this.longitud = longitud
        this.imagen = imagen
    }
}