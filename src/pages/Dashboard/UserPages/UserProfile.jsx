import { useState } from 'react';
import { Mail, Clock, AlertCircle, CheckCircle, PauseCircle, UserRoundPen, UserRoundCog } from 'lucide-react';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Modal from '../../../components/ui/Modal';
// Dummy recent posts
const dummyPosts = [
    {
        _id: '1',
        title: '10 Tips to Improve Your Photography',
        createdAt: '2025-07-18T10:00:00Z',
        status: 'Published',
    },
    {
        _id: '2',
        title: 'Exploring Street Art in Dhaka',
        createdAt: '2025-07-15T08:30:00Z',
        status: 'Pending',
    },
    {
        _id: '3',
        title: 'Guide to Minimalist Design',
        createdAt: '2025-07-10T14:45:00Z',
        status: 'Draft',
    },
];

const statusIcon = (status) => {
    switch (status.toLowerCase()) {
        case 'published':
            return <CheckCircle className="text-green-500" size={20} />;
        case 'pending':
            return <Clock className="text-yellow-500" size={20} />;
        case 'draft':
            return <PauseCircle className="text-gray-400" size={20} />;
        default:
            return <AlertCircle className="text-red-500" size={20} />;
    }
};

const UserProfile = () => {
    // const [user, setUser] = useState(dummyUser);
    const { user } = useAuth()
    const posts = dummyPosts;

    // modal state: 'edit', 'password', 'membership' or null (none)
    const [modalOpen, setModalOpen] = useState(null);

    const isMember = user?.membership === 'gold';

    // Toggle membership inside modal
    const toggleMembership = () => {
        // setUser((prev) => ({
        //     ...prev,
        //     membership: prev.membership === 'gold' ? 'bronze' : 'gold',
        // }));
    };

    return (
        <div className='overflow-y-auto h-[calc(100vh-60px)]'>
            <div className="w-full max-w-5xl mx-auto mt-10 px-4">
                {/* Profile Header */}
                <div className="bg-base-100 border border-gray-200 rounded-lg shadow-sm p-6 md:p-8 flex flex-col  gap-4 md:gap-0 flex-wrap">
                    {/* Avatar + User Info */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 w-full md:w-auto">
                        <div className="flex flex-col
                        items-center justify-center">
                            <img
                                referrerPolicy='no-referrer'
                                src={user.photoURL}
                                alt="Profile"
                                className="md:w-34 md:h-34 w-40 h-40 rounded-full border-4 border-white shadow-md object-cover mx-auto"
                            />
                            <span
                                className={`px-3 py-0.5 text-xs rounded-full mt-2  font-semibold select-none ${isMember ? 'bg-yellow-400 text-yellow-900' : 'bg-orange-400 text-orange-900'}`}
                            >
                                {isMember ? 'Gold Member' : 'Bronze Member'}
                            </span>
                        </div>

                        <div className="text-center md:text-left flex-1 -mt-4">
                            <h2 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center justify-center md:justify-start gap-2">
                                {user.displayName}
                            </h2>

                            <p className="text-gray-600 flex items-center justify-center text-xl md:justify-start gap-2 mt-2 break-words">
                                <Mail size={18} />
                                <span className="truncate max-w-full">{user.email}</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className=" flex gap-3 justify-center md:justify-end md:-mt-6">
                        <button
                            onClick={() => setModalOpen('edit')}
                            className="btn btn-sm bg-lime-500 hover:bg-lime-600 text-white flex items-center justify-center gap-1"
                        >
                            <UserRoundPen size={16} />
                            Edit profile
                        </button>
                        <button
                            onClick={() => setModalOpen('membership')}
                            className={`btn btn-sm ${isMember ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900' : 'bg-orange-400 hover:bg-orange-500 text-orange-900'
                                } flex items-center justify-center gap-1`}
                        >
                            <UserRoundCog size={16} />
                            {isMember ? 'Downgrade to Bronze' : 'Upgrade to Gold'}
                        </button>
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold mb-4">Recent Posts</h3>
                    <div className="flex flex-col gap-4">
                        {posts.map((post) => (
                            <Link
                                to={`/post/${post._id}`}
                                key={post._id}
                                className="bg-base-100 border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-md transition-shadow duration-300"
                            >
                                <div>
                                    <h4 className="text-lg font-semibold mb-1 hover:underline">{post.title}</h4>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(post.createdAt).toLocaleString(undefined, {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 self-start md:self-auto">
                                    {statusIcon(post.status)}
                                    <span
                                        className={`text-sm font-semibold capitalize ${post.status.toLowerCase() === 'published'
                                                ? 'text-green-600'
                                                : post.status.toLowerCase() === 'pending'
                                                    ? 'text-yellow-600'
                                                    : 'text-gray-600'
                                            }`}
                                    >
                                        {post.status}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                open={modalOpen === 'edit'}
                onClose={() => setModalOpen(null)}
                title="Edit Profile"
            >
                {/* Replace with your actual edit form */}
                <p>This is the edit profile modal content.</p>
            </Modal>

            <Modal
                open={modalOpen === 'password'}
                onClose={() => setModalOpen(null)}
                title="Change Password"
            >
                {/* Replace with your actual change password form */}
                <p>This is the change password modal content.</p>
            </Modal>

            <Modal
                open={modalOpen === 'membership'}
                onClose={() => setModalOpen(null)}
                title={isMember ? "Downgrade Membership" : "Upgrade Membership"}
            >
                <p>
                    You are currently a <strong>{isMember ? "Gold" : "Bronze"}</strong> member.
                </p>
                <button
                    onClick={() => {
                        toggleMembership();
                        setModalOpen(null);
                    }}
                    className={`mt-4 btn btn-sm w-full ${isMember ? 'bg-orange-400 hover:bg-orange-500 text-orange-900' : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
                        }`}
                >
                    {isMember ? "Downgrade to Bronze" : "Upgrade to Gold"}
                </button>
            </Modal>
        </div>
    );
};

export default UserProfile;
