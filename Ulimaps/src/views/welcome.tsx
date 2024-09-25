import React from 'react';
import '../styles/welcome.css';

const WelcomeInterface: React.FC = () => {
    return (
        <>
        <div id="sd">
            <div className='div-navegation-button'>
                <img  className="navegacion-button" src="./src/assets/img/botones/map.png" alt="Escudo Unilibre"></img>
            </div>
            <div>
                <button className="circular-button">
                    <img src="./src/assets/img/botones/escudo.png" alt="Escudo Unilibre" />
                </button>
            </div>
            <div className='tittle'>
                <h1>Bienvenido al Campus</h1>
            </div>
            <div>
                <img className="WelcomeImg"src="./src/assets/img/fotos/fotoBienvenida.png" alt="Foto Bienvenida" />
            </div>
        </div>
        </>

    );
};

export default WelcomeInterface;
