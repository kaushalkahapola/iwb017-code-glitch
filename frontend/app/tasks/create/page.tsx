"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Plus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Select, { SingleValue } from "react-select";

// Add this type definition
type FormErrors = {
  title?: string;
  description?: string;
  offered_task?: string;
};

type Community = {
  community_id: number;
  name: string;
};

type CommunityOption = { value: number; label: string | undefined };

export default function CreateEditTask() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const [task, setTask] = useState({
    title: "",
    description: "",
    offered_task: "",
    community_id: null as number | null,
    posted_by: userId, // Added posted_by with a default user ID of 1
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreated, setIsCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch("http://localhost:9090/communities");
      if (!response.ok) throw new Error("Failed to fetch communities");
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleCommunityChange = (
    selectedOption: SingleValue<CommunityOption>
  ) => {
    setTask((prevTask) => ({
      ...prevTask,
      community_id: selectedOption ? selectedOption.value : null,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!task.title.trim()) newErrors.title = "Title is required";
    if (!task.description.trim())
      newErrors.description = "Description is required";
    if (!task.offered_task.trim())
      newErrors.offered_task = "Offered task is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        const taskToSend = {
          ...task,
          community_id: task.community_id ? task.community_id.toString() : null,
        };

        const response = await fetch("http://localhost:9090/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
          },
          body: JSON.stringify(taskToSend),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to create task");
        }

        setSuccessMessage("Task created successfully!");
        setTimeout(() => router.back(), 2000); // Redirect after 2 seconds
      } catch (error) {
        console.error("Error creating task:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/tasks"
              className="flex items-center text-green-600 hover:text-green-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-lg font-semibold">Back to Tasks</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Task
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="font-medium">Error: {error}</span>
              </div>
            )}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors`}
                  placeholder="Enter a catchy title for your task"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors`}
                  placeholder="Describe your task in detail. What needs to be done? Any specific requirements?"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="offered_task"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Offered Task
                </label>
                <input
                  type="text"
                  id="offered_task"
                  name="offered_task"
                  value={task.offered_task}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.offered_task ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors`}
                  placeholder="What task or service will you offer in return?"
                />
                {errors.offered_task && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.offered_task}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="community"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Community (Optional)
                </label>
                <Select
                  id="community"
                  name="community"
                  value={
                    task.community_id
                      ? {
                          value: task.community_id,
                          label: communities.find(
                            (c) => c.community_id === task.community_id
                          )?.name,
                        }
                      : null
                  }
                  onChange={handleCommunityChange}
                  options={communities.map((community) => ({
                    value: community.community_id,
                    label: community.name,
                  }))}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select a community (optional)"
                  isClearable
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Link
                  href="/tasks"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Task
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
