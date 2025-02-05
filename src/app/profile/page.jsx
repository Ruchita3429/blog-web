"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });   
      const result = await response.json();
      
      if (result.success) {
        alert("Signout successful");
        router.push('/signin');
      } else {
        alert(result.message || "Signout failed");
      }
    } catch (error) {
      console.error("Signout failed:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
       <h1 className="text-2xl font-bold mb-4">Profile</h1> 
       <hr className="mb-4"/>
       <p className="mb-4">Profile page </p>
       <hr className="mb-4"/>
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