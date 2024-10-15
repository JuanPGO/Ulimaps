import { useState, useEffect } from 'react';
import '../styles/crud.css';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, Table, Button, Pagination, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faMapLocationDot, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const CrudInterface = () => {
    const [datos, setDatos] = useState([]);
    const [tiposOptions, setTiposOptions] = useState([]);
    const [tiposVOptions, setTiposVOptions] = useState([]);
    const [puntoExtOptions, setPuntoExtOptions] = useState([]);
    const [estructurasOptions, setEstructurasOptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('1.1');
    const [tituloSeleccionado, setTituloSeleccionado] = useState('Puntos Interes Exterior');
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);

    const encabezados = {
        '1.1': ['ID', 'Nombre', 'Latitud', 'Longitud', 'Activo'],
        '1.2': ['ID', 'Bloque', 'Nombre', 'Tipo'],
        '1.3': ['ID', 'Nombre', 'Vehiculo', 'Tipo'],
        '1.4': ['ID', 'Nivel', 'Bloque', 'Estructura', 'Plano'],
        '1.5': ['ID', 'Nombre', 'Activo', 'Tipo', 'Bloque'],
        '1.6': ['ID', 'Nombre', 'Punto Exterior']
    };

    const formFields = {
        '1.1': [
            { name: 'Nombre', type: 'text' },
            { name: 'Latitud', type: 'number'},
            { name: 'Longitud', type: 'number'},
            { name: 'Activo (0 = Desactivado, 1 = Activo)', type: 'select', options: [0,1]},
            { name: 'ID Mapa', type: 'select', options: [1]}
        ],
        '1.2': [
            { name: 'Bloque', type: 'text' },
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe=> pe.nombre)},
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.3': [
            { name: 'Nombre', type: 'text' },
            { name: 'Vehiculo', type: 'select', options: tiposVOptions.map(t => t.vehiculo) },
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.4': [
            { name: 'Nivel', type: 'number' },
            { name: 'Estructura', type: 'select', options: estructurasOptions.map(es => es.bloque)},
            { name: 'Plano', type: 'text' }
        ],
        '1.5': [
            { name: 'Nombre', type: 'text' },
            { name: 'Activo (0 = Desactivado, 1 = Activo)', type: 'select', options: [0,1]},
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) },
            { name: 'Plano', type: 'text' }
        ],
        '1.6': [
            { name: 'Nombre', type: 'text' },
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe => pe.nombre)}
        ]
    };

    const editFormFields = {
        '1.1': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Latitud', type: 'number'},
            { name: 'Longitud', type: 'number'}
        ],
        '1.2': [
            { name: 'ID', type: 'number'},
            { name: 'Bloque', type: 'text' },
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe=> pe.nombre)},
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.3': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Vehiculo', type: 'select', options: tiposVOptions.map(t => t.vehiculo) },
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.4': [
            { name: 'ID', type: 'number'},
            { name: 'Nivel', type: 'number' },
            { name: 'Estructura', type: 'select', options: estructurasOptions.map(es => es.bloque)},
            { name: 'Plano', type: 'text' }
        ],
        '1.5': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Activo (0 = Desactivado, 1 = Activo)', type: 'select', options: [0,1]},
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo)},
            { name: 'Plano', type: 'text' }
        ],
        '1.6': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe => pe.nombre)}
        ]
    };

    const tipos = {
        '1.1': { ruta: 'puntos_exterior', titulo: 'Puntos Interes Exterior' },
        '1.2': { ruta: 'estructuras', titulo: 'Estructuras' },
        '1.3': { ruta: 'parqueaderos', titulo: 'Parqueaderos' },
        '1.4': { ruta: 'pisos', titulo: 'Pisos' },
        '1.5': { ruta: 'puntos_interior', titulo: 'Puntos Interes Interior' },
        '1.6': { ruta: 'imagenes', titulo: 'Imágenes' }
    };

    useEffect(() => {
        cargarDatos();
        cargarTipos();
        cargarTipoVehiculo();
        cargarPuntosExterior();
        cargarEstructuras();
    }, [tipoSeleccionado]);

    const cargarTipos = async () => {
        try {
            const response = await fetch('http://localhost:3000/tipos');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setTiposOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarTipoVehiculo = async () => {
        try {
            const response = await fetch('http://localhost:3000/tipo_vehiculo');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setTiposVOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarPuntosExterior = async () => {
        try {
            const response = await fetch('http://localhost:3000/obtener_punto_exterior');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setPuntoExtOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarEstructuras = async () => {
        try {
            const response = await fetch('http://localhost:3000/estructuras_form');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setEstructurasOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarDatos = async () => {
        try {
            const response = await fetch(`http://localhost:3000/${tipos[tipoSeleccionado].ruta}`);
            if (!response.ok) throw new Error('Error en la solicitud');
            
            const datosRecibidos = await response.json();
            setDatos(datosRecibidos);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setDatos([]);
        }
    };

    const handleSelectChange = (eventKey) => {
        setTipoSeleccionado(eventKey);
        setTituloSeleccionado(tipos[eventKey].titulo);
    };

    const handleShowModal = () => {
        setFormData({});
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleShowEditModal = (item) => {
        setSelectedItem(item);
        setFormData(item); // Cargar datos del elemento en formData para editar
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/${tipos[tipoSeleccionado].ruta}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al crear el elemento');
            }

            handleCloseModal();
            await cargarDatos();
        } catch (error) {
            console.error('Error al crear el elemento:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:3000/${tipos[tipoSeleccionado].ruta}/${selectedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar el elemento');
            }
    
            handleCloseEditModal();
            await cargarDatos();
        } catch (error) {
            console.error('Error al actualizar el elemento:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };
    
    const renderFormFields = (fields) => {
        return fields.map(({ name, type, options }) => (
            <Form.Group key={name} className="mb-3">
                <Form.Label>{name}</Form.Label>
                {type === 'select' ? (
                    <Form.Control
                        as="select"
                        name={name.toLowerCase()}
                        value={formData[name.toLowerCase()] || ""}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona una opción</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </Form.Control>
                ) : (
                    <Form.Control
                        type={type}
                        name={name.toLowerCase()}
                        value={formData[name.toLowerCase()] || ""}
                        onChange={handleInputChange}
                    />
                )}
            </Form.Group>
        ));
    };
    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(datos.length / itemsPerPage);

    const renderTableHeaders = () => {
        const headers = encabezados[tipoSeleccionado] || [];
        return headers.map((header) => (
            <th key={header} className={`text-center ${header === 'Nombre' || header === 'Bloque' ? 'text-left' : ''}`}>
                {header}
            </th>
        ));
    };

    const renderTableRows = () => {
        return currentItems.map((item, index) => (
            <tr key={index}>
                {Object.keys(item).map((key, idx) => {
                    const value = item[key];
                    const header = encabezados[tipoSeleccionado][idx];
                    
                    if (key === 'activo' && value === 1) {
                        return (
                            <td key={idx} className='contenido activo text-center'>
                                Activo
                            </td>
                        );
                    }
    
                    return (
                        <td key={idx} className={`contenido ${header === 'Nombre' || header === 'Bloque' || header === 'Punto Exterior' ? '' : 'text-center'}`}>
                            {value}
                        </td>
                    );
                })}
                <td className="contenido text-center">
                    <div className="acciones">
                        <div role="button" tabIndex={0} className="editar" onClick={() => handleShowEditModal(item)}>
                            <Button variant="primary" size='sm'>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                        </div>
                        <div role="button" tabIndex={0} className="creacionObjeto" onClick={handleShowModal}>
                            <Button variant="danger" size='sm'>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                        {(tipoSeleccionado === '1.1' || tipoSeleccionado === '1.5') && (
                            <div role="button" tabIndex={0} className="creacionObjeto" onClick={handleShowModal}>
                                <Button variant="secondary" size='sm'>
                                    <FontAwesomeIcon icon={faMapLocationDot} />
                                </Button>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        ));
    };


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
                <Nav variant="pills" activeKey={tipoSeleccionado}>
                    <NavDropdown 
                        title={tituloSeleccionado}
                        id="nav-dropdown" 
                        className='dropdownTitle'
                        onSelect={handleSelectChange}
                    >
                        <NavDropdown.Item eventKey="1.1">Puntos Interes Exterior</NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.2">Estructuras</NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.3">Parqueaderos</NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.4">Pisos</NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.5">Puntos Interes Interior</NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.6">Imagenes</NavDropdown.Item>
                    </NavDropdown>
                    <div role="button" tabIndex={0} className="creacionObjeto" onClick={handleShowModal}  onKeyDown={(e) => e.key === 'Enter' && handleShowModal()} > <Button variant="primary">Crear</Button> </div>
                </Nav>
            </div>

            <div className="contenedorTabla">
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead className='encabezado'>
                            <tr>
                                {renderTableHeaders()}
                                <th className='text-center'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </Table>
                </div>

                <Pagination>
                    <Pagination.First 
                        onClick={() => paginate(1)} 
                        disabled={currentPage === 1} 
                    />
                    <Pagination.Prev 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1} 
                    />

                    {currentPage > 3 && <Pagination.Ellipsis />}
                    
                    {[...Array(totalPages).keys()].slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)).map(number => (
                        <Pagination.Item 
                            key={number + 1} 
                            active={number + 1 === currentPage} 
                            onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}

                    {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                    
                    <Pagination.Next 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages} 
                    />
                    <Pagination.Last 
                        onClick={() => paginate(totalPages)} 
                        disabled={currentPage === totalPages} 
                    />
                </Pagination>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Crear {tituloSeleccionado}</Modal.Title>
                    
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {renderFormFields(formFields[tipoSeleccionado])}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div role="button" tabIndex={0} className="guardar"  onClick={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} ><Button variant="primary" type='summit'>Guardar</Button></div>
                    <div role="button" tabIndex={0} className="cerrar"  onClick={handleCloseModal} onKeyDown={(e) => e.key === 'Enter' && handleCloseModal()} ><Button variant="secondary">Cerrar</Button></div>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header>
                    <Modal.Title>Editar {tituloSeleccionado}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {renderFormFields(editFormFields[tipoSeleccionado])}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div role="button" tabIndex={0} className="guardar" onClick={handleEditSubmit} onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}>
                        <Button variant="primary" type="summit">Guardar Cambios</Button>
                    </div>
                    <div role="button" tabIndex={0} className="cerrar" onClick={handleCloseEditModal} onKeyDown={(e) => e.key === 'Enter' && handleCloseEditModal()}>
                        <Button variant="secondary">Cerrar</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CrudInterface;