import { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
    Trash2,
    MessageSquareMore,
    Search,
    ThumbsUp,
    ThumbsDown,
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Pagination from '../../../components/ui/Pagination';
import { set } from 'react-hook-form';
import LoadingSpinner from '../../../components/Loader/LoadingSpinner';
import Swal from 'sweetalert2';

const MyPosts = () => {
    const { user, loading } = useAuth();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: data, isLoading: isPostsLoading } = useQuery({
        queryKey: ['myPosts', user?.email, page],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/posts/my-posts?page=${page}&email=${encodeURIComponent(user?.email)}`);
            return data;
        },
        enabled: !!user?.email && !loading,
    });

    if (isPostsLoading) {
        return <LoadingSpinner />;
    }
    // console.log('My Posts:', data, isPostsLoading);
    const {myPosts, totalPages} = data;

    const handleDelete = async (id) => {
        try{
            await axiosSecure.delete(`/posts/my-posts/${id}?email=${encodeURIComponent(user?.email)}`);
            queryClient.invalidateQueries(['myPosts', user?.email, page]);
            Swal.fire("Deleted", "Post deleted successfully", "success");
        }catch (error) {
            console.error("Error deleting post:", error);
            Swal.fire("Error", "Failed to delete post", "error");
        }

    };

    const filteredPosts = myPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Posts: {myPosts.length}</h2>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search posts..."
                        className="pl-8 pr-3 py-1.5 text-sm border rounded-md border-gray-400 focus:outline-none "
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md border bg-base-200 border-gray-300 shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-base-300 font-medium">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-center">Votes</th>
                            <th className="p-3 text-center">Comments</th>
                            <th className="p-3 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.length ? (
                            filteredPosts.map((post) => (
                                <tr
                                    key={post._id}
                                    className="border-t border-gray-300 hover:bg-base-100 transition"
                                >
                                    <td className="p-3"><Link to={`/post/${post._id}`} className=" hover:underline">{post.title}</Link></td>
                                    <td className="p-3 text-center font-medium text-green-600">
                                        {/* {post.upVote - post.downVote} */}
                                        {/* {post.upVote} Likes - {post.downVote} Dislikes */}
                                        <span className="flex items-center justify-center gap-4">
                                            <span className="flex items-center gap-1 text-green-600">
                                                <ThumbsUp className="w-4 h-4" /> {post.upVote}
                                            </span>
                                            <span className="flex items-center gap-1 text-red-600">
                                                <ThumbsDown className="w-4 h-4" /> {post.downVote}
                                            </span>
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <Link
                                            to={`/dashboard/comments/${post._id}`}
                                            className="text-blue-500 hover:underline cursor-pointer"
                                            title="View Comments"
                                        >
                                            <MessageSquareMore className="w-4 h-4 mr-1 inline" />{post?.commentsCount} view
                                        </Link>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="text-red-500 hover:text-red-600"
                                            title="Delete Post"
                                        >
                                            <Trash2 className="w-4 h-4 mx-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    No posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {/* Pagination */}
            {totalPages > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            )}
        </div>
    );
};

export default MyPosts;
