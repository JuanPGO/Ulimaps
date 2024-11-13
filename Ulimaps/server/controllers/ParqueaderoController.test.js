/* eslint-disable no-undef */
// ParqueaderoController.test.js PRUEBAS DE INTEGRACIÓN
import { ParqueaderoController } from './ParqueaderoController.js';
import { Parqueadero } from '../components/Parqueadero.js';

// Mock de la clase Parqueadero
jest.mock('../components/Parqueadero.js');

describe('ParqueaderoController - Pruebas de Integración', () => {
    let controller;
    let mockCreateParqueadero;
    let mockReadParqueaderos;
    let mockUpdateParqueadero;
    let mockDeleteParqueadero;

    beforeEach(() => {
        // Limpiamos los mocks antes de cada prueba
        jest.clearAllMocks();
        
        // Configuramos los mocks para los métodos de Parqueadero
        mockCreateParqueadero = jest.fn();
        mockReadParqueaderos = jest.fn();
        mockUpdateParqueadero = jest.fn();
        mockDeleteParqueadero = jest.fn();

        // Implementamos el mock del constructor de Parqueadero
        Parqueadero.mockImplementation(() => ({
            createParqueadero: mockCreateParqueadero,
            readParqueaderos: mockReadParqueaderos,
            updateParqueadero: mockUpdateParqueadero,
            deleteParqueadero: mockDeleteParqueadero
        }));

        // Creamos una nueva instancia del controlador
        controller = new ParqueaderoController();
    });

    describe('postParqueadero', () => {
        it('debe crear un parqueadero exitosamente', async () => {
            // Arrange
            const req = {
                body: {
                    id: 1,
                    nombre: 'Parqueadero Test',
                    vehiculo: 'Carro',
                    nombreTipo: 'Tipo A'
                }
            };
            mockCreateParqueadero.mockResolvedValue('create');

            // Act
            const resultado = await controller.postParqueadero(req);

            // Assert
            expect(mockCreateParqueadero).toHaveBeenCalledWith(
                req.body.id,
                req.body.nombre,
                req.body.vehiculo,
                req.body.nombreTipo
            );
            expect(resultado).toBe('create');
        });

        it('debe manejar errores al crear un parqueadero', async () => {
            // Arrange
            const req = {
                body: {
                    id: 1,
                    nombre: 'Parqueadero Test',
                    vehiculo: 'Carro',
                    nombreTipo: 'Tipo A'
                }
            };
            const errorEsperado = new Error('Error al crear parqueadero');
            mockCreateParqueadero.mockRejectedValue(errorEsperado);

            // Act & Assert
            await expect(controller.postParqueadero(req))
                .rejects
                .toThrow(errorEsperado);
        });
    });

    describe('getParqueaderos', () => {
        it('debe obtener todos los parqueaderos exitosamente', async () => {
            // Arrange
            const parqueaderosEsperados = [
                { id: 1, nombre: 'Parqueadero 1', vehiculo: 'Carro', nombreTipo: 'Tipo A' },
                { id: 2, nombre: 'Parqueadero 2', vehiculo: 'Moto', nombreTipo: 'Tipo B' }
            ];
            mockReadParqueaderos.mockResolvedValue(parqueaderosEsperados);

            // Act
            const resultado = await controller.getParqueaderos();

            // Assert
            expect(mockReadParqueaderos).toHaveBeenCalled();
            expect(resultado).toEqual(parqueaderosEsperados);
        });

        it('debe retornar array vacío cuando hay error al obtener parqueaderos', async () => {
            // Arrange
            mockReadParqueaderos.mockRejectedValue(new Error('Error en la base de datos'));

            // Act
            const resultado = await controller.getParqueaderos();

            // Assert
            expect(mockReadParqueaderos).toHaveBeenCalled();
            expect(resultado).toEqual([]);
        });
    });

    describe('putParqueadero', () => {
        it('debe actualizar un parqueadero exitosamente', async () => {
            // Arrange
            const req = {
                params: { id: 1 },
                body: {
                    nombre: 'Parqueadero Actualizado',
                    vehiculo: 'Moto',
                    nombreTipo: 'Tipo B'
                }
            };
            mockUpdateParqueadero.mockResolvedValue('update');

            // Act
            const resultado = await controller.putParqueadero(req);

            // Assert
            expect(mockUpdateParqueadero).toHaveBeenCalledWith(
                req.params.id,
                req.body.nombre,
                req.body.vehiculo,
                req.body.nombreTipo
            );
            expect(resultado).toBe('update');
        });

        it('debe manejar errores al actualizar un parqueadero', async () => {
            // Arrange
            const req = {
                params: { id: 1 },
                body: {
                    nombre: 'Parqueadero Actualizado',
                    vehiculo: 'Moto',
                    nombreTipo: 'Tipo B'
                }
            };
            const errorEsperado = new Error('Error al actualizar parqueadero');
            mockUpdateParqueadero.mockRejectedValue(errorEsperado);

            // Act & Assert
            await expect(controller.putParqueadero(req))
                .rejects
                .toThrow(errorEsperado);
        });
    });

    describe('deleteParqueadero', () => {
        it('debe eliminar un parqueadero exitosamente', async () => {
            // Arrange
            const req = {
                params: { id: 1 }
            };
            mockDeleteParqueadero.mockResolvedValue('delete');

            // Act
            const resultado = await controller.deleteParqueadero(req);

            // Assert
            expect(mockDeleteParqueadero).toHaveBeenCalledWith(req.params.id);
            expect(resultado).toBe('delete');
        });

        it('debe manejar errores al eliminar un parqueadero', async () => {
            // Arrange
            const req = {
                params: { id: 1 }
            };
            const errorEsperado = new Error('Error al eliminar parqueadero');
            mockDeleteParqueadero.mockRejectedValue(errorEsperado);

            // Act & Assert
            await expect(controller.deleteParqueadero(req))
                .rejects
                .toThrow(errorEsperado);
        });
    });
});