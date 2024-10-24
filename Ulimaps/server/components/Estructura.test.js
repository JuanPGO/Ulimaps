/* eslint-disable no-undef */
// Estructura.test.js PRUEBAS UNITARIAS
import { Estructura } from './Estructura.js';
import { connectToDB } from '../Conexion.js';

// Mock de las dependencias
jest.mock('../Conexion.js');

describe('Estructura', () => {
    let estructuraInstance;

    beforeEach(() => {
        estructuraInstance = new Estructura();
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('createEstructura', () => {
        it('debe crear una estructura correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear una estructura correctamente ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para buscar id_puntoExterior
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para buscar id_tipo
                        callback(null, { id_tipo: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para verificar id_estructura
                        callback(null, { count: 0 });
                    }),
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn()
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await estructuraInstance.createEstructura(
                1,
                'A',
                'Punto Test',
                'Tipo Test'
            );

            expect(result).toBe('create');
            expect(mockDb.get).toHaveBeenCalledTimes(3);
            expect(mockDb.run).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe crear una estructura correctamente ---\n');
        });

        // Pruebas de validación
        it('debe validar la existencia del punto exterior', async () => {
            console.log('\n--- Iniciando prueba: debe validar la existencia del punto exterior ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, null); // Punto exterior no existe
                }),
                close: jest.fn()
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(estructuraInstance.createEstructura(
                1,
                'A',
                'Punto Inexistente',
                'Tipo Test'
            )).rejects.toThrow('El punto exterior \'Punto Inexistente\' no existe.');
            console.log('--- Finalizando prueba: debe validar la existencia del punto exterior ---\n');
        });

        it('debe validar la existencia del tipo', async () => {
            console.log('\n--- Iniciando prueba: debe validar la existencia del tipo ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, null); // Tipo no existe
                    }),
                close: jest.fn()
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(estructuraInstance.createEstructura(
                1,
                'A',
                'Punto Test',
                'Tipo Inexistente'
            )).rejects.toThrow('El tipo \'Tipo Inexistente\' no existe.');
            console.log('--- Finalizando prueba: debe validar la existencia del tipo ---\n');
        });

        it('debe validar que el ID de estructura no esté duplicado', async () => {
            console.log('\n--- Iniciando prueba: debe validar que el ID de estructura no esté duplicado ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_tipo: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { count: 1 }); // ID ya existe
                    }),
                close: jest.fn()
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(estructuraInstance.createEstructura(
                1,
                'A',
                'Punto Test',
                'Tipo Test'
            )).rejects.toEqual({
                type: 'ID_EXISTS',
                message: 'El ID 1 ya está en uso.'
            });
            console.log('--- Finalizando prueba: debe validar que el ID de estructura no esté duplicado ---\n');
        });
    });

    describe('readEstructuras', () => {
        it('debe leer todas las estructuras correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe leer todas las estructuras correctamente ---');
            const mockDb = {
                all: jest.fn((query, params, callback) => {
                    callback(null, [
                        { id: 1, bloque: 'A', nombre: 'Punto 1', nombreTipo: 'Tipo 1' },
                        { id: 2, bloque: 'B', nombre: 'Punto 2', nombreTipo: 'Tipo 2' }
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await estructuraInstance.readEstructuras();

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('bloque', 'A');
            expect(mockDb.all).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe leer todas las estructuras correctamente ---\n');
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

            await expect(estructuraInstance.readEstructuras())
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la consulta de lectura ---\n');
        });
    });

    describe('updateEstructura', () => {
        it('debe actualizar una estructura correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar una estructura correctamente ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_tipo: 1 });
                    }),
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await estructuraInstance.updateEstructura(
                1, 'B', 'Punto Actualizado', 'Tipo Actualizado'
            );

            expect(result).toBe('update');
            expect(mockDb.get).toHaveBeenCalledTimes(2);
            expect(mockDb.run).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe actualizar una estructura correctamente ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_tipo: 1 });
                    }),
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error en la BD'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(estructuraInstance.updateEstructura(
                1, 'B', 'Punto Test', 'Tipo Test'
            )).rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización ---\n');
        });
    });

    describe('deleteEstructura', () => {
        it('debe eliminar una estructura correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar una estructura correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await estructuraInstance.deleteEstructura(1);

            expect(result).toBe('delete');
            expect(mockDb.run).toHaveBeenCalledWith(
                'DELETE FROM Estructura WHERE id_estructura = ?;',
                [1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe eliminar una estructura correctamente ---\n');
        });

        it('debe retornar not_found si no existe la estructura a eliminar', async () => {
            console.log('\n--- Iniciando prueba: debe retornar not_found si no existe la estructura ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 0 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await estructuraInstance.deleteEstructura(999);

            expect(result).toBe('not_found');
            console.log('--- Finalizando prueba: debe retornar not_found si no existe la estructura ---\n');
        });
    });
});