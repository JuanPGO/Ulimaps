// server/Conexion.js
import sqlite3 from 'sqlite3';
import { resolve } from 'path';

const dbPath = resolve('database/Ulimaps.db');

export function connectToDB() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err.message);
                reject(err);
            } else {
                console.log('Conectado a la base de datos SQLite.');
                resolve(db); // Resuelve la promesa con la conexión
            }
        });
    });
}



