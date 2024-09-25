import React from 'react';
import '../styles/welcome.css';

const WelcomeInterface: React.FC = () => {
    return (
        <div className="contenedor-bienvenida">
            <nav className="navegacion">
                <button className="boton-nav">
                    <img src="./src/assets/img/botones/gps.png" alt="Navegación" />
                </button>
            </nav>
            <header className="encabezado">
                <button className="boton-logo">
                    <img src="./src/assets/img/botones/escudo.png" alt="Escudo Unilibre" />
                </button>
            </header>
            <main className="contenido-principal">
                <h1 className="titulo">Bienvenido</h1>
                <img className="imagen-bienvenida" src="./src/assets/img/fotos/fotoBienvenida.jpg" alt="Foto Bienvenida" />
                <h2 className="subtitulo">Campus Belmonte, Pereira</h2>
            </main>
        </div>
    );
};

export default WelcomeInterface;
