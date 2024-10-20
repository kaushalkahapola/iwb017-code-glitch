'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Filter, Plus } from 'lucide-react'

// Placeholder data for tasks
const tasks = [
  {
    id: 1,
    title: 'Garden Maintenance',
    description: 'Need help with weeding and planting flowers in my backyard.',
    offeredTask: 'Cooking lessons',
    user: { name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40&text=AJ' },
    status: 'Open',
    location: 'San Francisco, CA',
    category: 'Home & Garden',
    community: 'Green Thumbs'
  },
  {
    id: 2,
    title: 'JavaScript Tutoring',
    description: 'Looking for help with React hooks and state management.',
    offeredTask: 'Yoga instruction',
    user: { name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40&text=BS' },
    status: 'Open',
    location: 'New York, NY',
    category: 'Education',
    community: 'Coding Enthusiasts'
  },
  {
    id: 3,
    title: 'Dog Walking',
    description: 'Need someone to walk my dog twice a week.',
    offeredTask: 'Guitar lessons',
    user: { name: 'Carol Davis', avatar: '/placeholder.svg?height=40&width=40&text=CD' },
    status: 'Accepted',
    location: 'Los Angeles, CA',
    category: 'Pet Care',
    community: 'Pet Lovers'
  },
  // Add more tasks as needed
]

// Filter options
const filterOptions = {
  categories: ['All', 'Home & Garden', 'Education', 'Pet Care', 'Technology', 'Fitness'],
  communities: ['All', 'Green Thumbs', 'Coding Enthusiasts', 'Pet Lovers', 'Tech Geeks', 'Fitness Fanatics'],
  locations: ['All', 'San Francisco, CA', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX'],
  statuses: ['All', 'Open', 'Accepted', 'Completed']
}

export default function TaskFeed() {
  const [filters, setFilters] = useState({
    category: 'All',
    community: 'All',
    location: 'All',
    status: 'All'
  })

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }))
  }

  const filteredTasks = tasks.filter(task => 
    (filters.category === 'All' || task.category === filters.category) &&
    (filters.community === 'All' || task.community === filters.community) &&
    (filters.location === 'All' || task.location === filters.location) &&
    (filters.status === 'All' || task.status === filters.status)
  )

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Task Feed</h1>
        
        {/* Filter section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4">
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <div key={filterType} className="flex-1 min-w-[200px]">
                <label htmlFor={filterType} className="block text-sm font-medium text-gray-700 mb-1">
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </label>
                <select
                  id={filterType}
                  value={filters[filterType.slice(0, -1) as keyof typeof filters]}
                  onChange={(e) => handleFilterChange(filterType.slice(0, -1), e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Task cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex items-center mb-4">
                  <Image
                    src={task.user.avatar}
                    alt={task.user.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">{task.user.name}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Offered: {task.offeredTask}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === 'Open' ? 'bg-green-100 text-green-800' :
                    task.status === 'Accepted' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {task.location}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    Offer Swap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating button for creating a new task */}
        <button className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-300">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}