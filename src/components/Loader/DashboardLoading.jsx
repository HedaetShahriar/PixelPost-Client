import { Loader2 } from 'lucide-react';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
const DashboardLoading = () => {
    return (
        <>
            <Sidebar />
            <div className="flex items-center justify-center h-screen md:h-[calc(100vh-60px)]">
                <Loader2 className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
            </div>
        </>
    );
};

export default DashboardLoading;