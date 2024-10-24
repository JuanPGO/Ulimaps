import { Parqueadero } from '../components/Parqueadero.js';

export class ParqueaderoController {
    
    // CREATE
    async postParqueadero(req) {
        const parqueadero = new Parqueadero();
        const { id, nombre, vehiculo, nombreTipo } = req.body;
    
        try {
            const resultado = await parqueadero.createParqueadero( id, nombre, vehiculo, nombreTipo);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizarPuntoExterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // READ
    async getParqueaderos() {
        const parqueadero = new Parqueadero();
        try {
            const puntos = await parqueadero.readParqueaderos();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    // UPDATE
    async putParqueadero(req) {
        const parqueadero = new Parqueadero();
        const { id } = req.params;
        const { nombre, vehiculo, nombreTipo } = req.body;
    
        try {
            const resultado = await parqueadero.updateParqueadero(id, nombre, vehiculo, nombreTipo);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizarPuntoExterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // DELETE
    async deleteParqueadero(req) {
        const parqueadero = new Parqueadero();
        const { id } = req.params;
    
        try {
            const resultado = await parqueadero.deleteParqueadero(id);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Exterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }
}