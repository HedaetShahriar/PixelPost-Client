import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useTags = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axios = useAxios();
    const { data, isLoading: isTagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            if (user) {
                const response = await axiosSecure.get(`/tags?email=${encodeURIComponent(user?.email)}`);
                return response.data;
            }
            const response = await axios.get('/tags');
            return response.data;
        }
    });
    const tags = data?.tags;
    return { tags, isLoading: isTagsLoading };
};

export default useTags;