/* eslint-disable no-undef */
// PuntoInteriorController.test.js PRUEBAS DE INTEGRACIÓN
import { PuntoInteriorController } from './PuntoInteriorController.js';
import { PuntoInterior } from '../components/PuntoInterior.js';

// Mock de la clase PuntoInterior
jest.mock('../components/PuntoInterior.js');

describe('PuntoInteriorController - Pruebas de Integración', () => {
    let controller;
    let mockPuntoInterior;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        
        // Crear una nueva instancia del controlador antes de cada prueba
        controller = new PuntoInteriorController();
        
        // Configurar el mock de PuntoInterior
        mockPuntoInterior = {
            createPuntoInterior: jest.fn(),
            readPuntosInterior: jest.fn(),
            updatePuntoInterior: jest.fn(),
            deletePuntoInterior: jest.fn(),
            updateActivarPuntointerior: jest.fn()
        };

        // Configurar el constructor mock para devolver nuestro mockPuntoInterior
        PuntoInterior.mockImplementation(() => mockPuntoInterior);
    });

    describe('postPuntoInterior', () => {
        it('debe crear un punto interior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear un punto interior correctamente ---');
            
            const mockRequest = {
                body: {
                    id: 1,
                    nombre: 'Punto Test',
                    activo: true,
                    nombreTipo: 'Tipo Test',
                    plano: 'Plano Test'
                }
            };

            mockPuntoInterior.createPuntoInterior.mockResolvedValue('create');

            const resultado = await controller.postPuntoInterior(mockRequest);

            expect(resultado).toBe('create');
            expect(mockPuntoInterior.createPuntoInterior).toHaveBeenCalledWith(
                1, 'Punto Test', true, 'Tipo Test', 'Plano Test'
            );
            
            console.log('--- Finalizando prueba: debe crear un punto interior correctamente ---\n');
        });

        it('debe manejar errores en la creación', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la creación ---');
            
            const mockRequest = {
                body: {
                    id: 1,
                    nombre: 'Punto Test',
                    activo: true,
                    nombreTipo: 'Tipo Test',
                    plano: 'Plano Test'
                }
            };

            const error = new Error('Error de prueba');
            mockPuntoInterior.createPuntoInterior.mockRejectedValue(error);

            await expect(controller.postPuntoInterior(mockRequest)).rejects.toThrow('Error de prueba');
            
            console.log('--- Finalizando prueba: debe manejar errores en la creación ---\n');
        });
    });

    describe('getPuntosInteresInterior', () => {
        it('debe obtener todos los puntos interiores correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe obtener todos los puntos interiores correctamente ---');
            
            const mockPuntos = [
                { id: 1, nombre: 'Punto 1' },
                { id: 2, nombre: 'Punto 2' }
            ];

            mockPuntoInterior.readPuntosInterior.mockResolvedValue(mockPuntos);

            const resultado = await controller.getPuntosInteresInterior();

            expect(resultado).toEqual(mockPuntos);
            expect(mockPuntoInterior.readPuntosInterior).toHaveBeenCalled();
            
            console.log('--- Finalizando prueba: debe obtener todos los puntos interiores correctamente ---\n');
        });

        it('debe manejar errores en la lectura retornando array vacío', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la lectura ---');
            
            mockPuntoInterior.readPuntosInterior.mockRejectedValue(new Error('Error de prueba'));

            const resultado = await controller.getPuntosInteresInterior();

            expect(resultado).toEqual([]);
            expect(mockPuntoInterior.readPuntosInterior).toHaveBeenCalled();
            
            console.log('--- Finalizando prueba: debe manejar errores en la lectura ---\n');
        });
    });

    describe('putPuntoInterior', () => {
        it('debe actualizar un punto interior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar un punto interior correctamente ---');
            
            const mockRequest = {
                params: { id: '1' },
                body: {
                    nombre: 'Punto Actualizado',
                    nombreTipo: 'Tipo Test',
                    plano: 'Plano Test'
                }
            };

            mockPuntoInterior.updatePuntoInterior.mockResolvedValue('update');

            const resultado = await controller.putPuntoInterior(mockRequest);

            expect(resultado).toBe('update');
            expect(mockPuntoInterior.updatePuntoInterior).toHaveBeenCalledWith(
                '1', 'Punto Actualizado', 'Tipo Test', 'Plano Test'
            );
            
            console.log('--- Finalizando prueba: debe actualizar un punto interior correctamente ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización ---');
            
            const mockRequest = {
                params: { id: '1' },
                body: {
                    nombre: 'Punto Actualizado',
                    nombreTipo: 'Tipo Test',
                    plano: 'Plano Test'
                }
            };

            mockPuntoInterior.updatePuntoInterior.mockRejectedValue(new Error('Error de prueba'));

            await expect(controller.putPuntoInterior(mockRequest)).rejects.toThrow('Error de prueba');
            
            console.log('--- Finalizando prueba: debe manejar errores en la actualización ---\n');
        });
    });

    describe('deletePuntoInterior', () => {
        it('debe eliminar un punto interior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar un punto interior correctamente ---');
            
            const mockRequest = {
                params: { id: '1' }
            };

            mockPuntoInterior.deletePuntoInterior.mockResolvedValue('delete');

            const resultado = await controller.deletePuntoInterior(mockRequest);

            expect(resultado).toBe('delete');
            expect(mockPuntoInterior.deletePuntoInterior).toHaveBeenCalledWith('1');
            
            console.log('--- Finalizando prueba: debe eliminar un punto interior correctamente ---\n');
        });

        it('debe manejar errores en la eliminación', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la eliminación ---');
            
            const mockRequest = {
                params: { id: '1' }
            };

            mockPuntoInterior.deletePuntoInterior.mockRejectedValue(new Error('Error de prueba'));

            await expect(controller.deletePuntoInterior(mockRequest)).rejects.toThrow('Error de prueba');
            
            console.log('--- Finalizando prueba: debe manejar errores en la eliminación ---\n');
        });
    });

    describe('putActivoPuntoInterior', () => {
        it('debe actualizar el estado activo correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar el estado activo correctamente ---');
            
            const mockRequest = {
                params: { id: '1' },
                body: { activo: true }
            };

            mockPuntoInterior.updateActivarPuntointerior.mockResolvedValue('update');

            const resultado = await controller.putActivoPuntoInterior(mockRequest);

            expect(resultado).toBe('update');
            expect(mockPuntoInterior.updateActivarPuntointerior).toHaveBeenCalledWith('1', true);
            
            console.log('--- Finalizando prueba: debe actualizar el estado activo correctamente ---\n');
        });

        it('debe manejar errores en la actualización del estado', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización del estado ---');
            
            const mockRequest = {
                params: { id: '1' },
                body: { activo: true }
            };

            mockPuntoInterior.updateActivarPuntointerior.mockRejectedValue(new Error('Error de prueba'));

            await expect(controller.putActivoPuntoInterior(mockRequest)).rejects.toThrow('Error de prueba');
            
            console.log('--- Finalizando prueba: debe manejar errores en la actualización del estado ---\n');
        });
    });
});