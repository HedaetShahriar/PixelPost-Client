import { useState } from 'react';
import {
  Mail,
  Clock,
  AlertCircle,
  CheckCircle,
  PauseCircle,
  UserRoundPen,
  UserRoundCog,
} from 'lucide-react';
import { Link } from 'react-router';
import Modal from '../../../components/ui/Modal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Loader/LoadingSpinner';

const statusIcon = (status) => {
  switch (status?.toLowerCase()) {
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

const UserProfile = ({ user }) => {
  const { name, email, image, membership, phone, address, bio } = user;
  const axiosSecure = useAxiosSecure();

  const [modalOpen, setModalOpen] = useState(null);
  const [formData, setFormData] = useState({
    image: image || '',
    name: name || '',
    email: email || '',
    phone: phone || '',
    address: address || '',
    bio: bio || '',
  });

  const isMember = membership === 'gold';

  const { data, isLoading: isPostsLoading } = useQuery({
    queryKey: ['myPosts', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/posts/my-posts?sortBy=recent&limit=3&email=${encodeURIComponent(user?.email)}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  if (isPostsLoading) {
    return <LoadingSpinner />;
  }

  const posts = data?.myPosts || [];

  const toggleMembership = () => {
    // logic to upgrade/downgrade user membership
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/users/update/${user._id}`, formData);
      setModalOpen(null);
      // Ideally: refetch user data or show a toast
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-10 px-4">
        {/* Profile Header */}
        <div className="bg-base-100 border border-gray-200 rounded-lg shadow-sm p-6 md:p-8 flex flex-col gap-4 md:gap-0 flex-wrap">
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center justify-center">
              <img
                referrerPolicy="no-referrer"
                src={image}
                alt="Profile"
                className="md:w-34 md:h-34 w-40 h-40 rounded-full border-4 border-white shadow-md object-cover mx-auto"
              />
              <span
                className={`px-3 py-0.5 text-xs rounded-full mt-2 font-semibold select-none ${isMember
                    ? 'bg-yellow-400 text-yellow-900'
                    : 'bg-orange-400 text-orange-900'
                  }`}
              >
                {isMember ? 'Gold Member' : 'Bronze Member'}
              </span>
            </div>

            <div className="text-center md:text-left flex-1 -mt-4">
              <h2 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center justify-center md:justify-start gap-2">
                {name}
              </h2>

              <p className="text-gray-600 flex items-center justify-center text-xl md:justify-start gap-2 mt-2 break-words">
                <Mail size={18} />
                <span className="truncate max-w-full">{email}</span>
              </p>

              {phone && <p className="text-gray-600 mt-1">📞 {phone}</p>}
              {address && <p className="text-gray-600 mt-1">📍 {address}</p>}
              {bio && <p className="text-gray-500 mt-2 italic">{bio}</p>}
            </div>
          </div>

          <div className="flex gap-3 justify-center md:justify-end md:-mt-6">
            <button
              onClick={() => setModalOpen('edit')}
              className="btn btn-sm bg-lime-500 hover:bg-lime-600 text-white flex items-center justify-center gap-1"
            >
              <UserRoundPen size={16} />
              Edit profile
            </button>
            <button
              onClick={() => setModalOpen('membership')}
              className={`btn btn-sm ${isMember
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
                  : 'bg-orange-400 hover:bg-orange-500 text-orange-900'
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
            {posts.length === 0 ? (
              <>
                <p className="text-gray-500 text-center">You haven’t posted anything yet.</p>
                <div className="flex justify-center">
                  <Link to="add-post" className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">
                    Create Post
                  </Link>
                </div>
              </>
            ) : (
              posts.map((post) => (
                <Link
                  to={`/post/${post._id}`}
                  key={post._id}
                  className="bg-base-100 border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <h4 className="text-lg font-semibold mb-1 hover:underline">
                      {post.title}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {new Date(post.postedOn || post.createdAt || Date.now()).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    {statusIcon(post.status || 'published')}
                    <span
                      className={`text-sm font-semibold capitalize ${(post.status || 'published').toLowerCase() === 'published'
                          ? 'text-green-600'
                          : (post.status || '').toLowerCase() === 'pending'
                            ? 'text-yellow-600'
                            : 'text-gray-600'
                        }`}
                    >
                      {post.status || 'Published'}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        open={modalOpen === 'edit'}
        onClose={() => setModalOpen(null)}
        title="Edit Profile"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Profile Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="+8801XXXXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Write a short bio..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(null)}
              className="btn btn-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Membership Modal */}
      <Modal
        open={modalOpen === 'membership'}
        onClose={() => setModalOpen(null)}
        title={isMember ? 'Downgrade Membership' : 'Upgrade Membership'}
      >
        <p>
          You are currently a <strong>{isMember ? 'Gold' : 'Bronze'}</strong> member.
        </p>
        <button
          onClick={() => {
            toggleMembership();
            setModalOpen(null);
          }}
          className={`mt-4 btn btn-sm w-full ${isMember
              ? 'bg-orange-400 hover:bg-orange-500 text-orange-900'
              : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
            }`}
        >
          {isMember ? 'Downgrade to Bronze' : 'Upgrade to Gold'}
        </button>
      </Modal>
    </>
  );
};

export default UserProfile;
