"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);  // Initialize blogs as an empty array
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogDB");
        if (response.data && Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);  // Ensure the response is an array
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
        const response = await fetch("/api/me", {
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-max max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to the Blog App
        </h1>
        {isLoggedIn ? (
          <div className="text-center mb-4">
            <p className="text-lg">Welcome back! Create your own blog.</p>
            <a
              href="/newblog"
              className="text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600"
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
            <div key={blog._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-700">
                {blog.content && blog.content.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500">By {blog.authorName}</p>
              <a
                href={`/blog/${blog._id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
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
