/* eslint-disable no-undef */
// PuntoExterior.test.js PRUEBAS UNITARIAS
import { PuntoExterior } from './PuntoExterior.js';
import { connectToDB } from '../Conexion.js';

// Mock de las dependencias
jest.mock('../Conexion.js');

describe('PuntoExterior', () => {
    let puntoExteriorInstance;

    beforeEach(() => {
        puntoExteriorInstance = new PuntoExterior();
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('createPuntoExterior', () => {
        it('debe crear un punto exterior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear un punto exterior correctamente ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    // Mock para verificación de ID
                    callback(null, { count: 0 });
                }),
                run: jest.fn((query, params, callback) => {
                    callback(null);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoExteriorInstance.createPuntoExterior(
                1, 'Punto Test', 10.5, -74.3, true, 1
            );

            expect(result).toBe('create');
            expect(mockDb.get).toHaveBeenCalledTimes(1);
            expect(mockDb.run).toHaveBeenCalledWith(
                'INSERT INTO PuntoInteresExterior (id_puntoExterior, nombre, latitud, longitud, activo, id_mapa) VALUES (?, ?, ?, ?, ?, ?)',
                [1, 'Punto Test', 10.5, -74.3, true, 1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe crear un punto exterior correctamente ---\n');
        });

        it('debe rechazar la creación si el ID ya existe', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar la creación si el ID ya existe ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, { count: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(puntoExteriorInstance.createPuntoExterior(
                1, 'Punto Test', 10.5, -74.3, true, 1
            )).rejects.toEqual({
                type: 'ID_EXISTS',
                message: 'El ID 1 ya está en uso.'
            });
            console.log('--- Finalizando prueba: debe rechazar la creación si el ID ya existe ---\n');
        });

        it('debe manejar errores de base de datos en la verificación de ID', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores de base de datos en la verificación de ID ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(new Error('Error de base de datos'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(puntoExteriorInstance.createPuntoExterior(
                1, 'Punto Test', 10.5, -74.3, true, 1
            )).rejects.toEqual({
                type: 'DATABASE_ERROR',
                message: 'Error al verificar el id_puntoExterior',
                error: expect.any(Error)
            });
            console.log('--- Finalizando prueba: debe manejar errores de base de datos en la verificación de ID ---\n');
        });

        it('debe manejar errores de inserción', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores de inserción ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, { count: 0 });
                }),
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error de inserción'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(puntoExteriorInstance.createPuntoExterior(
                1, 'Punto Test', 10.5, -74.3, true, 1
            )).rejects.toEqual({
                type: 'INSERT_ERROR',
                message: 'Error al insertar el punto exterior',
                error: expect.any(Error)
            });
            console.log('--- Finalizando prueba: debe manejar errores de inserción ---\n');
        });
    });

    describe('readPuntosExterior', () => {
        it('debe leer todos los puntos exteriores correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe leer todos los puntos exteriores correctamente ---');
            const mockDb = {
                all: jest.fn((query, params, callback) => {
                    callback(null, [
                        { id: 1, nombre: 'Punto 1', latitud: 10.5, longitud: -74.3, activo: true },
                        { id: 2, nombre: 'Punto 2', latitud: 10.6, longitud: -74.4, activo: false }
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoExteriorInstance.readPuntosExterior();

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('nombre', 'Punto 1');
            expect(mockDb.all).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe leer todos los puntos exteriores correctamente ---\n');
        });

        it('debe manejar errores en la consulta de lectura', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la consulta de lectura ---');
            const mockDb = {
                all: jest.fn((query, params, callback) => {
                    callback(new Error('Error en la BD'), null);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(puntoExteriorInstance.readPuntosExterior())
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la consulta de lectura ---\n');
        });
    });

    describe('updatePuntoExterior', () => {
        it('debe actualizar un punto exterior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar un punto exterior correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoExteriorInstance.updatePuntoExterior(
                1, 'Punto Actualizado', 11.5, -75.3
            );

            expect(result).toBe('update');
            expect(mockDb.run).toHaveBeenCalledWith(
                'UPDATE puntoInteresExterior SET nombre = ?, latitud = ?, longitud = ? WHERE id_puntoExterior = ?',
                ['Punto Actualizado', 11.5, -75.3, 1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe actualizar un punto exterior correctamente ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error en la BD'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(puntoExteriorInstance.updatePuntoExterior(
                1, 'Punto Test', 10.5, -74.3
            )).rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización ---\n');
        });
    });

    describe('deletePuntoExterior', () => {
        it('debe eliminar un punto exterior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar un punto exterior correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoExteriorInstance.deletePuntoExterior(1);

            expect(result).toBe('delete');
            expect(mockDb.run).toHaveBeenCalledWith(
                'DELETE FROM PuntoInteresExterior WHERE id_puntoExterior = ?;',
                [1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe eliminar un punto exterior correctamente ---\n');
        });

        it('debe retornar not_found si no existe el punto a eliminar', async () => {
            console.log('\n--- Iniciando prueba: debe retornar not_found si no existe el punto ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 0 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoExteriorInstance.deletePuntoExterior(999);

            expect(result).toBe('not_found');
            console.log('--- Finalizando prueba: debe retornar not_found si no existe el punto ---\n');
        });
    });

    describe('updateActivarPuntoExterior', () => {
        it('debe actualizar el estado activo correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar el estado activo correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoExteriorInstance.updateActivarPuntoExterior(1, true);

            expect(result).toBe('update');
            expect(mockDb.run).toHaveBeenCalledWith(
                'UPDATE puntoInteresExterior SET activo = ? WHERE id_puntoExterior = ?',
                [true, 1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe actualizar el estado activo correctamente ---\n');
        });

        it('debe manejar errores en la actualización del estado', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización del estado ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error en la BD'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(puntoExteriorInstance.updateActivarPuntoExterior(1, true))
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización del estado ---\n');
        });
    });
});