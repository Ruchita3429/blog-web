"use client"
import React , {useState} from 'react'


const blog = () => {
    const [formData, setFormData] = useState({
      username:'',
      title: '',
      blog: '',
    });
  
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/api/blogDB', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.username,
              title: formData.title,
              blog: formData.blog,

            }),
          });
      
          const result = await response.json();
          if(result.success){
            alert("Blog uploaded successfull")
            window.location.reload();
          }else {
            alert("failed to upload");
          }
          
        } catch (error) {
          console.error('failed to upload:', error);
        }
      };
  return (
       <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Blogs </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Give your username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Name Field */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your blog a title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Blog
            </label>
            <textarea
              id="blog"
              name="blog"
              value={formData.blog}
              onChange={handleChange}
              placeholder="Write your blog"
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
           Upload your Blog      
            </button>
        </form>

      </div>
    </div>
  )
}

export default blog