"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, User, Star } from "lucide-react";

// Sample data for task swap requests and ongoing/completed swaps
const initialSwapRequests = [
  {
    id: 1,
    title: "Garden Maintenance",
    description: "Need help with weeding and planting",
    offeredBy: "Alice Johnson",
    status: "Open",
    offeredTask: "Cooking lessons",
  },
  {
    id: 2,
    title: "JavaScript Tutoring",
    description: "Offering help with React hooks",
    offeredBy: "Bob Smith",
    status: "Open",
    offeredTask: "Yoga instruction",
  },
  {
    id: 3,
    title: "Dog Walking",
    description: "Can walk your dog twice a week",
    offeredBy: "Carol Davis",
    status: "Open",
    offeredTask: "Guitar lessons",
  },
];

const initialOngoingCompletedSwaps = [
  {
    id: 1,
    title: "Lawn Mowing",
    description: "Mowed lawn and trimmed hedges",
    swappedWith: "David Brown",
    status: "Completed",
    rating: 5,
  },
  {
    id: 2,
    title: "Python Programming",
    description: "Ongoing tutoring sessions",
    swappedWith: "Eva White",
    status: "Ongoing",
  },
];

export default function TaskSwapManagement({
  params,
}: {
  params: { id: string };
}) {
  const [swapRequests, setSwapRequests] = useState(initialSwapRequests);
  const [ongoingCompletedSwaps, setOngoingCompletedSwaps] = useState(
    initialOngoingCompletedSwaps
  );

  const handleAccept = (id: number) => {
    const updatedRequests = swapRequests.filter((request) => request.id !== id);
    const acceptedRequest = swapRequests.find((request) => request.id === id);
    setSwapRequests(updatedRequests);
    if (acceptedRequest) {
      setOngoingCompletedSwaps([
        ...ongoingCompletedSwaps,
        {
          ...acceptedRequest,
          status: "Ongoing",
          swappedWith: acceptedRequest.offeredBy,
        },
      ]);
    }
  };

  const handleDecline = (id: number) => {
    const updatedRequests = swapRequests.map((request) =>
      request.id === id ? { ...request, status: "Declined" } : request
    );
    setSwapRequests(updatedRequests);
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

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Task Swap Management
      </h1>

      {/* Task Swap Requests */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Swap Requests</h2>
        <div className="space-y-4">
          {swapRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {request.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{request.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <User className="w-4 h-4 mr-1" />
                      <span>Offered by: {request.offeredBy}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Offered Task: {request.offeredTask}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      request.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
              {request.status === "Open" && (
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleDecline(request.id)}
                      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 transition-colors duration-300"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accept
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ongoing and Completed Swaps */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Ongoing and Completed Swaps
        </h2>
        <div className="space-y-4">
          {ongoingCompletedSwaps.map((swap) => (
            <div
              key={swap.id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {swap.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{swap.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>Swapped with: {swap.swappedWith}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                        swap.status === "Completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {swap.status}
                    </span>
                    {swap.status === "Completed" && swap.rating && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {swap.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
