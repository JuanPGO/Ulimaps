import React from 'react';
import '../styles/map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const MapInterface: React.FC = () => {
    return (

        <div className="contenedor-bienvenidamap">

            <div className="navegacionDiv">

                <div className='boton-nav-div1'>

                    <Link to="/map" className="boton-nav">
                        <FontAwesomeIcon icon={faRoute} style={{color: "#ffffff", padding: 0, margin: 0}} />
                    </Link>

                </div> 
                
                <div className='boton-nav-div1'>

                    <Link to="/" className="boton-nav">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{color: "#ffffff",}} />
                    </Link>

                </div> 

            </div>
            
            <div className="mapa">

                <MapContainer center={[4.806004, -75.760249]} zoom={40} style={{ height: '100%', width: '100%'}}>
                
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[4.806004, -75.760249]} >
                        <Popup>

                        </Popup>
                    </Marker>

                </MapContainer>

            </div>

        </div>
    );
};

export default MapInterface;
