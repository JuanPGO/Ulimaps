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
        const  mapa = new Mapa();
        try {
            const puntos = await mapa.getImagenes(id_puntoExterior);
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }
}
