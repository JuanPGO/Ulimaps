import { PuntoExterior } from '../components/PuntoExterior.js';

export class PuntoExteriorController {

    // CREATE
    async postPuntoExterior(req) {
        const puntoExterior = new PuntoExterior();
        const { id, nombre, latitud, longitud, activo, mapa } = req.body;
    
        try {
            const resultado = await puntoExterior.createPuntoExterior(id,nombre,latitud,longitud,activo,mapa);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Interior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // READ
    async getPuntosInteresExterior() {
        const puntoExterior = new PuntoExterior();
        try {
            const puntos = await puntoExterior.readPuntosExterior();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    // UPDATE
    async putPuntoExterior(req) {
        const puntoExterior = new PuntoExterior();
        const { id } = req.params;
        const { nombre, latitud, longitud } = req.body;
    
        try {
            const resultado = await puntoExterior.updatePuntoExterior(id, nombre, latitud, longitud);
            return resultado;
        } catch (error) {
            console.error('Error en actualizarPuntoExterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // DELETE
    async deletePuntoExterior(req) {
        const puntoExterior = new PuntoExterior();
        const { id } = req.params;
    
        try {
            const resultado = await puntoExterior.deletePuntoExterior(id);
            return resultado;
        } catch (error) {
            console.error('Error al eliminar Punto Exterior:', error);
            throw error;
        }
    }

    // ESTADO
    async putActivoPuntoExterior(req) {
        const puntoExterior = new PuntoExterior();
        const { id } = req.params;
        const { activo } = req.body;
    
        console.log('Datos recibidos controller:', { id, activo});
        
        try {
            const resultado = await puntoExterior.updateActivarPuntoExterior(id, activo); // Cambiar a updateActivarPuntoExterior
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Exterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

}