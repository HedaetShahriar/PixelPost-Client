import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Banner = ({setSearchTerm}) => {
    const {handleSubmit, register} = useForm();
    const onSubmit = (data) => {
        setSearchTerm(data.search);
    };
    return (
        <div
            className="hero min-h-[400px]"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Join The Conversation</h1>
                    <p className="mb-5">Explore topics, share your ideas, and connect with a community of creators and thinkers. Search for posts by tags below.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="join w-full">
                        <input
                            type="text"
                            placeholder="Search by tags (e.g., tech, art)"
                            className="input input-bordered join-item w-full text-gray-800"
                            {...register('search', { value: '' })}
                        />
                        <button
                            type='submit'
                            className="btn btn-primary join-item">
                            <Search size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;