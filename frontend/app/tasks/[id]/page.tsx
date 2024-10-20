"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Star, ArrowLeft } from "lucide-react";
import { Task } from "../page";

interface User {
  username: string;
  rating: number;
}

interface Community {
  name: string;
}

export function formatDate(dateArray: [number, number]): string {
  const [seconds, _] = dateArray;
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TaskDetails({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [community, setCommunity] = useState<Community | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/tasks/${params.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch task details");
        const data: Task = await response.json();
        setTask(data);

        const userResponse = await fetch(
          `http://localhost:9090/users/${data.posted_by}`
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user details");
        const userData: User = await userResponse.json();
        setUser(userData);

        if (data.community_id) {
          const communityResponse = await fetch(
            `http://localhost:9090/communities/${data.community_id}`
          );
          if (!communityResponse.ok)
            throw new Error("Failed to fetch community details");
          const communityData: Community = await communityResponse.json();
          setCommunity(communityData);
        }

        setIsLoading(false);
      } catch (err) {
        setError("Error fetching details");
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [params.id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  if (!task || !user)
    return (
      <div className="flex justify-center items-center h-screen">
        No task found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/tasks"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Tasks
            </Link>
            <span className="text-gray-900 text-lg font-semibold">
              Task Details
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              {task.title}
            </h1>

            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.username}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-gray-600">
                      {user.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : task.status === "Accepted"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-700 leading-relaxed">
                {task.description}
              </p>
              {community && (
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Community: {community.name}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Offered: {task.offered_task}
                </span>
                <span className="text-gray-500 text-sm">
                  Created: {formatDate(task.created_at)}
                </span>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Offer Task Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
