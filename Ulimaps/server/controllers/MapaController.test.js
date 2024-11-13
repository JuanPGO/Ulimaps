/* eslint-disable no-undef */
// MapaController.test.js PRUEBAS DE INTEGRACIÓN
import { MapaController } from './MapaController.js';
import { Mapa } from '../components/Mapa.js';

// Mock de la clase Mapa
jest.mock('../components/Mapa.js');

describe('MapaController - Pruebas de Integración', () => {
  let controlador;
  
  beforeEach(() => {
    // Limpiamos todos los mocks antes de cada prueba
    jest.clearAllMocks();
    controlador = new MapaController();
  });

  describe('getPuntosInteresExterior', () => {
    it('debe retornar los puntos de interés exterior correctamente', async () => {
      const puntosMock = [
        { id: 1, nombre: 'Punto 1', latitud: 40.730610, longitud: -73.935242, activo: true },
        { id: 2, nombre: 'Punto 2', latitud: 40.728155, longitud: -73.952293, activo: true }
      ];

      // Configuramos el mock de Mapa para retornar los puntos
      Mapa.prototype.getPuntosExteriores = jest.fn().mockResolvedValue(puntosMock);

      const resultado = await controlador.getPuntosInteresExterior();

      expect(resultado).toEqual(puntosMock);
      expect(Mapa.prototype.getPuntosExteriores).toHaveBeenCalledTimes(1);
    });

    it('debe manejar errores y retornar un array vacío', async () => {
      Mapa.prototype.getPuntosExteriores = jest.fn().mockRejectedValue(new Error('Error de prueba'));

      const resultado = await controlador.getPuntosInteresExterior();

      expect(resultado).toEqual([]);
      expect(Mapa.prototype.getPuntosExteriores).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPuntoInteresExterior', () => {
    it('debe retornar un punto de interés exterior específico', async () => {
      const puntoMock = { 
        id: 1, 
        nombre: 'Punto 1', 
        latitud: 40.730610, 
        longitud: -73.935242, 
        activo: true 
      };

      Mapa.prototype.getPuntoExterior = jest.fn().mockResolvedValue(puntoMock);

      const resultado = await controlador.getPuntoInteresExterior(1);

      expect(resultado).toEqual(puntoMock);
      expect(Mapa.prototype.getPuntoExterior).toHaveBeenCalledWith(1);
    });

    it('debe manejar errores y retornar null', async () => {
      Mapa.prototype.getPuntoExterior = jest.fn().mockRejectedValue(new Error('Error de prueba'));

      const resultado = await controlador.getPuntoInteresExterior(1);

      expect(resultado).toBeNull();
      expect(Mapa.prototype.getPuntoExterior).toHaveBeenCalledWith(1);
    });
  });

  describe('getEstructura', () => {
    it('debe retornar la estructura correctamente', async () => {
      const estructuraMock = { 
        id: 1, 
        bloque: 'Bloque A', 
        id_puntoExterior: 1 
      };

      Mapa.prototype.getEstructuras = jest.fn().mockResolvedValue(estructuraMock);

      const resultado = await controlador.getEstructura(1);

      expect(resultado).toEqual(estructuraMock);
      expect(Mapa.prototype.getEstructuras).toHaveBeenCalledWith(1);
    });

    it('debe manejar errores y retornar null', async () => {
      Mapa.prototype.getEstructuras = jest.fn().mockRejectedValue(new Error('Error de prueba'));

      const resultado = await controlador.getEstructura(1);

      expect(resultado).toBeNull();
      expect(Mapa.prototype.getEstructuras).toHaveBeenCalledWith(1);
    });
  });

  describe('getImagenes', () => {
    it('debe retornar las imágenes correctamente', async () => {
      const imagenesMock = [
        { id: 1, nombre: 'imagen1.jpg', id_puntoExterior: 1 },
        { id: 2, nombre: 'imagen2.jpg', id_puntoExterior: 1 }
      ];

      Mapa.prototype.getImagenes = jest.fn().mockResolvedValue(imagenesMock);

      const resultado = await controlador.getImagenes(1);

      expect(resultado).toEqual(imagenesMock);
      expect(Mapa.prototype.getImagenes).toHaveBeenCalledWith(1);
    });

    it('debe manejar errores y retornar un array vacío', async () => {
      Mapa.prototype.getImagenes = jest.fn().mockRejectedValue(new Error('Error de prueba'));

      const resultado = await controlador.getImagenes(1);

      expect(resultado).toEqual([]);
      expect(Mapa.prototype.getImagenes).toHaveBeenCalledWith(1);
    });
  });

  describe('getAllImagenes', () => {
    it('debe retornar todas las imágenes correctamente', async () => {
      const todasImagenesMock = [
        { id: 1, nombre: 'imagen1.jpg', id_puntoExterior: 1 },
        { id: 2, nombre: 'imagen2.jpg', id_puntoExterior: 1 },
        { id: 3, nombre: 'imagen3.jpg', id_puntoExterior: 1 }
      ];

      Mapa.prototype.getAllImagenes = jest.fn().mockResolvedValue(todasImagenesMock);

      const resultado = await controlador.getAllImagenes(1);

      expect(resultado).toEqual(todasImagenesMock);
      expect(Mapa.prototype.getAllImagenes).toHaveBeenCalledWith(1);
    });

    it('debe manejar errores y retornar un array vacío', async () => {
      Mapa.prototype.getAllImagenes = jest.fn().mockRejectedValue(new Error('Error de prueba'));

      const resultado = await controlador.getAllImagenes(1);

      expect(resultado).toEqual([]);
      expect(Mapa.prototype.getAllImagenes).toHaveBeenCalledWith(1);
    });
  });

  describe('getPisos', () => {
    it('debe retornar los pisos correctamente', async () => {
      const pisosMock = [
        { id_piso: 1, id_estructura: 1, id_puntoExterior: 1, plano: 'plano1.png' },
        { id_piso: 2, id_estructura: 1, id_puntoExterior: 1, plano: 'plano2.png' }
      ];

      Mapa.prototype.getPisos = jest.fn().mockResolvedValue(pisosMock);

      const resultado = await controlador.getPisos(1);

      expect(resultado).toEqual(pisosMock);
      expect(Mapa.prototype.getPisos).toHaveBeenCalledWith(1);
    });

    it('debe manejar errores y retornar un array vacío', async () => {
      Mapa.prototype.getPisos = jest.fn().mockRejectedValue(new Error('Error de prueba'));

      const resultado = await controlador.getPisos(1);

      expect(resultado).toEqual([]);
      expect(Mapa.prototype.getPisos).toHaveBeenCalledWith(1);
    });
  });

  describe('getPuntosInteresInterior', () => {
    it('debe retornar los puntos de interés interior correctamente', async () => {
      const puntosInterioresMock = [
        { 
          nombre: 'Punto Interior 1', 
          nombreTipo: 'Tipo A', 
          nivel: 1, 
          activo: true, 
          id_estructura: 1, 
          id_puntoExterior: 1 
        },
        { 
          nombre: 'Punto Interior 2', 
          nombreTipo: 'Tipo B', 
          nivel: 2, 
          activo: true, 
          id_estructura: 1, 
          id_puntoExterior: 1 
        }
      ];

      Mapa.prototype.getPuntosInteriores = jest.fn().mockResolvedValue(puntosInterioresMock);

      const resultado = await controlador.getPuntosInteresInterior(1);

      expect(resultado).toEqual(puntosInterioresMock);
      expect(Mapa.prototype.getPuntosInteriores).toHaveBeenCalledWith(1);
    });

    it('debe manejar errores y retornar un array vacío', async () => {
      Mapa.prototype.getPuntosInteriores = jest.fn().mockRejectedValue(new Error('Error de prueba'));

      const resultado = await controlador.getPuntosInteresInterior(1);

      expect(resultado).toEqual([]);
      expect(Mapa.prototype.getPuntosInteriores).toHaveBeenCalledWith(1);
    });
  });
});