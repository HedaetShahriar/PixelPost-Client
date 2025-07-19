// Pages/PostDetails/PostDetails.jsx
import { useParams, Link, useLocation } from 'react-router';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Send } from 'lucide-react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import useAuth from '../hooks/useAuth';

// Placeholder posts - will be fetched from API
const posts = [
    { _id: '1', image: 'https://placehold.co/100x100/f97316/ffffff?text=X', authorImage: 'https://placehold.co/100x100/f97316/ffffff?text=A', authorName: 'user_dev', postTitle: 'The Future of Web Development in 2025', postDescription: 'An in-depth look at the trends shaping the future of web development, from serverless architectures to the rise of AI-powered coding assistants and the evolution of frontend frameworks.', tags: 'tech', postTime: new Date(), commentsCount: 12, voteDifference: 45 },
    { _id: '2', image: 'https://placehold.co/100x100/10b981/ffffff?text=X', authorImage: 'https://placehold.co/100x100/10b981/ffffff?text=A', authorName: 'healthguru', postTitle: 'A Comprehensive Guide to Healthy Living and Nutrition', postDescription: 'Discover the secrets to a healthier lifestyle. This guide covers everything from balanced diets and workout routines to mental wellness and stress management techniques.', tags: 'health', postTime: new Date(), commentsCount: 5, voteDifference: 30 },
    { _id: '3', image: 'https://placehold.co/100x100/3b82f6/ffffff?text=X', authorImage: 'https://placehold.co/100x100/3b82f6/ffffff?text=A', authorName: 'wanderlust', postTitle: 'Exploring the Breathtaking Landscapes of the Alps', postDescription: 'Join me on a visual journey through the stunning Swiss Alps. This post features breathtaking photos, travel tips, and stories from my latest adventure in the mountains.', tags: 'travel', postTime: new Date(), commentsCount: 23, voteDifference: 22 },
    { _id: '4', image: 'https://placehold.co/100x100/8b5cf6/ffffff?text=X', authorImage: 'https://placehold.co/100x100/8b5cf6/ffffff?text=A', authorName: 'react_master', postTitle: 'Advanced State Management Patterns in React', postDescription: 'Tired of prop-drilling? This post dives deep into advanced state management solutions like Zustand, Jotai, and how they compare to traditional tools like Redux and Context API.', tags: 'programming', postTime: new Date(), commentsCount: 8, voteDifference: 15 },
    { _id: '5', image: 'https://placehold.co/100x100/ec4899/ffffff?text=X', authorImage: 'https://placehold.co/100x100/ec4899/ffffff?text=A  ', authorName: 'designer_life', postTitle: 'The Unspoken Principles of Minimalist Design', postDescription: 'Minimalism is more than just white space. Learn about the core principles that make minimalist design effective, from typography choices to color theory and grid systems.', tags: 'design', postTime: new Date(), commentsCount: 17, voteDifference: 10 },
];

const comments = [
    { id: 1, authorName: 'Alice', authorImage: 'https://placehold.co/40x40/3b82f6/ffffff?text=A', text: 'Great article! Really insightful look into the future.' },
    { id: 2, authorName: 'Bob', authorImage: 'https://placehold.co/40x40/10b981/ffffff?text=B', text: 'I agree with most points, but I think you missed the impact of VR/AR on the web.' },
    { id: 3, authorName: 'Charlie', authorImage: 'https://placehold.co/40x40/f97316/ffffff?text=C', text: 'Thanks for sharing! This was a very helpful read.' },
];

const PostDetails = () => {
    const { postId } = useParams();
    const { user } = useAuth();
    const location = useLocation();
    // Find the post by ID from the placeholder data.
    // In a real app, you would use TanStack Query to fetch this from your API.
    const post = posts.find(p => p._id === postId);

    const { _id, authorImage, authorName, postTitle, postDescription, tags, postTime, commentsCount, voteDifference } = post;

    // if (!post) {
    //     return <div className="text-center my-10 text-2xl">Post not found!</div>;
    // }

    // const shareUrl = window.location.href;
    // const voteDifferences = post.upVote - post.downVote;

    return (
        <div className="bg-base-100 py-12">
            <div className="container mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            <p className="text-xl mb-4">
                                {postDescription}
                            </p>
                            {/* Image section if available */}
                            {post.image && (
                                <div className="mb-4 flex justify-center">
                                    <img
                                        src={post.image}
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
                                    <button className="btn btn-ghost btn-sm p-1 hover:bg-green-100 hover:text-green-600">
                                        <ThumbsUp size={28} />
                                    </button>
                                    <span className="font-bold text-xl">{voteDifference}</span>
                                    <button className="btn btn-ghost btn-sm p-1 hover:bg-red-100 hover:text-red-600">
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
                                <div className="flex flex-1 justify-end">
                                    <button className="btn btn-ghost btn-sm text-xl flex items-center">
                                        <Share2 size={28} />
                                        <span className=''>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-8 bg-base-100 p-6 border-gray-200 rounded-3xl shadow-sm">
                        <h3 className="text-2xl font-bold mb-6">Comments</h3>
                        {/* Comment Form */}
                        {user ? (
                            <div className="flex items-start space-x-4 mb-8">
                                <img src={user.photoURL || 'https://placehold.co/40x40'} alt="Your avatar" className="w-12 h-12 rounded-full" />
                                <div className="flex-1">
                                    <textarea className="textarea textarea-bordered w-full focus:outline-none" placeholder="Add your comment..."></textarea>
                                    <button className="btn btn-primary btn-sm mt-4">
                                        <Send size={16} className="mr-2" />
                                        Submit Comment
                                    </button>
                                </div>
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
                                <div key={comment.id} className="flex items-center space-x-4">
                                    <img src={comment.authorImage} alt={comment.authorName} className="w-12 h-12 rounded-full" />
                                    <div className="flex-1">
                                        <p className="font-bold text-xl">{comment.authorName}</p>
                                        <p className="text-lg">{comment.text}</p>
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
