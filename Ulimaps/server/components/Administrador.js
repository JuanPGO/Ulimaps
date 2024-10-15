// Administrador.js
import {connectToDB} from '../Conexion.js';
import PuntoExterior from './PuntoExterior.js';

export class Administrador {
    static puntoExterior = [new PuntoExterior()];

    constructor(usuario, contrasena) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }

    // Consulta logging
    async obtenerUsuario() {
        const db = await connectToDB();
        try {
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

    // Consultas Datatables
    async BuscarPuntosExterior() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT id_puntoExterior, nombre, latitud, longitud, activo FROM PuntoInteresExterior',
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

    async BuscarEstructuras() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT e.id_estructura, e.bloque,  pe.nombre, t.nombreTipo FROM Estructura e INNER JOIN PuntoInteresExterior pe ON pe.id_puntoExterior = e.id_puntoExterior INNER JOIN Tipo t ON t.id_tipo = e.id_tipo',
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

    async BuscarParqueaderos() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT p.id_parqueadero, pe.nombre,p.vehiculo, t.nombreTipo  FROM Parqueadero p INNER JOIN PuntoInteresExterior pe ON pe.id_puntoExterior = p.id_puntoExterior INNER JOIN Tipo t ON p.id_tipo = t.id_tipo',
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

    async BuscarPisos() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT p.id_piso,p.nivel, e.bloque,pe.nombre, p.plano FROM Piso p INNER JOIN Estructura e ON p.id_estructura = e.id_estructura INNER JOIN PuntoInteresExterior pe ON e.id_puntoExterior = pe.id_puntoExterior',
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

    async BuscarPuntosInterior() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT pi.id_puntoInterior,pi.nombre,pi.activo,t.nombreTipo, e.bloque, pe.nombre FROM PuntoInteresInterior pi INNER JOIN Tipo t ON pi.id_tipo = t.id_tipo INNER JOIN Piso p ON p.id_piso = pi.id_piso INNER JOIN Estructura e ON e.id_estructura  = p.id_estructura INNER JOIN PuntoInteresExterior pe ON pe.id_puntoExterior = e.id_puntoExterior',
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

    async BuscarImagenes() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT i.id_imagen,i.nombre AS nombreImagen,pe.nombre FROM Imagen i INNER JOIN PuntoInteresExterior pe ON pe.id_puntoExterior = i.id_puntoExterior',
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

    // Consultas Formulario
    async BuscarTipos() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT nombreTipo From Tipo',
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


    async TipoVehiculo() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT DISTINCT vehiculo From Parqueadero',
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

    async obtenerPuntoExterior() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT DISTINCT nombre From PuntoInteresExterior',
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
    
    async getEstructuras() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT bloque From Estructura',
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

    async editarPuntoExterior(id, nombre, latitud, longitud){
    const db = await connectToDB();
    try {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE puntoInteresExterior SET 
                    nombre = ?, 
                    latitud = ?, 
                    longitud = ?, 
                WHERE id_puntoExterior = ?
            `;

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



}

