"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "@/config/index";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/api/blogDB`);  
        // Sort blogs by createdAt descending (latest first)
        const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);  

  const handleBlogClick = (blogId) => {
    router.push(`/blog/${blogId}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button         
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 float-right"
      >
        <Link href="/newBlog">
          Create blog of your own
        </Link>
      </button>
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      {blogs.length === 0 ? <p>No blogs yet.</p> : blogs.map(blog => (
        <div 
          key={blog._id} 
          className="mb-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow cursor-pointer p-6 bg-gray-100 shadow-md"
          onClick={() => handleBlogClick(blog._id)}
        >
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <p className="mb-4 text-gray-800 whitespace-pre-wrap break-words leading-relaxed overflow-hidden" style={{ wordBreak: "break-word" }}>
            {blog.content.substring(0, 200)}...
          </p>
          <div className="mt-2 text-sm text-gray-500">
            <p><strong>Author:</strong> {blog.authorName}</p>
            <p><strong>Country:</strong> {blog.authorCountry || 'Unknown'}</p>
            <p><strong>Posted:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
            <p className="text-blue-500 hover:underline mt-2">Click to read more</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;