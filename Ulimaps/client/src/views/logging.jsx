// logging.jsx
import { useState } from 'react';
import '../styles/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Para redirigir después del login
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const LoginInterface = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST', // Asegúrate de que el método sea POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Captura el mensaje de error
                throw new Error(errorData.error || 'Error en la autenticación');
            }
    
            const data = await response.json();
            console.log('Usuario autenticado:', data); // Aquí deberías ver el objeto de usuario

            // Redirigir al usuario a la página CRUD si las credenciales son correctas
            navigate('/crud'); 
    
        } catch (error) {
            console.error('Error de conexión:', error);
            setError('Error de conexión: ' + error.message); // Actualizar el estado de error
        }
    };

    return (
        <div className="contenedor-bienvenida1">
            <div className="contenedor-interiorlogin1">
                <div className="contenedor-interiorlogin2">
                    <div className="escudo">
                        <img src="./client/src/assets/img/fotos/escudo.png" alt="" />
                    </div>

                    <div className="login">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="">Usuario</label>
                            <input
                                type="text"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />

                            <label htmlFor="">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div className="buttonDiv">
                                <button type="submit" className="buttonIngreso">
                                    <span>Ingresar</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="divOut">
                        <Link to="/" className="boton-out">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#ffffff" }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginInterface;


