import { Mapa } from '../components/Mapa.js';

export class MapaController {
    async getPuntosInteresExterior() {
        const mapa = new Mapa();
        try {
            const puntos = await mapa.getPuntosExteriores();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async getPuntoInteresExterior(id_puntoExterior) {
        const mapa = new Mapa();
        try {
            const punto = await mapa.getPuntoExterior(id_puntoExterior);
            return punto;
        } catch (error) {
            console.error('Error al obtener punto de interés exterior:', error);
            return null;
        }
    }

    async getEstructura(id_puntoExterior) {
        const mapa = new Mapa();
        try {
            const estructura = await mapa.getEstructuras(id_puntoExterior);
            return estructura;
        } catch (error) {
            console.error('Error al obtener estructura:', error);
            return null;
        }
    }

    async getImagenes(id_puntoExterior) {
        const mapa = new Mapa();
        try {
            const puntos = await mapa.getImagenes(id_puntoExterior);
            return puntos;
        } catch (error) {
            console.error('Error al obtener imágenes:', error);
            return [];
        }
    }

    async getAllImagenes(id_puntoExterior) {
        const mapa = new Mapa();
        try {
            const puntos = await mapa.getAllImagenes(id_puntoExterior);
            return puntos;
        } catch (error) {
            console.error('Error al obtener todas las imágenes:', error);
            return [];
        }
    }

    async getPisos(id_puntoExterior) {
        const mapa = new Mapa();
        try {
            const puntos = await mapa.getPisos(id_puntoExterior);
            return puntos;
        } catch (error) {
            console.error('Error al obtener todas los Pisos:', error);
            return [];
        }
    }

    
    async getPuntosInteresInterior(id_puntoExterior) {
        const mapa = new Mapa();
        try {
            const puntos = await mapa.getPuntosInteriores(id_puntoExterior);
            return puntos;
        } catch (error) {
            console.error('Error al obtener todas los Pisos:', error);
            return [];
        }
    }

}
