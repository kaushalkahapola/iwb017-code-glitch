'use client'

import Link from "next/link"
import { useState, useEffect } from "react";

export default function Header() {

  const [userId, setUserId] = useState<string | null>(null);
  // Updated links to be a state variable
  const [links, setLinks] = useState<{ [key: string]: string }>({
    Dashboard: `/users/${userId}/profile`,
    Communities: "/communities",
    Tasks: "/tasks"
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("/api/user", {
          method:"GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserId(data.id);
        } else {
          console.error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Update links whenever userId changes
  useEffect(() => {
    setLinks({
      Dashboard: `/users/${userId}/profile`,
      Communities: "/communities",
      Tasks: "/tasks"
    });
  }, [userId]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 md:px-6">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-green-600">Task</span>
            <span className="text-gray-900">Swap</span>
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-1 animate-pulse"></span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {Object.entries(links).map(([key, value]) => (
            <Link key={key} href={value} className="text-gray-600 hover:text-green-600 transition-colors duration-300">
              {key}
            </Link>
          ))}
        </nav>
        <Link
          href="/join"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white shadow hover:bg-green-700 h-9 px-4 py-2"
        >
          Contact Us
        </Link>
      </div>
    </header>
  )
}
