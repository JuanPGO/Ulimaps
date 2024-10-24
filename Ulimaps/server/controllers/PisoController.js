import { Piso } from '../components/Piso.js';

export class PisoController {

    // CREATE
    async postPiso(req) {
        const piso = new Piso();
        const { id, nivel, bloque, plano } = req.body;
    
        try {
            const resultado = await piso.createPiso( id, nivel, bloque, plano);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizarPuntoExterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // READ
    async getPisos() {
        const piso = new Piso();
        try {
            const puntos = await piso.readPisos();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    // UPDATE
    async putPiso(req) {
        const piso = new Piso();
        const { id } = req.params;
        const { nivel, bloque, plano } = req.body;
    
        try {
            const resultado = await piso.updatePiso(id, nivel, bloque, plano);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizarPuntoExterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // DELETE
    async deletePiso(req) {
        const piso = new Piso();
        const { id } = req.params;
    
        try {
            const resultado = await piso.deletePiso(id);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Exterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }


}