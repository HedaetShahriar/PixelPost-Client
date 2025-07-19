// Pages/Home/PostCard.jsx
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router';

const PostCard = ({ post }) => {
    const { _id, authorImage, authorName, postTitle, postDescription, tags, postTime, commentsCount, voteDifference } = post;

    return (
        <div className="flex bg-base-100 border border-gray-200 rounded-lg hover:border-gray-400 transition-all duration-300 shadow-sm">
            {/* Content Section */}
            <div className="flex-grow p-4">
                {/* Post Info Header */}
                <div className="flex items-center text-xs mb-2">
                    <img src={authorImage} alt="Author" className="w-6 h-6 rounded-full mr-2" />
                    <span className="font-bold">{authorName}</span>
                    <span className="mx-1">•</span>
                    <span>Posted {new Date(postTime).toLocaleDateString()}</span>
                </div>

                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3'>
                    {/* Post Title */}
                    <h2 className="text-xl font-bold mb-2 ">
                        <Link to={`/post/${_id}`} className="hover:underline">{postTitle}</Link>
                    </h2>

                    {/* Post Tag */}
                    <div className="badge badge-primary mb-3 capitalize">{tags}</div>
                </div>

                {/* Post Description */}
                <p className="text-sm mb-4">
                    {postDescription.substring(0, 200)}... <Link to={`/post/${_id}`} className="text-blue-500 hover:underline">Read More</Link>
                </p>

                {/* Image section if available */}
                {post?.image && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={post?.image}
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
    );
};

export default PostCard;
