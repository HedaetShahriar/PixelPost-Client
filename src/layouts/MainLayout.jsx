import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/ui/Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className='bg-base-100 min-h-screen'>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;