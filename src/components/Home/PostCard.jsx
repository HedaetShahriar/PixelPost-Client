// Pages/Home/PostCard.jsx
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';


const PostCard = ({ post }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showShare, setShowShare] = useState(false);
  const location = useLocation();

  const {
    _id,
    authorImage,
    authorName,
    title,
    description,
    tag,
    postedOn,
    voteDifference,
    commentsCount,
    likedBy,
    dislikedBy,
    image,
  } = post;

  const handleVote = async (postId, action) => {
    if (!user) {
      Swal.fire('Error', 'You must be logged in to vote', 'error');
      return;
    }
    try {
      await axiosSecure.patch(`/posts/${postId}/vote?email=${encodeURIComponent(user.email)}`, { action });
      queryClient.invalidateQueries(['posts']);
    } catch (error) {
      console.error('Error voting on post:', error);
    }
  };

  const shareUrl = `${location.origin}/post/${_id}`;
  const shareTitle = title;

  return (
    <div className="flex bg-base-100 border border-gray-200 rounded-lg hover:border-gray-400 transition-all duration-300 shadow-sm">
      {/* Content Section */}
      <div className="flex-grow p-4">
        {/* Post Info Header */}
        <div className="flex items-center text-xs mb-2">
          <img src={authorImage} alt="Author" className="w-6 h-6 rounded-full mr-2" />
          <span className="font-bold">{authorName}</span>
          <span className="mx-1">•</span>
          <span>Posted {new Date(postedOn).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-3">
          {/* Post Title */}
          <h2 className="text-xl font-bold mb-2">
            <Link to={`/post/${_id}`} className="hover:underline">{title}</Link>
          </h2>

          {/* Post Tag */}
          <div className="badge badge-primary mb-3 capitalize">{tag}</div>
        </div>

        {/* Post Description */}
        <p className="text-sm mb-4">
          {description?.substring(0, 200)}...{' '}
          <Link to={`/post/${_id}`} className="text-blue-500 hover:underline">Read More</Link>
        </p>

        {/* Image section */}
        {image && (
          <div className="mb-4 flex justify-center">
            <img
              src={image}
              alt={title}
              className="max-w-xl w-full rounded-lg object-cover"
              style={{ maxHeight: 400 }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center text-xl">
          {/* Vote Section */}
          <div className="flex flex-1 md:gap-4 gap-2 items-center">
            <button
              onClick={() => handleVote(_id, 'upVote')}
              className="btn btn-ghost btn-sm p-1 hover:text-green-600"
              title="Like"
            >
              <ThumbsUp size={24} />
            </button>
            <span className="font-bold text-lg">{voteDifference}</span>
            <button
              onClick={() => handleVote(_id, 'downVote')}
              className="btn btn-ghost btn-sm p-1  hover:text-red-600"
              title="Dislike"
            >
              <ThumbsDown size={24} />
            </button>
          </div>

          {/* Comments Link */}
          <div className="flex flex-1 justify-center">
            <Link to={`/post/${_id}#comments`} className="btn btn-ghost btn-sm text-xl flex items-center gap-1">
              <MessageCircle size={24} />
              {commentsCount}
              <span className="hidden md:inline"> Comments</span>
            </Link>
          </div>

          {/* Share Button */}
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
  );
};

export default PostCard;
