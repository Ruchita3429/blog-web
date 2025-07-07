"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import config from "@/config/index";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/api/blogDB`);
        const data = await response.json();
        if (data.success) {
          const foundBlog = data.blogs.find((b) => b._id === blogId);
          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            setError("Blog not found");
          }
        } else {
          setError(data.message || "Failed to fetch blog");
        }
      } catch (error) {
        setError("Error loading blog");
      } finally {
        setLoading(false);
      }
    };
    if (blogId) fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
         Go Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">{blog.title}</h1>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <p className="mb-4 text-gray-800 whitespace-pre-wrap break-words leading-relaxed" style={{ wordBreak: "break-word" }}>
          {blog.content}
        </p>
        <div className="text-sm text-gray-500">
          <p><strong>Author:</strong> {blog.authorName}</p>
          <p><strong>From:</strong> {blog.authorCountry || "Unknown"}</p>
          <p><strong>Posted:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
