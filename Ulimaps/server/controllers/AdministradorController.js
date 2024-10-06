// AdministradorController.js
import { Administrador } from '../components/Administrador.js';

export class AdministradorController {
    async login(usuario, contrasena) {
        console.log("Intento de login para usuario:", usuario);
        const admin = new Administrador(usuario, contrasena);
        try {
            const user = await admin.obtenerUsuario();
            
            if (user) {
                console.log("Usuario encontrado:", user.usuario);
                if (user.contrasena === contrasena) {
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
}

