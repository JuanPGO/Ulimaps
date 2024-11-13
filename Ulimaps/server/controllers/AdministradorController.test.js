/* eslint-disable no-undef */
// AdministradorController.test.js PRUEBAS DE INTEGRACIÓN
import { AdministradorController } from './AdministradorController.js';
import { Administrador } from '../components/Administrador.js';
import bcrypt from 'bcrypt';

// Mock de las dependencias
jest.mock('../components/Administrador.js');
jest.mock('bcrypt');

describe('AdministradorController - Pruebas de Integración', () => {
    let controller;
    let mockAdministrador;

    beforeEach(() => {
        controller = new AdministradorController();
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        
        // Configurar el mock de Administrador
        mockAdministrador = {
            readUsuario: jest.fn(),
            updateContrasena: jest.fn(),
            loadTipos: jest.fn(),
            loadVehiculo: jest.fn(),
            loadPuntoExterior: jest.fn(),
            loadBloque: jest.fn(),
            loadPiso: jest.fn()
        };
        
        // Mock del constructor de Administrador
        Administrador.mockImplementation(() => mockAdministrador);
    });

    describe('postLogin', () => {
        it('debe realizar login exitoso cuando las credenciales son correctas', async () => {
            console.log('\n--- Iniciando prueba: login exitoso ---');
            const mockUser = { 
                usuario: 'testUser', 
                contrasena: 'hashedPassword' 
            };
            
            mockAdministrador.readUsuario.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);

            const result = await controller.postLogin('testUser', 'correctPassword');

            expect(result).toEqual(mockUser);
            expect(mockAdministrador.readUsuario).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalledWith('correctPassword', 'hashedPassword');
            console.log('--- Finalizando prueba: login exitoso ---\n');
        });

        it('debe fallar el login cuando la contraseña es incorrecta', async () => {
            console.log('\n--- Iniciando prueba: login fallido por contraseña incorrecta ---');
            mockAdministrador.readUsuario.mockResolvedValue({ 
                usuario: 'testUser', 
                contrasena: 'hashedPassword' 
            });
            bcrypt.compare.mockResolvedValue(false);

            const result = await controller.postLogin('testUser', 'wrongPassword');

            expect(result).toBeNull();
            expect(mockAdministrador.readUsuario).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
            console.log('--- Finalizando prueba: login fallido por contraseña incorrecta ---\n');
        });
    });

    describe('putCambio', () => {
        it('debe actualizar la contraseña exitosamente', async () => {
            console.log('\n--- Iniciando prueba: actualización exitosa de contraseña ---');
            mockAdministrador.updateContrasena.mockResolvedValue('update');

            const result = await controller.putCambio('oldPass', 'newPass', 'newPass');

            expect(result).toEqual({ mensaje: 'Contraseña actualizada con éxito' });
            expect(mockAdministrador.updateContrasena).toHaveBeenCalledWith('oldPass', 'newPass');
            console.log('--- Finalizando prueba: actualización exitosa de contraseña ---\n');
        });

        it('debe fallar si las contraseñas no coinciden', async () => {
            console.log('\n--- Iniciando prueba: fallo por contraseñas no coincidentes ---');
            await expect(
                controller.putCambio('oldPass', 'newPass', 'differentPass')
            ).rejects.toThrow('La nueva contraseña y la confirmación no coinciden');
            
            expect(mockAdministrador.updateContrasena).not.toHaveBeenCalled();
            console.log('--- Finalizando prueba: fallo por contraseñas no coincidentes ---\n');
        });
    });

    describe('Métodos de carga (Preloading)', () => {
        it('debe cargar tipos correctamente', async () => {
            console.log('\n--- Iniciando prueba: carga de tipos ---');
            const mockTipos = [
                { nombreTipo: 'Tipo1' },
                { nombreTipo: 'Tipo2' }
            ];
            mockAdministrador.loadTipos.mockResolvedValue(mockTipos);

            const result = await controller.getLoadTipos();

            expect(result).toEqual(mockTipos);
            expect(mockAdministrador.loadTipos).toHaveBeenCalled();
            console.log('--- Finalizando prueba: carga de tipos ---\n');
        });

        it('debe cargar vehículos correctamente', async () => {
            console.log('\n--- Iniciando prueba: carga de vehículos ---');
            const mockVehiculos = [
                { vehiculo: 'Carro' },
                { vehiculo: 'Moto' }
            ];
            mockAdministrador.loadVehiculo.mockResolvedValue(mockVehiculos);

            const result = await controller.getLoadTipoVehiculo();

            expect(result).toEqual(mockVehiculos);
            expect(mockAdministrador.loadVehiculo).toHaveBeenCalled();
            console.log('--- Finalizando prueba: carga de vehículos ---\n');
        });

        it('debe cargar puntos exteriores correctamente', async () => {
            console.log('\n--- Iniciando prueba: carga de puntos exteriores ---');
            const mockPuntos = [
                { nombre: 'Punto1' },
                { nombre: 'Punto2' }
            ];
            mockAdministrador.loadPuntoExterior.mockResolvedValue(mockPuntos);

            const result = await controller.getLoadPuntosExterior();

            expect(result).toEqual(mockPuntos);
            expect(mockAdministrador.loadPuntoExterior).toHaveBeenCalled();
            console.log('--- Finalizando prueba: carga de puntos exteriores ---\n');
        });

        it('debe cargar estructura correctamente', async () => {
            console.log('\n--- Iniciando prueba: carga de estructura ---');
            const mockBloques = [
                { bloque: 'Bloque1' },
                { bloque: 'Bloque2' }
            ];
            mockAdministrador.loadBloque.mockResolvedValue(mockBloques);

            const result = await controller.getLoadEstructura();

            expect(result).toEqual(mockBloques);
            expect(mockAdministrador.loadBloque).toHaveBeenCalled();
            console.log('--- Finalizando prueba: carga de estructura ---\n');
        });

        it('debe cargar pisos correctamente', async () => {
            console.log('\n--- Iniciando prueba: carga de pisos ---');
            const mockPisos = [
                { plano: 'Piso1' },
                { plano: 'Piso2' }
            ];
            mockAdministrador.loadPiso.mockResolvedValue(mockPisos);

            const result = await controller.getLoadPiso();

            expect(result).toEqual(mockPisos);
            expect(mockAdministrador.loadPiso).toHaveBeenCalled();
            console.log('--- Finalizando prueba: carga de pisos ---\n');
        });

        it('debe manejar errores en las cargas retornando array vacío', async () => {
            console.log('\n--- Iniciando prueba: manejo de errores en cargas ---');
            mockAdministrador.loadTipos.mockRejectedValue(new Error('Error de BD'));
            mockAdministrador.loadVehiculo.mockRejectedValue(new Error('Error de BD'));
            mockAdministrador.loadPuntoExterior.mockRejectedValue(new Error('Error de BD'));
            mockAdministrador.loadBloque.mockRejectedValue(new Error('Error de BD'));
            mockAdministrador.loadPiso.mockRejectedValue(new Error('Error de BD'));

            expect(await controller.getLoadTipos()).toEqual([]);
            expect(await controller.getLoadTipoVehiculo()).toEqual([]);
            expect(await controller.getLoadPuntosExterior()).toEqual([]);
            expect(await controller.getLoadEstructura()).toEqual([]);
            expect(await controller.getLoadPiso()).toEqual([]);
            console.log('--- Finalizando prueba: manejo de errores en cargas ---\n');
        });
    });
});