// archivo crud.jsx
import '../styles/crud.css';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CrudInterface = () => {
    return (
        <div className="contenedorCrud">
            <div className="navHeader">
                <div className="navTitulo">
                    <h1>Panel de Control</h1>
                </div>
                <div className="navExit">
                    <Link to="/login" className="boton-nav">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ color: "#ffffff" }} />
                    </Link>
                </div>
            </div>

            <div className="contenedorNav">
                <Nav variant="pills" activeKey="1">
                    <NavDropdown title="Punto Interés Exterior" id="nav-dropdown" className='dropdownTitle'>
                        <NavDropdown.Item eventKey="1.1">Edificios</NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.2">Parqueaderos</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Pisos" id="nav-dropdown" className='dropdownTitle'>
                        <NavDropdown.Item eventKey="2.1">Algo</NavDropdown.Item>
                        <NavDropdown.Item eventKey="2.2">Algo</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Punto Interés Interno" id="nav-dropdown" className='dropdownTitle'>
                        <NavDropdown.Item eventKey="3.1">Algo aquí</NavDropdown.Item>
                        <NavDropdown.Item eventKey="3.2">Otra acción</NavDropdown.Item>
                        <NavDropdown.Item eventKey="3.3">Algo más</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>

            <div className="contenedorTabla">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>Activo</th>
<<<<<<< HEAD:Ulimaps/src/views/crud.tsx
                            <th className='headerEdit'>Acciones</th>
                            
=======
                            <th>Acciones</th>
>>>>>>> 5c481509a0773a4fa023dfd6629a9fbb0b5440fc:Ulimaps/client/src/views/crud.jsx
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Daniel Becerra</td>
                            <td>5000</td>
                            <td>6000</td>
                            <td>Activo</td>
<<<<<<< HEAD:Ulimaps/src/views/crud.tsx
                            <td className='columnaEdit'>
                                <Button variant="primary" size='sm' className='accionButton'>

=======
                            <td>
                                <Button variant="primary" size='sm'>
>>>>>>> 5c481509a0773a4fa023dfd6629a9fbb0b5440fc:Ulimaps/client/src/views/crud.jsx
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
<<<<<<< HEAD:Ulimaps/src/views/crud.tsx
                                <Button variant="danger" size='sm' className='accionButton'>

=======
                                <Button variant="danger" size='sm'>
>>>>>>> 5c481509a0773a4fa023dfd6629a9fbb0b5440fc:Ulimaps/client/src/views/crud.jsx
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Daniel Becerra</td>
                            <td>5000</td>
                            <td>6000</td>
                            <td>Inactivo</td>
                            <td className='columnaEdit'>
                                <Button variant="primary" size='sm' className='accionButton'>

                                    <FontAwesomeIcon icon={faPen} />

                                </Button>
                                <Button variant="danger" size='sm' className='accionButton'>

                                    <FontAwesomeIcon icon={faTrash} />

                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Daniel Becerra</td>
                            <td>5000</td>
                            <td>6000</td>
                            <td>Activo</td>
                            <td className='columnaEdit'>
                                <Button variant="primary" size='sm' className='accionButton'>

                                    <FontAwesomeIcon icon={faPen} />

                                </Button>
                                <Button variant="danger" size='sm' className='accionButton'>

                                    <FontAwesomeIcon icon={faTrash} />

                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default CrudInterface;
