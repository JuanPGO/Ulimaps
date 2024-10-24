// AdministradorController.js
import { Administrador } from '../components/Administrador.js';
import bcrypt from 'bcrypt';

export class AdministradorController {

    // LOGGING
    async postLogin(usuario, contrasena) {
        console.log("Intento de login para usuario:", usuario);
        const admin = new Administrador(usuario, contrasena);
        try {
            const user = await admin.readUsuario();
            
            if (user) {
                console.log("Usuario encontrado:", user.usuario);
                const isMatch = await bcrypt.compare(contrasena, user.contrasena);
                if (isMatch) {
                    console.log('Credenciales correctas.');
                    return user;
                } else {
                    console.log('Credenciales incorrectas: la contraseña no coincide.');
                    return null;
                }
            } else {
                console.log('Credenciales incorrectas: el usuario no existe.');
                return null;
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            return null;
        }
    }

    async putCambio(anteriorContrasena, nuevaContrasena, confirmacion) {
        if (nuevaContrasena !== confirmacion) {
            throw new Error('La nueva contraseña y la confirmación no coinciden');
        }
    
        const admin = new Administrador('sistemas'); // Asumiendo que el usuario es siempre 'sistemas'
        try {
            console.log('Intentando actualizar la contraseña...');
            const resultado = await admin.updateContrasena(anteriorContrasena, nuevaContrasena);
            console.log('Resultado de la actualización:', resultado);
            if (resultado === 'update') {
                return { mensaje: 'Contraseña actualizada con éxito' };
            } else {
                throw new Error('No se pudo actualizar la contraseña');
            }
        } catch (error) {
            console.error('Error detallado durante el cambio de contraseña:', error);
            throw error;
        }
    }

    // PRELOADING
    async getLoadTipos() {
        const admin = new Administrador();
        try {
            const puntos = await admin.loadTipos();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async getLoadTipoVehiculo() {
        const admin = new Administrador();
        try {
            const puntos = await admin.loadVehiculo();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async getLoadPuntosExterior() {
        const admin = new Administrador();
        try {
            const puntos = await admin.loadPuntoExterior();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async getLoadEstructura() {
        const admin = new Administrador();
        try {
            const puntos = await admin.loadBloque();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async getLoadPiso() {
        const admin = new Administrador();
        try {
            const puntos = await admin.loadPiso();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }


}

