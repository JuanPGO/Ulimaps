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

// Instancia del controlador
const adminController = new AdministradorController();

// Ruta para iniciar sesión
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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

