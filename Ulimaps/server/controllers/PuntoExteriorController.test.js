/* eslint-disable no-undef */
// PuntoExteriorController.test.js PRUEBAS DE INTEGRACIÓN
import { PuntoExteriorController } from './PuntoExteriorController.js';
import { PuntoExterior } from '../components/PuntoExterior.js';

// Mock de las dependencias
jest.mock('../components/PuntoExterior.js');

describe('PuntoExteriorController - Pruebas de Integración', () => {
    let controller;
    let mockPuntoExterior;

    beforeEach(() => {
        // Reiniciar mocks antes de cada prueba
        jest.clearAllMocks();
        
        // Crear una nueva instancia del controlador
        controller = new PuntoExteriorController();
        
        // Configurar el mock de PuntoExterior
        mockPuntoExterior = {
            createPuntoExterior: jest.fn(),
            readPuntosExterior: jest.fn(),
            updatePuntoExterior: jest.fn(),
            deletePuntoExterior: jest.fn(),
            updateActivarPuntoExterior: jest.fn()
        };

        // Mockear el constructor de PuntoExterior
        PuntoExterior.mockImplementation(() => mockPuntoExterior);
    });

    describe('postPuntoExterior', () => {
        it('debe crear un punto exterior correctamente', async () => {
            console.log('\n--- Iniciando prueba: crear punto exterior desde controlador ---');
            
            const mockRequest = {
                body: {
                    id: 1,
                    nombre: 'Punto Test',
                    latitud: 10.5,
                    longitud: -74.3,
                    activo: true,
                    mapa: 1
                }
            };

            mockPuntoExterior.createPuntoExterior.mockResolvedValue('create');

            const result = await controller.postPuntoExterior(mockRequest);

            expect(result).toBe('create');
            expect(mockPuntoExterior.createPuntoExterior).toHaveBeenCalledWith(
                1, 'Punto Test', 10.5, -74.3, true, 1
            );
            
            console.log('--- Finalizando prueba: crear punto exterior desde controlador ---\n');
        });

        it('debe manejar errores en la creación', async () => {
            console.log('\n--- Iniciando prueba: manejo de errores en creación ---');
            
            const mockRequest = {
                body: {
                    id: 1,
                    nombre: 'Punto Test',
                    latitud: 10.5,
                    longitud: -74.3,
                    activo: true,
                    mapa: 1
                }
            };

            const error = new Error('Error en la creación');
            mockPuntoExterior.createPuntoExterior.mockRejectedValue(error);

            await expect(controller.postPuntoExterior(mockRequest))
                .rejects.toThrow('Error en la creación');
            
            console.log('--- Finalizando prueba: manejo de errores en creación ---\n');
        });
    });

    describe('getPuntosInteresExterior', () => {
        it('debe obtener todos los puntos exteriores', async () => {
            console.log('\n--- Iniciando prueba: obtener puntos exteriores desde controlador ---');
            
            const mockPuntos = [
                { id: 1, nombre: 'Punto 1', latitud: 10.5, longitud: -74.3, activo: true },
                { id: 2, nombre: 'Punto 2', latitud: 10.6, longitud: -74.4, activo: false }
            ];

            mockPuntoExterior.readPuntosExterior.mockResolvedValue(mockPuntos);

            const result = await controller.getPuntosInteresExterior();

            expect(result).toEqual(mockPuntos);
            expect(mockPuntoExterior.readPuntosExterior).toHaveBeenCalled();
            
            console.log('--- Finalizando prueba: obtener puntos exteriores desde controlador ---\n');
        });

        it('debe retornar array vacío en caso de error', async () => {
            console.log('\n--- Iniciando prueba: manejo de errores en lectura ---');
            
            mockPuntoExterior.readPuntosExterior.mockRejectedValue(new Error('Error en la lectura'));

            const result = await controller.getPuntosInteresExterior();

            expect(result).toEqual([]);
            expect(mockPuntoExterior.readPuntosExterior).toHaveBeenCalled();
            
            console.log('--- Finalizando prueba: manejo de errores en lectura ---\n');
        });
    });

    describe('putPuntoExterior', () => {
        it('debe actualizar un punto exterior correctamente', async () => {
            console.log('\n--- Iniciando prueba: actualizar punto exterior desde controlador ---');
            
            const mockRequest = {
                params: { id: 1 },
                body: {
                    nombre: 'Punto Actualizado',
                    latitud: 11.5,
                    longitud: -75.3
                }
            };

            mockPuntoExterior.updatePuntoExterior.mockResolvedValue('update');

            const result = await controller.putPuntoExterior(mockRequest);

            expect(result).toBe('update');
            expect(mockPuntoExterior.updatePuntoExterior).toHaveBeenCalledWith(
                1, 'Punto Actualizado', 11.5, -75.3
            );
            
            console.log('--- Finalizando prueba: actualizar punto exterior desde controlador ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: manejo de errores en actualización ---');
            
            const mockRequest = {
                params: { id: 1 },
                body: {
                    nombre: 'Punto Actualizado',
                    latitud: 11.5,
                    longitud: -75.3
                }
            };

            const error = new Error('Error en la actualización');
            mockPuntoExterior.updatePuntoExterior.mockRejectedValue(error);

            await expect(controller.putPuntoExterior(mockRequest))
                .rejects.toThrow('Error en la actualización');
            
            console.log('--- Finalizando prueba: manejo de errores en actualización ---\n');
        });
    });

    describe('deletePuntoExterior', () => {
        it('debe eliminar un punto exterior correctamente', async () => {
            console.log('\n--- Iniciando prueba: eliminar punto exterior desde controlador ---');
            
            const mockRequest = {
                params: { id: 1 }
            };

            mockPuntoExterior.deletePuntoExterior.mockResolvedValue('delete');

            const result = await controller.deletePuntoExterior(mockRequest);

            expect(result).toBe('delete');
            expect(mockPuntoExterior.deletePuntoExterior).toHaveBeenCalledWith(1);
            
            console.log('--- Finalizando prueba: eliminar punto exterior desde controlador ---\n');
        });

        it('debe manejar errores en la eliminación', async () => {
            console.log('\n--- Iniciando prueba: manejo de errores en eliminación ---');
            
            const mockRequest = {
                params: { id: 1 }
            };

            const error = new Error('Error en la eliminación');
            mockPuntoExterior.deletePuntoExterior.mockRejectedValue(error);

            await expect(controller.deletePuntoExterior(mockRequest))
                .rejects.toThrow('Error en la eliminación');
            
            console.log('--- Finalizando prueba: manejo de errores en eliminación ---\n');
        });
    });

    describe('putActivoPuntoExterior', () => {
        it('debe actualizar el estado activo correctamente', async () => {
            console.log('\n--- Iniciando prueba: actualizar estado activo desde controlador ---');
            
            const mockRequest = {
                params: { id: 1 },
                body: { activo: true }
            };

            mockPuntoExterior.updateActivarPuntoExterior.mockResolvedValue('update');

            const result = await controller.putActivoPuntoExterior(mockRequest);

            expect(result).toBe('update');
            expect(mockPuntoExterior.updateActivarPuntoExterior).toHaveBeenCalledWith(1, true);
            
            console.log('--- Finalizando prueba: actualizar estado activo desde controlador ---\n');
        });

        it('debe manejar errores en la actualización del estado', async () => {
            console.log('\n--- Iniciando prueba: manejo de errores en actualización de estado ---');
            
            const mockRequest = {
                params: { id: 1 },
                body: { activo: true }
            };

            const error = new Error('Error en la actualización del estado');
            mockPuntoExterior.updateActivarPuntoExterior.mockRejectedValue(error);

            await expect(controller.putActivoPuntoExterior(mockRequest))
                .rejects.toThrow('Error en la actualización del estado');
            
            console.log('--- Finalizando prueba: manejo de errores en actualización de estado ---\n');
        });
    });
});