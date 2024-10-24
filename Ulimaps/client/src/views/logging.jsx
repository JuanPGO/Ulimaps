import { useState } from 'react';
import '../styles/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Para redirigir después del login
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginInterface = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const showErrorToast = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en la autenticación');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/crud');
        } catch (error) {
            console.error('Error de conexión:', error);
            showErrorToast(error.message);
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
                        <ToastContainer />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="usuario">Usuario</label>
                                <input
                                    type="text"
                                    id="usuario"
                                    value={usuario}
                                    required
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="buttonDiv">
                                <button type="submit">
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


