import React from 'react';
import AdminProfile from '../../../pages/Dashboard/AdminPages/AdminProfile';
import UserProfile from '../../../pages/Dashboard/UserPages/UserProfile';
import LoadingSpinner from '../../Loader/LoadingSpinner';
import useUser from '../../../hooks/useUser';

const Profile = () => {
    const {user, isLoading} = useUser();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const { role } = user;

    return (
        <>
            {role === 'admin' && <AdminProfile user={user} />}
            {role === 'user' && <UserProfile user={user} />}
        </>
    );
};

export default Profile;