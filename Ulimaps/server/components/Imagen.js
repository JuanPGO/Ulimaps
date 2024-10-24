import {connectToDB} from '../Conexion.js';

export class Imagen {

    // CREATE
    async createImagen(id_imagen, nombre, puntoExterior) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idPuntoExterior = await new Promise((resolve, reject) => {
                db.get('SELECT id_puntoExterior FROM PuntoInteresExterior WHERE nombre = ?', [puntoExterior], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_puntoExterior:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_puntoExterior',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_puntoExterior: null);
                    }
                });
            });

            if (!idPuntoExterior) {
                throw new Error(`El punto exterior '${nombre}' no existe.`);
            }
            
            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) as count FROM Imagen WHERE id_imagen = ?';
                
                db.get(sql, [id_imagen], (err, row) => {
                    if (err) {
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_imagen',
                            error: err
                        });
                        return;
                    }
    
                    
                    if (row.count > 0) {
                        reject({
                            // si existe id
                            type: 'ID_EXISTS',
                            message: `El ID ${id_imagen} ya está en uso.`
                        });
                    } else {
                        const sql = 'INSERT INTO Imagen (id_imagen, nombre, id_puntoExterior) VALUES (?,?,?)';
                        db.run(sql, [id_imagen,nombre, idPuntoExterior], function(err) {
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
    async readImagenes() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT i.id_imagen AS id,i.nombre AS nombre, pe.nombre AS Punto_Exterior FROM Imagen i INNER JOIN PuntoInteresExterior pe ON pe.id_puntoExterior = i.id_puntoExterior',
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
    async updateImagen(id, nombre, puntoExterior) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idPuntoExterior = await new Promise((resolve, reject) => {
                db.get('SELECT id_puntoExterior FROM PuntoInteresExterior WHERE nombre = ?', [puntoExterior], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_puntoExterior:', err);
                        reject(err);
                    } else {
                        resolve(row ? row.id_puntoExterior : null);
                    }
                });
            });


            if (!idPuntoExterior) {
                throw new Error(`El Tipo '${puntoExterior}' no existe.`);
            }

            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = `
                    UPDATE Imagen
                    SET nombre = ?, id_puntoExterior = ?
                    WHERE id_imagen = ?
                `;
                
                db.run(sql, [nombre, idPuntoExterior, id], function(err) {
                    if (err) {
                        console.error('Error en la actualización de la Imagen:', err);
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
    async deleteImagen(id){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'DELETE FROM Imagen WHERE id_imagen = ?;';
    
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
