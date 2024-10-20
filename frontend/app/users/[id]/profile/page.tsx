"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: "123",
    name: "Jane Smith",
    username: "JaneSmith",
    picture: "/placeholder.svg?height=150&width=150&text=JS",
    bio: "Passionate about community building and skill sharing. Always eager to learn new things and help others.",
    location: "San Francisco, CA",
    averageRating: 4.8,
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Gardening Help",
      description: "Need help with weeding and planting",
      status: "Open",
      postedDate: "2023-06-15",
      offeredTask: "Cooking lessons",
    },
    {
      id: 2,
      title: "Computer Repair",
      description: "Looking for help with React hooks",
      status: "In Progress",
      postedDate: "2023-06-10",
      offeredTask: "Yoga instruction",
    },
    {
      id: 3,
      title: "Dog Walking",
      description: "Need someone to walk my dog twice a week",
      status: "Completed",
      postedDate: "2023-06-05",
      offeredTask: "Guitar lessons",
    },
  ]);

  const communities = [
    {
      id: 1,
      name: "Green Thumbs",
      description: "For gardening enthusiasts",
      joinDate: "2023-05-01",
    },
    {
      id: 2,
      name: "Tech Support",
      description: "Help with tech issues",
      joinDate: "2023-05-15",
    },
    {
      id: 3,
      name: "Pet Lovers",
      description: "For all pet owners",
      joinDate: "2023-06-01",
    },
  ];

  const completedSwaps = [
    {
      id: 1,
      title: "Lawn Mowing",
      userInvolved: "JohnDoe",
      swapDate: "2023-06-02",
      rating: 5,
    },
    {
      id: 2,
      title: "Baking Lessons",
      userInvolved: "AliceGreen",
      swapDate: "2023-05-20",
      rating: 4,
    },
  ];

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save the updated user data to your backend
  };

  const handleLeaveCommunity = (communityId: number) => {
    // Here you would typically handle the logic to leave a community
    console.log(`Leaving community with id: ${communityId}`);
  };

  const handleEditTask = (taskId: number) => {
    router.push(`/tasks/${taskId}/edit`);
  };

  const handleDeleteTask = useCallback(async (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`http://localhost:9090/tasks/${taskId}`, {
          method: "DELETE",
          headers: {
            Origin: "http://localhost:3000",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        // Remove the deleted task from the state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  }, []);

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
          <div className="md:flex-shrink-0 relative">
            <Image
              src={user.picture}
              alt={user.name}
              width={150}
              height={150}
              className="rounded-full mx-auto md:mx-0"
            />
            {!isEditing && (
              <button
                onClick={handleEditProfile}
                className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="text-3xl font-bold text-gray-900 mb-2 w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
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
                {user.averageRating.toFixed(1)} average rating
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
                key={task.id}
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
                        Offered: {task.offeredTask}
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
                      onClick={() => handleEditTask(task.id)}
                      className="p-2 text-green-500 hover:bg-green-100 rounded transition-colors duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Posted: {task.postedDate}
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
                key={community.id}
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
                    <p className="text-xs text-gray-500 mt-4">
                      Joined: {community.joinDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/communities/${community.id}`}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 text-sm"
                    >
                      Visit
                    </Link>
                    <button
                      onClick={() => handleLeaveCommunity(community.id)}
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
              key={swap.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {swap.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Swapped with: {swap.userInvolved}
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
                Date: {swap.swapDate}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
