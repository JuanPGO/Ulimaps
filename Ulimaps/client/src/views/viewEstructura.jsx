//archivo viewMore.jsx
import { Link } from 'react-router-dom';
import '../styles/viewEstructura.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';

const ViewMoreInterface = () => {

    return(
        <div className="contenedorMore">

            <div className="contenedor-interior5">

                <div className="mainTitulo">
                    <span>Edificio Daniel Becerra Piedrahita</span>

                    <Link to="/map" className="boton-navEstructura">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#ffffff" }} />
                    </Link>

                </div>

                <div className="mainImagenes">

                    <Carousel className='carouselContainerImages'>

                        <CarouselItem>
                            <img src="./client/src/assets/img/fotos/fotoBienvenida.jpg" className="d-block" alt=""/>
                        
                        </CarouselItem> 

                        <CarouselItem>
                            <img src="./client/src/assets/img/fotos/foto2.jpg" className="d-block" alt="" />
                        
                        </CarouselItem> 

                    </Carousel>

                </div>

            </div>

            <div className="contenedor-interior6">

                <div className="infoEstructura">
                    <span>Pisos</span>
                </div>

                <div className="mainPlanos">

                <Carousel className='carouselContainerPlanos'>

                    <CarouselItem>
                        <img src="./client/src/assets/img/fotos/fotoBienvenida.jpg" className="d-block" alt=""/>
                        <CarouselCaption>
                            <h5 className='pisoName'>Piso 1</h5>
                        </CarouselCaption>
                    </CarouselItem> 

                    <CarouselItem>
                        <img src="./client/src/assets/img/fotos/foto2.jpg" className="d-block" alt="" />
                        <CarouselCaption>
                            <h5 className='pisoName'>Piso 2</h5>
                        </CarouselCaption>
                    </CarouselItem> 

                </Carousel>


                </div>

            </div>

        </div>
    );
};

export default ViewMoreInterface;