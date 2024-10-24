/* eslint-disable no-undef */
// Imagen.test.js PRUEBAS UNITARIAS
import { Imagen } from './Imagen.js';
import { connectToDB } from '../Conexion.js';

// Mock de las dependencias
jest.mock('../Conexion.js');

describe('Imagen', () => {
    let imagenInstance;

    beforeEach(() => {
        imagenInstance = new Imagen();
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('createImagen', () => {
        it('debe crear una imagen correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear una imagen correctamente ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para búsqueda de punto exterior
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        // Mock para verificación de ID
                        callback(null, { count: 0 });
                    }),
                run: jest.fn().mockImplementation((query, params, callback) => {
                    callback(null, { changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await imagenInstance.createImagen(
                1, 'Imagen Test', 'Punto Exterior Test'
            );

            expect(result).toBe('create');
            expect(mockDb.get).toHaveBeenCalledTimes(2);
            expect(mockDb.run).toHaveBeenCalledWith(
                'INSERT INTO Imagen (id_imagen, nombre, id_puntoExterior) VALUES (?,?,?)',
                [1, 'Imagen Test', 1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe crear una imagen correctamente ---\n');
        });

        it('debe rechazar si el punto exterior no existe', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar si el punto exterior no existe ---');
            const mockDb = {
                get: jest.fn().mockImplementation((query, params, callback) => {
                    callback(null, null);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(imagenInstance.createImagen(
                1, 'Imagen Test', 'Punto Exterior Inexistente'
            )).rejects.toThrow(`El punto exterior 'Imagen Test' no existe.`);
            console.log('--- Finalizando prueba: debe rechazar si el punto exterior no existe ---\n');
        });

        it('debe rechazar si hay error en la búsqueda del punto exterior', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar si hay error en la búsqueda del punto exterior ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(new Error('Error de base de datos'), null);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);
            await expect(imagenInstance.createImagen(
                1, 'Imagen Test', 'Punto Exterior Test'
            )).rejects.toEqual({
                type: 'DATABASE_ERROR',
                message: 'Error al verificar el id_puntoExterior',
                error: expect.any(Error)
            });
            console.log('--- Finalizando prueba: debe rechazar si hay error en la búsqueda del punto exterior ---\n');
        });


        it('debe rechazar si el ID ya existe', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar si el ID ya existe ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { count: 1 });
                    }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(imagenInstance.createImagen(
                1, 'Imagen Test', 'Punto Exterior Test'
            )).rejects.toMatchObject({
                type: 'ID_EXISTS',
                message: 'El ID 1 ya está en uso.'
            });
            console.log('--- Finalizando prueba: debe rechazar si el ID ya existe ---\n');
        });

        it('debe rechazar si hay error en la inserción', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar si hay error en la inserción ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { count: 0 });
                    }),
                run: jest.fn().mockImplementation((query, params, callback) => {
                    callback(new Error('Error en inserción'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(imagenInstance.createImagen(
                1, 'Imagen Test', 'Punto Exterior Test'
            )).rejects.toMatchObject({
                type: 'INSERT_ERROR',
                message: 'Error al insertar el punto exterior'
            });
            console.log('--- Finalizando prueba: debe rechazar si hay error en la inserción ---\n');
        });
    });

    describe('readImagenes', () => {
        it('debe leer todas las imágenes correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe leer todas las imágenes correctamente ---');
            const mockDb = {
                all: jest.fn((query, params, callback) => {
                    callback(null, [
                        { id: 1, nombre: 'Imagen 1', Punto_Exterior: 'Punto 1' },
                        { id: 2, nombre: 'Imagen 2', Punto_Exterior: 'Punto 2' }
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await imagenInstance.readImagenes();

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('nombre', 'Imagen 1');
            expect(mockDb.all).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe leer todas las imágenes correctamente ---\n');
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

            await expect(imagenInstance.readImagenes())
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la consulta de lectura ---\n');
        });
    });

    describe('updateImagen', () => {
        it('debe actualizar una imagen correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar una imagen correctamente ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, { id_puntoExterior: 1 });
                }),
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await imagenInstance.updateImagen(
                1, 'Imagen Actualizada', 'Punto Exterior Test'
            );

            expect(result).toBe('update');
            expect(mockDb.run).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe actualizar una imagen correctamente ---\n');
        });

        it('debe rechazar si el punto exterior no existe', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar si el punto exterior no existe en actualización ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, null);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(imagenInstance.updateImagen(
                1, 'Imagen Test', 'Punto Exterior Inexistente'
            )).rejects.toThrow(`El Tipo 'Punto Exterior Inexistente' no existe.`);
            console.log('--- Finalizando prueba: debe rechazar si el punto exterior no existe en actualización ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores en la actualización ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, { id_puntoExterior: 1 });
                }),
                run: jest.fn((query, params, callback) => {
                    callback(new Error('Error en la BD'));
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(imagenInstance.updateImagen(
                1, 'Imagen Test', 'Punto Exterior Test'
            )).rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización ---\n');
        });
    });

    describe('deleteImagen', () => {
        it('debe eliminar una imagen correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar una imagen correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await imagenInstance.deleteImagen(1);

            expect(result).toBe('delete');
            expect(mockDb.run).toHaveBeenCalledWith(
                'DELETE FROM Imagen WHERE id_imagen = ?;',
                [1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe eliminar una imagen correctamente ---\n');
        });

        it('debe retornar not_found si no existe la imagen', async () => {
            console.log('\n--- Iniciando prueba: debe retornar not_found si no existe la imagen ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 0 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await imagenInstance.deleteImagen(999);

            expect(result).toBe('not_found');
            console.log('--- Finalizando prueba: debe retornar not_found si no existe la imagen ---\n');
        });
    });
});