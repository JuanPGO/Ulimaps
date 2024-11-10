import { useEffect, useState } from 'react';
import '../styles/map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import customMarkerIcon from '../assets/img/botones/locationDot.png';

const MapInterface = () => {
    const [puntosExteriores, setPuntosExteriores] = useState([]);
    const [estructuras, setEstructuras] = useState({});
    const [imagenes, setImagenes] = useState({});

    const customIcon = new L.Icon({
        iconUrl: customMarkerIcon,
        iconSize: [25, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -32],
    });

    useEffect(() => {
        const fetchPuntosExteriores = async () => {
            try {
                const response = await fetch('http://localhost:3000/puntos_exterior');
                if (!response.ok) {
                    throw new Error('Error al obtener los puntos exteriores');
                }
                const data = await response.json();
                setPuntosExteriores(data);

                // Obtener información de estructura para cada punto
                const estructurasTemp = {};
                for (const punto of data) {
                    const estructuraResponse = await fetch(`http://localhost:3000/estructura/${punto.id}`);
                    if (estructuraResponse.ok) {
                        const estructuraData = await estructuraResponse.json();
                        estructurasTemp[punto.id] = estructuraData;
                    }
                }
                setEstructuras(estructurasTemp);

                const imagenTemp = {};
                for (const punto of data) {
                    const imagenResponse = await fetch(`http://localhost:3000/imagen/${punto.id}`);
                    if (imagenResponse.ok) {
                        const imagenData = await imagenResponse.json();
                        imagenTemp[punto.id] = imagenData;
                    }
                }
                setImagenes(imagenTemp);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPuntosExteriores();
    }, []);

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

                    {puntosExteriores.map((punto) => (
                        punto.activo && (
                            <Marker 
                                key={punto.id}
                                position={[punto.latitud, punto.longitud]} 
                                icon={customIcon}
                            >
                                <Popup>
                                    <div className="contenedorPop">
                                        <div className="headerPop">
                                            <span>{punto.nombre}</span>
                                        </div>
                                        <div className="bodyPop">
                                            <div className="imagePop">
                                                {(() => {
                                                    if (imagenes[punto.id] && imagenes[punto.id].nombre) {
                                                        return (
                                                            <img src="./client/src/assets/img/fotos/`${imagenes[punto.id].nombre}" alt="" />
                                                        );
                                                    } else {
                                                        return (
                                                            <span>
                                                                no hay imagen
                                                            </span>
                                                        );
                                                    }
                                                })()}

                                            </div>

                                            <div className="infoPop">
                                                <div className="nomPop">
                                                    {(() => {
                                                        if (estructuras[punto.id] && estructuras[punto.id].bloque) {
                                                            return (
                                                                <span className="bloquePop">
                                                                    {estructuras[punto.id].bloque}
                                                                </span>
                                                            );
                                                        } else {
                                                            return (
                                                                <span>
                                                                    {punto.nombre}
                                                                </span>
                                                            );
                                                        }
                                                    })()}
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
                        )
                    ))}
                </MapContainer>
            </div>

            <div className="navegacionDiv2"></div>
        </div>
    );
};

export default MapInterface;