import { useState, useEffect } from 'react';
import '../styles/crud.css';
import { useNavigate } from 'react-router-dom';
import { Nav, NavDropdown, Table, Pagination, Modal, Form, ModalFooter} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faKey, faMapLocationDot, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


const CrudInterface = () => {
    const [datos, setDatos] = useState([]);
    const [tiposOptions, setTiposOptions] = useState([]);
    const [tiposVOptions, setTiposVOptions] = useState([]);
    const [puntoExtOptions, setPuntoExtOptions] = useState([]);
    const [estructuraOptions, setEstructuraOptions] = useState([]);
    const [pisoOptions, setPisoOptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('1.1');
    const [tituloSeleccionado, setTituloSeleccionado] = useState('Puntos Interes Exterior');
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState({});
    const navigate = useNavigate();
    const [passwordData, setPasswordData] = useState({
        contraseña_anterior: '',
        nueva_contraseña: '',
        confirmar_nueva_contraseña: ''
    });


    const encabezados = {
        '1.1': ['ID', 'Nombre', 'Latitud', 'Longitud', 'Activo'],
        '1.2': ['ID', 'Estructura', 'Nombre', 'Tipo'],
        '1.3': ['ID', 'Nombre', 'Vehiculo', 'Tipo'],
        '1.4': ['ID', 'Nivel', 'Estructura', 'Punto Exterior', 'Plano'],
        '1.5': ['ID', 'Nombre', 'Activo', 'Tipo', 'Estructura', 'Plano'],
        '1.6': ['ID', 'Nombre', 'Punto Exterior']
    };

    const formFields = {
        '1.1': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Latitud', type: 'number'},
            { name: 'Longitud', type: 'number'},
            { name: 'Activo', type: 'select', options: [0,1]},
            { name: 'ID Mapa', type: 'select', options: [1]}
        ],
        '1.2': [
            { name: 'ID', type: 'number'},
            { name: 'Bloque', type: 'text' },
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe=> pe.nombre)},
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.3': [
            { name: 'ID', type: 'number'},
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe=> pe.nombre)},
            { name: 'Vehiculo', type: 'select', options: tiposVOptions.map(t => t.vehiculo) },
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.4': [
            { name: 'ID', type: 'number'},
            { name: 'Nivel', type: 'number' },
            { name: 'Estructura', type: 'select', options: estructuraOptions.map(es => es.bloque)},
            { name: 'Plano', type: 'text' }
        ],
        '1.5': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Activo', type: 'select', options: [0,1]},
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) },
            { name: 'Plano', type: 'select', options: pisoOptions.map(pi => pi.plano)}
        ],
        '1.6': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe => pe.nombre)}
        ]
    };

    const editFormFields = {
        '1.1': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Latitud', type: 'number'},
            { name: 'Longitud', type: 'number'},
        ],
        '1.2': [
            { name: 'ID', type: 'number'},
            { name: 'Bloque', type: 'text'},
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe=> pe.nombre)},
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.3': [
            { name: 'ID', type: 'number'},
            { name: 'Punto Exterior', type: 'select', options: puntoExtOptions.map(pe=> pe.nombre)},
            { name: 'Vehiculo', type: 'select', options: tiposVOptions.map(t => t.vehiculo) },
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo) }
        ],
        '1.4': [
            { name: 'ID', type: 'number'},
            { name: 'Nivel', type: 'number' },
            { name: 'Estructura', type: 'select', options: estructuraOptions.map(es => es.bloque)},
            { name: 'Plano', type: 'text' }
        ],
        '1.5': [
            { name: 'ID', type: 'number'},
            { name: 'Nombre', type: 'text' },
            { name: 'Tipo', type: 'select', options: tiposOptions.map(t => t.nombreTipo)},
            { name: 'Plano', type: 'select', options: pisoOptions.map(pi => pi.plano)}
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

    const tiposCreate = {
        '1.1': { ruta: 'puntos_exterior_create', titulo: 'Puntos Interes Exterior' },
        '1.2': { ruta: 'estructuras_create', titulo: 'Estructuras' },
        '1.3': { ruta: 'parqueaderos_create', titulo: 'Parqueaderos' },
        '1.4': { ruta: 'pisos_create', titulo: 'Pisos' },
        '1.5': { ruta: 'puntos_interior_create', titulo: 'Puntos Interes Interior' },
        '1.6': { ruta: 'imagenes_create', titulo: 'Imágenes' }
    };

    const tiposDelete = {
        '1.1': { ruta: 'puntos_exterior_delete', titulo: 'Puntos Interes Exterior' },
        '1.2': { ruta: 'estructuras_delete', titulo: 'Estructuras' },
        '1.3': { ruta: 'parqueaderos_delete', titulo: 'Parqueaderos' },
        '1.4': { ruta: 'pisos_delete', titulo: 'Pisos' },
        '1.5': { ruta: 'puntos_interior_delete', titulo: 'Puntos Interes Interior' },
        '1.6': { ruta: 'imagenes_delete', titulo: 'Imágenes' }
    };

    const passwordFormFields = [
        { name: 'Contraseña Anterior', type: 'password', key: 'contraseña_anterior' },
        { name: 'Nueva Contraseña', type: 'password', key: 'nueva_contraseña' },
        { name: 'Confirmar Nueva Contraseña', type: 'password', key: 'confirmar_nueva_contraseña' }
    ];

    useEffect(() => {
        cargarDatos();
        cargarTipos();
        cargarTipoVehiculo();
        cargarPuntosExterior();
        cargarEstructuras();
        cargarPisos();
    }, [tipoSeleccionado]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const cargarTipos = async () => {
        try {
            const response = await fetch('http://localhost:3000/tipos_load');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setTiposOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarTipoVehiculo = async () => {
        try {
            const response = await fetch('http://localhost:3000/tipo_vehiculo_load');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setTiposVOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarPuntosExterior = async () => {
        try {
            const response = await fetch('http://localhost:3000/punto_exterior_load');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setPuntoExtOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarEstructuras = async () => {
        try {
            const response = await fetch('http://localhost:3000/estructuras_load');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setEstructuraOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    }; 


    const cargarPisos = async () => {
        try {
            const response = await fetch('http://localhost:3000/pisos_load');
            if (!response.ok) throw new Error('Error en la solicitud');
            const tipos = await response.json();
            setPisoOptions(tipos);
        } catch (error) {
            console.error('Error al cargar tipos:', error);
        }
    };

    const cargarDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/${tipos[tipoSeleccionado].ruta}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    // Token expirado o inválido
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                    return;
                }
                throw new Error('Error en la solicitud');
            }
            const datosRecibidos = await response.json();
            setDatos(datosRecibidos);
            // ... resto de la lógica ...
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setDatos([]);
            setCurrentPage(1);
        }
    };

    const handleSelectChange = (eventKey) => {
        setTipoSeleccionado(eventKey);
        setTituloSeleccionado(tipos[eventKey].titulo);
        setCurrentPage(1); // Reiniciar a la página 1 al cambiar de evento
    };

    const handleShowModal = () => {
        const initialFormData = {};
        formFields[tipoSeleccionado].forEach(field => {
            const fieldName = field.name.toLowerCase().replace(/ /g, '_');
            initialFormData[fieldName] = '';
        });
        setFormData(initialFormData);
        setFormErrors({});
        setFormSuccess({});
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleShowEditModal = (item) => {
        setSelectedItem(item);
        const formattedData = {};
        const initialSuccess = {};
        Object.keys(item).forEach(key => {
            const formattedKey = key.toLowerCase().replace(/ /g, '_');
            formattedData[formattedKey] = item[key];
            initialSuccess[formattedKey] = true; // Marca todos los campos precargados como válidos
        });
        setFormData(formattedData);
        setFormSuccess(initialSuccess); // Inicializa el estado de éxito
        setFormErrors({}); // Limpia los errores
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);

    const handleShowDeleteModal = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handlePasswordModalShow = () => {
        setPasswordData({
            contraseña_anterior: '',
            nueva_contraseña: '',
            confirmar_nueva_contraseña: ''
        });
        setFormErrors({});
        setFormSuccess({});
        setShowPasswordModal(true);
    };

    const handlePasswordModalClose = () => {
        setShowPasswordModal(false);
        setPasswordData({
            contraseña_anterior: '',
            nueva_contraseña: '',
            confirmar_nueva_contraseña: ''
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevData => ({ ...prevData, [name]: value }));
        
        if (value.trim() !== '') {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
            setFormSuccess(prev => ({ ...prev, [name]: true }));
        } else {
            const field = passwordFormFields.find(f => f.key === name);
            setFormErrors(prev => ({ ...prev, [name]: `El campo ${field.name} es requerido` }));
            setFormSuccess(prev => ({ ...prev, [name]: false }));
        }
    };

    const validateForm = (data, fields) => {
        const errors = {};
        const success = {};
        fields.forEach(field => {
            const fieldName = field.name.toLowerCase().replace(/ /g, '_');
            // Ignore el campo ID si está vacío en el formulario de creación
            if (fieldName === 'id' && !data[fieldName] && !showEditModal) {
                success[fieldName] = true;
                return;
            }
            // Comprueba si el valor es undefined, null, una cadena vacía, o NaN para campos numéricos
            if (data[fieldName] === undefined || data[fieldName] === null || 
                (typeof data[fieldName] === 'string' && data[fieldName].trim() === '') ||
                (field.type === 'number' && isNaN(data[fieldName]))) {
                errors[fieldName] = `El campo ${field.name} es requerido`;
                success[fieldName] = false;
            } else {
                success[fieldName] = true;
            }
        });
        setFormErrors(errors);
        setFormSuccess(success);
        return Object.keys(errors).length === 0;
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showWarningToast = (message) => {
        toast.warn(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showSuccessToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(passwordData, passwordFormFields);
        if (Object.keys(errors).length > 0) {
            showWarningToast("Por favor, complete todos los campos requeridos.");
            return;
        }

        if (passwordData.nueva_contraseña !== passwordData.confirmar_nueva_contraseña) {
            setFormErrors(prev => ({
                ...prev,
                confirmar_nueva_contraseña: "Las contraseñas no coinciden"
            }));
            return;
        }
        const datosParaEnviar = {
            anterior: passwordData.contraseña_anterior,
            nueva: passwordData.nueva_contraseña,
            confirmar: passwordData.confirmar_nueva_contraseña
        };

        console.log('Cambio de contraseña:', datosParaEnviar);
        try {
            const response = await fetch(`http://localhost:3000/password_change`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosParaEnviar),
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar la contraseña');
            }
    
            handlePasswordModalClose();
            showSuccessToast('Contraseña actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            showErrorToast('Error al actualizar la contraseña');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        let fieldValue;
    
        if (type === 'number') {
            fieldValue = value === '' ? '' : Number(value);
        } else if (type === 'select-one') {
            fieldValue = value;
        } else {
            fieldValue = value;
        }
    
        setFormData(prevData => ({ ...prevData, [name]: fieldValue }));
        
        // Validar el campo
        if (value.trim() !== '' || (type === 'number' && !isNaN(fieldValue))) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
            setFormSuccess(prev => ({ ...prev, [name]: true }));
        } else {
            setFormErrors(prev => ({ ...prev, [name]: `El campo ${name.replace(/_/g, ' ')} es requerido` }));
            setFormSuccess(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(formData, formFields[tipoSeleccionado]);
        if (!isValid) {
            showWarningToast("Por favor, complete todos los campos requeridos.");
            return;
        }
        setFormErrors({});
        const obtenerDatosParaEnviar = () => {
            switch (tipoSeleccionado) {
                case '1.1':
                    return {
                        id: formData.id,
                        nombre: formData.nombre,
                        latitud: formData.latitud,
                        longitud: formData.longitud,
                        activo: formData.activo,
                        mapa: formData.id_mapa
                    };
                case '1.2':
                    return {
                        id: formData.id,
                        bloque: formData.bloque,
                        nombre: formData.punto_exterior,
                        nombreTipo: formData.tipo
                    };
                case '1.3':
                    return {
                        id: formData.id,
                        nombre: formData.punto_exterior,
                        vehiculo: formData.vehiculo,
                        nombreTipo: formData.tipo
                    };
                case '1.4':
                    return {
                        id: formData.id,
                        nivel: formData.nivel,
                        bloque: formData.estructura,
                        plano: formData.plano
                    };
                case '1.5':
                    return {
                        id: formData.id,
                        nombre: formData.nombre,
                        activo: formData.activo,
                        nombreTipo: formData.tipo,
                        plano: formData.plano
                    };
                case '1.6':
                    return {
                        id: formData.id,
                        nombre: formData.nombre,
                        puntoExterior: formData.punto_exterior
                    };
                default:
                    return {};
            }
        };
    
        const datosParaEnviar = obtenerDatosParaEnviar();
    
        console.log('Datos para actualizar:', datosParaEnviar);
    
        try {
            const response = await fetch(`http://localhost:3000/${tiposCreate[tipoSeleccionado].ruta}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosParaEnviar),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al crear el elemento');
            }
    
            handleCloseModal();
            await cargarDatos();
            showSuccessToast('Elemento creado exitosamente');
        } catch (error) {
            console.error('Error:', error);
            showErrorToast(error.message);
        }
    };
    

        
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(formData, editFormFields[tipoSeleccionado]);
        if (!isValid) {
            showWarningToast("Por favor, complete todos los campos requeridos.");
            return;
        }
        setFormErrors({});
        // Mapeo de campos dinámico según el tipo seleccionado
        const obtenerDatosParaEnviar = () => {
            switch (tipoSeleccionado) {
                case '1.1':
                    return {
                        id: selectedItem.id,
                        nombre: formData.nombre,
                        latitud: formData.latitud,
                        longitud: formData.longitud,
                        activo: formData.activo
                    };
                case '1.2':
                    return {
                        id: selectedItem.id,
                        bloque: formData.bloque,
                        nombre: formData.punto_exterior,
                        nombreTipo: formData.tipo
                    };
                case '1.3':
                    return {
                        id: selectedItem.id,
                        nombre: formData.punto_exterior,
                        vehiculo: formData.vehiculo,
                        nombreTipo: formData.tipo
                    };
                case '1.4':
                    return {
                        id: selectedItem.id,
                        nivel: formData.nivel,
                        bloque: formData.estructura,
                        plano: formData.plano
                    };
                case '1.5':
                    return {
                        id: selectedItem.id,
                        nombre: formData.nombre,
                        nombreTipo: formData.tipo,
                        plano: formData.plano
                    };
                case '1.6':
                    return {
                        id: selectedItem.id,
                        nombre: formData.nombre,
                        puntoExterior: formData.punto_exterior
                    };
                default:
                    return {};
            }
        };
    
        const datosParaEnviar = obtenerDatosParaEnviar();
    
        console.log('Datos para actualizar:', datosParaEnviar);
    
        try {
            const response = await fetch(`http://localhost:3000/${tipos[tipoSeleccionado].ruta}/${selectedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosParaEnviar),
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar el elemento');
            }
    
            handleCloseEditModal();
            await cargarDatos();
            showSuccessToast('Elemento actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el elemento:', error);
            showErrorToast('Error al actualizar el elemento');
        }
    };
    
    const changeEstado = async (item) => {
        // Obtener el nuevo estado basado en el estado actual
        const nuevoEstado = item.activo === 1 ? 0 : 1;
    
        // Mapeo de datos para enviar según el tipo seleccionado
        const obtenerDatosParaEnviar = () => {
            switch (tipoSeleccionado) {
                case '1.1':
                case '1.5':
                    return {
                        id: item.id,
                        activo: nuevoEstado,
                    };
                default:
                    return {};
            }
        };
    
        const datosParaEnviar = obtenerDatosParaEnviar();
    
        console.log('Datos para actualizar estado:', datosParaEnviar);
        
        // Determinar la URL correcta basada en tipoSeleccionado
        let url;
        switch (tipoSeleccionado) {
            case '1.1':
                url = `http://localhost:3000/puntos_exterior_estado/${item.id}`;
                break;
            case '1.5':
                url = `http://localhost:3000/puntos_interior_estado/${item.id}`;
                break;
            default:
                console.error('Tipo no soportado para cambio de estado');
                showErrorToast('Tipo no soportado para cambio de estado');
                return;
        }
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosParaEnviar),
                
            });
            
            if (!response.ok) {
                throw new Error('Error al actualizar el estado del elemento');
            }
    
            await cargarDatos();
            showSuccessToast(`Estado cambiado a ${nuevoEstado === 1 ? 'Activo' : 'Inactivo'}`);
        } catch (error) {
            console.error('Error al actualizar el estado del elemento:', error);
            showErrorToast('Error al actualizar el estado del elemento');
        }
    };
    

    const deleteObjeto = async () => {
        if (!itemToDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/${tiposDelete[tipoSeleccionado].ruta}/${itemToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el elemento');
            }

            await cargarDatos();
            handleCloseDeleteModal();
            showSuccessToast('Elemento eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el elemento:', error);
            showErrorToast('Error al eliminar el elemento');
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const renderFormFields = (fields, isEditForm = false) => {
        return (
            <>
                {fields.map(({ name, type, options }) => {
                    const fieldName = name.toLowerCase().replace(/ /g, '_');
                    return (
                        <Form.Group key={fieldName} className="mb-3">
                            <Form.Label>{name}</Form.Label>
                            {type === 'select' ? (
                                <Form.Control
                                    as="select"
                                    name={fieldName}
                                    value={formData[fieldName] !== undefined ? formData[fieldName] : ""}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors[fieldName]}
                                    isValid={!!formSuccess[fieldName]}
                                >
                                    <option value="">Selecciona una opción</option>
                                    {options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </Form.Control>
                            ) : (
                                <Form.Control
                                    type={type}
                                    name={fieldName}
                                    value={formData[fieldName] !== undefined ? formData[fieldName] : ""}
                                    onChange={handleInputChange}
                                    disabled={isEditForm && fieldName === 'id'}
                                    isInvalid={!!formErrors[fieldName]}
                                    isValid={!!formSuccess[fieldName]}
                                />
                            )}
                            <Form.Control.Feedback type="invalid">
                                {formErrors[fieldName]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    );
                })}
            </>
        );
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
                    
                    if (key === 'activo') {
                        return (
                            <td key={idx} className='contenido text-center'>
                                {value === 1 ? 'Activo' : 'Inactivo'}
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
                        <div className="editar">
                            <button className="btn btn-primary btn-sm" type='button' onClick={() => handleShowEditModal(item)}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        </div>
                        <div className="eliminar">
                            <button className='btn btn-danger btn-sm' type='button' onClick={() => handleShowDeleteModal(item)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>    
                        {(tipoSeleccionado === "1.1" || tipoSeleccionado === "1.5") && (
                            <div className="desactivar">
                                <button className='btn btn-success btn-sm' type='button' onClick={() => {changeEstado(item)}}>
                                    <FontAwesomeIcon icon={faMapLocationDot} />
                                </button>
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
                    {/* ... (código existente) */}
                    <div className="navExit">
                        <NavDropdown 
                            title={<FontAwesomeIcon icon={faBars} />} 
                            id="dropdown" 
                            className="boton-nav"
                            align="end"
                        >
                            <NavDropdown.Item onClick={handlePasswordModalShow}>
                                <FontAwesomeIcon icon={faKey} style={{ marginRight: '10px' }} /> Cambiar Contraseña
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} style={{ marginRight: '10px' }} /> Salir
                            </NavDropdown.Item>
                        </NavDropdown>
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
                        <div className="creacionObjeto"> 
                            <button type='button' className='btn btn-primary' onClick={handleShowModal}>Crear</button> 
                        </div>
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

            
            <ToastContainer />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Crear {tituloSeleccionado}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {renderFormFields(formFields[tipoSeleccionado])}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='guardar'>
                        <button type='submit' className='btn btn-success' onClick={handleSubmit}>Guardar</button>
                    </div>
                    <div className='cerrar'>
                        <button type='button' className='btn btn-secondary' onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header>
                    <Modal.Title>Editar {tituloSeleccionado}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        {renderFormFields(editFormFields[tipoSeleccionado], true)}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="guardar">
                        <button type='submit' className='btn btn-success' onClick={handleEditSubmit}>Guardar Cambios</button>
                    </div>
                    <div className='cerrar'>
                        <button type='button' className='btn btn-secondary' onClick={handleCloseEditModal}>Cerrar</button>
                    </div>
                </Modal.Footer>
            </Modal>


            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>
                    <div className="cancelar">
                        <button type='button' className='btn btn-secondary' onClick={handleCloseDeleteModal}>
                            Cancelar
                        </button>
                    </div>
                    <div className='eliminar'>
                        <button type='button' className='btn btn-danger' onClick={deleteObjeto}>
                            Eliminar
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal show={showPasswordModal} onHide={handlePasswordModalClose}>
            <Modal.Header>
                <Modal.Title>Cambiar Contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePasswordSubmit}>
                    {passwordFormFields.map(field => (
                        <Form.Group key={field.key} className="mb-3">
                            <Form.Label>{field.name}</Form.Label>
                            <Form.Control
                                type={field.type}
                                name={field.key}
                                value={passwordData[field.key]}
                                onChange={handlePasswordChange}
                                isInvalid={!!formErrors[field.key]}
                                isValid={!!formSuccess[field.key]}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors[field.key]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    ))}
                    <ModalFooter>
                        <div className="guardar">
                            <button 
                                type="submit" 
                                className='btn btn-success' 
                                onClick={handlePasswordSubmit}
                            >
                                Cambiar Contraseña
                            </button>
                        </div>
                        <div className="cerrar">
                            <button type='button' className='btn btn-danger' onClick={handlePasswordModalClose}>Cerrar</button>
                        </div>
                    </ModalFooter>
                </Form>
            </Modal.Body>
        </Modal>
        </div>
    );
};

export default CrudInterface;