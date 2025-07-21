import { useState } from "react";
import { useParams } from "react-router";

const fakeComments = [
  {
    _id: 'c1',
    postId: '1',
    email: 'john@example.com',
    comment: 'This is a very insightful and detailed explanation on the topic!',
  },
  {
    _id: 'c2',
    postId: '1',
    email: 'jane@example.com',
    comment: 'Thanks for the helpful article.',
  },
];

const feedbackOptions = [
  'Spam or irrelevant',
  'Abusive content',
  'Fake information',
];

const CommentsPage = () => {
  const { postId } = useParams(); // Assuming you are using react-router for params
  const [comments] = useState(fakeComments.filter(c => c.postId === postId));
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reported, setReported] = useState({});
  const [modalContent, setModalContent] = useState(null);

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
        {text.slice(0, 20)}... <button className="text-blue-500" onClick={() => setModalContent(text)}>Read More</button>
      </>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Comments for Post {postId}</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Comment</th>
            <th className="p-2 text-center">Feedback</th>
            <th className="p-2 text-center">Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment._id} className="border-t">
              <td className="p-2">{comment.email}</td>
              <td className="p-2">{renderCommentText(comment.comment, comment._id)}</td>
              <td className="p-2 text-center">
                <select
                  className="border rounded p-1"
                  onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                  value={selectedFeedback[comment._id] || ''}
                >
                  <option value="" disabled>Select Feedback</option>
                  {feedbackOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td className="p-2 text-center">
                <button
                  className={`px-2 py-1 rounded ${selectedFeedback[comment._id] && !reported[comment._id] ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  disabled={!selectedFeedback[comment._id] || reported[comment._id]}
                  onClick={() => handleReport(comment._id)}
                >
                  {reported[comment._id] ? 'Reported' : 'Report'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalContent && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
            <p className="mb-4">{modalContent}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setModalContent(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;