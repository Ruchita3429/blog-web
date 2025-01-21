
import React from 'react';

export default function UserProfile({ params }) {
  const { id } = params;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1>UserProfile</h1>
      <hr />
      <p className="text-4xl ">
        Profile page
        <span className="p-1 shadow-lg rounded-lg bg-orange-500 text-black">{id}</span>
      </p>
    </div>
  );
}
