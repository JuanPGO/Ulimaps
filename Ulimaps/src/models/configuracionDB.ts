import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Crear y abrir la conexión a la base de datos
export async function connectToDB() {
  const db = await open({
    filename: './src/database/Ulimaps.db', // El archivo de la base de datos
    driver: sqlite3.Database // Especificar el driver de SQLite3
  });
  return db;
}