// Administrador.js
import { connectToDB } from '../Conexion.js';

export class Administrador {
    constructor(usuario, contrasena) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }

    async obtenerUsuario() {
        const db = await connectToDB();
        try {
            console.log('Valor de this.usuario:', this.usuario);
            
            return new Promise((resolve, reject) => {
                db.get(
                    'SELECT * FROM Administrador WHERE usuario = ?',
                    [this.usuario],
                    (err, row) => {
                        if (err) {
                            console.error('Error en la consulta SQL:', err);
                            reject(err);
                        } else {
                            console.log('Resultado de la consulta:', row);
                            resolve(row);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }
}

