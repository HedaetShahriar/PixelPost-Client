// Pages/PostDetails/PostDetails.jsx
import { useParams, Link, useLocation } from 'react-router';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Send } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share';
import { useState } from 'react';
import LoadingSpinner from '../components/Loader/LoadingSpinner';

const PostDetails = () => {
    const { postId } = useParams();
    const axios = useAxios();
    // console.log('Post ID:', postId);
    const { user } = useAuth();
    const location = useLocation();
    const queryClient = useQueryClient();
    const { handleSubmit, register, reset } = useForm();
    const [showShare, setShowShare] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { data: post, isLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: async () => {
            const response = await axios.get(`/posts/${postId}`);
            return response.data;
        },
    });

    const { data: comments, isLoading: isCommentsLoading } = useQuery({
        queryKey: ['postComments', postId],
        queryFn: async () => {
            const response = await axios.get(`/posts/${postId}/comments`);
            return response.data;
        },
    });

    if (isLoading || isCommentsLoading) {
        return <LoadingSpinner />;
    }
    const {
        _id,
        authorImage,
        authorName,
        authorEmail,
        title: postTitle,
        description: postDescription,
        tag: tags,
        postedOn: postTime,
        upVote,
        downVote,
        commentsCount,
        image,
    } = post;
    
    const shareUrl = `${location.origin}/post/${_id}`;
    const shareTitle = postTitle;

    const onSubmit = async (data) => {
        const comment = {
            postId: _id,
            commentatorName: user?.displayName || "Anonymous",
            commentatorImage: user?.photoURL,
            commentatorEmail: user?.email,
            postTitle: postTitle,
            comment: data.commentText.trim(),
            commentedAt: new Date().toISOString(),
        };

        try {
            await axios.post(`/posts/${_id}/comments`, comment);
            queryClient.invalidateQueries(['postComments', postId]);
            reset();
            Swal.fire("Success", "Comment added successfully", "success");
        } catch (error) {
            console.error("Error submitting comment:", error);
            Swal.fire("Error", "Failed to add comment", "error");
        }
    }

    const handleVote = async (postId, action) => {
        if (!user) {
            Swal.fire("Error", "You must be logged in to vote", "error");
            return;
        }
        try {
            await axiosSecure.patch(`/posts/${postId}/vote?email=${encodeURIComponent(user?.email)}`, { action });
            queryClient.invalidateQueries(['post', postId]);
        } catch (error) {
            console.error("Error voting on post:", error);
        }
    }


    return (
        <div className="bg-base-100 py-12">
            <div className="container mx-auto">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex bg-base-100 border border-gray-200 rounded-3xl hover:border-gray-400 transition-all duration-300 shadow-sm">
                        {/* Content Section */}
                        <div className="flex-grow p-4">
                            {/* Post Info Header */}
                            <div className="flex items-center text-xl mb-2">
                                <img src={authorImage} alt="Author" className="w-10 h-10 rounded-full mr-2" />
                                <span className="font-bold">{authorName}</span>
                                <span className="mx-1">•</span>
                                <span>Posted {new Date(postTime).toLocaleDateString()}</span>
                            </div>

                            <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3'>
                                {/* Post Title */}
                                <h2 className="text-4xl font-bold mb-2">
                                    <Link to={`/post/${_id}`} className="hover:underline">{postTitle}</Link>
                                </h2>

                                {/* Post Tag */}
                                <div className="badge badge-primary text-xl mb-3 capitalize">{tags}</div>
                            </div>

                            {/* Post Description */}
                            <p className="text-xl mb-4 whitespace-pre-line">
                                {postDescription}
                            </p>
                            {/* Image section if available */}
                            {image && (
                                <div className="mb-4 flex justify-center">
                                    <img
                                        src={image}
                                        alt={postTitle}
                                        className="max-w-xl w-full rounded-lg object-cover"
                                        style={{ maxHeight: 400 }}
                                    />
                                </div>
                            )}
                            {/* Action Buttons */}
                            <div className="flex items-center text-xl">
                                <div className="flex flex-1 md:gap-4 gap-2">
                                    {/* Vote Section */}
                                    <button
                                        onClick={() => handleVote(_id, 'upVote')}
                                        className="btn btn-ghost btn-sm p-1 hover:bg-green-100 hover:text-green-600">
                                        <ThumbsUp size={28} />
                                    </button>
                                    <span className="font-bold text-xl">{upVote - downVote}</span>
                                    <button
                                        onClick={() => handleVote(_id, 'downVote')}
                                        className="btn btn-ghost btn-sm p-1 hover:bg-red-100 hover:text-red-600">
                                        <ThumbsDown size={28} />
                                    </button>
                                </div>
                                <div className="flex flex-1 justify-center">
                                    <Link to={`/post/${_id}#comments`} className="btn btn-ghost btn-sm text-xl flex items-center">
                                        <MessageCircle fill="none" size={28} />
                                        {commentsCount}
                                        <span className='hidden md:inline'> Comments</span>
                                    </Link>
                                </div>
                                <div className="flex flex-1 justify-end relative">
                                    <button
                                        className="btn btn-ghost btn-sm text-xl flex items-center gap-1"
                                        onClick={() => setShowShare(prev => !prev)}
                                        type="button"
                                    >
                                        <Share2 size={24} />
                                        <span>Share</span>
                                    </button>
                                    {showShare && (
                                        <div className="absolute right-0 top-10 bg-white border rounded shadow-lg z-10 flex gap-2 p-2">
                                            <FacebookShareButton url={shareUrl} quote={shareTitle}>
                                                <FacebookIcon size={32} round />
                                            </FacebookShareButton>
                                            <TwitterShareButton url={shareUrl} title={shareTitle}>
                                                <TwitterIcon size={32} round />
                                            </TwitterShareButton>
                                            <WhatsappShareButton url={shareUrl} title={shareTitle}>
                                                <WhatsappIcon size={32} round />
                                            </WhatsappShareButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div id="comments" className="mt-8 bg-base-100 p-6 border-gray-200 rounded-3xl shadow-sm">
                        <h3 className="text-2xl font-bold mb-6">Comments </h3>
                        {/* Comment Form */}
                        {user ? (
                            <div className="flex items-start space-x-4 mb-8">
                                <img src={user.photoURL || 'https://placehold.co/40x40'} alt="Your avatar" className="w-12 h-12 rounded-full" />
                                <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
                                    <textarea
                                        {...register("commentText", { required: true })}
                                        className="textarea textarea-bordered w-full focus:outline-none"
                                        placeholder="Add your comment..."
                                    ></textarea>
                                    <button
                                        className="btn btn-primary btn-sm mt-4"
                                        type="submit"
                                        disabled={!user}
                                    >
                                        <Send size={16} className="mr-2" />
                                        Submit Comment
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center p-4 border rounded-lg bg-base-200 mb-8">
                                <p>You must be logged in to comment.</p>
                                <Link to="/auth/login" state={{ from: location }} className="btn btn-primary btn-sm mt-2">Login</Link>
                            </div>
                        )}

                        {/* Existing Comments */}
                        <div className="space-y-6">
                            {comments.map(comment => (
                                <div key={comment._id} className="flex items-center space-x-4">
                                    <img src={comment.commentatorImage} alt={comment.commentatorName} className="w-12 h-12 rounded-full" />
                                    <div className="flex-1">
                                        <p className="font-bold text-xl">{comment.commentatorName}</p>
                                        <p className="text-lg">{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
