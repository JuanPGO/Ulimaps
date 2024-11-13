/* eslint-disable no-undef */
// EstructuraController.test.js - Pruebas de integración
import { EstructuraController } from './EstructuraController.js';
import { Estructura } from '../components/Estructura.js';

// Mock de la clase Estructura
jest.mock('../components/Estructura.js');

describe('EstructuraController - Pruebas de Integración', () => {
    let estructuraController;
    
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        estructuraController = new EstructuraController();
    });

    describe('postEstructura', () => {
        it('debe crear una estructura exitosamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear una estructura exitosamente ---');
            
            // Mock de la solicitud
            const req = {
                body: {
                    id: 1,
                    bloque: 'A',
                    nombre: 'Punto Test',
                    nombreTipo: 'Tipo Test'
                }
            };

            // Configurar el mock de Estructura
            Estructura.prototype.createEstructura = jest.fn().mockResolvedValue('create');

            const resultado = await estructuraController.postEstructura(req);

            expect(resultado).toBe('create');
            expect(Estructura.prototype.createEstructura).toHaveBeenCalledWith(
                1, 'A', 'Punto Test', 'Tipo Test'
            );
            
            console.log('--- Finalizando prueba: debe crear una estructura exitosamente ---\n');
        });

        it('debe manejar errores al crear una estructura', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores al crear una estructura ---');
            
            const req = {
                body: {
                    id: 1,
                    bloque: 'A',
                    nombre: 'Punto Test',
                    nombreTipo: 'Tipo Test'
                }
            };

            const error = new Error('Error al crear estructura');
            Estructura.prototype.createEstructura = jest.fn().mockRejectedValue(error);

            await expect(estructuraController.postEstructura(req)).rejects.toThrow('Error al crear estructura');
            
            console.log('--- Finalizando prueba: debe manejar errores al crear una estructura ---\n');
        });
    });

    describe('getEstructuras', () => {
        it('debe obtener todas las estructuras correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe obtener todas las estructuras correctamente ---');
            
            const estructurasMock = [
                { id: 1, bloque: 'A', nombre: 'Punto 1', nombreTipo: 'Tipo 1' },
                { id: 2, bloque: 'B', nombre: 'Punto 2', nombreTipo: 'Tipo 2' }
            ];

            Estructura.prototype.readEstructuras = jest.fn().mockResolvedValue(estructurasMock);

            const resultado = await estructuraController.getEstructuras();

            expect(resultado).toEqual(estructurasMock);
            expect(resultado).toHaveLength(2);
            expect(Estructura.prototype.readEstructuras).toHaveBeenCalled();
            
            console.log('--- Finalizando prueba: debe obtener todas las estructuras correctamente ---\n');
        });

        it('debe retornar un array vacío en caso de error', async () => {
            console.log('\n--- Iniciando prueba: debe retornar un array vacío en caso de error ---');
            
            Estructura.prototype.readEstructuras = jest.fn().mockRejectedValue(new Error('Error en la BD'));

            const resultado = await estructuraController.getEstructuras();

            expect(resultado).toEqual([]);
            expect(Estructura.prototype.readEstructuras).toHaveBeenCalled();
            
            console.log('--- Finalizando prueba: debe retornar un array vacío en caso de error ---\n');
        });
    });

    describe('putEstructuras', () => {
        it('debe actualizar una estructura correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar una estructura correctamente ---');
            
            const req = {
                params: { id: '1' },
                body: {
                    bloque: 'B',
                    nombre: 'Punto Actualizado',
                    nombreTipo: 'Tipo Actualizado'
                }
            };

            Estructura.prototype.updateEstructura = jest.fn().mockResolvedValue('update');

            const resultado = await estructuraController.putEstructuras(req);

            expect(resultado).toBe('update');
            expect(Estructura.prototype.updateEstructura).toHaveBeenCalledWith(
                '1', 'B', 'Punto Actualizado', 'Tipo Actualizado'
            );
            
            console.log('--- Finalizando prueba: debe actualizar una estructura correctamente ---\n');
        });

        it('debe manejar errores al actualizar una estructura', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores al actualizar una estructura ---');
            
            const req = {
                params: { id: '1' },
                body: {
                    bloque: 'B',
                    nombre: 'Punto Actualizado',
                    nombreTipo: 'Tipo Actualizado'
                }
            };

            const error = new Error('Error al actualizar estructura');
            Estructura.prototype.updateEstructura = jest.fn().mockRejectedValue(error);

            await expect(estructuraController.putEstructuras(req)).rejects.toThrow('Error al actualizar estructura');
            
            console.log('--- Finalizando prueba: debe manejar errores al actualizar una estructura ---\n');
        });
    });

    describe('deleteEstructura', () => {
        it('debe eliminar una estructura correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar una estructura correctamente ---');
            
            const req = {
                params: { id: '1' }
            };

            Estructura.prototype.deleteEstructura = jest.fn().mockResolvedValue('delete');

            const resultado = await estructuraController.deleteEstructura(req);

            expect(resultado).toBe('delete');
            expect(Estructura.prototype.deleteEstructura).toHaveBeenCalledWith('1');
            
            console.log('--- Finalizando prueba: debe eliminar una estructura correctamente ---\n');
        });

        it('debe manejar el caso de estructura no encontrada', async () => {
            console.log('\n--- Iniciando prueba: debe manejar el caso de estructura no encontrada ---');
            
            const req = {
                params: { id: '999' }
            };

            Estructura.prototype.deleteEstructura = jest.fn().mockResolvedValue('not_found');

            const resultado = await estructuraController.deleteEstructura(req);

            expect(resultado).toBe('not_found');
            expect(Estructura.prototype.deleteEstructura).toHaveBeenCalledWith('999');
            
            console.log('--- Finalizando prueba: debe manejar el caso de estructura no encontrada ---\n');
        });

        it('debe manejar errores al eliminar una estructura', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores al eliminar una estructura ---');
            
            const req = {
                params: { id: '1' }
            };

            const error = new Error('Error al eliminar estructura');
            Estructura.prototype.deleteEstructura = jest.fn().mockRejectedValue(error);

            await expect(estructuraController.deleteEstructura(req)).rejects.toThrow('Error al eliminar estructura');
            
            console.log('--- Finalizando prueba: debe manejar errores al eliminar una estructura ---\n');
        });
    });
});