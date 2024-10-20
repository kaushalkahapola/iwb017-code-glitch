"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDate } from "@/app/tasks/[id]/page";

interface Notification {
  id: number;
  user_id: number;
  message: string;
  read_status: boolean;
  created_at: [number, number];
}

export default function Notifications({ params }: { params: { id: string } }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:9090/notifications/${params.id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotifications(data);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch(
        `http://localhost:9090/notifications/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
          },
          body: JSON.stringify({ read_status: true }),
        }
      );
      if (response.ok) {
        setNotifications(
          notifications.map((notif) =>
            notif.id === notificationId
              ? { ...notif, read_status: true }
              : notif
          )
        );
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(
        (notif) => !notif.read_status
      );
      const markReadPromises = unreadNotifications.map((notif) =>
        markAsRead(notif.id)
      );

      await Promise.all(markReadPromises);

      setNotifications(notifications);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Mark All as Read
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300 ${
              notification.read_status ? "bg-white" : "bg-green-50"
            }`}
          >
            <div className="flex items-start">
              <Bell
                className={`w-5 h-5 mt-1 ${
                  notification.read_status ? "text-gray-400" : "text-green-500"
                }`}
              />
              <div className="ml-3 flex-grow">
                <p
                  className={`text-sm ${
                    notification.read_status
                      ? "text-gray-600"
                      : "text-gray-800 font-semibold"
                  }`}
                >
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(notification.created_at)}
                </p>
              </div>
              <div className="ml-auto pl-3">
                {!notification.read_status ? (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-sm text-green-600 hover:text-green-800 transition-colors duration-300 flex items-center"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Mark as Read
                  </button>
                ) : (
                  <span className="text-sm text-gray-400">Read</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
