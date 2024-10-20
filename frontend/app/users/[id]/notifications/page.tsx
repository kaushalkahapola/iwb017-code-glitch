'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, CheckCircle, Trash2, ArrowRight } from 'lucide-react'

// Sample data for notifications
const initialNotifications = [
  { id: 1, message: "New task swap offer from Alice for 'Gardening Help'", isRead: false, link: "/tasks/1" },
  { id: 2, message: "Your task 'JavaScript Tutoring' was accepted by Bob", isRead: true, link: "/tasks/2" },
  { id: 3, message: "Reminder: You have a pending task swap with Carol", isRead: false, link: "/swaps/3" },
  { id: 4, message: "New message in the 'DIY Enthusiasts' community", isRead: false, link: "/communities/4" },
  { id: 5, message: "Your review for 'Lawn Mowing' task has been submitted", isRead: true, link: "/tasks/5" },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start p-4 rounded-lg ${
                    notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <Bell className={`w-6 h-6 mr-3 ${notification.isRead ? 'text-gray-400' : 'text-blue-500'}`} />
                  <div className="flex-grow">
                    <Link href={notification.link} className="block mb-1 hover:underline">
                      <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                        {notification.message}
                      </p>
                    </Link>
                    <div className="flex items-center text-xs text-gray-500">
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="flex items-center mr-4 hover:text-blue-600 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark as read
                      </button>
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="flex items-center hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                  <Link href={notification.link} className="ml-2 text-blue-600 hover:text-blue-800">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-center text-gray-500 py-4">No notifications</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}