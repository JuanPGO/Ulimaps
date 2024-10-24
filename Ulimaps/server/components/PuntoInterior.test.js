/* eslint-disable no-undef */
// PuntoInterior.test.js PRUEBAS UNITARIAS
import { PuntoInterior } from './PuntoInterior.js';
import { connectToDB } from '../Conexion.js';

// Mock de las dependencias
jest.mock('../Conexion.js');

describe('PuntoInterior', () => {
    let puntoInteriorInstance;

    beforeEach(() => {
        puntoInteriorInstance = new PuntoInterior();
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('createPuntoInterior', () => {
        describe('createPuntoInterior', () => {
            it('debe crear un punto interior correctamente', async () => {
                console.log('\n--- Iniciando prueba: debe crear un punto interior correctamente ---');
                const mockDb = {
                    get: jest.fn()
                        .mockImplementationOnce((query, params, callback) => {
                            // Mock para búsqueda de tipo
                            callback(null, { id_tipo: 1 });
                        })
                        .mockImplementationOnce((query, params, callback) => {
                            // Mock para búsqueda de piso
                            callback(null, { id_piso: 1 });
                        })
                        .mockImplementationOnce((query, params, callback) => {
                            // Mock para verificación de ID
                            callback(null, { count: 0 });
                        }),
                    run: jest.fn((query, params, callback) => {
                        callback(null);
                    }),
                    close: jest.fn(),
                };
                connectToDB.mockResolvedValue(mockDb);
    
                const result = await puntoInteriorInstance.createPuntoInterior(
                    1, 'Punto Test', true, 'Tipo Test', 'Plano Test'
                );
    
                expect(result).toBe('create');
                expect(mockDb.get).toHaveBeenCalledTimes(3);
                expect(mockDb.run).toHaveBeenCalledWith(
                    'INSERT INTO PuntoInteresInterior (id_puntoInterior,nombre, activo, id_tipo, id_piso) VALUES (?,?,?,?,?)',
                    [1, 'Punto Test', true, 1, 1],
                    expect.any(Function)
                );
                console.log('--- Finalizando prueba: debe crear un punto interior correctamente ---\n');
            });
    
            it('debe rechazar la creación si el ID ya existe', async () => {
                console.log('\n--- Iniciando prueba: debe rechazar la creación si el ID ya existe ---');
                const mockDb = {
                    get: jest.fn()
                        .mockImplementationOnce((query, params, callback) => {
                            // Mock para búsqueda de tipo
                            callback(null, { id_tipo: 1 });
                        })
                        .mockImplementationOnce((query, params, callback) => {
                            // Mock para búsqueda de piso
                            callback(null, { id_piso: 1 });
                        })
                        .mockImplementationOnce((query, params, callback) => {
                            // Mock para verificación de ID
                            callback(null, { count: 1 });
                        }),
                    close: jest.fn(),
                };
                connectToDB.mockResolvedValue(mockDb);
    
                await expect(puntoInteriorInstance.createPuntoInterior(
                    1, 'Punto Test', true, 'Tipo Test', 'Plano Test'
                )).rejects.toEqual({
                    type: 'ID_EXISTS',
                    message: 'El ID 1 ya está en uso.'
                });
                console.log('--- Finalizando prueba: debe rechazar la creación si el ID ya existe ---\n');
            });
    
            it('debe manejar errores de base de datos en la verificación de tipo', async () => {
                console.log('\n--- Iniciando prueba: debe manejar errores de base de datos en la verificación de tipo ---');
                const mockDb = {
                    get: jest.fn((query, params, callback) => {
                        callback(new Error('Error de base de datos'));
                    }),
                    close: jest.fn(),
                };
                connectToDB.mockResolvedValue(mockDb);
    
                await expect(puntoInteriorInstance.createPuntoInterior(
                    1, 'Punto Test', true, 'Tipo Test', 'Plano Test'
                )).rejects.toEqual({
                    type: 'DATABASE_ERROR',
                    message: 'Error al verificar el id_tipo',
                    error: expect.any(Error)
                });
                console.log('--- Finalizando prueba: debe manejar errores de base de datos en la verificación de tipo ---\n');
            });
    
            it('debe manejar errores de base de datos en la verificación de piso', async () => {
                console.log('\n--- Iniciando prueba: debe manejar errores de base de datos en la verificación de piso ---');
                const mockDb = {
                    get: jest.fn()
                        .mockImplementationOnce((query, params, callback) => {
                            callback(null, { id_tipo: 1 });
                        })
                        .mockImplementationOnce((query, params, callback) => {
                            callback(new Error('Error de base de datos'));
                        }),
                    close: jest.fn(),
                };
                connectToDB.mockResolvedValue(mockDb);
    
                await expect(puntoInteriorInstance.createPuntoInterior(
                    1, 'Punto Test', true, 'Tipo Test', 'Plano Test'
                )).rejects.toEqual({
                    type: 'DATABASE_ERROR',
                    message: 'Error al verificar el id_piso',
                    error: expect.any(Error)
                });
                console.log('--- Finalizando prueba: debe manejar errores de base de datos en la verificación de piso ---\n');
            });
    
            it('debe manejar errores de inserción', async () => {
                console.log('\n--- Iniciando prueba: debe manejar errores de inserción ---');
                const mockDb = {
                    get: jest.fn()
                        .mockImplementationOnce((query, params, callback) => {
                            callback(null, { id_tipo: 1 });
                        })
                        .mockImplementationOnce((query, params, callback) => {
                            callback(null, { id_piso: 1 });
                        })
                        .mockImplementationOnce((query, params, callback) => {
                            callback(null, { count: 0 });
                        }),
                    run: jest.fn((query, params, callback) => {
                        callback(new Error('Error de inserción'));
                    }),
                    close: jest.fn(),
                };
                connectToDB.mockResolvedValue(mockDb);
    
                await expect(puntoInteriorInstance.createPuntoInterior(
                    1, 'Punto Test', true, 'Tipo Test', 'Plano Test'
                )).rejects.toEqual({
                    type: 'INSERT_ERROR',
                    message: 'Error al insertar el punto exterior',
                    error: expect.any(Error)
                });
                console.log('--- Finalizando prueba: debe manejar errores de inserción ---\n');
            });
        });
    });

    describe('readPuntosInterior', () => {
        it('debe leer todos los puntos interiores correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe leer todos los puntos interiores correctamente ---');
            const mockDb = {
                all: jest.fn((query, params, callback) => {
                    callback(null, [
                        { id: 1, nombre: 'Punto 1', activo: true, nombreTipo: 'Tipo 1', bloque: 'A', plano: 'Plano 1' },
                        { id: 2, nombre: 'Punto 2', activo: false, nombreTipo: 'Tipo 2', bloque: 'B', plano: 'Plano 2' }
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoInteriorInstance.readPuntosInterior();

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('nombre', 'Punto 1');
            expect(mockDb.all).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe leer todos los puntos interiores correctamente ---\n');
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

            await expect(puntoInteriorInstance.readPuntosInterior())
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la consulta de lectura ---\n');
        });
    });

    describe('updatePuntoInterior', () => {
        it('debe actualizar un punto interior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar un punto interior correctamente ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para búsqueda de tipo
                        callback(null, { id_tipo: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para búsqueda de piso
                        callback(null, { id_piso: 1 });
                    }),
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoInteriorInstance.updatePuntoInterior(
                1, 'Punto Actualizado', 'Tipo Test', 'Plano Test'
            );

            expect(result).toBe('update');
            expect(mockDb.run).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe actualizar un punto interior correctamente ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_tipo: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_piso: 1 });
                    }),
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error en la BD'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(puntoInteriorInstance.updatePuntoInterior(
                1, 'Punto Test', 'Tipo Test', 'Plano Test'
            )).rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización ---\n');
        });
    });

    describe('deletePuntoInterior', () => {
        it('debe eliminar un punto interior correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar un punto interior correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoInteriorInstance.deletePuntoInterior(1);

            expect(result).toBe('delete');
            expect(mockDb.run).toHaveBeenCalledWith(
                'DELETE FROM PuntoInteresInterior WHERE id_puntoInterior = ?;',
                [1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe eliminar un punto interior correctamente ---\n');
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

            const result = await puntoInteriorInstance.deletePuntoInterior(999);

            expect(result).toBe('not_found');
            console.log('--- Finalizando prueba: debe retornar not_found si no existe el punto ---\n');
        });
    });

    describe('updateActivarPuntointerior', () => {
        it('debe actualizar el estado activo correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar el estado activo correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await puntoInteriorInstance.updateActivarPuntointerior(1, true);

            expect(result).toBe('update');
            expect(mockDb.run).toHaveBeenCalledWith(
                'UPDATE puntoInteresInterior SET activo = ? WHERE id_puntoInterior = ?',
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

            await expect(puntoInteriorInstance.updateActivarPuntointerior(1, true))
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización del estado ---\n');
        });
    });
});
