import { Megaphone } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { format } from 'date-fns';

const AnnouncementsSection = () => {
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const email = user?.email ? `?email=${encodeURIComponent(user.email)}` : '';
            const res = await axios.get(`/announcements${email}`);
            return res.data;
        },
    });

    const markAllAsReadMutation = useMutation({
        mutationFn: async () => {
            const email = user?.email;
            if (!email) return;
            return axiosSecure.patch(`/announcements/read?email=${encodeURIComponent(email)}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements']);
        },
    });

    const handleMarkAllAsRead = () => {
        markAllAsReadMutation.mutate();
    };

    if (isLoading) return <div>Loading...</div>;

    const unreadCount = announcements.filter(
        (ann) => !ann.readedBy?.includes(user?.email)
    ).length;

    return (
        unreadCount > 0 && (
            <div className="bg-base-200 border-l-4 border-primary p-4 rounded-md my-12 relative" role="alert">
                <div className="flex">
                    <div className="py-1">
                        <Megaphone className="h-6 w-6 text-secondary mr-4" />
                    </div>
                    <div className="w-full">
                        <p className="font-bold mb-2">Announcements ({announcements.length})</p>
                        <ul className="list-disc pl-5 space-y-4">
                            {announcements.map((ann) => (
                                <li key={ann._id} className="text-sm leading-relaxed">
                                    <div>
                                        <span className="font-semibold text-primary">
                                            {ann.announcementTitle}:
                                        </span>{' '}
                                        {ann.announcementDescription}
                                        <div className="text-xs text-gray-500 mt-1">
                                            {format(new Date(ann.announcedAt), 'PPPp')}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {
                    user && (
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-xs px-3 py-1 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-200"
                            >
                                Mark All as Read
                            </button>
                        </div>
                    )
                }
            </div>
        )
    );
};

export default AnnouncementsSection;
