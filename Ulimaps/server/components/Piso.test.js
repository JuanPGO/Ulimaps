/* eslint-disable no-undef */
// Piso.test.js PRUEBAS UNITARIAS
import { Piso } from './Piso.js';
import { connectToDB } from '../Conexion.js';

// Mock de las dependencias
jest.mock('../Conexion.js');

describe('Piso', () => {
    let pisoInstance;

    beforeEach(() => {
        pisoInstance = new Piso();
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('createPiso', () => {
        it('debe crear un piso correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear un piso correctamente ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para búsqueda de estructura
                        callback(null, { id_estructura: 1 });
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

            const result = await pisoInstance.createPiso(
                1, 'Nivel 1', 'Bloque A', 'plano1.jpg'
            );

            expect(result).toBe('create');
            expect(mockDb.get).toHaveBeenCalledTimes(2);
            expect(mockDb.run).toHaveBeenCalledWith(
                'INSERT INTO piso (id_piso,nivel, id_estructura, plano) VALUES (?,?,?,?)',
                [1, 'Nivel 1', 1, 'plano1.jpg'],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe crear un piso correctamente ---\n');
        });

        it('debe rechazar la creación si el ID ya existe', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar la creación si el ID ya existe ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para búsqueda de estructura
                        callback(null, { id_estructura: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para verificación de ID
                        callback(null, { count: 1 });
                    }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(pisoInstance.createPiso(
                1, 'Nivel 1', 'Bloque A', 'plano1.jpg'
            )).rejects.toEqual({
                type: 'ID_EXISTS',
                message: 'El ID 1 ya está en uso.'
            });
            console.log('--- Finalizando prueba: debe rechazar la creación si el ID ya existe ---\n');
        });

        it('debe manejar errores de base de datos en la verificación de ID', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores de base de datos en la verificación de ID ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para búsqueda de estructura
                        callback(null, { id_estructura: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para error en verificación de ID
                        callback(new Error('Error de base de datos'));
                    }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(pisoInstance.createPiso(
                1, 'Nivel 1', 'Bloque A', 'plano1.jpg'
            )).rejects.toEqual({
                type: 'DATABASE_ERROR',
                message: 'Error al verificar el id_piso',
                error: expect.any(Error)
            });
            console.log('--- Finalizando prueba: debe manejar errores de base de datos en la verificación de ID ---\n');
        });

        it('debe manejar errores de inserción', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores de inserción ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para búsqueda de estructura
                        callback(null, { id_estructura: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para verificación de ID
                        callback(null, { count: 0 });
                    }),
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error de inserción'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(pisoInstance.createPiso(
                1, 'Nivel 1', 'Bloque A', 'plano1.jpg'
            )).rejects.toEqual({
                type: 'INSERT_ERROR',
                message: 'Error al insertar el punto exterior',
                error: expect.any(Error)
            });
            console.log('--- Finalizando prueba: debe manejar errores de inserción ---\n');
        });
    
    });

    describe('readPisos', () => {
        it('debe leer todos los pisos correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe leer todos los pisos correctamente ---');
            const mockDb = {
                all: jest.fn((query, params, callback) => {
                    callback(null, [
                        { id: 1, nivel: 'Nivel 1', bloque: 'A', nombre: 'Edificio 1', plano: 'plano1.jpg' },
                        { id: 2, nivel: 'Nivel 2', bloque: 'B', nombre: 'Edificio 2', plano: 'plano2.jpg' }
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await pisoInstance.readPisos();

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('nivel', 'Nivel 1');
            expect(mockDb.all).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe leer todos los pisos correctamente ---\n');
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

            await expect(pisoInstance.readPisos())
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la consulta de lectura ---\n');
        });
    });

    describe('updatePiso', () => {
        it('debe actualizar un piso correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar un piso correctamente ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, { id_estructura: 1 });
                }),
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await pisoInstance.updatePiso(
                1, 'Nivel Actualizado', 'Bloque A', 'plano_nuevo.jpg'
            );

            expect(result).toBe('update');
            expect(mockDb.run).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe actualizar un piso correctamente ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, { id_estructura: 1 });
                }),
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error en la BD'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(pisoInstance.updatePiso(
                1, 'Nivel Test', 'Bloque A', 'plano.jpg'
            )).rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización ---\n');
        });
    });

    describe('deletePiso', () => {
        it('debe eliminar un piso correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar un piso correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await pisoInstance.deletePiso(1);

            expect(result).toBe('delete');
            expect(mockDb.run).toHaveBeenCalledWith(
                'DELETE FROM Piso WHERE id_piso = ?;',
                [1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe eliminar un piso correctamente ---\n');
        });

        it('debe retornar not_found si no existe el piso a eliminar', async () => {
            console.log('\n--- Iniciando prueba: debe retornar not_found si no existe el piso ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 0 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await pisoInstance.deletePiso(999);

            expect(result).toBe('not_found');
            console.log('--- Finalizando prueba: debe retornar not_found si no existe el piso ---\n');
        });
    });
});