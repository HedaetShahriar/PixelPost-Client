import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader/Loader';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }
    if(user) {
        return children;
    }
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;