"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { MapPin, Plus } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Select from "react-select";
import "../styles/react-select-styles.css";
import Link from "next/link";

// Define interfaces
interface Task {
  task_id: number;
  title: string;
  description: string;
  posted_by: number;
  offered_task: string;
  status: string;
  community_id: number | null;
  created_at: string;
}

interface User {
  user_id: number;
  username: string;
  // Add other user properties as needed
}

interface Community {
  community_id: number;
  name: string;
  // Add other community properties as needed
}

export default function TaskFeed() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [communities, setCommunities] = useState<Record<number, Community>>({});
  const [filters, setFilters] = useState({
    community: "All",
    status: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:9090/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }, []);

  // Fetch users
  const fetchUsers = useCallback(
    async (userIds: number[]) => {
      const uniqueUserIds = Array.from(new Set(userIds));
      const newUsers: Record<number, User> = {};
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          if (!users[userId]) {
            try {
              const response = await fetch(
                `http://localhost:9090/users/${userId}`
              );
              if (!response.ok)
                throw new Error(`Failed to fetch user ${userId}`);
              const userData = await response.json();
              newUsers[userId] = userData;
            } catch (error) {
              console.error(`Error fetching user ${userId}:`, error);
            }
          }
        })
      );
      setUsers((prevUsers) => ({ ...prevUsers, ...newUsers }));
    },
    [users]
  );

  // Fetch communities
  const fetchCommunities = useCallback(
    async (communityIds: (number | null)[]) => {
      const uniqueCommunityIds = Array.from(
        new Set(communityIds.filter((id): id is number => id !== null))
      );
      const newCommunities: Record<number, Community> = {};
      await Promise.all(
        uniqueCommunityIds.map(async (communityId) => {
          if (!communities[communityId]) {
            try {
              const response = await fetch(
                `http://localhost:9090/communities/${communityId}`
              );
              if (!response.ok)
                throw new Error(`Failed to fetch community ${communityId}`);
              const communityData = await response.json();
              newCommunities[communityId] = communityData;
            } catch (error) {
              console.error(`Error fetching community ${communityId}:`, error);
            }
          }
        })
      );
      setCommunities((prevCommunities) => ({
        ...prevCommunities,
        ...newCommunities,
      }));
    },
    [communities]
  );

  useEffect(() => {
    const loadData = async () => {
      const tasksData = await fetchTasks();
      const userIds = tasksData.map((task: Task) => task.posted_by);
      const communityIds = tasksData.map((task: Task) => task.community_id);
      await Promise.all([fetchUsers(userIds), fetchCommunities(communityIds)]);
    };
    loadData();
  }, [fetchTasks, fetchUsers, fetchCommunities]);

  // Create options for react-select
  const communityOptions = useMemo(() => {
    const options = Object.values(communities).map((community) => ({
      value: community.community_id.toString(),
      label: community.name,
    }));
    return [{ value: "All", label: "All" }, ...options];
  }, [communities]);

  const handleFilterChange = (filterType: string, selectedOption: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedOption.value,
    }));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        (filters.community === "All" ||
          task.community_id?.toString() === filters.community) &&
        (filters.status === "All" || task.status === filters.status) &&
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [tasks, filters, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Feed</h1>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Filter section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
          <div className="flex flex-wrap gap-4">
            {/* Community filter */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="community"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Community
              </label>
              <Select
                id="community"
                options={communityOptions}
                value={communityOptions.find(
                  (option) => option.value === filters.community
                )}
                onChange={(selectedOption) =>
                  handleFilterChange("community", selectedOption)
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Status filter */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) =>
                  handleFilterChange("status", { value: e.target.value })
                }
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                {["All", "Open", "Accepted", "Completed"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Task cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.task_id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {task.title}
                </h2>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-700">
                    Posted by:{" "}
                    {users[task.posted_by]?.username ||
                      `User ${task.posted_by}`}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
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
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">
                    Offered: {task.offered_task}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {task.community_id
                    ? communities[task.community_id]?.name ||
                      `Community ${task.community_id}`
                    : "No Community"}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between">
                  <button className="text-green-600 hover:text-green-800 font-medium transition-colors duration-300">
                    View Details
                  </button>
                  <button className="text-green-600 hover:text-green-800 font-medium transition-colors duration-300">
                    Offer Swap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating button for creating a new task */}
        <Link href="/tasks/create" passHref>
          <button className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <Plus className="w-6 h-6" />
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
