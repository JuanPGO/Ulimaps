
import {connectToDB} from '../Conexion.js';

export class PuntoExterior {
    
    // CREATE
    async createPuntoExterior(id_puntoExterior, nombre, latitud, longitud, activo, mapa) {
        const db = await connectToDB();

        try {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) as count FROM PuntoInteresExterior WHERE id_puntoExterior = ?';
                db.get(sql, [id_puntoExterior], (err, row) => {
                    if (err) {
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_puntoExterior',
                            error: err
                        });
                        return;
                    }

                    if (row.count > 0) {
                        reject({
                            type: 'ID_EXISTS',
                            message: `El ID ${id_puntoExterior} ya está en uso.`
                        });
                    } else {
                        const sql = 'INSERT INTO PuntoInteresExterior (id_puntoExterior, nombre, latitud, longitud, activo, id_mapa) VALUES (?, ?, ?, ?, ?, ?)';
                        
                        db.run(sql, [id_puntoExterior, nombre, latitud, longitud, activo, mapa], function(err) {
                            if (err) {
                                reject({
                                    type: 'INSERT_ERROR',
                                    message: 'Error al insertar el punto exterior',
                                    error: err
                                });
                            } else {
                                resolve('create');
                            }
                        });
                    }
                });
            });
        } finally {
            await db.close();
        }
    }

    // READ
    async readPuntosExterior() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT id_puntoExterior AS id, nombre, latitud, longitud, activo FROM PuntoInteresExterior',
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

    // UPDATE
    async updatePuntoExterior(id, nombre, latitud, longitud){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'UPDATE puntoInteresExterior SET nombre = ?, latitud = ?, longitud = ? WHERE id_puntoExterior = ?';

                db.run(sql, [nombre, latitud, longitud, id], function(err) {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        reject(err);
                    } else {
                        console.log('Actualización exitosa. Número de filas afectadas:', this.changes);
                        resolve('update');
                    }
                });
            });
        } finally {
            await db.close();
        }
    }

    // DELETE
    async deletePuntoExterior(id) {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'DELETE FROM PuntoInteresExterior WHERE id_puntoExterior = ?;';
    
                db.run(sql, [id], function(err) {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        reject(err);
                    } else {
                        console.log('Eliminación exitosa. Filas afectadas:', this.changes);
                        resolve(this.changes > 0 ? 'delete' : 'not_found');
                    }
                });
            });
        } finally {
            await db.close();
        }
    }

    // ESTADO
    async updateActivarPuntoExterior(id,activo){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'UPDATE puntoInteresExterior SET activo = ? WHERE id_puntoExterior = ?';
    
                db.run(sql, [activo, id], function(err) {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        reject(err);
                    } else {
                        console.log('Actualización exitosa. ', this.changes);
                        resolve('update');
                    }
                });
            });
        } finally {
            await db.close();
        }
    }
}
