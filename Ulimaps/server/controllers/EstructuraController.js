import { Estructura } from '../components/Estructura.js';

export class EstructuraController {
    // CREATE
    async postEstructura(req) {
        const estrutura = new Estructura();
        const { id, bloque, nombre, nombreTipo } = req.body;

        try {
            const resultado = await estrutura.createEstructura(id,  bloque, nombre, nombreTipo);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Interior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    //READ
    async getEstructuras() {
        const estrutura = new Estructura();
        try {
            const puntos = await estrutura.readEstructuras();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    // UPDATE
    async putEstructuras(req) {
        const estrutura = new Estructura();
        const { id } = req.params;
        const { bloque, nombre, nombreTipo } = req.body;
    
        try {
            const resultado = await estrutura.updateEstructura(id, bloque, nombre, nombreTipo);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizarPuntoExterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    //DELETE
    async deleteEstructura(req) {
        const estrutura = new Estructura();
        const { id } = req.params;
    
        try {
            const resultado = await estrutura.deleteEstructura(id);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Exterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

}
