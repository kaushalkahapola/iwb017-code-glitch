"use client";

import Link from "next/link";
import { User, Bell, Repeat, LogOut } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { icon: User, label: "Profile", href: `/users/${userId}/profile` },
    {
      icon: Bell,
      label: "Notifications",
      href: `/users/${userId}/notifications`,
    },
    { icon: Repeat, label: "Swaps", href: `/users/${userId}/swaps` },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear any client-side storage
        localStorage.removeItem('token');
        // Navigate to the home page
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="bg-white w-64 min-h-screen flex flex-col border-r border-gray-200">
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-green-600">Task</span>
            <span className="text-gray-900">Swap</span>
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-1 animate-pulse"></span>
          </span>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-300"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center text-gray-700 hover:text-green-700 transition-colors duration-300"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </aside>
  );
}
