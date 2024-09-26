import React from 'react';
import '../styles/welcome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const WelcomeInterface: React.FC = () => {
    return (
        <div className="contenedor-bienvenida">

            <div className='contenedor-interior1'>

                <div className="divNavegacion">

                    <nav className="navegacion">
                        <div className='boton-nav-div'>

                            <Link to="/map" className="boton-nav">
                                <FontAwesomeIcon icon={faMapLocationDot} style={{color: "#ffffff",}} />
                            </Link>

                        </div>  

                    </nav>

                </div>

                <div className="divEncabezado">

                    <header className="encabezado">
                        <Link to="/login" className="boton-logo">
                            <img src="./src/assets/img/fotos/escudo.png" alt="Escudo Unilibre" />
                        </Link>
                    </header>

                </div>

                <div className="divBienvenida">

                    <main>

                        <h1 className="titulo">Bienvenido</h1>
                        <h2 className="subtitulo">Campus Belmonte, Pereira</h2>

                    </main>

                </div>

            </div>
            
            <div className="contenedor-interior2">

                <div className="imagenCampus">

                        <img src="./src/assets/img/fotos/fotoBienvenida.jpg" alt="Campus Belmonte ULibre" />                
                </div>

            </div>
            
        </div>
    );
};

export default WelcomeInterface;
