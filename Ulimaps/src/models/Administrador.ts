import { PuntoExterior } from "./PuntoExterior";
import {connectToDB} from "./configuracionDB";

export class Administrador {
    usuario: string;
    password: string;
    puntosExterior: PuntoExterior[];


    constructor(usuario:string,password:string,puntosExterior:PuntoExterior[]){
        this.usuario = usuario;
        this.password = password;
        this.puntosExterior = puntosExterior
    }

    async logging(usuario:string,password:string) {
        const db = await connectToDB();
        try {
            // Consulta de usuario y contraseña
            const user = await db.get(
              'SELECT * FROM Administrador WHERE usuario = ? AND password = ?',
              [usuario, password]  // Valores que evitan SQL injection
            );
            if (user) {
                return user; // Si encuentra el usuario, lo devuelve
            } else {
                return null; // Credenciales incorrectas
            }
        }
        catch (error) {
            console.error('Error en la consulta SQL:', error);
            return null;
        } finally {
            await db.close(); // Cerrar la conexión a la base de datos
        }
    };

}