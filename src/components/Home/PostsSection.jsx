import PostCard from './PostCard';
import { ArrowDownAZ, NutOffIcon } from 'lucide-react';
import { useState } from 'react';

const PostsSection = ({ postsData, setPage }) => {
    const { posts, totalPages } = postsData;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        setPage(page);
    };
    console.log('Posts:', posts, totalPages);

    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="pb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Recent Posts</h2>
                <button className="btn btn-ghost">
                    Sort by Popularity
                    <ArrowDownAZ className="ml-2" size={20} />
                </button>
            </div>

            {posts.length === 0 ? (
                <div className="h-30 flex flex-col items-center justify-center text-center text-gray-400">
                    <NutOffIcon className="w-12 h-12  mb-4" />
                    <p className='text-xl'>No posts found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PostsSection;
