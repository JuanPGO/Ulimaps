// Administrador.js
import {connectToDB} from '../Conexion.js';
import {PuntoExterior} from './PuntoExterior.js';
import bcrypt from 'bcrypt';

export class Administrador {
    static puntoExterior = [new PuntoExterior()];

    constructor(usuario, contrasena) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }

    // LOGGING
    async readUsuario() {
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

    async updateContrasena(anteriorContrasena, nuevaContrasena) {
        const db = await connectToDB();
        try {
            const admin = await this.readUsuario();

            if (!admin) {
                throw new Error('No se encontró el administrador en la base de datos');
            }

            // Verificar si la contraseña anterior es correcta
            const isMatch = await bcrypt.compare(anteriorContrasena, admin.contrasena);
            if (!isMatch) {
                throw new Error('La contraseña anterior es incorrecta');
            }

            // Hashear la nueva contraseña
            const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

            return new Promise((resolve, reject) => {
                const sql = 'UPDATE Administrador SET contrasena = ? WHERE usuario = ?';
                db.run(sql, [hashedPassword, this.usuario], function(err) {
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
    

    // PRELOADING
    async loadTipos() {
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


    async loadVehiculo() {
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

    async loadPuntoExterior() {
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
    
    async loadBloque() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT DISTINCT bloque From Estructura',
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

    async loadPiso() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT plano From Piso',
                    [],
                    (err, rows) => {
                        if (err) {
                            console.error('Error en la consulta SQL:', err);
                            reject(err);
                        } else {
                            console.log('Pisos encontrados:', rows);
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
