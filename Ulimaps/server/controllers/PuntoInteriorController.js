import { PuntoInterior } from '../components/PuntoInterior.js';

export class PuntoInteriorController {

    // CREATE
    async postPuntoInterior(req) {
        const puntoInterior = new PuntoInterior();
        const { id, nombre, activo, nombreTipo, plano } = req.body;
    
        try {
            const resultado = await puntoInterior.createPuntoInterior(id, nombre, activo, nombreTipo, plano);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Interior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // READ
    async getPuntosInteresInterior() {
        const puntoInterior = new PuntoInterior();
        try {
            const puntos = await puntoInterior.readPuntosInterior();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    // UPDATE
    async putPuntoInterior(req) {
        const puntoInterior = new PuntoInterior();
        const { id } = req.params;
        const { nombre, nombreTipo, plano } = req.body;
    
        try {
            const resultado = await puntoInterior.updatePuntoInterior(id, nombre, nombreTipo, plano);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Interior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // DELETE
    async deletePuntoInterior(req) {
        const puntoInterior = new PuntoInterior();
        const { id } = req.params;
    
        try {
            const resultado = await puntoInterior.deletePuntoInterior(id);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Exterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // ESTADO
    async putActivoPuntoInterior(req) {
        const puntoInterior = new PuntoInterior();
        const { id } = req.params;
        const { activo } = req.body;
    
        try {
            const resultado = await puntoInterior.updateActivarPuntointerior(id, activo);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Interior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }
}