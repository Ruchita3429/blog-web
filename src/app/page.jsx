"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "@/config/index";

const Home = () => {
  const [blogs, setBlogs] = useState([]);  // Initialize blogs as an empty array
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/api/blogDB`);
        if (response.data && Array.isArray(response.data.blogs)) {
          // Sort blogs by createdAt descending (latest first)
          const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBlogs(sortedBlogs);  // Ensure the response is an array
        } else {
          setBlogs([]);  // Fallback in case the response structure is unexpected
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);  // Handle the error gracefully by ensuring blogs is always an array
      }
    };

    fetchBlogs();

    // Check login status
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/api/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // Limit the number of blogs displayed to 3
  const displayedBlogs = blogs.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-2 sm:px-4">
      <div className="max-w-3xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to the Blog App
        </h1>
        {isLoggedIn ? (
          <div className="text-center mb-4">
            <p className="text-lg">Welcome back! Create your own blog.</p>
            <a
              href="/newBlog"
              className="text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 "
            >
              Create Blog
            </a>
          </div>
        ) : (
          <div className="text-center mb-4">
            <p className="text-lg">Join our community and start blogging!</p>
            <a
              href="/signup"
              className="text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </a>
          </div>
        )}

<h2 className="text-2xl font-semibold mb-2">Latest Blogs</h2>
        {displayedBlogs.length === 0 ? (
          <p>No blogs yet. Be the first to create one!</p>
        ) : (
          displayedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="mb-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow cursor-pointer p-6 bg-gray-100 shadow-md"
            >
              <h2 className="text-2xl font-bold">{blog.title}</h2>
              <p className="mb-4 text-gray-800 whitespace-pre-wrap break-words leading-relaxed overflow-hidden" style={{ wordBreak: 'break-word' }}>
                {blog.content && blog.content.slice(0, 100)}...
              </p>
              <div className="mt-2 text-sm text-gray-500">
                <p><strong>By:</strong> {blog.authorName}</p>
                <p><strong>From:</strong> {blog.authorCountry || 'Unknown'}</p>
                <p><strong>Posted:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
                <a
                  href={`/blog/${blog._id}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        )}
        {blogs.length > 3 && (
          <div className="text-center mt-4">
            <a
              href="/blog"
              className="text-blue-500 hover:underline"
            >
              View All Blogs
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
