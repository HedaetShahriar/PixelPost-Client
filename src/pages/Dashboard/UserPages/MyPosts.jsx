import { useState } from 'react';
import { Link } from 'react-router';
import {
  Trash2,
  MessageSquareMore,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth';

const fakePosts = [
  { _id: '1', title: 'How to Learn React Quickly', upVote: 23, downVote: 5 },
  { _id: '2', title: 'JavaScript Best Practices', upVote: 15, downVote: 2 },
  { _id: '3', title: 'React Hooks in Depth', upVote: 30, downVote: 3 },
  { _id: '4', title: 'Understanding Closures', upVote: 12, downVote: 1 },
  { _id: '5', title: 'Async/Await Explained', upVote: 18, downVote: 4 },
  { _id: '6', title: 'TypeScript Basics', upVote: 22, downVote: 6 },
  { _id: '7', title: 'Redux Toolkit Simplified', upVote: 20, downVote: 5 },
];

const POSTS_PER_PAGE = 5;

const MyPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(fakePosts);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (confirm) {
      setPosts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Posts</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search posts..."
            className="pl-8 pr-3 py-1.5 text-sm border rounded-md border-gray-400 focus:outline-none "
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border bg-base-200 border-gray-300 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-base-300 font-medium">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-center">Votes</th>
              <th className="p-3 text-center">Comments</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.length ? (
              paginatedPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-t border-gray-300 hover:bg-base-100 transition"
                >
                  <td className="p-3">{post.title}</td>
                  <td className="p-3 text-center font-medium text-green-600">
                    {post.upVote - post.downVote}
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/dashboard/comments/${post._id}`}
                      className="text-blue-500 hover:underline"
                      title="View Comments"
                    >
                      <MessageSquareMore className="w-4 h-4 mx-auto" />
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded border bg-base-300 hover:bg-base-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-1 rounded border bg-base-300 hover:bg-base-100 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
