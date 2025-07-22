import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="md:flex-1 md:p-6">
                <div className="md:overflow-y-auto md:h-[calc(100vh-60px)]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;