import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useTags = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data, isLoading: isTagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/tags?email=${encodeURIComponent(user?.email)}`);
            return response.data;
        },
        enabled: !!user?.email,
    });
    const tags = data?.tags;
    // console.log('Tags:', tags, isTagsLoading);
    return { tags, isLoading: isTagsLoading };
};

export default useTags;