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

    async obtenerPuntosInteresExterior() {
        const admin = new Administrador();
        try {
            const puntos = await admin.BuscarPuntosExterior();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerEstructuras() {
        const admin = new Administrador();
        try {
            const puntos = await admin.BuscarEstructuras();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerParqueaderos() {
        const admin = new Administrador();
        try {
            const puntos = await admin.BuscarParqueaderos();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerPisos() {
        const admin = new Administrador();
        try {
            const puntos = await admin.BuscarPisos();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerPuntosInteresInterior() {
        const admin = new Administrador();
        try {
            const puntos = await admin.BuscarPuntosInterior();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerImagenes() {
        const admin = new Administrador();
        try {
            const puntos = await admin.BuscarImagenes();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerTipos() {
        const admin = new Administrador();
        try {
            const puntos = await admin.BuscarTipos();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerTipoVehiculo() {
        const admin = new Administrador();
        try {
            const puntos = await admin.TipoVehiculo();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerPuntosExterior() {
        const admin = new Administrador();
        try {
            const puntos = await admin.obtenerPuntoExterior();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }

    async obtenerEstructurasForm() {
        const admin = new Administrador();
        try {
            const puntos = await admin.getEstructuras();
            return puntos;
        } catch (error) {
            console.error('Error al obtener puntos de interés exterior:', error);
            return [];
        }
    }


    // editar 

    async actualizarPuntoExterior (req, res) {
        const admin = new Administrador();
        const { id } = req.params;
        const { nombre, latitud, longitud } = req.body;
    
        try {
            const resultado = await admin.editarPuntoExterior(id, nombre, latitud, longitud);
            
            if (resultado === 'update') {
                res.status(200).json({ message: 'Punto de interés exterior actualizado con éxito' });
            } else {
                res.status(500).json({ message: 'No se pudo actualizar el punto de interés exterior' });
            }
        } catch (error) {
            console.error('Error al actualizar el punto de interés exterior:', error);
            res.status(500).json({ message: 'Error al actualizar el punto de interés exterior' });
        }
    };

}

export default AdministradorController;
