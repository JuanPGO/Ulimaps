import { PuntoExterior } from "./PuntoExterior";
import { Tipo } from "./Tipo";

class Estructura extends PuntoExterior{
    bloque:string;
    tipo: Tipo;
    imagenes:string[];
    pisos:string[];
    imagenesPisos:string[];
    
    constructor(nombre:string,latitud:number,longitud:number,imagen:string,tipo:Tipo,bloque:string,imagenes:string[],pisos:string[],imagenesPisos:string[]){
        super(nombre,latitud,longitud,imagen);
        this.tipo = tipo
        this.bloque = bloque;
        this.imagenes = imagenes
        this.pisos = pisos
        this.imagenesPisos = imagenesPisos
    }
}