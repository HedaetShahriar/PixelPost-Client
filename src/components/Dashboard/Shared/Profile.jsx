import React from 'react';
import AdminProfile from '../../../pages/Dashboard/AdminPages/AdminProfile';
import UserProfile from '../../../pages/Dashboard/UserPages/UserProfile';

const Profile = () => {
    const role = 'user'; // This should be dynamically set based on user role
    return (
        <>
            {role === 'admin' && <AdminProfile />}
            {role === 'user' && <UserProfile />}
        </>
    );
};

export default Profile;