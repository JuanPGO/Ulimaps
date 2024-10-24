
import {connectToDB} from '../Conexion.js';

export class PuntoInterior {

    // CREATE
    async createPuntoInterior(id_puntoInterior, nombre, activo, nombreTipo, plano) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idTipo = await new Promise((resolve, reject) => {
                db.get('SELECT id_tipo FROM Tipo WHERE nombreTipo = ?', [nombreTipo], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_estructura:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_tipo',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_tipo: null);
                    }
                });
            });

            const idPiso = await new Promise((resolve, reject) => {
                db.get('SELECT id_piso FROM Piso WHERE plano = ?', [plano], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_estructura:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_piso',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_piso: null);
                    }
                });
            });

            if (!idTipo) {
                throw new Error(`El punto exterior '${nombreTipo}' no existe.`);
            }

            if (!idPiso) {
                throw new Error(`El punto exterior '${plano}' no existe.`);
            }

            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) as count FROM PuntoInteresInterior WHERE id_puntoInterior = ?';
                
                db.get(sql, [id_puntoInterior], (err, row) => {
                    if (err) {
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_puntoInterior',
                            error: err
                        });
                        return;
                    }
    
                    if (row.count > 0) {
                        // si el punto id_puntoInterior
                        reject({
                            type: 'ID_EXISTS',
                            message: `El ID ${id_puntoInterior} ya está en uso.`
                        });
                    } else {
                        const sql = 'INSERT INTO PuntoInteresInterior (id_puntoInterior,nombre, activo, id_tipo, id_piso) VALUES (?,?,?,?,?)';
                        db.run(sql, [id_puntoInterior,nombre, activo, idTipo, idPiso], function(err) {
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
    async readPuntosInterior() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT pi.id_puntoInterior AS id,pi.nombre,pi.activo,t.nombreTipo, e.bloque, p.plano AS plano FROM PuntoInteresInterior pi INNER JOIN Tipo t ON pi.id_tipo = t.id_tipo INNER JOIN Piso p ON p.id_piso = pi.id_piso INNER JOIN Estructura e ON e.id_estructura  = p.id_estructura',
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
    async updatePuntoInterior(id, nombre, nombreTipo, plano) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idTipo = await new Promise((resolve, reject) => {
                db.get('SELECT id_tipo FROM Tipo WHERE nombreTipo = ?', [nombreTipo], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_tipo:', err);
                        reject(err);
                    } else {
                        resolve(row ? row.id_tipo : null);
                    }
                });
            });

            const idPiso = await new Promise((resolve, reject) => {
                db.get('SELECT id_piso FROM Piso WHERE plano = ?', [plano], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_piso:', err);
                        reject(err);
                    } else {
                        resolve(row ? row.id_piso : null);
                    }
                });
            });

            if (!idTipo) {
                throw new Error(`El Tipo '${nombreTipo}' no existe.`);
            }

            if (!idPiso) {
                throw new Error(`El piso '${plano}' no existe.`);
            }


            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = `
                    UPDATE PuntoInteresInterior
                    SET nombre = ?, id_tipo = ?, id_piso = ?
                    WHERE id_puntoInterior = ?
                `;
                
                db.run(sql, [nombre, idTipo, idPiso, id], function(err) {
                    if (err) {
                        console.error('Error en la actualización del Punto Interior:', err);
                        reject(err);
                    } else {
                        console.log('Actualización exitosa. Filas afectadas:', this.changes);
                        resolve('update');
                    }
                });
            });
        } finally {
            await db.close();
        }
    }

    // DELETE
    async deletePuntoInterior(id){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'DELETE FROM PuntoInteresInterior WHERE id_puntoInterior = ?;';
    
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
    async updateActivarPuntointerior(id,activo){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'UPDATE puntoInteresInterior SET activo = ? WHERE id_puntoInterior = ?';
    
                db.run(sql, [activo,id], function(err) {
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
