/* eslint-disable no-undef */
// PisoController.test.js PRUEBAS DE INTEGRACIÓN
import { PisoController } from './PisoController.js';
import { Piso } from '../components/Piso.js';

// Mock del módulo Piso
jest.mock('../components/Piso.js');

describe('PisoController - Pruebas de Integración', () => {
    let pisoController;
    
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        pisoController = new PisoController();
    });

    describe('postPiso', () => {
        it('debe crear un piso correctamente', async () => {
            console.log('\n--- Iniciando prueba: crear piso correctamente ---');
            
            // Configurar el mock de createPiso
            const mockCreatePiso = jest.fn().mockResolvedValue('create');
            Piso.prototype.createPiso = mockCreatePiso;

            const req = {
                body: {
                    id: 1,
                    nivel: 'Nivel 1',
                    bloque: 'Bloque A',
                    plano: 'plano1.jpg'
                }
            };

            const resultado = await pisoController.postPiso(req);

            expect(resultado).toBe('create');
            expect(mockCreatePiso).toHaveBeenCalledWith(
                1,
                'Nivel 1',
                'Bloque A',
                'plano1.jpg'
            );
            console.log('--- Finalizando prueba: crear piso correctamente ---\n');
        });

        it('debe manejar errores en la creación del piso', async () => {
            console.log('\n--- Iniciando prueba: manejar errores en la creación ---');
            
            const errorEsperado = new Error('Error al crear piso');
            const mockCreatePiso = jest.fn().mockRejectedValue(errorEsperado);
            Piso.prototype.createPiso = mockCreatePiso;

            const req = {
                body: {
                    id: 1,
                    nivel: 'Nivel 1',
                    bloque: 'Bloque A',
                    plano: 'plano1.jpg'
                }
            };

            await expect(pisoController.postPiso(req)).rejects.toThrow('Error al crear piso');
            console.log('--- Finalizando prueba: manejar errores en la creación ---\n');
        });
    });

    describe('getPisos', () => {
        it('debe obtener todos los pisos correctamente', async () => {
            console.log('\n--- Iniciando prueba: obtener pisos correctamente ---');
            
            const pisosMock = [
                { id: 1, nivel: 'Nivel 1', bloque: 'A', nombre: 'Edificio 1', plano: 'plano1.jpg' },
                { id: 2, nivel: 'Nivel 2', bloque: 'B', nombre: 'Edificio 2', plano: 'plano2.jpg' }
            ];
            
            const mockReadPisos = jest.fn().mockResolvedValue(pisosMock);
            Piso.prototype.readPisos = mockReadPisos;

            const resultado = await pisoController.getPisos();

            expect(resultado).toEqual(pisosMock);
            expect(mockReadPisos).toHaveBeenCalled();
            console.log('--- Finalizando prueba: obtener pisos correctamente ---\n');
        });

        it('debe manejar errores al obtener pisos', async () => {
            console.log('\n--- Iniciando prueba: manejar errores al obtener pisos ---');
            
            const mockReadPisos = jest.fn().mockRejectedValue(new Error('Error en la BD'));
            Piso.prototype.readPisos = mockReadPisos;

            const resultado = await pisoController.getPisos();

            expect(resultado).toEqual([]);
            expect(mockReadPisos).toHaveBeenCalled();
            console.log('--- Finalizando prueba: manejar errores al obtener pisos ---\n');
        });
    });

    describe('putPiso', () => {
        it('debe actualizar un piso correctamente', async () => {
            console.log('\n--- Iniciando prueba: actualizar piso correctamente ---');
            
            const mockUpdatePiso = jest.fn().mockResolvedValue('update');
            Piso.prototype.updatePiso = mockUpdatePiso;

            const req = {
                params: { id: 1 },
                body: {
                    nivel: 'Nivel Actualizado',
                    bloque: 'Bloque B',
                    plano: 'plano_nuevo.jpg'
                }
            };

            const resultado = await pisoController.putPiso(req);

            expect(resultado).toBe('update');
            expect(mockUpdatePiso).toHaveBeenCalledWith(
                1,
                'Nivel Actualizado',
                'Bloque B',
                'plano_nuevo.jpg'
            );
            console.log('--- Finalizando prueba: actualizar piso correctamente ---\n');
        });

        it('debe manejar errores en la actualización', async () => {
            console.log('\n--- Iniciando prueba: manejar errores en la actualización ---');
            
            const errorEsperado = new Error('Error al actualizar');
            const mockUpdatePiso = jest.fn().mockRejectedValue(errorEsperado);
            Piso.prototype.updatePiso = mockUpdatePiso;

            const req = {
                params: { id: 1 },
                body: {
                    nivel: 'Nivel Test',
                    bloque: 'Bloque A',
                    plano: 'plano.jpg'
                }
            };

            await expect(pisoController.putPiso(req)).rejects.toThrow('Error al actualizar');
            console.log('--- Finalizando prueba: manejar errores en la actualización ---\n');
        });
    });

    describe('deletePiso', () => {
        it('debe eliminar un piso correctamente', async () => {
            console.log('\n--- Iniciando prueba: eliminar piso correctamente ---');
            
            const mockDeletePiso = jest.fn().mockResolvedValue('delete');
            Piso.prototype.deletePiso = mockDeletePiso;

            const req = {
                params: { id: 1 }
            };

            const resultado = await pisoController.deletePiso(req);

            expect(resultado).toBe('delete');
            expect(mockDeletePiso).toHaveBeenCalledWith(1);
            console.log('--- Finalizando prueba: eliminar piso correctamente ---\n');
        });

        it('debe manejar el caso cuando el piso no existe', async () => {
            console.log('\n--- Iniciando prueba: manejar piso no existente ---');
            
            const mockDeletePiso = jest.fn().mockResolvedValue('not_found');
            Piso.prototype.deletePiso = mockDeletePiso;

            const req = {
                params: { id: 999 }
            };

            const resultado = await pisoController.deletePiso(req);

            expect(resultado).toBe('not_found');
            expect(mockDeletePiso).toHaveBeenCalledWith(999);
            console.log('--- Finalizando prueba: manejar piso no existente ---\n');
        });

        it('debe manejar errores en la eliminación', async () => {
            console.log('\n--- Iniciando prueba: manejar errores en la eliminación ---');
            
            const errorEsperado = new Error('Error al eliminar');
            const mockDeletePiso = jest.fn().mockRejectedValue(errorEsperado);
            Piso.prototype.deletePiso = mockDeletePiso;

            const req = {
                params: { id: 1 }
            };

            await expect(pisoController.deletePiso(req)).rejects.toThrow('Error al eliminar');
            console.log('--- Finalizando prueba: manejar errores en la eliminación ---\n');
        });
    });
});