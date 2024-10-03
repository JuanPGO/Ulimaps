import '../styles/map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import customMarkerIcon from '../assets/img/botones/locationDot.png'; // Ícono PNG
import L from 'leaflet';

const MapInterface: React.FC = () => {
  
    const customIcon = new L.Icon({
        iconUrl: customMarkerIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

    return (
    <div className="contenedor-bienvenidamap">
      <div className="navegacionDiv">
        <div className='boton-nav-div1'>
          <Link to="/map" className="boton-nav">
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
              <button>Botón</button>
            </Popup>
          </Marker>

          <Marker position={[4.806228, -75.760606]} icon={customIcon}>
            <Popup>
              <span>Hola</span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="navegacionDiv2"></div>
    </div>
  );
};

export default MapInterface;
