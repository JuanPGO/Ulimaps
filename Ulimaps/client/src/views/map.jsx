import { useEffect, useState, useRef } from 'react';
import '../styles/map.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faInfo, faLocationCrosshairs, faRoute, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import customMarkerIcon from '../assets/img/botones/locationDot.png';
import { ToastContainer, toast } from 'react-toastify';


// Función para mostrar toast de error
const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};


const showRouteInfoToast = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // Ensure only one toast is shown at a time
        toastId: 'route-toast'
    });
};

// Función para mostrar toast de Info
const showInfoToast = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // Ensure only one toast is shown at a time
        toastId: 'route-toast'
    });
};


// Componente para el control de ubicación
const LocationControl = ({ onLocationFound }) => {
    const map = useMap();

    const handleLocationClick = () => {
        map.locate({
            setView: true,
            maxZoom: 18
        });

        // Eliminar los listeners existentes antes de agregar nuevos
        map.off('locationfound');
        map.off('locationerror');
        
        map.on('locationfound', (e) => {
            showInfoToast("Buscando ubicación...");
            onLocationFound(e.latlng);
            
            const radius = e.accuracy / 2;
            
            // Limpiar marcadores anteriores
            map.eachLayer((layer) => {
                if (layer._type === 'userLocation') {
                    map.removeLayer(layer);
                }
            });

            const locationMarker = L.marker(e.latlng, {
                icon: L.divIcon({
                    html: '<div style="background-color: #2563eb; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                    className: 'user-location-marker'
                })
            });
            locationMarker._type = 'userLocation';
            
            const accuracyCircle = L.circle(e.latlng, {
                radius: radius,
                color: '#2563eb',
                fillColor: '#2563eb',
                fillOpacity: 0.15,
                weight: 1
            });
            accuracyCircle._type = 'userLocation';
            

            locationMarker.addTo(map);
            accuracyCircle.addTo(map);

        });

        map.on('locationerror', () => {
            showErrorToast('No se pudo acceder a tu ubicación. Por favor, verifica que hayas dado los permisos necesarios.');
        });
    };

    return (
        <div className="leaflet-control-container">
            <div className="leaflet-bottom leaflet-left">
                <div className="leaflet-control leaflet-bar">
                    <button 
                        onClick={handleLocationClick}
                        className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
                        title="Mostrar mi ubicación"
                    >
                        <FontAwesomeIcon icon={faLocationCrosshairs} className="text-gray-700" />
                    </button>
                </div>
            </div>
        </div>
    );
};

LocationControl.propTypes = {
    onLocationFound: PropTypes.func.isRequired
};

// Componente para el control de rutas
const RoutingControl = ({ userLocation, destination, onCancelRoute }) => {
    const map = useMap();
    const routingControlRef = useRef(null);
  
    useEffect(() => {
      // Primero, eliminar cualquier control de ruta existente
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
  
      // Eliminar cualquier otro control de ruta que pueda existir en el mapa
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control || layer instanceof L.Routing.Line) {
          map.removeLayer(layer);
        }
      });
  
      // Solo crear un nuevo control si tenemos ubicación y destino
      if (userLocation && destination) {
        showRouteInfoToast('Calculando ruta...');
        const control = L.Routing.control({
          waypoints: [
            L.latLng(userLocation.lat, userLocation.lng),
            L.latLng(destination.lat, destination.lng),
          ],
          show: false,
          fitSelectedRoutes: true,
          routeWhileDragging: false,
          addWaypoints: false,
          draggableWaypoints: false,
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            profile: 'walking',
            language: 'es',
          }),
          lineOptions: {
            styles: [{ color: '#2563eb', weight: 4, opacity: 0.7 }],
          },
          showAlternatives: false,
          createMarker: function () {
            return null;
          },
        }).addTo(map);
  
        routingControlRef.current = control;
 
        const bounds = L.latLngBounds([userLocation, destination]);
        map.fitBounds(bounds, { padding: [50, 50] });

        
      }
      return () => {
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      };

      
    }, [map, userLocation, destination]);
  
    const handleCancelRoute = () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
  
      // Eliminar todas las capas de ruta del mapa
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control || layer instanceof L.Routing.Line) {
          map.removeLayer(layer);
        }
      });
  
      // Restablecer el mapa a su vista inicial
      map.setView([4.806004, -75.760249], 20);
  
      onCancelRoute();
    };
  
    return destination && (
      <div className="leaflet-control-container">
        <div className="leaflet-bottom leaflet-right">
          <div className="leaflet-control leaflet-bar">
            <button
              onClick={handleCancelRoute}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
              title="Cancelar ruta"
            >
              <FontAwesomeIcon icon={faTimes} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    );
  };

RoutingControl.propTypes = {
    userLocation: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    destination: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    onCancelRoute: PropTypes.func.isRequired
};

