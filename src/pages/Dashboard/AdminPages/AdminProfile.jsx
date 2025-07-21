import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Tags, UserRoundPen, X } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import Modal from '../../../components/ui/Modal';

const dummyStats = {
    posts: 1250,
    comments: 3870,
    users: 430,
};

const AdminProfile = () => {
    const { user } = useAuth();
    const [stats] = useState(dummyStats);
    const [tags, setTags] = useState(['React', 'JavaScript', 'CSS']);
    const [modalOpen, setModalOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const tag = data.tag.trim();
        if (!tag) return;
        if (tags.includes(tag)) {
            alert('Tag already exists');
            return;
        }
        setTags([...tags, tag]);
        reset();
    };

    const deleteTag = (tagToDelete) => {
        setTags(tags.filter(t => t !== tagToDelete));
    };

    return (
        <div className='overflow-y-auto h-[calc(100vh-60px)]'>
            <div className="w-full max-w-5xl mx-auto mt-10 px-4">
                {/* Profile Header */}
                <div className="bg-base-100 border border-gray-400 rounded-lg  p-6 md:p-8 flex flex-col gap-6 md:gap-8">
                    {/* Avatar + Info */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 w-full">
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative">
                                <img
                                    src={user.photoURL}
                                    alt="Admin Avatar"
                                    className="w-36 h-36 rounded-full object-cover border-4 border-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 shadow-lg"
                                    referrerPolicy="no-referrer"
                                />
                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-semibold px-5 py-1 rounded-full tracking-wide select-none shadow-md">
                                    ADMIN
                                </span>
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1 -mt-2">
                            <h2 className="text-2xl md:text-3xl font-bold flex  items-center justify-center md:justify-start gap-2">
                                {user.displayName}
                            </h2>

                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1 text-xl">
                                <Mail size={18} />
                                <span className="truncate max-w-full">{user.email}</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons (Edit Profile) aligned bottom-right */}
                    <div className="flex gap-3 justify-center md:justify-end">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 -mt-2 md:-mt-16 text-white flex items-center justify-center gap-1"
                            aria-label="Edit Profile"
                        >
                            <UserRoundPen size={16} />
                            Edit profile
                        </button>
                    </div>

                    {/* Stats Section */}
                    <h3 className="text-2xl md:-mt-10 text-center font-semibold">Stats Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border-gray-400 border rounded-2xl p-6 text-center">
                            <p className="text-4xl font-bold text-green-600">{stats.posts}</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-700">Posts</p>
                        </div>
                        <div className="border-gray-400 border rounded-2xl p-6 text-center">
                            <p className="text-4xl font-bold text-blue-600">{stats.comments}</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-700">Comments</p>
                        </div>
                        <div className="border-gray-400 border rounded-2xl p-6 text-center">
                            <p className="text-4xl font-bold text-yellow-500">{stats.users}</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-700">Users</p>
                        </div>
                    </div>

                    {/* Site Activity */}
                    <h3 className="text-2xl text-center font-semibold ">Site Activity Overview</h3>
                    <div className='flex justify-center items-center'>
                        <div className="h-80 w-full max-w-2xl  bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 italic select-none shadow-inner">
                            Pie Chart Here
                        </div>
                    </div>


                    {/* Tag Management */}
                    {/* Tag Management */}
                    <section className="mt-10 w-full max-w-xl mx-auto border border-gray-400 rounded-lg p-4 md:p-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                            <Tags size={20} />
                            Manage Tags
                        </h3>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col md:flex-row md:items-center gap-3 mb-4"
                        >
                            <input
                                type="text"
                                placeholder="Add new tag"
                                {...register('tag', { required: 'Tag cannot be empty' })}
                                className={`flex-1 rounded-lg border px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.tag
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-600'
                                    }`}
                                aria-invalid={errors.tag ? 'true' : 'false'}
                                spellCheck="false"
                            />
                            <button
                                type="submit"
                                className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-semibold"
                            >
                                Add
                            </button>
                        </form>

                        {errors.tag && (
                            <p
                                className="text-red-600 text-sm font-medium mb-4"
                                role="alert"
                            >
                                {errors.tag.message}
                            </p>
                        )}

                        {/* Tags List with delete buttons */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full font-medium select-none shadow"
                                >
                                    {tag}
                                    <button
                                        onClick={() => deleteTag(tag)}
                                        aria-label={`Delete tag ${tag}`}
                                        type="button"
                                        className="hover:bg-indigo-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </section>

                </div>


            </div>

            {/* Edit Profile Modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit Admin Profile">
                <p>This is where your edit profile form will go.</p>
                <button
                    onClick={() => setModalOpen(false)}
                    className="btn btn-sm mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default AdminProfile;
