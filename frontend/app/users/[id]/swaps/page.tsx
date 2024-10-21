"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, User, MapPin, Star } from "lucide-react";

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
  posted_by: number;
  status: string;
  community_id?: number;
  created_at: string;
};

type SwapRequest = {
  request_id: number;
  task_id: number;
  posted_by: number;
  requested_by: number;
  request_status: string;
  task?: Task | null;
  requester?: User | null;
};

export default function TaskSwapManagement({
  params,
}: {
  params: { id: string };
}) {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [ongoingCompletedSwaps, setOngoingCompletedSwaps] = useState<SwapRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSwapRequests();
  }, [params.id]);

  const fetchSwapRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const swapResponse = await fetch(`http://localhost:9090/swapRequests/user/${params.id}`);
      if (!swapResponse.ok) throw new Error('Failed to fetch swap requests');
      const swapData: SwapRequest[] = await swapResponse.json();

      const swapsWithDetails = await Promise.all(swapData.map(async (swap) => {
        const [taskResponse, requesterResponse] = await Promise.all([
          fetch(`http://localhost:9090/tasks/${swap.task_id}`),
          fetch(`http://localhost:9090/users/${swap.requested_by}`)
        ]);
        
        const task: Task | null = taskResponse.ok ? await taskResponse.json() : null;
        const requester: User | null = requesterResponse.ok ? await requesterResponse.json() : null;

        return { ...swap, task, requester };
      }));

      const pending = swapsWithDetails.filter(swap => swap.request_status === 'Pending');
      const ongoingCompleted = swapsWithDetails.filter(swap => swap.request_status !== 'Pending');
      
      setSwapRequests(pending);
      setOngoingCompletedSwaps(ongoingCompleted);
    } catch (error) {
      console.error('Error fetching swap requests:', error);
      setError('Failed to load swap requests. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:9090/swapRequests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Accepted' }),
      });
      if (!response.ok) {
        throw new Error('Failed to accept swap request');
      }
      fetchSwapRequests();
    } catch (error) {
      console.error('Error accepting swap request:', error);
      setError('Failed to accept swap request. Please try again.');
    }
  };

  const handleDecline = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:9090/swapRequests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Rejected' }),
      });
      if (!response.ok) {
        throw new Error('Failed to decline swap request');
      }
      fetchSwapRequests();
    } catch (error) {
      console.error('Error declining swap request:', error);
      setError('Failed to decline swap request. Please try again.');
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Task Swap Management</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Swap Requests</h2>
        <div className="space-y-4">
          {swapRequests.map((request) => (
            <div key={request.request_id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{request.task?.title}</h3>
                    <p className="text-gray-600 mb-4">{request.task?.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <User className="w-4 h-4 mr-2" />
                      <span>Requested by: {request.requester?.username}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{request.requester?.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>Rating: {request.requester?.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    request.request_status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.request_status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {request.request_status}
                  </span>
                </div>
              </div>
              {request.request_status === "Pending" && (
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleDecline(request.request_id)}
                      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 transition-colors duration-300"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept(request.request_id)}
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

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ongoing and Completed Swaps</h2>
        <div className="space-y-4">
          {ongoingCompletedSwaps.map((swap) => (
            <div key={swap.request_id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{swap.task?.title}</h3>
                    <p className="text-gray-600 mb-4">{swap.task?.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <User className="w-4 h-4 mr-2" />
                      <span>Swapped with: {swap.requester?.username}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{swap.requester?.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>Rating: {swap.requester?.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    swap.request_status === "Accepted" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}>
                    {swap.request_status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
