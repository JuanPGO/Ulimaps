/* eslint-disable no-undef */
import { Mapa } from './Mapa.js';
import { connectToDB } from '../Conexion.js';

// Simulamos las dependencias
jest.mock('../Conexion.js');

describe('Mapa', () => {
  let instanciaMapa;

  beforeEach(() => {
    instanciaMapa = new Mapa();
    jest.clearAllMocks();
  });

  describe('getPuntosExteriores', () => {
    it('debe devolver los puntos exteriores correctamente', async () => {
      console.log('\n--- Iniciando prueba: debe devolver los puntos exteriores correctamente ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(null, [
            { id: 1, nombre: 'Punto Exterior 1', latitud: 40.730610, longitud: -73.935242, activo: true },
            { id: 2, nombre: 'Punto Exterior 2', latitud: 40.728155, longitud: -73.952293, activo: true },
          ]);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      const resultado = await instanciaMapa.getPuntosExteriores();

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toHaveProperty('nombre', 'Punto Exterior 1');
      expect(mockDb.all).toHaveBeenCalled();
      console.log('--- Finalizando prueba: debe devolver los puntos exteriores correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
      console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(new Error('Error en la base de datos'), null);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      await expect(instanciaMapa.getPuntosExteriores()).rejects.toThrow('Error en la base de datos');
      console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
  });

  describe('getPuntoExterior', () => {
    it('debe devolver un punto exterior correctamente', async () => {
      console.log('\n--- Iniciando prueba: debe devolver un punto exterior correctamente ---');
      const mockDb = {
        get: jest.fn((query, params, callback) => {
          callback(null, {
            id: 1, nombre: 'Punto Exterior 1', latitud: 40.730610, longitud: -73.935242, activo: true
          });
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      const resultado = await instanciaMapa.getPuntoExterior(1);

      expect(resultado).toHaveProperty('nombre', 'Punto Exterior 1');
      expect(mockDb.get).toHaveBeenCalledWith(
        `SELECT 
                        id_puntoExterior AS id,
                        nombre,
                        latitud,
                        longitud,
                        activo
                    FROM PuntoInteresExterior
                    WHERE id_puntoExterior = ?`,
        [1],
        expect.any(Function)
      );
      console.log('--- Finalizando prueba: debe devolver un punto exterior correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
      console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
      const mockDb = {
        get: jest.fn((query, params, callback) => {
          callback(new Error('Error en la base de datos'), null);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      await expect(instanciaMapa.getPuntoExterior(1)).rejects.toThrow('Error en la base de datos');
      console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
  });

  describe('getEstructuras', () => {
    it('debe devolver las estructuras correctamente', async () => {
      console.log('\n--- Iniciando prueba: debe devolver las estructuras correctamente ---');
      const mockDb = {
        get: jest.fn((query, params, callback) => {
          callback(null, { id: 1, bloque: 'Bloque A', id_puntoExterior: 1 });
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      const resultado = await instanciaMapa.getEstructuras(1);

      expect(resultado).toHaveProperty('id', 1);
      expect(resultado).toHaveProperty('bloque', 'Bloque A');
      expect(resultado).toHaveProperty('id_puntoExterior', 1);
      expect(mockDb.get).toHaveBeenCalledWith(
        `SELECT 
                        e.id_estructura AS id,
                        e.bloque,
                        e.id_puntoExterior
                    FROM Estructura e
                    WHERE e.id_puntoExterior = ?`,
        [1],
        expect.any(Function)
      );
      console.log('--- Finalizando prueba: debe devolver las estructuras correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
      console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
      const mockDb = {
        get: jest.fn((query, params, callback) => {
          callback(new Error('Error en la base de datos'), null);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      await expect(instanciaMapa.getEstructuras(1)).rejects.toThrow('Error en la base de datos');
      console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
  });

  describe('getImagenes', () => {
    it('debe devolver las imágenes correctamente', async () => {
      console.log('\n--- Iniciando prueba: debe devolver las imágenes correctamente ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(null, [
            { id: 1, nombre: 'Imagen 1', id_puntoExterior: 1 },
            { id: 2, nombre: 'Imagen 2', id_puntoExterior: 1 },
          ]);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      const resultado = await instanciaMapa.getImagenes(1);

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toHaveProperty('nombre', 'Imagen 1');
      expect(resultado[1]).toHaveProperty('nombre', 'Imagen 2');
      expect(mockDb.all).toHaveBeenCalledWith(
        `SELECT 
                        MIN(i.id_imagen) AS id,
                        MIN(i.nombre) AS nombre,
                        i.id_puntoExterior
                    FROM Imagen i
                    WHERE i.id_puntoExterior = ?
                    GROUP BY i.id_puntoExterior;`,
        [1],
        expect.any(Function)
      );
      console.log('--- Finalizando prueba: debe devolver las imágenes correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
      console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(new Error('Error en la base de datos'), null);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      await expect(instanciaMapa.getImagenes(1)).rejects.toThrow('Error en la base de datos');
      console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
  });

  describe('getAllImagenes', () => {
    it('debe devolver todas las imágenes correctamente', async () => {
      console.log('\n--- Iniciando prueba: debe devolver todas las imágenes correctamente ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(null, [
            { id: 1, nombre: 'Imagen 1', id_puntoExterior: 1 },
            { id: 2, nombre: 'Imagen 2', id_puntoExterior: 1 },
          ]);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      const resultado = await instanciaMapa.getAllImagenes(1);

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toHaveProperty('nombre', 'Imagen 1');
      expect(resultado[1]).toHaveProperty('nombre', 'Imagen 2');
      expect(mockDb.all).toHaveBeenCalledWith(
        `SELECT 
                        i.id_imagen AS id,
                        i.nombre AS nombre,
                        i.id_puntoExterior
                    FROM Imagen i 
                    WHERE i.id_puntoExterior = ?`,
        [1],
        expect.any(Function)
      );
      console.log('--- Finalizando prueba: debe devolver todas las imágenes correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
      console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(new Error('Error en la base de datos'), null);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      await expect(instanciaMapa.getAllImagenes(1)).rejects.toThrow('Error en la base de datos');
      console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
  });

  describe('getPisos', () => {
    it('debe devolver los pisos correctamente', async () => {
      console.log('\n--- Iniciando prueba: debe devolver los pisos correctamente ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(null, [
            { id_piso: 1, id_estructura: 1, id_puntoExterior: 1, plano: 'plano1.png' },
            { id_piso: 2, id_estructura: 1, id_puntoExterior: 1, plano: 'plano2.png' },
          ]);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      const resultado = await instanciaMapa.getPisos(1);

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toHaveProperty('id_piso', 1);
      expect(resultado[0]).toHaveProperty('id_estructura', 1);
      expect(resultado[0]).toHaveProperty('id_puntoExterior', 1);
      expect(resultado[0]).toHaveProperty('plano', 'plano1.png');
      expect(mockDb.all).toHaveBeenCalledWith(
        `SELECT 
                        p.id_piso,
                        p.id_estructura,
                        e.id_puntoExterior,
                        p.plano
                    FROM Piso p 
                    INNER JOIN Estructura e ON e.id_estructura  =  p.id_estructura 
                    WHERE e.id_puntoExterior = ?;`,
        [1],
        expect.any(Function)
      );
      console.log('--- Finalizando prueba: debe devolver los pisos correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
      console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(new Error('Error en la base de datos'), null);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      await expect(instanciaMapa.getPisos(1)).rejects.toThrow('Error en la base de datos');
      console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
  });

  describe('getPuntosInteriores', () => {
    it('debe devolver los puntos interiores correctamente', async () => {
      console.log('\n--- Iniciando prueba: debe devolver los puntos interiores correctamente ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(null, [
            { nombre: 'Punto Interior 1', nombreTipo: 'Tipo A', nivel: 1, activo: true, id_estructura: 1, id_puntoExterior: 1 },
            { nombre: 'Punto Interior 2', nombreTipo: 'Tipo B', nivel: 2, activo: true, id_estructura: 1, id_puntoExterior: 1 },
          ]);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      const resultado = await instanciaMapa.getPuntosInteriores(1);

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toHaveProperty('nombre', 'Punto Interior 1');
      expect(resultado[0]).toHaveProperty('nombreTipo', 'Tipo A');
      expect(resultado[0]).toHaveProperty('nivel', 1);
      expect(resultado[0]).toHaveProperty('activo', true);
      expect(resultado[0]).toHaveProperty('id_estructura', 1);
      expect(resultado[0]).toHaveProperty('id_puntoExterior', 1);
      expect(mockDb.all).toHaveBeenCalledWith(
        `SELECT 
                        pii.nombre,
                        t.nombreTipo,
                        p.nivel,
                        pii.activo,
                        p.id_estructura,
                        e.id_puntoExterior
                    FROM PuntoInteresInterior pii
                    INNER JOIN Piso p ON pii.id_piso = p.id_piso
                    INNER JOIN Tipo t ON pii.id_tipo = t.id_tipo
                    INNER JOIN Estructura e ON p.id_estructura = e.id_estructura 
                    WHERE e.id_puntoExterior = ?`,
        [1],
        expect.any(Function)
      );
      console.log('--- Finalizando prueba: debe devolver los puntos interiores correctamente ---\n');
    });

    it('debe manejar errores en la consulta', async () => {
      console.log('\n--- Iniciando prueba: debe manejar errores en la consulta ---');
      const mockDb = {
        all: jest.fn((query, params, callback) => {
          callback(new Error('Error en la base de datos'), null);
        }),
        close: jest.fn(),
      };
      connectToDB.mockResolvedValue(mockDb);

      await expect(instanciaMapa.getPuntosInteriores(1)).rejects.toThrow('Error en la base de datos');
      console.log('--- Finalizando prueba: debe manejar errores en la consulta ---\n');
    });
  });
});