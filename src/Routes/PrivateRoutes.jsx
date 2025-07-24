import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/Loader/LoadingSpinner';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }
    if(user) {
        return children;
    }
    return <Navigate to="/auth/login" state={{ from: location }} replace={true} />;
};

export default PrivateRoutes;