//archivo viewMore.jsx
import { Link } from 'react-router-dom';
import '../styles/viewEstructura.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Carousel, CarouselItem, CarouselCaption, Tabs, Tab, Table } from 'react-bootstrap';

const ViewMoreInterface = () => {

    return(
        <div className="contenedorMore">

            <div className="contenedor-interior5">
                
                <div className="mainTitulo">
                        <span>Edificio Daniel Becerra Piedrahita</span>

                        <Link to="/map" className="boton-navEstructura">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#000000" }} />
                        </Link>

                </div>

            </div>

            <div className="contenedor-interior6">

                <Tabs defaultActiveKey="fotos" id="uncontrolled-tab-example" className="mb-3 tabs" fill >
                    <Tab eventKey="fotos" title="Fotos">

                        <Carousel className='carouselContainerImages'>

                            <CarouselItem>
                                <img src="./client/src/assets/img/fotos/fotoBienvenida.jpg" className="d-block" alt=""/>

                            </CarouselItem>

                            <CarouselItem>
                                <img src="./client/src/assets/img/fotos/foto2.jpg" className="d-block" alt="" />

                            </CarouselItem>

                        </Carousel>
                        
                    </Tab>
                    <Tab eventKey="pisos" title="Pisos">

                        <Carousel className='carouselContainerPisos'>

                            <CarouselItem>
                                <img src="./client/src/assets/img/fotos/fotoBienvenida.jpg" className="d-block" alt=""/>

                            </CarouselItem>

                            <CarouselItem>
                                <img src="./client/src/assets/img/fotos/foto2.jpg" className="d-block" alt="" />

                            </CarouselItem>

                        </Carousel>

                        
                    </Tab>
                    <Tab eventKey="puntosInteres" title="Puntos Interes">
                        <Table className='tablePuntos' style={{ width: "94%" }}>
                            <thead>
                                <tr>
                                <th style={{ width: "10%" }}>#</th>
                                <th style={{ width: "80%" }}>Punto Interes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry the Bird</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>

                </Tabs>

            </div>

        </div>
    );
};

export default ViewMoreInterface;