"use client"; 
import React , {useState, useEffect} from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { validateSignupForm } from "@/utils/helper";

const SigninForm = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState("");
  const [buttonDisabled , setButtonDisabled]= useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState();

  const onSignin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
  
    // const validationError = validateSignupForm(user);
    // if (validationError) {
    //   setError(validationError);
    //   return;
    // }
  
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/signin', {
        method: 'POST', // Make sure this is POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include',
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Signin successful");
        router.push("/profile"); // Redirect after success
      } else {
        alert(result.message || "Signin failed");
      }
    } catch (error) {
      console.error("Signin failed:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 ){
          setButtonDisabled(false);
         }else{
          setButtonDisabled(true);
         }
    },[user])
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={onSignin}>
        <div className="text-2xl font-bold text-center mb-4 text-gray-800">
          <h1>Login </h1>
          <br/> {loading ? "wait" : ""}
        </div>

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {buttonDisabled ? "Cant Sign in" : "Sign in" }
        </button>

        {/* Sign up redirect */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
