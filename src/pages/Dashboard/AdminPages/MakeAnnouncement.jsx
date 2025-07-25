import React from "react";
import { useForm } from "react-hook-form";
import {
  Rocket,
  FileText,
  PencilLine,
  Megaphone,
  UserCircle2,
  Mail,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const announcement = {
      announcedBy: user?.displayName || "",
      announcedByEmail: user?.email || "",
      announcedByImage: user?.photoURL || "",
      announcementTitle: data.title,
      announcementDescription: data.description,
      announcedAt: new Date().toISOString(),
    };
    try{
      await axiosSecure.post("/announcements", announcement);
      reset();
      Swal.fire('success', 'Announcement posted successfully!', 'success');
    }catch (error) {
      Swal.fire('error', 'Failed to post announcement.', 'error');
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 py-10">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 text-indigo-600">
          <Megaphone size={30} />
          <h2 className="text-3xl font-bold">Make an Announcement</h2>
        </div>

        {/* Author Block */}
        <div className="flex items-center gap-4 p-4 border rounded-xl bg-gray-50">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Author"
              className="w-14 h-14 rounded-full object-cover border"
            />
          ) : (
            <UserCircle2 size={56} className="text-gray-400" />
          )}
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {user?.displayName || "Anonymous"}
            </h4>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Mail size={14} /> {user?.email || "Not provided"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <PencilLine size={16} /> Announcement Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Write a short, catchy title"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FileText size={16} /> Announcement Details
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={5}
              placeholder="Include all relevant information users should know..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:outline-none resize-none"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-md text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150"
            >
              <Rocket size={18} /> Post Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
