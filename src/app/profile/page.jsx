"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  // Fetch user details when the component mounts
  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await axios.get('/api/me');  // Fetch the user data
        console.log("User API Response:", response.data); // Debugging log
        setData(response.data.data); // Store the user data in state
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    
    getUserDetail();  // Call the function to get user data
  }, []); // Empty dependency array to run it only once when the component mounts
  
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });   
      const result = await response.json();
      
      if (result.success) {
        alert("Logout successful");
        router.push('/signin');
      } else {
        alert(result.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
       <h1 className="text-2xl font-bold mb-4">Profile</h1> 
       <hr className="mb-4"/>
       <p className="mb-4">Profile page </p>

       {data ? (
         <div className="mb-4">
           <h2 className="text-xl font-bold">User Details:</h2>
           <p><strong>ID:</strong> {<Link href={`/profile/${data._id}`}>{data._id}</Link> || "Not available"}</p>
           <p><strong>Username:</strong> {data.username || "Not available"}</p>
           <p><strong>Email:</strong> {data.email || "Not available"}</p>
           <p><strong>Role:</strong> {data.role || "Not available"}</p>
           <p><strong>Country:</strong> {data.country || "Not available"}</p>
         </div>
       ) : (
         <p>Loading user details...</p>
       )}

       <hr/>

       <button 
         onClick={logout}
         className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
       > 
         Logout 
       </button>
    </div>
  )
}

export default Profile;
