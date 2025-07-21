import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  ImagePlus,
  SendHorizontal,
  Tag,
  TextCursorInput,
  StickyNote,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const tagOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
  { value: "Community", label: "Community" },
];

const AddPost = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const postData = {
      authorName: user?.displayName || "",
      authorEmail: user?.email || "",
      authorImage: user?.photoURL || "",
      title: data.title,
      description: data.description,
      tag: data.tag?.value || "",
      image: data.image?.[0] || null,
      upVote: 0,
      downVote: 0,
      postedOn: new Date().toISOString(),
    };

    console.log(postData);
    reset({
        title: "",
        description: "",
        tag: null,
        image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-10 py-6">
      <div className="bg-base-100 shadow-lg rounded-xl max-w-4xl mx-auto p-6 md:p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-indigo-600">
          <StickyNote size={28} /> Create a New Post
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-1 ">
              <TextCursorInput size={16} /> Post Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter post title"
              className="w-full border rounded px-4 py-2 focus:ring focus:outline-none focus:ring-indigo-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 font-medium flex items-center gap-1 ">
              <StickyNote size={16} /> Post Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={5}
              placeholder="Enter post description"
              className="w-full border rounded px-4 py-2 focus:ring focus:outline-none focus:ring-indigo-300"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Tag Select */}
          <div>
            <label className="mb-1 font-medium flex items-center gap-1 ">
              <Tag size={16} /> Select a Tag
            </label>
            <Controller
              name="tag"
              control={control}
              rules={{ required: "Tag is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={tagOptions}
                  isClearable
                  placeholder="Choose a category"
                  className="text-sm text-gray-900"
                  styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: 'bg-base-100',
                        }),
                    }}
                />
              )}
            />
            {errors.tag && (
              <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-1 font-medium flex items-center gap-1 ">
              <ImagePlus size={16} /> Upload Image (optional)
            </label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(null);
                }
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-40 h-40 object-cover rounded border"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              <SendHorizontal size={18} /> Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
