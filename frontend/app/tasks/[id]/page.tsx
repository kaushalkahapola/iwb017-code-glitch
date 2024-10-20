'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MapPin, Users, Star, MessageSquare, Send } from 'lucide-react'

export default function TaskDetails() {
  const [comment, setComment] = useState('')

  // This would typically come from your API or props
  const task = {
    id: '1',
    title: 'Garden Maintenance',
    description: 'I need help with weeding, planting new flowers, and general maintenance of my backyard garden. The garden is approximately 500 square feet and hasn\'t been maintained for a few months. I\'m looking for someone with gardening experience who can help bring it back to life. Tools will be provided, but if you have your own, feel free to bring them.',
    offeredTask: 'Cooking lessons (specializing in Italian cuisine)',
    user: {
      name: 'Alice Johnson',
      picture: '/placeholder.svg?height=64&width=64&text=AJ',
      rating: 4.8,
    },
    location: 'San Francisco, CA',
    status: 'Open',
    community: 'Green Thumbs',
    comments: [
      { id: '1', user: 'Bob Smith', text: 'How long do you estimate this task will take?', timestamp: '2023-06-15T14:30:00Z' },
      { id: '2', user: 'Alice Johnson', text: 'I think it would take about 3-4 hours for an experienced gardener.', timestamp: '2023-06-15T15:45:00Z' },
    ]
  }

  const handleCommentSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Here you would typically send the comment to your API
    console.log('Submitting comment:', comment)
    setComment('')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
          
          <div className="flex items-center mb-6">
            <Image
              src={task.user.picture}
              alt={task.user.name}
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{task.user.name}</h2>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{task.user.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700">{task.description}</p>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{task.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span>{task.community}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Offered: {task.offeredTask}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                task.status === 'Open' ? 'bg-green-100 text-green-800' :
                task.status === 'Accepted' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {task.status}
              </span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Offer Task Swap
          </button>
        </div>

        <div className="bg-gray-50 p-6">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="space-y-4 mb-6">
            {task.comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-md shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="flex items-center">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}