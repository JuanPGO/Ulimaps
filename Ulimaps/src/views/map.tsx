import '../styles/map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import customMarkerIcon from '../assets/img/botones/locationDot.png';
import L from 'leaflet';

const MapInterface: React.FC = () => {
  
    const customIcon = new L.Icon({
        iconUrl: customMarkerIcon,
        iconSize: [25, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

    return (
    <div className="contenedor-bienvenidamap">

      <div className="navegacionDiv">

        <div className='boton-nav-div1'>
          <Link to="/origin" className="boton-nav">
            <FontAwesomeIcon icon={faRoute} style={{ color: "#ffffff", padding: 0, margin: 0 }} />
          </Link>
        </div>

        <div className='boton-nav-div1'>
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
              <div className="headerIcon">
                <span>Edificio Daniel Becerra Piedrahita</span>
              </div>
              <div className="bodyIcon">

                <div className="imagenIcon">
                  <img src="../src/assets/img/fotos/fotoBienvenida.jpg" alt="" />
                </div>

                <div className="infoIcon">
                    
                  <div className="nombreEicon">
                    <span>Bloque C</span>
                  </div>

                  {/* Se agrega el link a la interfaz correspondiente */}

                  <div className="buttonSeeMore">
                    <button>Ver más</button>
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
