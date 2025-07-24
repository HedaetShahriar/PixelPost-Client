import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Search, X } from "lucide-react"; // Adjust path as needed
import Pagination from "../../../components/ui/Pagination";

const feedbackOptions = ['Spam or irrelevant', 'Abusive content', 'Fake information'];

const CommentsPage = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reported, setReported] = useState({});
  const [modalContent, setModalContent] = useState(null);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const res = await fetch(
  //         `/api/comments?postId=${postId}&search=${search}&page=${currentPage}`
  //       );
  //       const data = await res.json();
  //       setComments(data.comments);
  //       setTotalPages(data.totalPages);
  //     } catch (err) {
  //       console.error("Error fetching comments:", err);
  //     }
  //   };

  //   fetchComments();
  // }, [postId, search, currentPage]);

  const handleFeedbackChange = (id, value) => {
    setSelectedFeedback(prev => ({ ...prev, [id]: value }));
  };

  const handleReport = (id) => {
    setReported(prev => ({ ...prev, [id]: true }));
  };

  const renderCommentText = (text, id) => {
    if (text.length <= 20) return text;
    return (
      <>
        {text.slice(0, 20)}...{' '}
        <button className="text-blue-500 hover:underline" onClick={() => setModalContent(text)}>
          Read More
        </button>
      </>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Comments for Post {postId}</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search comments..."
            className="pl-8 pr-3 py-1.5 text-sm border rounded-md border-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border bg-base-200 border-gray-300 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-base-300 font-medium">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-center">Feedback</th>
              <th className="p-3 text-center">Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.length ? (
              comments.map((comment) => (
                <tr key={comment._id} className="border-t border-gray-300 hover:bg-base-100 transition">
                  <td className="p-3">{comment.email}</td>
                  <td className="p-3">{renderCommentText(comment.comment, comment._id)}</td>
                  <td className="p-3 text-center">
                    <select
                      className="border border-gray-400 rounded-md text-sm px-2 py-1 focus:outline-none"
                      onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                      value={selectedFeedback[comment._id] || ''}
                    >
                      <option value="" disabled>Select Feedback</option>
                      {feedbackOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      disabled={!selectedFeedback[comment._id] || reported[comment._id]}
                      onClick={() => handleReport(comment._id)}
                      className={`px-3 py-1 text-xs rounded transition ${
                        selectedFeedback[comment._id] && !reported[comment._id]
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {reported[comment._id] ? 'Reported' : 'Report'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        />
      )}

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-gray-800">{modalContent}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setModalContent(null)}
                className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
