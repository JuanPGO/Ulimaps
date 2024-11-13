import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/viewEstructura.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Carousel, CarouselItem, Tabs, Tab, Table, Pagination } from 'react-bootstrap';


const ViewMoreInterface = () => {
    const [puntoExterior, setPuntoExterior] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [estructura, setEstructura] = useState(null);
    const [pisos, setPisos] = useState([]);
    const [puntosInteriores, setPuntosInteriores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const puntoId = searchParams.get('id');

    // Cálculos de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = puntosInteriores.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(puntosInteriores.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderTableRows = () => {
        return currentItems.map((punto, index) => (
          <tr key={index}>
            <td className="contenido text-center">{indexOfFirstItem + index + 1}</td>
            <td className="contenido text-center">{punto.nombreTipo}</td>
            <td className="contenido text-center">{punto.nombre}</td>
            <td className="contenido text-center">{punto.nivel}</td>
          </tr>
        ));
      };

    useEffect(() => {
        const fetchData = async () => {
            if (!puntoId) {
                setError('ID no proporcionado');
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Fetch punto exterior
                const response = await fetch(`http://localhost:3000/puntos_exterior/${puntoId}`);
                if (!response.ok) throw new Error(`Error al obtener el punto exterior: ${response.statusText}`);
                const data = await response.json();
                if (!data) throw new Error('Punto no encontrado');
                setPuntoExterior(data);

                // Fetch imágenes
                const imagenesResponse = await fetch(`http://localhost:3000/allImagenes/${puntoId}`);
                if (!imagenesResponse.ok) throw new Error('Error al obtener las imágenes');
                const imagenesData = await imagenesResponse.json();
                setImagenes(imagenesData || []);

                // Fetch estructura y datos relacionados
                const estructuraResponse = await fetch(`http://localhost:3000/estructura/${puntoId}`);
                if (estructuraResponse.ok) {
                    const estructuraData = await estructuraResponse.json();
                    setEstructura(estructuraData);

                    if (estructuraData) {
                        // Fetch pisos
                        const pisosResponse = await fetch(`http://localhost:3000/pisos/${puntoId}`);
                        if (pisosResponse.ok) {
                            const pisosData = await pisosResponse.json();
                            setPisos(pisosData || []);
                        }

                        // Fetch puntos interiores
                        const puntosInterioresResponse = await fetch(`http://localhost:3000/puntos_interior/${puntoId}`);
                        if (puntosInterioresResponse.ok) {
                            const puntosInterioresData = await puntosInterioresResponse.json();
                            const puntosActivos = puntosInterioresData.filter(punto => punto.activo === 1);
                            setPuntosInteriores(puntosActivos || []);
                        }
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [puntoId]);

    

    if (loading) return <div className="contenedorMore"><div className="loading">Cargando...</div></div>;
    if (error) return <div className="contenedorMore"><div className="error">Error: {error}</div></div>;

    return (
      <div className="contenedorMore">
          <div className="contenedor-interior5">
              <div className="mainTitulo">
                  <span>{puntoExterior ? puntoExterior.nombre : 'Punto no encontrado'}</span>
                  <Link to="/map" className="boton-navEstructura">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#000000" }} />
                  </Link>
              </div>
          </div>

          <div className="contenedor-interior6">
              {estructura ? (
                  // Si existe una estructura, mostrar todas las tabs
                  <Tabs defaultActiveKey="fotos" id="uncontrolled-tab-example" className="mb-3 tabs" fill>
                      <Tab eventKey="fotos" title="Fotos">
                          {imagenes && imagenes.length > 0 ? (
                              <Carousel className="carouselContainerImages">
                                  {imagenes.map((imagen) => (
                                      <CarouselItem key={imagen.id}>
                                          <img 
                                              src={`../client/src/assets/img/fotos/exterior/${imagen.nombre}.jpg`} 
                                              className="d-block w-100" 
                                              alt={`Imagen ${imagen.id}`}
                                              onError={(e) => {
                                                  console.error(`Error loading image: ${imagen.nombre}`);
                                                  e.target.src = '/assets/img/placeholder.jpg';
                                              }}
                                          />
                                      </CarouselItem>
                                  ))}
                              </Carousel>
                          ) : (
                              <div className="no-images-placeholder">
                                  <span>No hay imágenes disponibles</span>
                              </div>
                          )}
                      </Tab>
                      
                      <Tab eventKey="pisos" title="Pisos">
                          {pisos && pisos.length > 0 ? (
                              <Carousel className="carouselContainerPisos">
                                  {pisos.map((piso) => (
                                      <CarouselItem key={piso.id_piso}>
                                          <img 
                                              src={`../client/src/assets/img/fotos/interior/${piso.plano}.png`} 
                                              className="d-block w-100" 
                                              alt={`Plano piso ${piso.id_piso}`}
                                              onError={(e) => {
                                                  console.error(`Error loading floor plan: ${piso.plano}`);
                                                  e.target.src = '/assets/img/placeholder.jpg';
                                              }}
                                          />
                                      </CarouselItem>
                                  ))}
                              </Carousel>
                          ) : (
                              <div className="no-images-placeholder">
                                  <span>No hay planos disponibles</span>
                              </div>
                          )}
                      </Tab>

                      <Tab eventKey="puntosInteres" title="Puntos Interes">
                          <div className="table-container">
                              <div className="table-wrapper">
                                  <Table className="tablePuntos">
                                      <thead>
                                          <tr>
                                              <th style={{ width: '10%' }} className="text-center">#</th>
                                              <th style={{ width: '15%' }} className="text-center">Tipo</th>
                                              <th style={{ width: '55%' }} className="text-center">Punto Interes</th>
                                              <th style={{ width: '15%' }} className="text-center">Piso</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {renderTableRows()}
                                          {currentItems.length === 0 && (
                                              <tr>
                                                  <td colSpan="4" className="text-center">
                                                      No hay puntos de interés disponibles
                                                  </td>
                                              </tr>
                                          )}
                                      </tbody>
                                  </Table>
                              </div>

                              {puntosInteriores.length > 0 && (
                                  <div className="pagination-container">
                                      <Pagination>
                                          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                                          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

                                          {currentPage > 3 && <Pagination.Ellipsis />}

                                          {[...Array(totalPages).keys()]
                                              .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                                              .map((number) => (
                                                  <Pagination.Item
                                                      key={number + 1}
                                                      active={number + 1 === currentPage}
                                                      onClick={() => paginate(number + 1)}>
                                                      {number + 1}
                                                  </Pagination.Item>
                                              ))}

                                          {currentPage < totalPages - 2 && <Pagination.Ellipsis />}

                                          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                                          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                                      </Pagination>
                                  </div>
                              )}
                          </div>
                      </Tab>
                  </Tabs>
              ) : (
                  // Si no existe estructura, mostrar solo la tab de fotos
                  <Tabs defaultActiveKey="fotos" id="uncontrolled-tab-example" className="mb-3 tabs" fill>
                      <Tab eventKey="fotos" title="Fotos">
                          {imagenes && imagenes.length > 0 ? (
                              <Carousel className="carouselContainerImages">
                                  {imagenes.map((imagen) => (
                                      <CarouselItem key={imagen.id}>
                                          <img 
                                              src={`../client/src/assets/img/fotos/exterior/${imagen.nombre}.jpg`} 
                                              className="d-block w-100" 
                                              alt={`Imagen ${imagen.id}`}
                                              onError={(e) => {
                                                  console.error(`Error loading image: ${imagen.nombre}`);
                                                  e.target.src = '/assets/img/placeholder.jpg';
                                              }}
                                          />
                                      </CarouselItem>
                                  ))}
                              </Carousel>
                          ) : (
                              <div className="no-images-placeholder">
                                  <span>No hay imágenes disponibles</span>
                              </div>
                          )}
                      </Tab>
                  </Tabs>
              )}
          </div>
      </div>
  );
};

export default ViewMoreInterface;