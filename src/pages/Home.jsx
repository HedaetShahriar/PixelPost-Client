import React, { useState } from 'react';
import Banner from '../components/Home/Banner';
import TagsSection from '../components/Home/TagsSection';
import AnnouncementsSection from '../components/Home/AnnouncementsSection';
import PostsSection from '../components/Home/PostsSection';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useTags from '../hooks/useTags';
import LoadingSpinner from '../components/Loader/LoadingSpinner';

const Home = () => {
    const axios = useAxios();
    const [page, setPage] = useState(1);
    const [currentTag, setCurrentTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const { tags, isTagsLoading } = useTags();
    const { data: postsData, isLoading } = useQuery({
        queryKey: ['posts', page, currentTag, searchTerm],
        queryFn: async () => {
            const response = await axios.get(`/posts?page=${page}${currentTag ? `&tag=${currentTag}` : ''}${searchTerm ? `&search=${searchTerm}` : ''}`);
            return response.data;
        },
    });
    if (isLoading || isTagsLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div>
            <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className='container mx-auto'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TagsSection tags={tags} setCurrentTag={setCurrentTag} currentTag={currentTag} />
                    <AnnouncementsSection />
                    <PostsSection postsData={postsData} setPage={setPage} />
                </div>
            </div>
        </div>
    );
};

export default Home;