import { useState } from "react";
import { Trash2, CheckCircle, X } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();
    const [modalContent, setModalContent] = useState(null);
    const {data: reports, isLoading, refetch} = useQuery({
        queryKey: ['reported-comments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/comments/reported');
            return res.data;
        },
    });
    console.log('Reported Comments:', reports, isLoading);

    if (isLoading) return <LoadingSpinner />;

    const handleDismiss = (id) => {
        Swal.fire({
            title: "Resolve report?",
            text: "This will remove the report but keep the comment.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Resolve",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/comments/resolve/${id}`);
                refetch();
                Swal.fire("Resolved!", "The report has been dismissed.", "success");
            }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Reported Comments: {reports.length} </h2>

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
                                    <td className="p-3">
                                        {report.reportedBy}
                                    </td>
                                    <td className="p-3">
                                        {report.reportFeedback}
                                    </td>
                                    <td className="p-3">
                                        {new Date(report.reportedAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleDismiss(report._id)}
                                            className="bg-blue-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs flex items-center gap-1"
                                        >
                                            <CheckCircle size={14} /> Resolve
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
