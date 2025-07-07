"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import config from '@/config/index';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Links */}
        <ul
          className={`md:flex md:space-x-4 md:static absolute left-0 w-full md:w-auto bg-blue-500 md:bg-transparent z-10 transition-all duration-200 ease-in-out
            ${menuOpen ? 'top-16 opacity-100' : 'top-[-490px] opacity-0 md:opacity-100'}
          `}
        >
          <li className="block md:inline-block px-4 py-2 md:p-0">
            <Link href="/" className="hover:text-gray-300 block">
              Home
            </Link>
          </li>
          <li className="block md:inline-block px-4 py-2 md:p-0">
            <Link href="/blog" className="hover:text-gray-300 block">
              Blog
            </Link>
          </li>
          <li className="block md:inline-block px-4 py-2 md:p-0">
            <Link href="/profile" className="hover:text-gray-300 block">
              Profile
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="block md:inline-block px-4 py-2 md:p-0">
              <button onClick={handleLogout} className="hover:text-gray-300 bg-transparent border-none cursor-pointer w-full text-left md:text-center">Logout</button>
            </li>
          ) : (
            <li className="block md:inline-block px-4 py-2 md:p-0">
              <Link href="/signup" className="block">Signup for free</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
