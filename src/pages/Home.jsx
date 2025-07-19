import React from 'react';
import Banner from '../components/Home/Banner';
import TagsSection from '../components/Home/TagsSection';
import AnnouncementsSection from '../components/Home/AnnouncementsSection';
import PostsSection from '../components/Home/PostsSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <div className='container mx-auto'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TagsSection />
                    <AnnouncementsSection />
                    <PostsSection />
                </div>
            </div>
        </div>
    );
};

export default Home;