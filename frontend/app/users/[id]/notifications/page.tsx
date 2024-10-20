"use client";

import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "task_offer",
    message: "John Doe has offered to help with your gardening task",
    timestamp: "2023-06-20T10:30:00Z",
    read: false,
  },
  {
    id: 2,
    type: "community_invite",
    message: "You've been invited to join the 'Tech Enthusiasts' community",
    timestamp: "2023-06-19T15:45:00Z",
    read: true,
  },
  {
    id: 3,
    type: "task_completed",
    message: "Your 'JavaScript Tutoring' task has been marked as completed",
    timestamp: "2023-06-18T09:15:00Z",
    read: true,
  },
];

export default function Notifications({ params }: { params: { id: string } }) {
  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300 ${
              notification.read ? "bg-white" : "bg-green-50"
            }`}
          >
            <div className="flex items-start">
              <Bell
                className={`w-5 h-5 mt-1 ${
                  notification.read ? "text-gray-400" : "text-green-500"
                }`}
              />
              <div className="ml-3 flex-grow">
                <p
                  className={`text-sm ${
                    notification.read
                      ? "text-gray-600"
                      : "text-gray-800 font-semibold"
                  }`}
                >
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
              {!notification.read && (
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
