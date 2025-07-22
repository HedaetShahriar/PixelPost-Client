import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
    const {user , loading} =useAuth();
    const axiosSecure =useAxiosSecure();

    //get user profile data using tanstack query
    const { data: userData, isLoading: isProfileLoading } = useQuery({
        queryKey: ['userProfile', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/user/profile?email=${encodeURIComponent(user?.email)}`);
            return data;
        },
    });
    return {
        user: userData,
        isLoading: isProfileLoading
    };
};

export default useUser;