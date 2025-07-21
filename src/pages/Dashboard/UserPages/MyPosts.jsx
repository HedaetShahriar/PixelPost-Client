import { useState } from 'react';
import { Link } from 'react-router';
import { Trash2, MessageSquareMore } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';

const fakePosts = [
  {
    _id: '1',
    title: 'How to Learn React Quickly',
    upVote: 23,
    downVote: 5,
  },
  {
    _id: '2',
    title: 'JavaScript Best Practices',
    upVote: 15,
    downVote: 2,
  },
];


const MyPosts = () => {
  const { user } = useAuth();
  const [posts] = useState(fakePosts);

  const handleDelete = (id) => {
    alert(`Deleted post ${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-center">Votes</th>
            <th className="p-2 text-center">Comments</th>
            <th className="p-2 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id} className="border-t">
              <td className="p-2">{post.title}</td>
              <td className="p-2 text-center">{post.upVote - post.downVote}</td>
              <td className="p-2 text-center">
                <Link to={`/dashboard/comments/${post._id}`}>
                  <MessageSquareMore className="w-5 h-5 inline" />
                </Link>
              </td>
              <td className="p-2 text-center">
                <button onClick={() => handleDelete(post._id)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPosts;
