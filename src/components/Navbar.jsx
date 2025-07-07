"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import config from '@/config/index';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/api/me`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        setIsLoggedIn(data.success);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;
    try {
      const response = await fetch(`${config.baseUrl}/api/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        setIsLoggedIn(false);
        router.push('/signin');
      }
    } catch (error) {
      // Optionally handle error
    }
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">My Website</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-300">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="hover:text-gray-300 bg-transparent border-none cursor-pointer">Logout</button>
            </li>
          ) : (
            <li>
              <Link href="/signup">Signup for free</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
