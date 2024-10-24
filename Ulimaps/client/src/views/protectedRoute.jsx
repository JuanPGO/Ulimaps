import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/verify-token', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Token inválido');
                }
            } catch (error) {
                console.error('Error al verificar el token:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
        };

        verifyToken();
    }, [token, navigate]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;