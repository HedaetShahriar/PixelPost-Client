import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen md:h-[calc(100vh-60px)]">
            <Loader2 className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
        </div>
    );
};

export default LoadingSpinner;