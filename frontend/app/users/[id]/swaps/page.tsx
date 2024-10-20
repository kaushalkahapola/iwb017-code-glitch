'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, XCircle, Clock, User } from 'lucide-react'

// Sample data for task swap requests and ongoing/completed swaps
const initialSwapRequests = [
  { id: 1, title: 'Garden Maintenance', description: 'Need help with weeding and planting', offeredBy: 'Alice Johnson', status: 'Open' },
  { id: 2, title: 'JavaScript Tutoring', description: 'Offering help with React hooks', offeredBy: 'Bob Smith', status: 'Open' },
  { id: 3, title: 'Dog Walking', description: 'Can walk your dog twice a week', offeredBy: 'Carol Davis', status: 'Open' },
]

const initialOngoingCompletedSwaps = [
  { id: 1, title: 'Lawn Mowing', description: 'Mowed lawn and trimmed hedges', swappedWith: 'David Brown', status: 'Completed' },
  { id: 2, title: 'Python Programming', description: 'Ongoing tutoring sessions', swappedWith: 'Eva White', status: 'Ongoing' },
]

export default function TaskSwapManagement() {
  const [swapRequests, setSwapRequests] = useState(initialSwapRequests)
  const [ongoingCompletedSwaps, setOngoingCompletedSwaps] = useState(initialOngoingCompletedSwaps)

  const handleAccept = (id: number) => {
    const updatedRequests = swapRequests.filter(request => request.id !== id)
    const acceptedRequest = swapRequests.find(request => request.id === id)
    setSwapRequests(updatedRequests)
    if (acceptedRequest) {
      setOngoingCompletedSwaps([...ongoingCompletedSwaps, { ...acceptedRequest, status: 'Ongoing', swappedWith: 'You' }])
    }
  }

  const handleDecline = (id: number) => {
    const updatedRequests = swapRequests.map(request => 
      request.id === id ? { ...request, status: 'Declined' } : request
    )
    setSwapRequests(updatedRequests)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Swap Management</h1>

        {/* Task Swap Requests */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Swap Requests</h2>
          <div className="space-y-4">
            {swapRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{request.title}</h3>
                      <p className="text-gray-600 mb-4">{request.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span>Offered by: {request.offeredBy}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'Open' ? 'bg-green-100 text-green-800' :
                      request.status === 'Declined' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                {request.status === 'Open' && (
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handleDecline(request.id)}
                        className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Decline
                      </button>
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ongoing and Completed Swaps</h2>
          <div className="space-y-4">
            {ongoingCompletedSwaps.map((swap) => (
              <div key={swap.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{swap.title}</h3>
                      <p className="text-gray-600 mb-4">{swap.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span>Swapped with: {swap.swappedWith}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      swap.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {swap.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
