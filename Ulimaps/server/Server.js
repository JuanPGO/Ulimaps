// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AdministradorController } from './controllers/AdministradorController.js';
import { PuntoExteriorController } from './controllers/PuntoExteriorController.js';
import { EstructuraController } from './controllers/EstructuraController.js';
import { ParqueaderoController } from './controllers/ParqueaderoController.js';
import { PisoController } from './controllers/PisoController.js';
import { PuntoInteriorController } from './controllers/PuntoInteriorController.js';
import { ImagenController } from './controllers/ImagenController.js';
import { expressjwt } from 'express-jwt';  // Changed import
import jwt from 'jsonwebtoken';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const adminController = new AdministradorController();
const estructuraController = new EstructuraController();
const parqueaderoController = new ParqueaderoController();
const pisoController = new PisoController();
const puntoExteriorController = new PuntoExteriorController();
const puntoInteriorController = new PuntoInteriorController();
const imagenController = new ImagenController();


const SECRET_KEY = '753159'; // Cambia esto por una clave segura

// Middleware para proteger rutas
const authenticateJWT = expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] });

// LOGGING
app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    console.log('Datos recibidos en /login:', { usuario, password });
    
    try {
        const user = await adminController.postLogin(usuario, password);
        if (user) {
            const token = jwt.sign({ id: user.id, usuario: user.usuario }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token, user: { id: user.id, usuario: user.usuario } });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta protegida de ejemplo
app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Esta es una ruta protegida', user: req.auth });
});

// Manejador de errores para express-jwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Token inválido o expirado' });
    } else {
        next(err);
    }
});