const MapInterface = () => {
    const [puntosExteriores, setPuntosExteriores] = useState([]);
    const [estructuras, setEstructuras] = useState({});
    const [imagenes, setImagenes] = useState({});
    const [userLocation, setUserLocation] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [activeMarkerId, setActiveMarkerId] = useState(null);

    const UNIVERSIDAD_COORDS = { lat: 4.806004, lng: -75.760249 };
    const MIN_DISTANCE = 300; // metros

    const customIcon = new L.Icon({
        iconUrl: customMarkerIcon,
        iconSize: [25, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -32],
    });

    const calculateDistance = (point1, point2) => {
        const R = 6371e3; // Radio de la Tierra en metros
        const φ1 = point1.lat * Math.PI/180;
        const φ2 = point2.lat * Math.PI/180;
        const Δφ = (point2.lat - point1.lat) * Math.PI/180;
        const Δλ = (point2.lng - point1.lng) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    };

    const handleStartNavigation = (punto) => {
        if (!userLocation) {
            showInfoToast('Por favor, activa tu ubicación primero');
            return;
        }

        const distance = calculateDistance(userLocation, UNIVERSIDAD_COORDS);
        
        if (distance < MIN_DISTANCE) {
            showInfoToast('Si estas cerca o dentro de la Universidad te recomendamos preguntar o consultar nuestros puntos de interes');
            return;
        }

        setSelectedDestination({
            lat: punto.latitud,
            lng: punto.longitud
        });
        setActiveMarkerId(punto.id);
    };

    const handleCancelRoute = () => {
        setSelectedDestination(null);
        setActiveMarkerId(null);
    };

    useEffect(() => {
        const fetchPuntosExteriores = async () => {
            try {
                const response = await fetch('http://localhost:3000/puntos_exterior');
                if (!response.ok) {
                    throw new Error('Error al obtener los puntos exteriores');
                }
                const data = await response.json();
                setPuntosExteriores(data);

                const estructurasTemp = {};
                const imagenesTemp = {};
                
                for (const punto of data) {
                    const estructuraResponse = await fetch(`http://localhost:3000/estructura/${punto.id}`);
                    if (estructuraResponse.ok) {
                        const estructuraData = await estructuraResponse.json();
                        estructurasTemp[punto.id] = estructuraData;
                    }
                    
                    const imagenResponse = await fetch(`http://localhost:3000/imagen/${punto.id}`);
                    if (imagenResponse.ok) {
                        const imagenData = await imagenResponse.json();
                        if (imagenData && Array.isArray(imagenData) && imagenData.length > 0) {
                            imagenesTemp[punto.id] = imagenData[0];
                        }
                    }
                }
                
                setEstructuras(estructurasTemp);
                setImagenes(imagenesTemp);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPuntosExteriores();
    }, []);

    return (
        <div className="contenedor-bienvenidamap">
            <div className="navegacionDiv">
                <div className="boton-regreso">
                    <Link to="/">
                        <FontAwesomeIcon 
                            icon={faArrowRightFromBracket} 
                            rotation={180} 
                            style={{ color: 'white'}}
                        />
                    </Link>
                </div>
            </div>

            <div className="mapa">
                <MapContainer 
                    scrollWheelZoom={true} 
                    center={[4.806004, -75.760249]} 
                    zoom={20}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationControl onLocationFound={setUserLocation} />
                    {userLocation && selectedDestination && (
                        <RoutingControl 
                            userLocation={userLocation} 
                            destination={selectedDestination}
                            onCancelRoute={handleCancelRoute}
                        />
                    )}

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
                                                {imagenes[punto.id] && imagenes[punto.id].nombre ? (
                                                    <img 
                                                        src={`../client/src/assets/img/fotos/exterior/${imagenes[punto.id].nombre}.jpg`} 
                                                        alt={punto.nombre}
                                                    />
                                                ) : (
                                                    <div className="placeholder-image">
                                                        <span>No hay imagen disponible</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="infoPop">
                                                <div className="nomPop">
                                                    {estructuras[punto.id] && estructuras[punto.id].bloque ? (
                                                        <span className="bloquePop">
                                                            {estructuras[punto.id].bloque}
                                                        </span>
                                                    ) : (
                                                        <span>{punto.nombre}</span>
                                                    )}
                                                </div>
                                                <div className="buttonPop">
                                                    <Link 
                                                        to={`/viewEstructura?id=${punto.id}`} 
                                                        className="boton-out no-underline"
                                                    >
                                                        <button>
                                                            <FontAwesomeIcon icon={faInfo} />
                                                            <span>Ver más</span>
                                                        </button>
                                                    </Link>
                                                    {(!selectedDestination || activeMarkerId !== punto.id) && (
                                                        <button
                                                            onClick={() => handleStartNavigation(punto)}
                                                            className="route-button"
                                                        >
                                                            <FontAwesomeIcon icon={faRoute} />
                                                            <span>Ir aquí</span>
                                                        </button>
                                                    )}
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
            <div className="navegacionDiv2">
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="map-toast-container"
                    toastClassName="map-toast"
                />
            </div>
        </div>
    );
};

export default MapInterface;