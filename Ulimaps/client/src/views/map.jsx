// archivo map.jsx
import '../styles/map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import customMarkerIcon from '../assets/img/botones/locationDot.png'; // Ícono PNG

const MapInterface = () => {

    const customIcon = new L.Icon({
        iconUrl: customMarkerIcon,
        iconSize: [25, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -32],
    });

    return (
        <div className="contenedor-bienvenidamap">
            <div className="navegacionDiv">
                <div className="boton-nav-div1">
                    <Link to="/" className="boton-nav">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#ffffff" }} />
                    </Link>
                </div>
            </div>

            <div className="mapa">
                <MapContainer scrollWheelZoom={true} center={[4.806004, -75.760249]} zoom={20} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[4.806250, -75.760109]} icon={customIcon}>
                        <Popup>
                            <div className="contenedorPop">
                                <div className="headerPop">
                                    <span>Edificio Daniel Becerra Piedrahita</span>
                                </div>
                                <div className="bodyPop">

                                    <div className="imagePop">
                                        <img src="./client/src/assets/img/fotos/fotoBienvenida.jpg" alt="" />
                                    </div>

                                    <div className="infoPop">

                                        <div className="nomPop">
                                            <span>Bloque C</span>
                                        </div>
                                        <div className="buttonPop">

                                            <Link to="/viewEstructura" className="boton-out">
                                                <button>
                                                    <span>Ver más</span>
                                                </button>
                                            </Link>
                                            
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>

                    <Marker position={[4.806228, -75.760606]} icon={customIcon}>
                        <Popup>
                        <div className="contenedorPop">
                                <div className="headerPop">
                                    <span>Edificio Alberto Mesa Abadía</span>
                                </div>
                                <div className="bodyPop">

                                    <div className="imagePop">
                                        <img src="./client/src/assets/img/fotos/fotoBienvenida.jpg" alt="" />
                                    </div>

                                    <div className="infoPop">

                                        <div className="nomPop">
                                            <span>Bloque Laboratorios</span>
                                        </div>
                                        <div className="buttonPop">
                                            <button>
                                                <span>Ver más</span>
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="navegacionDiv2"></div>
        </div>
    );
};

export default MapInterface;
