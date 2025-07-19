import React from 'react';
import { Search } from 'lucide-react';

const Banner = () => {
    return (
        <div 
            className="hero min-h-[400px]" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Join The Conversation</h1>
                    <p className="mb-5">Explore topics, share your ideas, and connect with a community of creators and thinkers. Search for posts by tags below.</p>
                    <div className="join w-full">
                        <input 
                            type="text" 
                            placeholder="Search by tags (e.g., tech, art)" 
                            className="input input-bordered join-item w-full text-gray-800" 
                        />
                        <button className="btn btn-primary join-item">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;