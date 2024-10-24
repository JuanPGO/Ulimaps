import {connectToDB} from '../Conexion.js';

export class Piso {

    // CREATE
    async createPiso(id_piso, nivel, bloque, plano) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idEstructura = await new Promise((resolve, reject) => {
                db.get('SELECT id_estructura FROM Estructura WHERE bloque = ?', [bloque], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_estructura:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_Estructura',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_estructura: null);
                    }
                });
            });

            if (!idEstructura) {
                throw new Error(`El punto exterior '${bloque}' no existe.`);
            }

            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) as count FROM Piso WHERE id_piso = ?';
                
                db.get(sql, [id_piso], (err, row) => {
                    if (err) {
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_piso',
                            error: err
                        });
                        return;
                    }
    
                    if (row.count > 0) {
                        // si existe el id
                        reject({
                            type: 'ID_EXISTS',
                            message: `El ID ${id_piso} ya está en uso.`
                        });
                    } else {
                        const sql = 'INSERT INTO piso (id_piso,nivel, id_estructura, plano) VALUES (?,?,?,?)';
                        db.run(sql, [id_piso,nivel, idEstructura, plano], function(err) {
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
    async readPisos() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT p.id_piso AS id ,p.nivel, e.bloque,pe.nombre, p.plano FROM Piso p INNER JOIN Estructura e ON p.id_estructura = e.id_estructura INNER JOIN PuntoInteresExterior pe ON e.id_puntoExterior = pe.id_puntoExterior',
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
    async updatePiso(id, nivel, bloque, plano) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idEstructura = await new Promise((resolve, reject) => {
                db.get('SELECT id_estructura FROM Estructura WHERE bloque = ?', [bloque], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_estructura:', err);
                        reject(err);
                    } else {
                        resolve(row ? row.id_estructura : null);
                    }
                });
            });

            if (!idEstructura) {
                throw new Error(`La estructura '${bloque}' no existe.`);
            }


            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = `
                    UPDATE Piso 
                    SET nivel = ?, id_estructura = ?, plano = ?
                    WHERE id_piso = ?
                `;
                
                db.run(sql, [nivel, idEstructura, plano, id], function(err) {
                    if (err) {
                        console.error('Error en la actualización del Piso:', err);
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
    async deletePiso(id){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'DELETE FROM Piso WHERE id_piso = ?;';
    
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