app.post('/logout', (req, res) => {
    // Aquí puedes realizar cualquier limpieza necesaria en el servidor
    // Por ejemplo, si estás usando tokens de refresco, podrías invalidarlos aquí
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

app.get('/api/verify-token', authenticateJWT, (req, res) => {
    res.status(200).json({ valid: true });
});

app.put('/password_change', async (req, res) => {
    const { anterior, nueva, confirmar } = req.body;
    console.log('Datos recibidos en /password_change:', { anterior, nueva, confirmar });
    
    try {
        const result = await adminController.putCambio(anterior, nueva, confirmar);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error en el proceso de cambio de contraseña:', error);
        res.status(400).json({ error: error.message });
    }
});

// CREATE
// En Server.js
app.post('/puntos_exterior_create', async (req, res) => {
    const { id, nombre, latitud, longitud, activo, mapa  } = req.body;
    console.log('Datos recibidos:', { id, nombre, latitud, longitud, activo, mapa });

    try {
        const resultado = await puntoExteriorController.postPuntoExterior(req);
        
        if (resultado === 'create') {
            return res.status(200).json({ message: 'Punto de interés exterior creado con éxito' });
        }
    } catch (error) {
        console.error('Error:', error);
        
        if (error.type === 'ID_EXISTS') {
            return res.status(400).json({ 
                error: error.message
            });
        } else if (error.type === 'DATABASE_ERROR') {
            return res.status(500).json({ 
                error: 'Error en la base de datos: ' + error.message 
            });
        } else {
            return res.status(500).json({ 
                error: 'Error interno del servidor: ' + error.message 
            });
        }
    }
});

app.post('/estructuras_create', async (req, res) => {
    const { id, bloque, nombre, nombreTipo  } = req.body;
    console.log('Datos recibidos:', { id, bloque, nombre, nombreTipo });

    try {
        const resultado = await estructuraController.postEstructura(req);
        
        if (resultado === 'create') {
            return res.status(200).json({message: 'Estructura creada con exito' });
        } 
    } catch (error) {
        console.error('Error:', error);
        
        if (error.type === 'ID_EXISTS') {
            return res.status(400).json({ 
                error: error.message
            });
        } else if (error.type === 'DATABASE_ERROR') {
            return res.status(500).json({ 
                error: 'Error en la base de datos: ' + error.message 
            });
        } else {
            return res.status(500).json({ 
                error: 'Error interno del servidor: ' + error.message 
            });
        }
    }
});

app.post('/parqueaderos_create', async (req, res) => {
    const { id, nombre, vehiculo, nombreTipo } = req.body;

    console.log('Datos recibidos:', { id, nombre, vehiculo, nombreTipo });
    

    try {
        const resultado = await parqueaderoController.postParqueadero(req);
        
        if (resultado === 'create') {
            return res.status(200).json({ message: 'Parqueadero actualizada con éxito' });
        } 
    }  catch (error) {
        console.error('Error:', error);
        
        if (error.type === 'ID_EXISTS') {
            return res.status(400).json({ 
                error: error.message
            });
        } else if (error.type === 'DATABASE_ERROR') {
            return res.status(500).json({ 
                error: 'Error en la base de datos: ' + error.message 
            });
        } else {
            return res.status(500).json({ 
                error: 'Error interno del servidor: ' + error.message 
            });
        }
    }
});

app.post('/pisos_create', async (req, res) => {
    const { id, nivel, bloque, plano } = req.body;

    console.log('Datos recibidos:', { id, nivel, bloque, plano });
    

    try {
        const resultado = await pisoController.postPiso(req)
        
        if (resultado === 'create') {
            return res.status(200).json({ message: 'Estructura actualizada con éxito' });
        } 
    } catch (error) {
        console.error('Error:', error);
        
        if (error.type === 'ID_EXISTS') {
            return res.status(400).json({ 
                error: error.message
            });
        } else if (error.type === 'DATABASE_ERROR') {
            return res.status(500).json({ 
                error: 'Error en la base de datos: ' + error.message 
            });
        } else {
            return res.status(500).json({ 
                error: 'Error interno del servidor: ' + error.message 
            });
        }
    }
});

app.post('/puntos_interior_create', async (req, res) => {
    const { id, nombre, activo, nombreTipo, plano } = req.body;

    console.log('Datos recibidos:', { id, nombre, activo, nombreTipo, plano });
    

    try {
        const resultado = await puntoInteriorController.postPuntoInterior(req);
        
        if (resultado === 'create') {
            return res.status(200).json({ message: 'Punto Interior creado con éxito' });
        }
    } catch (error) {
        console.error('Error:', error);
        
        if (error.type === 'ID_EXISTS') {
            return res.status(400).json({ 
                error: error.message
            });
        } else if (error.type === 'DATABASE_ERROR') {
            return res.status(500).json({ 
                error: 'Error en la base de datos: ' + error.message 
            });
        } else {
            return res.status(500).json({ 
                error: 'Error interno del servidor: ' + error.message 
            });
        }
    }
});

app.post('/imagenes_create', async (req, res) => {
    const { id, nombre, puntoExterior } = req.body;

    console.log('Datos recibidos:', { id, nombre, puntoExterior });
    

    try {
        const resultado = await imagenController.postImagen(req);
        
        if (resultado === 'create') {
            return res.status(200).json({ message: 'Imagen creada con éxito' });
        } 
    } catch (error) {
        console.error('Error:', error);
        
        if (error.type === 'ID_EXISTS') {
            return res.status(400).json({ 
                error: error.message
            });
        } else if (error.type === 'DATABASE_ERROR') {
            return res.status(500).json({ 
                error: 'Error en la base de datos: ' + error.message 
            });
        } else {
            return res.status(500).json({ 
                error: 'Error interno del servidor: ' + error.message 
            });
        }
    }
});

// READ
app.get('/puntos_exterior', async (req, res) => {
    try {
        const puntos = await puntoExteriorController.getPuntosInteresExterior();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/estructuras', async (req, res) => {
    try {
        const puntos = await estructuraController.getEstructuras();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/parqueaderos', async (req, res) => {
    try {
        const puntos = await parqueaderoController.getParqueaderos();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/pisos', async (req, res) => {
    try {
        const puntos = await pisoController.getPisos()
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/puntos_interior', async (req, res) => {
    try {
        const puntos = await puntoInteriorController.getPuntosInteresInterior();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/imagenes', async (req, res) => {
    try {
        const puntos = await imagenController.getImagenes();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

// PRELOADING
app.get('/tipos_load', async (req, res) => {
    try {
        const puntos = await adminController.getLoadTipos();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/tipo_vehiculo_load', async (req, res) => {
    try {
        const puntos = await adminController.getLoadTipoVehiculo();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/punto_exterior_load', async (req, res) => {
    try {
        const puntos = await adminController.getLoadPuntosExterior();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/estructuras_load', async (req, res) => {
    try {
        const puntos = await adminController.getLoadEstructura();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/pisos_load', async (req, res) => {
    try {
        const puntos = await adminController.getLoadPiso();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});


// UPDATE
app.put('/puntos_exterior/:id', async (req, res) => {
    // const { id } = req.params;
    // const { nombre, latitud, longitud } = req.body;

    try {
        const resultado = await puntoExteriorController.putPuntoExterior(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Punto de interés exterior actualizado con éxito' });
        } else {
            return res.status(500).json({ message: 'No se pudo actualizar el punto de interés exterior' });
        }
    } catch (error) {
        console.error('Error al actualizar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.put('/estructuras/:id', async (req, res) => {
    // const { id } = req.params;
    // const { bloque, nombre, nombreTipo } = req.body;
    // Log para verificar los datos que llegan desde el frontend
    // console.log('Datos recibidos:', { id, bloque, nombre, nombreTipo });

    try {
        const resultado = await estructuraController.putEstructuras(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Estructura actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'Estructura no encontrada para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar la estructura:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/parqueaderos/:id', async (req, res) => {
    // const { id } = req.params;
    // const { nombre, vehiculo, nombreTipo } = req.body;

    // console.log('Datos recibidos:', { id, nombre, vehiculo, nombreTipo });
    

    try {
        const resultado = await parqueaderoController.putParqueadero(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Estructura actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'Estructura no encontrada para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el Parquedero:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/pisos/:id', async (req, res) => {
    // const { id } = req.params;
    // const { nivel, bloque, plano } = req.body;

    // console.log('Datos recibidos:', { id, nivel, bloque, plano });
    

    try {
        const resultado = await pisoController.putPiso(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Estructura actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'Estructura no encontrada para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el Piso:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/puntos_interior/:id', async (req, res) => {
    // const { id } = req.params;
    // const { nombre, nombreTipo, plano } = req.body;

    // console.log('Datos recibidos:', { id, nombre, nombreTipo, plano });
    

    try {
        const resultado = await puntoInteriorController.putPuntoInterior(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Estructura actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'Estructura no encontrada para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el Piso:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/imagenes/:id', async (req, res) => {
    // const { id } = req.params;
    // const { nombre, puntoExterior } = req.body;

    // console.log('Datos recibidos:', { id, nombre, puntoExterior});
    

    try {
        const resultado = await imagenController.putImagen(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Estructura actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'Estructura no encontrada para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el Piso:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});



app.put('/puntos_exterior_estado/:id', async (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;
    console.log('Datos recibidos:', { id, activo});

    try {
        const resultado = await puntoExteriorController.putActivoPuntoExterior(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Punto de interés exterior actualizado con éxito' });
        } else {
            return res.status(500).json({ message: 'No se pudo actualizar el punto de interés exterior' });
        }
    } catch (error) {
        console.error('Error al actualizar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/puntos_interior_estado/:id', async (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;
    console.log('Datos recibidos:', { id, activo});

    try {
        const resultado = await puntoInteriorController.putActivoPuntoInterior(req);
        
        if (resultado === 'update') {
            return res.status(200).json({ message: 'Punto de interés exterior actualizado con éxito' });
        } else {
            return res.status(500).json({ message: 'No se pudo actualizar el punto de interés exterior' });
        }
    } catch (error) {
        console.error('Error al actualizar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// DELETE
app.delete('/puntos_exterior_delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        const resultado = await puntoExteriorController.deletePuntoExterior(req);
        
        if (resultado === 'delete') {
            return res.status(200).json({ message: 'Punto de interés exterior eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo encontrar el punto de interés exterior para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/estructuras_delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        const resultado = await estructuraController.deleteEstructura(req);
        
        if (resultado === 'delete') {
            return res.status(200).json({ message: 'Punto de interés exterior eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo encontrar el punto de interés exterior para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/parqueaderos_delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        const resultado = await parqueaderoController.deleteParqueadero(req);
        
        if (resultado === 'delete') {
            return res.status(200).json({ message: 'Punto de interés exterior eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo encontrar el punto de interés exterior para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/pisos_delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        const resultado = await pisoController.deletePiso(req);
        
        if (resultado === 'delete') {
            return res.status(200).json({ message: 'Punto de interés exterior eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo encontrar el punto de interés exterior para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/puntos_interior_delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        const resultado = await puntoInteriorController.deletePuntoInterior(req);
        
        if (resultado === 'delete') {
            return res.status(200).json({ message: 'Punto de interés exterior eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo encontrar el punto de interés exterior para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/imagenes_delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        const resultado = await imagenController.deleteImagen(req);
        
        if (resultado === 'delete') {
            return res.status(200).json({ message: 'Punto de interés exterior eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No se pudo encontrar el punto de interés exterior para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el punto de interés exterior:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});