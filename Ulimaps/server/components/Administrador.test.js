/* eslint-disable no-undef */
// Administrador.test.js PRUEBAS UNITARIAS
import { Administrador } from './Administrador.js';
import { connectToDB } from '../Conexion.js';
import bcrypt from 'bcrypt';

// Mock de las dependencias
jest.mock('../Conexion.js');
jest.mock('bcrypt');
jest.mock('./PuntoExterior.js');

describe('Administrador', () => {
    let adminInstance;

    beforeEach(() => {
    adminInstance = new Administrador('testUser', 'testPassword');
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
    });

    describe('readUsuario', () => {
    it('debe devolver los datos del usuario correctamente', async () => {
        console.log('\n--- Iniciando prueba: debe devolver los datos del usuario correctamente ---');
        const mockDb = {
        get: jest.fn((query, params, callback) => {
            callback(null, { usuario: 'testUser', contrasena: 'hashedPassword' });
        }),
        close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        const result = await adminInstance.readUsuario();

        expect(result).toEqual({ usuario: 'testUser', contrasena: 'hashedPassword' });
        expect(mockDb.get).toHaveBeenCalledWith(
        'SELECT * FROM Administrador WHERE usuario = ?',
        ['testUser'],
        expect.any(Function)
        );
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe devolver los datos del usuario correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
        console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
        const mockDb = {
        get: jest.fn((query, params, callback) => {
            callback(new Error('DB Error'), null);
        }),
        close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        await expect(adminInstance.readUsuario()).rejects.toThrow('DB Error');
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
    });

    describe('updateContrasena', () => {
    it('debe actualizar la contraseña correctamente', async () => {
        console.log('\n--- Iniciando prueba: debe actualizar la contraseña correctamente ---');
        const mockDb = {
        get: jest.fn((query, params, callback) => {
            callback(null, { usuario: 'testUser', contrasena: 'oldHashedPassword' });
        }),
        run: jest.fn((query, params, callback) => {
            callback.call({ changes: 1 });
        }),
        close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);
        bcrypt.compare.mockResolvedValue(true);
        bcrypt.hash.mockResolvedValue('newHashedPassword');

        const result = await adminInstance.updateContrasena('oldPassword', 'newPassword');

        expect(result).toBe('update');
        expect(bcrypt.compare).toHaveBeenCalledWith('oldPassword', 'oldHashedPassword');
        expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
        expect(mockDb.run).toHaveBeenCalledWith(
        'UPDATE Administrador SET contrasena = ? WHERE usuario = ?',
        ['newHashedPassword', 'testUser'],
        expect.any(Function)
        );
        console.log('--- Finalizando prueba: debe actualizar la contraseña correctamente ---\n');
    });

    it('debe lanzar un error si la contraseña anterior es incorrecta', async () => {
        console.log('\n--- Iniciando prueba: debe lanzar un error si la contraseña anterior es incorrecta ---');
        const mockDb = {
        get: jest.fn((query, params, callback) => {
            callback(null, { usuario: 'testUser', contrasena: 'oldHashedPassword' });
        }),
        close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);
        bcrypt.compare.mockResolvedValue(false);

        await expect(adminInstance.updateContrasena('wrongPassword', 'newPassword'))
        .rejects.toThrow('La contraseña anterior es incorrecta');
        console.log('--- Finalizando prueba: debe lanzar un error si la contraseña anterior es incorrecta ---\n');
    });
    });

    describe('loadTipos', () => {
    it('debe cargar los tipos correctamente', async () => {
        console.log('\n--- Iniciando prueba: debe cargar los tipos correctamente ---');
        const mockDb = {
        all: jest.fn((query, params, callback) => {
            callback(null, [
            { nombreTipo: 'Tipo1' },
            { nombreTipo: 'Tipo2' },
            { nombreTipo: 'Tipo3' }
            ]);
        }),
        close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        const result = await adminInstance.loadTipos();
        expect(result).toEqual([
        { nombreTipo: 'Tipo1' },
        { nombreTipo: 'Tipo2' },
        { nombreTipo: 'Tipo3' }
        ]);
        expect(mockDb.all).toHaveBeenCalledWith(
        'SELECT nombreTipo From Tipo',
        [],
        expect.any(Function)
        );
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe cargar los tipos correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
        console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
        const mockDb = {
        all: jest.fn((query, params, callback) => {
            callback(new Error('Error en la BD'), null);
        }),
        close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        await expect(adminInstance.loadTipos()).rejects.toThrow('Error en la BD');
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });

    it('debe devolver un array vacío si no hay tipos', async () => {
        console.log('\n--- Iniciando prueba: debe devolver un array vacío si no hay tipos ---');
        const mockDb = {
        all: jest.fn((query, params, callback) => {
            callback(null, []);
        }),
        close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        const result = await adminInstance.loadTipos();

        expect(result).toEqual([]);
        expect(mockDb.all).toHaveBeenCalled();
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe devolver un array vacío si no hay tipos ---\n');
    });
    });

    describe('loadVehiculos', () => {
    it('debe cargar los vehiculos correctamente', async () => {
        console.log('--- Iniciando Prueba: debe cargar los vehiculos correctamente ---');
        const mockDb = {
            all: jest.fn((query,params,callback) => {
                callback(null, [
                    {vehiculo: 'Carros'},
                    {vehiculo: 'Motos'},
                    {vehiculo: 'Aviones'},
                    {vehiculo: 'Barcos'}
                ]);
            }),
            close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        const result = await adminInstance.loadVehiculo();
        expect(result).toEqual([
            {vehiculo: 'Carros'},
            {vehiculo: 'Motos'},
            {vehiculo: 'Aviones'},
            {vehiculo: 'Barcos'}
        ]);
        expect(mockDb.all).toHaveBeenCalledWith(
            'SELECT DISTINCT vehiculo From Parqueadero',
            [],
            expect.any(Function)
        );
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizado prueba: debe cargar los vehiculos correctamente ---');
    });

    it('debe manejar errores en la consulta', async () => {
        console.log('\n --- Iniciando Prueba: debe manejar errores en la consulta ---');
        const mockDb = {
            all: jest.fn((query,params, callback) => {
                callback(new Error('Error en la BD'), null);
            }),
            close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        await expect(adminInstance.loadVehiculo()).rejects.toThrow('Error en la BD');
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });

    it('debe devolver un array vacio si no hay vehiculos', async () => {
        console.log('--- Inicio Prueba: debe devolver un array vacio si no hay vehiculos ---');
        const mockDb = {
            all: jest.fn((query, params, callback) => {
                callback(null, []);
            }),
            close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        const result = await adminInstance.loadVehiculo();

        expect(result).toEqual([]);
        expect(mockDb.all).toHaveBeenCalled();
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe devolver un array vacio si no hay vehiculos')
    });
    });

    describe('loadPuntoExterior', () => {
    it('debe cargar los puntos exteriores correctamente', async () => {
        console.log('---Iniciando Prueba: debe cargar los puntos Exteriores correctamente ---');
        const mockDb = {
            all: jest.fn((query,params,callback) => {
                callback(null, [
                    {nombre: 'Punto Exterior 1'},
                    {nombre: 'Punto Exterior 2'},
                    {nombre: 'Punto Exterior 3'}
                ]);
            }),
            close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        const result = await adminInstance.loadPuntoExterior();
        expect(result).toEqual([
            {nombre: 'Punto Exterior 1'},
            {nombre: 'Punto Exterior 2'},
            {nombre: 'Punto Exterior 3'}
        ]);
        expect(mockDb.all).toHaveBeenCalledWith(
            'SELECT DISTINCT nombre From PuntoInteresExterior',
            [],
            expect.any(Function)
        );
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizado prueba: debe cargar los vehiculos correctamente ---');
    });

    it('debe manejar errores en la consulta', async () => {
        console.log('--- Iniciando Prueba: debe manejar errores en la consulta ---');
        const mockDb = {
            all: jest.fn((query,params,callback) => {
                callback(new Error('Error en la BD'), null);
            }),
            close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        await expect(adminInstance.loadPuntoExterior()).rejects.toThrow('Error en la BD');
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando prueba: debe manejar errores en la consulta ---');
    });

    it('debe devolver un array vacio si no hay Puntos Exteriores', async () => {
        console.log('--- Inicio Prueba: debe devolver un array vacio si no hay vehiculos ---');
        const mockDb = {
            all: jest.fn((query,params,callback) => {
                callback(null, []);
            }),
            close: jest.fn(),
        };
        connectToDB.mockResolvedValue(mockDb);

        const result = await adminInstance.loadPuntoExterior();

        expect(result).toEqual([]);
        expect(mockDb.all).toHaveBeenCalled();
        expect(mockDb.close).toHaveBeenCalled();
        console.log('--- Finalizando Prueba: debe devolver un array vacio si no hay vehiculos');
    }); 
    });

    describe('loadBloque', () => {
        it('debe cargar los bloques/estructuras correctamente', async () => {
            console.log('--- Iniciando Prueba: debe cargar los bloques ---');
            const mockDb = {
                all: jest.fn((query,params,callback) => {
                    callback(null, [
                        {bloque: 'bloque 1'},
                        {bloque: 'bloque 2'},
                        {bloque: 'bloque 3'}
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await adminInstance.loadBloque();
            expect(result).toEqual([
                {bloque: 'bloque 1'},
                {bloque: 'bloque 2'},
                {bloque: 'bloque 3'}
            ]);
            expect(mockDb.all).toHaveBeenCalledWith(
                'SELECT DISTINCT bloque From Estructura',
                [],
                expect.any(Function)
            );
            expect(mockDb.close).toHaveBeenCalled();
            console.log('--- Finalizado prueba: debe cargar los vehiculos correctamente ---');
        });

        it('debe manejar errores en la consulta', async () => {
            console.log('--- Iniciando Prueba: debe manejar errores en la consulta ---');
            const mockDb = {
                all: jest.fn((query,params,callback) => {
                    callback(new Error('Error en la BD'), null);
                }),
                close: jest.fn(),
            };

            connectToDB.mockResolvedValue(mockDb);

            await expect(adminInstance.loadBloque()).rejects.toThrow('Error en la BD');
            expect(mockDb.close).toHaveBeenCalled();
            console.log('--- Finalizando Prueba: debe manejar errores en la consulta ---');
        });

        it('debe devolver un array vacio si no hay bloques', async () => {
            console.log('--- Inicio Prueba: debe devolver un array vacio si no hay bloques ---');
            const mockDb = {
                all: jest.fn((query,params,callback) => {
                    callback(null, []);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);
            
            const result = await adminInstance.loadBloque();

            expect(result).toEqual([]);
            expect(mockDb.all).toHaveBeenCalled();
            expect(mockDb.close).toHaveBeenCalled();
            console.log('--- Finanlizando Prueba: debe devolver un array vacio si no hay bloques');
        })
    });

    describe('loadPiso', () => {
        it('debe cargar los Pisos/planos correctamente', async () => {
            console.log('--- Iniciando Prueba: debe cargar los Pisos ---');
            const mockDb = {
                all: jest.fn((query,params,callback) => {
                    callback(null, [
                        {plano: 'piso 1'},
                        {plano: 'piso 2'},
                        {plano: 'piso 3'}
                    ]);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);

            const result = await adminInstance.loadPiso();
            expect(result).toEqual([
                {plano: 'piso 1'},
                {plano: 'piso 2'},
                {plano: 'piso 3'}
            ]);
            expect(mockDb.all).toHaveBeenCalledWith(
                'SELECT plano From Piso',
                [],
                expect.any(Function)
            );
            expect(mockDb.close).toHaveBeenCalled();
            console.log('--- Finalizado prueba: debe cargar los Pisos correctamente ---');
        });

        it('debe manejar errores en la consulta', async () => {
            console.log('--- Iniciando Prueba: debe manejar errores en la consulta ---');
            const mockDb = {
                all: jest.fn((query,params,callback) => {
                    callback(new Error('Error en la BD'), null);
                }),
                close: jest.fn(),
            };

            connectToDB.mockResolvedValue(mockDb);

            await expect(adminInstance.loadPiso()).rejects.toThrow('Error en la BD');
            expect(mockDb.close).toHaveBeenCalled();
            console.log('--- Finalizando Prueba: debe manejar errores en la consulta ---');
        });

        it('debe devolver un array vacio si no hay Pisos', async () => {
            console.log('--- Inicio Prueba: debe devolver un array vacio si no hay Pisos ---');
            const mockDb = {
                all: jest.fn((query,params,callback) => {
                    callback(null, []);
                }),
                close: jest.fn(),
            };
            connectToDB.mockResolvedValue(mockDb);
            
            const result = await adminInstance.loadPiso();

            expect(result).toEqual([]);
            expect(mockDb.all).toHaveBeenCalled();
            expect(mockDb.close).toHaveBeenCalled();
            console.log('--- Finanlizando Prueba: debe devolver un array vacio si no hay Pisos');
        })
    });


});