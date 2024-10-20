"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  LogOut,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { headers } from "next/headers";
import { formatDate } from "@/app/tasks/[id]/page";

type User = {
  user_id: number;
  username: string;
  email: string;
  location: string;
  bio: string;
  rating: number;
};

type Task = {
  task_id: number;
  title: string;
  description: string;
  status: string;
  offered_task: string;
  created_at: [number, number];
};

type Community = {
  community_id: number;
  name: string;
  description: string;
};

type CompletedSwap = {
  swap_id: number;
  task_id: number;
  title: string;
  accepted_by: number;
  accepted_by_name: string; // New field
  created_at: [number, number];
  rating: number;
};

export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [completedSwaps, setCompletedSwaps] = useState<CompletedSwap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(
          `http://localhost:9090/users/${params.id}`
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user details");
        const userData: User = await userResponse.json();
        setUser(userData);

        const tasksResponse = await fetch(
          `http://localhost:9090/tasks/user/${params.id}`
        );
        if (tasksResponse.ok) {
          const tasksData: Task[] = await tasksResponse.json();
          setTasks(tasksData);
        }

        const communitiesResponse = await fetch(
          `http://localhost:9090/memberCommunities/${params.id}`
        );
        if (communitiesResponse.ok) {
          const communitiesData: Community[] = await communitiesResponse.json();
          setCommunities(communitiesData);
        }

        const swapsResponse = await fetch(
          `http://localhost:9090/taskSwaps/user/${params.id}`
        );
        if (swapsResponse.ok) {
          const swapsData: CompletedSwap[] = await swapsResponse.json();
          const swapsWithDetails = await Promise.all(
            swapsData.map(async (swap) => {
              const userResponse = await fetch(
                `http://localhost:9090/users/${swap.accepted_by}`
              );
              const userData = await userResponse.json();
              const taskResponse = await fetch(
                `http://localhost:9090/tasks/${swap.task_id}`
              );
              const taskData = await taskResponse.json();
              return {
                ...swap,
                accepted_by_name: userData.username,
                title: taskData.title,
              };
            })
          );
          setCompletedSwaps(swapsWithDetails);
        }

        setIsLoading(false);
      } catch (err) {
        setError("Failed to load user data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [params.id]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    // Implement the logic to save the updated user data to the backend
    setIsEditing(false);
  };

  const handleLeaveCommunity = async (communityId: number) => {
    // Implement the logic to leave a community
    console.log(`Leaving community with id: ${communityId}`);
  };

  const handleEditTask = (taskId: number) => {
    router.push(`/tasks/${taskId}/edit`);
  };

  const handleDeleteTask = async (taskId: number) => {
    // Implement the logic to delete a task
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading user profile...</div>;
  }

  if (error || !user) {
    return (
      <div className="text-center py-12 text-red-600">
        {error || "Failed to load user profile"}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">User Profile</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-6 sm:p-8 md:flex items-center">
          <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="text-3xl font-bold text-gray-900 mb-2 w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900">
                {user.username}
              </h2>
            )}
            <div className="flex items-center mt-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              {isEditing ? (
                <input
                  type="text"
                  value={user.location}
                  onChange={(e) =>
                    setUser({ ...user, location: e.target.value })
                  }
                  className="ml-2 text-gray-600 w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              ) : (
                <span className="ml-2 text-gray-600">{user.location}</span>
              )}
            </div>
            <div className="flex items-center mt-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-2 text-gray-600">
                {user.rating.toFixed(1)} average rating
              </span>
            </div>
            {isEditing ? (
              <textarea
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                className="mt-4 text-gray-600 w-full h-24 border rounded p-2 focus:outline-none focus:border-green-500"
              />
            ) : (
              <p className="mt-4 text-gray-600">{user.bio}</p>
            )}
            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
              >
                Save Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
            <button className="flex items-center text-green-500 hover:text-green-600 transition-colors duration-300">
              <Plus className="w-5 h-5 mr-1" />
              Add Task
            </button>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.task_id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{task.description}</p>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm text-gray-500 mr-4">
                        Offered: {task.offered_task}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          task.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTask(task.task_id)}
                      className="p-2 text-green-500 hover:bg-green-100 rounded transition-colors duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.task_id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Posted: {task.created_at}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">My Communities</h2>
            <button className="flex items-center text-green-500 hover:text-green-600 transition-colors duration-300">
              <Plus className="w-5 h-5 mr-1" />
              Join Community
            </button>
          </div>
          <div className="space-y-4">
            {communities.map((community) => (
              <div
                key={community.community_id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {community.name}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {community.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/communities/${community.community_id}`}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 text-sm"
                    >
                      Visit
                    </Link>
                    <button
                      onClick={() =>
                        handleLeaveCommunity(community.community_id)
                      }
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 text-sm"
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      Leave
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Completed Swaps
        </h2>
        <div className="space-y-4">
          {completedSwaps.map((swap) => (
            <div
              key={swap.swap_id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {swap.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Swapped with: {swap.accepted_by_name}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-600 font-semibold">
                    {swap.rating}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Date: {formatDate(swap.created_at)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
