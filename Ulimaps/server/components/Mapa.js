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

    async getPuntoExterior(id) {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.get(
                    `SELECT 
                        id_puntoExterior AS id,
                        nombre,
                        latitud,
                        longitud,
                        activo
                    FROM PuntoInteresExterior
                    WHERE id_puntoExterior = ?`,
                    [id],
                    (err, row) => {
                        if (err) {
                            console.error('Error en la consulta SQL:', err);
                            reject(err);
                        } else {
                            console.log('Punto de interés exterior encontrado:', row);
                            resolve(row);
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
                    [id_puntoExterior],
                    (err, row) => {
                        if (err) {
                            console.error('Error al buscar imagen:', err);
                            reject(err);
                        } else {
                            console.log('imagen encontrada:', row); // Debug
                            resolve(row);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }

    async getAllImagenes(id_puntoExterior) {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    `SELECT 
                        i.id_imagen AS id,
                        i.nombre AS nombre,
                        i.id_puntoExterior
                    FROM Imagen i 
                    WHERE i.id_puntoExterior = ?`,  // Corregida la condición WHERE
                    [id_puntoExterior],  // Agregado el parámetro
                    (err, rows) => {
                        if (err) {
                            console.error('Error al buscar imágenes:', err);
                            reject(err);
                        } else {
                            console.log('Imágenes encontradas:', rows);
                            resolve(rows);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }

    async getPisos(id_puntoExterior) {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    `SELECT 
                        p.id_piso,
                        p.id_estructura,
                        p.nivel,
                        e.id_puntoExterior,
                        p.plano
                    FROM Piso p 
                    INNER JOIN Estructura e ON e.id_estructura  =  p.id_estructura 
                    WHERE e.id_puntoExterior = ?;`,  // Corregida la condición WHERE
                    [id_puntoExterior],  // Agregado el parámetro
                    (err, rows) => {
                        if (err) {
                            console.error('Error al buscar pisos:', err);
                            reject(err);
                        } else {
                            console.log('Imágenes encontradas:', rows);
                            resolve(rows);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }

    async getPuntosInteriores(id_puntoExterior) {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    `SELECT 
                        pii.nombre,
                        t.nombreTipo,
                        p.nivel,
                        pii.activo,
                        p.id_estructura,
                        e.id_puntoExterior
                    FROM PuntoInteresInterior pii
                    INNER JOIN Piso p ON pii.id_piso = p.id_piso
                    INNER JOIN Tipo t ON pii.id_tipo = t.id_tipo
                    INNER JOIN Estructura e ON p.id_estructura = e.id_estructura 
                    WHERE e.id_puntoExterior = ?`,
                    [id_puntoExterior],
                    (err, rows) => {
                        if (err) {
                            console.error('Error al buscar punto interior:', err);
                            reject(err);
                        } else {
                            console.log('Puntos Interiores encontrados:', rows);
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