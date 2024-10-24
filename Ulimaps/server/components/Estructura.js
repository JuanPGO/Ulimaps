import {connectToDB} from '../Conexion.js';

export class Estructura {

    // CREATE
    async createEstructura(id_estructura, bloque, nombre, nombreTipo) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idPuntoExterior = await new Promise((resolve, reject) => {
                db.get('SELECT id_puntoExterior FROM PuntoInteresExterior WHERE nombre = ?', [nombre], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_puntoExterior:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_puntoExterior',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_puntoExterior : null);
                    }
                });
            });
    
            const idTipo = await new Promise((resolve, reject) => {
                db.get('SELECT id_tipo FROM Tipo WHERE nombreTipo = ?', [nombreTipo], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_tipo:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_tipo',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_tipo : null);
                    }
                });
            });
    
            if (!idPuntoExterior) {
                throw new Error(`El punto exterior '${nombre}' no existe.`);
            }
    
            if (!idTipo) {
                throw new Error(`El tipo '${nombreTipo}' no existe.`);
            }
    
            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) as count FROM Estructura WHERE id_estructura = ?';
                db.get(sql, [id_estructura], (err, row) => {
                    if (err) {
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_estructura',
                            error: err
                        });
                        return;
                    }
    
                    if (row.count > 0) {
                        // Si el id_puntoExterior ya existe
                        reject({
                            type: 'ID_EXISTS',
                            message: `El ID ${id_estructura} ya está en uso.`
                        });
                    } else {
                        const sql = 'INSERT INTO Estructura (id_estructura,bloque, id_puntoExterior, id_tipo) VALUES (?,?,?,?)';
                        db.run(sql, [id_estructura,bloque, idPuntoExterior, idTipo], function(err) {
                            if (err) {
                                reject({
                                    type: 'INSERT_ERROR',
                                    message: 'Error al insertar el punto exterior',
                                    error: err
                                });
                            } else {
                                console.log('Actualización exitosa. Filas afectadas:', this.changes);
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
    async readEstructuras() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT e.id_estructura As id, e.bloque,  pe.nombre, t.nombreTipo FROM Estructura e INNER JOIN PuntoInteresExterior pe ON pe.id_puntoExterior = e.id_puntoExterior INNER JOIN Tipo t ON t.id_tipo = e.id_tipo',
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

    //UPDATE
    async updateEstructura(id, bloque, nombre, nombreTipo) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idPuntoExterior = await new Promise((resolve, reject) => {
                db.get('SELECT id_puntoExterior FROM PuntoInteresExterior WHERE nombre = ?', [nombre], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_puntoExterior:', err);
                        reject(err);
                    } else {
                        resolve(row ? row.id_puntoExterior : null);
                    }
                });
            });

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

            if (!idPuntoExterior) {
                throw new Error(`El punto exterior '${nombre}' no existe.`);
            }

            if (!idTipo) {
                throw new Error(`El tipo '${nombreTipo}' no existe.`);
            }

            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = `
                    UPDATE Estructura 
                    SET bloque = ?, id_puntoExterior = ?, id_tipo = ?
                    WHERE id_estructura = ?
                `;
                
                db.run(sql, [bloque, idPuntoExterior, idTipo, id], function(err) {
                    if (err) {
                        console.error('Error en la actualización de Estructura:', err);
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

    //DELETE
    async deleteEstructura(id){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'DELETE FROM Estructura WHERE id_estructura = ?;';
    
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
}

export default Estructura;
