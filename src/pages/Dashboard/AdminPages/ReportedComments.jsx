import { useState } from "react";
import { Trash2, CheckCircle, X } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Swal from "sweetalert2";

// Dummy reports for demo
const fakeReports = [
    {
        _id: "r1",
        commentId: "c1",
        comment: "This comment contains offensive language and violates the rules.",
        reportedBy: "user1@example.com",
        reason: "Abusive content",
        dateReported: "2025-07-20T12:00:00Z",
    },
    {
        _id: "r2",
        commentId: "c2",
        comment: "Buy cheap products at spammy-link.com!",
        reportedBy: "user2@example.com",
        reason: "Spam or irrelevant",
        dateReported: "2025-07-19T10:45:00Z",
    },
    {
        _id: "r3",
        commentId: "c3",
        comment: "The information here is completely fabricated and misleading.",
        reportedBy: "user3@example.com",
        reason: "Fake information",
        dateReported: "2025-07-18T15:20:00Z",
    },
];

const ReportedComments = () => {
    const [reports, setReports] = useState(fakeReports);
    const [modalContent, setModalContent] = useState(null);

    const handleDelete = (commentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the comment.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setReports(prev => prev.filter(r => r.commentId !== commentId));
                Swal.fire("Deleted!", "The comment has been deleted.", "success");
            }
        });
    };

    const handleDismiss = (reportId) => {
        Swal.fire({
            title: "Dismiss report?",
            text: "This will remove the report but keep the comment.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, dismiss",
        }).then((result) => {
            if (result.isConfirmed) {
                setReports(prev => prev.filter(r => r._id !== reportId));
                Swal.fire("Dismissed!", "The report has been dismissed.", "success");
            }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Reported Comments</h2>

            <div className="overflow-x-auto rounded-md border bg-base-200 border-gray-300 shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-base-300 font-medium">
                        <tr>
                            <th className="p-3 text-left">Comment</th>
                            <th className="p-3 text-left">Reported By</th>
                            <th className="p-3 text-left">Reason</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length ? (
                            reports.map(report => (
                                <tr key={report._id} className="border-t border-gray-300 hover:bg-base-100 transition">
                                    <td className="p-3">
                                        {report.comment.length > 20 ? (
                                            <>
                                                {report.comment.slice(0, 20)}...
                                                <button onClick={() => setModalContent(report.comment)} className="text-blue-500 ml-1 hover:underline text-xs">
                                                    Read More
                                                </button>
                                            </>
                                        ) : report.comment}
                                    </td>
                                    <td className="p-3">{report.reportedBy}</td>
                                    <td className="p-3">{report.reason}</td>
                                    <td className="p-3">{new Date(report.dateReported).toLocaleDateString()}</td>
                                    <td className="p-3 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleDelete(report.commentId)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                        <button
                                            onClick={() => handleDismiss(report._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs flex items-center gap-1"
                                        >
                                            <CheckCircle size={14} /> Dismiss
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No reported comments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for displaying full comment text */}
            {modalContent && (
                <Modal
                    open={!!modalContent}
                    onClose={() => setModalContent(null)}
                    title="Reported Comment"
                >
                    <p className="text-gray-800">{modalContent}</p>
                </Modal>
            )}
        </div>
    );
}

export default ReportedComments;
