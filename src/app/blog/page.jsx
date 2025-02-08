"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import config from "@/config/index";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/api/blogDB`);  
        setBlogs(response.data.blogs); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);  

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
        <div key={blog._id} className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <p className="text-gray-700">{blog.content}</p>
          <div className="mt-2 text-sm text-gray-500">
            <p><strong>Author:</strong> {blog.authorName}</p>
            <p><strong>Country:</strong> {blog.authorCountry || 'Unknown'}</p>
            <p><strong>Posted:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Blogs;
