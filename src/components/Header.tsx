'use client'; // Necessario per useRouter e interazione (logout)

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Video Hub Aziendale
        </Link>
        {/* Placeholder per Search Bar (futuro) */}
        <div></div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded text-sm transition duration-150"
        >
          Logout
        </button>
      </div>
    </header>
  );
} 