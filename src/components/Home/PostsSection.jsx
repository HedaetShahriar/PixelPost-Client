import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { ArrowDown01, NutOffIcon } from 'lucide-react';

const PostsSection = ({ postsData }) => {
    const { posts } = postsData;
    const [localPosts, setLocalPosts] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    // Reset localPosts whenever posts prop changes (create a fresh copy)
    useEffect(() => {
        setLocalPosts([...posts]);
        setIsSorted(false);
    }, [posts]);

    const handleSortByVotes = () => {
        if (isSorted) {
            // revert to original order from prop
            setLocalPosts([...posts]);
            setIsSorted(false);
        } else {
            const sorted = [...localPosts].sort((a, b) => a.voteDifference - b.voteDifference);
            setLocalPosts(sorted);
            setIsSorted(true);
        }
    };

    return (
        <div className="pb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Recent Posts</h2>
                <button onClick={handleSortByVotes} className="btn btn-ghost">
                    Short by Votes
                    {
                        isSorted ? (
                            <ArrowDown01 className="ml-2 rotate-180" size={20} />
                        ) : (
                            <ArrowDown01 className="ml-2" size={20} />
                        )
                    }
                </button>
            </div>

            {localPosts.length === 0 ? (
                <div className="h-30 flex flex-col items-center justify-center text-center text-gray-400">
                    <NutOffIcon className="w-12 h-12 mb-4" />
                    <p className="text-xl">No posts found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {localPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostsSection;
