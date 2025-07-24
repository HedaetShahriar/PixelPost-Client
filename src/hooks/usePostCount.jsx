import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const usePostCount = () => {
    const {user , loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: data, isLoading:isCountLoading, refetch}=useQuery({
        queryKey: ['postCount', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/posts/count?email=${encodeURIComponent(user?.email)}`);
            return data;
        },
    });
    // console.log(data?.count);
    return {count: data?.count,membership: data?.membership, isCountLoading, refetch};
};

export default usePostCount;