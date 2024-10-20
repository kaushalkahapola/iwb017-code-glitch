"use client";

import Link from "next/link";
import { User, Bell, Repeat, LogOut } from "lucide-react";
import { useParams } from "next/navigation";

export default function Sidebar() {
  const params = useParams();
  const userId = params.id;

  const navItems = [
    { icon: User, label: "Profile", href: `/users/${userId}/profile` },
    {
      icon: Bell,
      label: "Notifications",
      href: `/users/${userId}/notifications`,
    },
    { icon: Repeat, label: "Swaps", href: `/users/${userId}/swaps` },
  ];

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
        <button className="flex items-center text-gray-700 hover:text-green-700 transition-colors duration-300">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
