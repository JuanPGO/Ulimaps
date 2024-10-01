import React from 'react';
import '../styles/login.css';
import { Link } from 'react-router-dom';


const LoginInterface: React.FC = () => {
    return (
        <div className="contenedor-bienvenida1">

            <div className='contenedor-interiorlogin1'>

                <div className="contenedor-interiorlogin2">

                    <div className="escudo">

                        <img src="./src/assets/img/fotos/escudo.png" alt="" />

                    </div>

                    <div className="login">

                        <form action="">

                            <label htmlFor="">Usuario</label>
                            <input type="text" name="usuarioInput" id="usuarioInput" />

                            <label htmlFor="">Contraseña</label>
                            <input type="password" name='contraseñaInput' id='contraseñaInput' />


                        </form>

                    </div>

                    <div className="buttonDiv">

                        <Link to="/" className='buttonIngreso'>
                            <button>
                                <span>Ingresar</span>
                            </button>
                        </Link>
                        

                    </div>

                </div>

            </div>

        </div>
    )
};

export default LoginInterface;
