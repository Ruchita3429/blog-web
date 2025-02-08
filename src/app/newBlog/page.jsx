"use client"
import React , {useState} from 'react'
import config from '@/config/index';

const blog = () => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
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
          const response = await fetch(`${config.baseUrl}/api/blogDB`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: formData.title,
              content: formData.content, 
            }),
          });
      
          const result = await response.json();
          if (result.success) {
            alert("Blog uploaded successfully");
            window.location.reload();
          } else {
            alert("Failed to upload");
          }
        } catch (error) {
          console.error('Failed to upload:', error);
        }
      };
      
  return (
       <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Blog </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
       
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
            Content
            </label>
            <textarea
              id="content"
              name="content"
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