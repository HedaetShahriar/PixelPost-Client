import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className='bg-base-100 min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;