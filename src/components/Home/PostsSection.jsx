// Pages/Home/PostsSection.jsx
import React from 'react';
import PostCard from './PostCard';
import { ArrowDownAZ } from 'lucide-react';

// Placeholder posts - will be fetched from API
const posts = [
    { _id: '1', authorImage: 'https://placehold.co/100x100/f97316/ffffff?text=A', authorName: 'user_dev', postTitle: 'The Future of Web Development in 2025', postDescription: 'An in-depth look at the trends shaping the future of web development, from serverless architectures to the rise of AI-powered coding assistants and the evolution of frontend frameworks.', tags: 'tech', postTime: new Date(), commentsCount: 12, voteDifference: 45 },
    { _id: '2', authorImage: 'https://placehold.co/100x100/10b981/ffffff?text=B', authorName: 'healthguru', postTitle: 'A Comprehensive Guide to Healthy Living and Nutrition', postDescription: 'Discover the secrets to a healthier lifestyle. This guide covers everything from balanced diets and workout routines to mental wellness and stress management techniques.', tags: 'health', postTime: new Date(), commentsCount: 5, voteDifference: 30 },
    { _id: '3', authorImage: 'https://placehold.co/100x100/3b82f6/ffffff?text=C', authorName: 'wanderlust', postTitle: 'Exploring the Breathtaking Landscapes of the Alps', postDescription: 'Join me on a visual journey through the stunning Swiss Alps. This post features breathtaking photos, travel tips, and stories from my latest adventure in the mountains.', tags: 'travel', postTime: new Date(), commentsCount: 23, voteDifference: 22 },
    { _id: '4', authorImage: 'https://placehold.co/100x100/8b5cf6/ffffff?text=D', authorName: 'react_master', postTitle: 'Advanced State Management Patterns in React', postDescription: 'Tired of prop-drilling? This post dives deep into advanced state management solutions like Zustand, Jotai, and how they compare to traditional tools like Redux and Context API.', tags: 'programming', postTime: new Date(), commentsCount: 8, voteDifference: 15 },
    { _id: '5', authorImage: 'https://placehold.co/100x100/ec4899/ffffff?text=M', authorName: 'designer_life', postTitle: 'The Unspoken Principles of Minimalist Design', postDescription: 'Minimalism is more than just white space. Learn about the core principles that make minimalist design effective, from typography choices to color theory and grid systems.', tags: 'design', postTime: new Date(), commentsCount: 17, voteDifference: 10 },
];

const PostsSection = () => {
    return (
        <div className="pb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Recent Posts</h2>
                <button className="btn btn-ghost">
                    Sort by Popularity
                    <ArrowDownAZ className="ml-2" size={20} />
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
            {/* Pagination */}
            <div className="join flex justify-center mt-12">
                <button className="join-item btn">«</button>
                <button className="join-item btn btn-active">Page 1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default PostsSection;