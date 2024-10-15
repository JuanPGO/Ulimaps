// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AdministradorController } from './controllers/AdministradorController.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const adminController = new AdministradorController();

app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    console.log('Datos recibidos en /login:', { usuario, password });
    
    try {
        const user = await adminController.login(usuario, password);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/puntos_exterior', async (req, res) => {
    try {
        const puntos = await adminController.obtenerPuntosInteresExterior();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/estructuras', async (req, res) => {
    try {
        const puntos = await adminController.obtenerEstructuras();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/parqueaderos', async (req, res) => {
    try {
        const puntos = await adminController.obtenerParqueaderos();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/pisos', async (req, res) => {
    try {
        const puntos = await adminController.obtenerPisos();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/puntos_interior', async (req, res) => {
    try {
        const puntos = await adminController.obtenerPuntosInteresInterior();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/imagenes', async (req, res) => {
    try {
        const puntos = await adminController.obtenerImagenes();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});


app.get('/tipos', async (req, res) => {
    try {
        const puntos = await adminController.obtenerTipos();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/tipo_vehiculo', async (req, res) => {
    try {
        const puntos = await adminController.obtenerTipoVehiculo();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/obtener_punto_exterior', async (req, res) => {
    try {
        const puntos = await adminController.obtenerPuntosExterior();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.get('/estructuras_form', async (req, res) => {
    try {
        const puntos = await adminController.obtenerEstructurasForm();
        res.json(puntos);
    } catch (error) {
        console.error('Error al obtener puntos de interés:', error);
        res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
});

app.put('/puntos_exterior/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, latitud, longitud } = req.body;
    console.log('Datos recibidos para actualizar punto de interés exterior:', { id, nombre, latitud, longitud });

    try {
        const resultado = await adminController.actualizarPuntoExterior(id, nombre, latitud, longitud);
        
        if (resultado === 'update') {
            res.status(200).json({ message: 'Punto de interés exterior actualizado con éxito' });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el punto de interés exterior' });
        }
    } catch (error) {
        console.error('Error al actualizar el punto de interés exterior:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});