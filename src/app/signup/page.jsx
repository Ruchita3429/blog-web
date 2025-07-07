"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { validateSignupForm } from "@/helpers/helper";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from '@/config/index';

const SignupForm = () => {
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    signupAs: "",
    country: "",
  });
  const [buttonDisabled , setButtonDisabled]= useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setUser((prev) => ({
      ...prev, // Keep previous state
      [name]: value, // Dynamically update the property based on the name
    }));
  };
  const [error, setError] = React.useState(""); // State for storing errors

  const onSignup = async (e) => {
    e.preventDefault();
    setError("");
  
    const validationError = validateSignupForm(user);
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      const response = await axios.post(`${config.baseUrl}/api/signup`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.success) {
        alert("Signup successful!");
        router.push("/signin");
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };
  

  useEffect(() => {
    if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0
      && user.confirmpassword.length > 0 && user.signupAs.length > 0
       && user.country.length > 0 ){
        setButtonDisabled(false);
       }else{
        setButtonDisabled(true);
       }
  },[user])
  return (
    <form
      className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg"
      onSubmit={onSignup}
    >
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Sign Up
      </h1>

      {/* Show Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {/* Email input */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Username input */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password input */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Confirm Password input */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          value={user.confirmpassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sign up as */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">
          Sign up as
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="signupAs"
              value="User"
              checked={user.signupAs === "User"}
              onChange={handleChange}
              className="mr-2"
            />
            <span>User</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="signupAs"
              value="Admin"
              checked={user.signupAs === "Admin"}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Admin</span>
          </label>
        </div>
      </div>

      {/* Country select */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">
          Select Country
        </label>
        <select
          name="country"
          value={user.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose an option</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Japan">Japan</option>
          <option value="China">China</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {buttonDisabled ? "Cant signup" : "Sign up" }
      </button>

      {/* Redirect to Signin page */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
