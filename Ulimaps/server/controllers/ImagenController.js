import { Imagen } from "../components/Imagen.js";

export class ImagenController {

    // CREATE
    async postImagen(req) {
        const imagen = new Imagen();
        const { id, nombre, puntoExterior} = req.body;
    
        try {
            const resultado = await imagen.createImagen(id, nombre, puntoExterior);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Interior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // READ
    async getImagenes() {
        const imagen = new Imagen();
        try {
            const puntos = await imagen.readImagenes();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    // UPDATE
    async putImagen(req) {
        const imagen = new Imagen();
        const { id } = req.params;
        const { nombre, puntoExterior } = req.body;
        try {
            const resultado = await imagen.updateImagen(id, nombre, puntoExterior);
            console.log('Este es el resultado',resultado);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Interior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

    // DELETE
    async deleteImagen(req) {
        const imagen = new Imagen();
        const { id } = req.params;
    
        try {
            const resultado = await imagen.deleteImagen(id);
            return resultado;
        } catch (error) {
            console.error('Error en actualizar Punto Exterior:', error);
            throw error;  // Propaga el error al bloque try-catch de server.js
        }
    }

}