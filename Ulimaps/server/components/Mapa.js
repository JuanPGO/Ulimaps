// Importaciones

import {connectToDB} from '../Conexion.js';

export class Mapa {
    async getPuntosExteriores() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    `SELECT 
                        id_puntoExterior AS id,
                        nombre,
                        latitud,
                        longitud,
                        activo
                    FROM PuntoInteresExterior`,
                    [],
                    (err, rows) => {
                        if (err) {
                            console.error('Error en la consulta SQL:', err);
                            reject(err);
                        } else {
                            console.log('Puntos de interés exterior encontrados:', rows);
                            resolve(rows);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }

    async getEstructuras(id_puntoExterior) {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.get(
                    `SELECT 
                        e.id_estructura AS id,
                        e.bloque,
                        e.id_puntoExterior
                    FROM Estructura e
                    WHERE e.id_puntoExterior = ?`,
                    [id_puntoExterior],
                    (err, row) => {
                        if (err) {
                            console.error('Error al buscar estructura:', err);
                            reject(err);
                        } else {
                            console.log('Estructura encontrada:', row); // Debug
                            resolve(row);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }

    async getImagenes(id_puntoExterior) {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    `SELECT 
                        MIN(i.id_imagen) AS id,
                        MIN(i.nombre) AS nombre,
                        i.id_puntoExterior
                    FROM Imagen i
                    WHERE i.id_puntoExterior = ?
                    GROUP BY i.id_puntoExterior;`,
                    [],
                    (err, rows) => {
                        if (err) {
                            console.error('Error en la consulta SQL:', err);
                            reject(err);
                        } else {
                            console.log('Imagenes encontradas:', rows);
                            resolve(rows);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }  
}