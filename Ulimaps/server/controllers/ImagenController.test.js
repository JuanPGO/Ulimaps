/* eslint-disable no-undef */
// ImagenController.test.js PRUEBAS DE INTEGRACIÓN
import { ImagenController } from './ImagenController.js';
import { Imagen } from '../components/Imagen.js';

// Mock de la clase Imagen
jest.mock('../components/Imagen.js');

describe('ImagenController - Pruebas de Integración', () => {
    let imagenController;
    
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        imagenController = new ImagenController();
    });

    describe('postImagen', () => {
        it('debe crear una imagen correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe crear una imagen correctamente ---');
            
            // Mock del request
            const req = {
                body: {
                    id: 1,
                    nombre: 'Imagen Test',
                    puntoExterior: 'Punto Exterior Test'
                }
            };

            // Mock de la respuesta esperada
            Imagen.prototype.createImagen.mockResolvedValue('create');

            const resultado = await imagenController.postImagen(req);

            expect(resultado).toBe('create');
            expect(Imagen.prototype.createImagen).toHaveBeenCalledWith(
                1,
                'Imagen Test',
                'Punto Exterior Test'
            );
            console.log('--- Finalizando prueba: debe crear una imagen correctamente ---\n');
        });

        it('debe manejar errores al crear una imagen', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores al crear una imagen ---');
            
            const req = {
                body: {
                    id: 1,
                    nombre: 'Imagen Test',
                    puntoExterior: 'Punto Exterior Test'
                }
            };

            const error = new Error('Error al crear imagen');
            Imagen.prototype.createImagen.mockRejectedValue(error);

            await expect(imagenController.postImagen(req)).rejects.toThrow('Error al crear imagen');
            console.log('--- Finalizando prueba: debe manejar errores al crear una imagen ---\n');
        });
    });

    describe('getImagenes', () => {
        it('debe obtener todas las imágenes correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe obtener todas las imágenes correctamente ---');
            
            const imagenesMock = [
                { id: 1, nombre: 'Imagen 1', Punto_Exterior: 'Punto 1' },
                { id: 2, nombre: 'Imagen 2', Punto_Exterior: 'Punto 2' }
            ];

            Imagen.prototype.readImagenes.mockResolvedValue(imagenesMock);

            const resultado = await imagenController.getImagenes();

            expect(resultado).toEqual(imagenesMock);
            expect(Imagen.prototype.readImagenes).toHaveBeenCalled();
            console.log('--- Finalizando prueba: debe obtener todas las imágenes correctamente ---\n');
        });

        it('debe manejar errores al obtener imágenes', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores al obtener imágenes ---');
            
            Imagen.prototype.readImagenes.mockRejectedValue(new Error('Error al obtener imágenes'));

            const resultado = await imagenController.getImagenes();

            expect(resultado).toEqual([]);
            console.log('--- Finalizando prueba: debe manejar errores al obtener imágenes ---\n');
        });
    });

    describe('putImagen', () => {
        it('debe actualizar una imagen correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe actualizar una imagen correctamente ---');
            
            const req = {
                params: { id: 1 },
                body: {
                    nombre: 'Imagen Actualizada',
                    puntoExterior: 'Punto Exterior Actualizado'
                }
            };

            Imagen.prototype.updateImagen.mockResolvedValue('update');

            const resultado = await imagenController.putImagen(req);

            expect(resultado).toBe('update');
            expect(Imagen.prototype.updateImagen).toHaveBeenCalledWith(
                1,
                'Imagen Actualizada',
                'Punto Exterior Actualizado'
            );
            console.log('--- Finalizando prueba: debe actualizar una imagen correctamente ---\n');
        });

        it('debe manejar errores al actualizar una imagen', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores al actualizar una imagen ---');
            
            const req = {
                params: { id: 1 },
                body: {
                    nombre: 'Imagen Actualizada',
                    puntoExterior: 'Punto Exterior Actualizado'
                }
            };

            const error = new Error('Error al actualizar imagen');
            Imagen.prototype.updateImagen.mockRejectedValue(error);

            await expect(imagenController.putImagen(req)).rejects.toThrow('Error al actualizar imagen');
            console.log('--- Finalizando prueba: debe manejar errores al actualizar una imagen ---\n');
        });
    });

    describe('deleteImagen', () => {
        it('debe eliminar una imagen correctamente', async () => {
            console.log('\n--- Iniciando prueba: debe eliminar una imagen correctamente ---');
            
            const req = {
                params: { id: 1 }
            };

            Imagen.prototype.deleteImagen.mockResolvedValue('delete');

            const resultado = await imagenController.deleteImagen(req);

            expect(resultado).toBe('delete');
            expect(Imagen.prototype.deleteImagen).toHaveBeenCalledWith(1);
            console.log('--- Finalizando prueba: debe eliminar una imagen correctamente ---\n');
        });

        it('debe manejar errores al eliminar una imagen', async () => {
            console.log('\n--- Iniciando prueba: debe manejar errores al eliminar una imagen ---');
            
            const req = {
                params: { id: 1 }
            };

            const error = new Error('Error al eliminar imagen');
            Imagen.prototype.deleteImagen.mockRejectedValue(error);

            await expect(imagenController.deleteImagen(req)).rejects.toThrow('Error al eliminar imagen');
            console.log('--- Finalizando prueba: debe manejar errores al eliminar una imagen ---\n');
        });
    });
});