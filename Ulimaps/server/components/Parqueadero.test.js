/* eslint-disable no-undef */
// Parqueadero.test.js PRUEBAS UNITARIAS
import { Parqueadero } from './Parqueadero.js';
import { connectToDB } from '../Conexion.js';

// Mock de las dependencias
jest.mock('../Conexion.js');

describe('Parqueadero', () => {
    let parqueaderoInstance;

    beforeEach(() => {
        parqueaderoInstance = new Parqueadero();
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('createParqueadero', () => {
        it('debe crear un parqueadero correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear un parqueadero correctamente ---');
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
                        // Mock para verificar si existe id_parqueadero
                        callback(null, { count: 0 });
                    }),
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await parqueaderoInstance.createParqueadero(
                1, 'Punto Test', 'Carro', 'Tipo Test'
            );

            expect(result).toBe('create');
            expect(mockDb.get).toHaveBeenCalledTimes(3);
            expect(mockDb.run).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe crear un parqueadero correctamente ---\n');
        });

        it('debe rechazar la creación si el punto exterior no existe', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar si el punto exterior no existe ---');
            const mockDb = {
                get: jest.fn((query, params, callback) => {
                    callback(null, null);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(parqueaderoInstance.createParqueadero(
                1, 'Punto Inexistente', 'Carro', 'Tipo Test'
            )).rejects.toThrow('El punto exterior \'Punto Inexistente\' no existe.');
            console.log('--- Finalizando prueba: debe rechazar si el punto exterior no existe ---\n');
        });

        it('debe rechazar la creación si el tipo no existe', async () => {
            console.log('\n--- Iniciando prueba: debe rechazar si el tipo no existe ---');
            const mockDb = {
                get: jest.fn()
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, { id_puntoExterior: 1 });
                    })
                    .mockImplementationOnce((query, params, callback) => {
                        callback(null, null);
                    }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            await expect(parqueaderoInstance.createParqueadero(
                1, 'Punto Test', 'Carro', 'Tipo Inexistente'
            )).rejects.toThrow('El tipo \'Tipo Inexistente\' no existe.');
            console.log('--- Finalizando prueba: debe rechazar si el tipo no existe ---\n');
        });
    });

    describe('readParqueaderos', () => {
        it('debe leer todos los parqueaderos correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe leer todos los parqueaderos correctamente ---');
            const mockDb = {
                all: jest.fn((query, params, callback) => {
                    callback(null, [
                        { id: 1, nombre: 'Punto 1', vehiculo: 'Carro', nombreTipo: 'Tipo 1' },
                        { id: 2, nombre: 'Punto 2', vehiculo: 'Moto', nombreTipo: 'Tipo 2' }
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await parqueaderoInstance.readParqueaderos();

            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty('vehiculo', 'Carro');
            expect(mockDb.all).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe leer todos los parqueaderos correctamente ---\n');
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

            await expect(parqueaderoInstance.readParqueaderos())
                .rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la consulta de lectura ---\n');
        });
    });

    describe('updateParqueadero', () => {
        it('debe actualizar un parqueadero correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar un parqueadero correctamente ---');
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

            const result = await parqueaderoInstance.updateParqueadero(
                1, 'Punto Actualizado', 'Moto', 'Tipo Actualizado'
            );

            expect(result).toBe('update');
            expect(mockDb.get).toHaveBeenCalledTimes(2);
            expect(mockDb.run).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe actualizar un parqueadero correctamente ---\n');
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

            await expect(parqueaderoInstance.updateParqueadero(
                1, 'Punto Test', 'Carro', 'Tipo Test'
            )).rejects.toThrow('Error en la BD');
            console.log('--- Finalizando prueba: debe manejar errores en la actualización ---\n');
        });
    });

    describe('deleteParqueadero', () => {
        it('debe eliminar un parqueadero correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar un parqueadero correctamente ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 1 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await parqueaderoInstance.deleteParqueadero(1);

            expect(result).toBe('delete');
            expect(mockDb.run).toHaveBeenCalledWith(
                'DELETE FROM Parqueadero WHERE id_parqueadero = ?;',
                [1],
                expect.any(Function)
            );
            console.log('--- Finalizando prueba: debe eliminar un parqueadero correctamente ---\n');
        });

        it('debe retornar not_found si no existe el parqueadero a eliminar', async () => {
            console.log('\n--- Iniciando prueba: debe retornar not_found si no existe el parqueadero ---');
            const mockDb = {
                run: jest.fn((query, params, callback) => {
                    callback.call({ changes: 0 });
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await parqueaderoInstance.deleteParqueadero(999);

            expect(result).toBe('not_found');
            console.log('--- Finalizando prueba: debe retornar not_found si no existe el parqueadero ---\n');
        });
    });
});