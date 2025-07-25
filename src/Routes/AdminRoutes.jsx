import React from 'react';
import { Navigate } from 'react-router';
import LoadingSpinner from '../components/Loader/LoadingSpinner';
import useUser from '../hooks/useUser';
import DashboardLoading from '../components/Loader/DashboardLoading';

const AdminRoutes = ({children}) => {
    const { user, isLoading } = useUser();
    if (isLoading) {
        return <DashboardLoading />;
    }
    if (user?.role === 'admin') {
        return children;
    }
    return <Navigate to="/" replace={true} />;
};

export default AdminRoutes;