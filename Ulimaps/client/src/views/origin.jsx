import '../styles/origin.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const   OriginInterface = () => {
  
    return (
        <div className="contenedor-origin">

            <div className="navegacionDivOrigin">

                <div className="locationCloseTo">
                    <span>Estás cerca de</span>
                </div>

                <div className='boton-nav-div1'>
                    <Link to="/map" className="boton-nav">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#ffffff" }} className='backIcon'/>
                    </Link>
                </div>

            </div>

            <div className="bodyContainer">

                <div className="locationName">
                    <span>
                        Edificio Alberto Mesa Abadía
                    </span>
                </div>

                <div className="locationPage">
                    <button>Ver más</button>                    
                </div>

                <div className="locationImage">
                    <img src="./client/src/assets/img/fotos/albertoMesa.jpg" alt="" />
                </div>

                <div className="bodyContainerBottom">

                    <div className="locationQuestion">
                        <span>¿Cuál es tu próximo destino?</span>
                    </div>

                    <div className="destinyButton">

                        <select name="destinos" id="destinos">
                            <option value="1">Edificio Cesár Augusto López</option>
                            <option value="2">Opcion 2</option>
                            <option value="3">Opcion 3</option>
                            <option value="4">Opcion 4</option>
                        </select>

                    </div>

                    <div className="startButton">
                        <button>
                            <span>Iniciar</span>
                            <FontAwesomeIcon icon={faLocationArrow} />

                        </button>
                    </div>

                </div>

            </div>

        </div>

  );
};

export default OriginInterface;
