'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, MapPin, Calendar, MessageSquare, Send, ArrowLeft } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// This would typically come from your API or props
const communityData = {
  id: '1',
  name: 'Green Thumbs',
  description: 'A community for gardening enthusiasts to share tips, tricks, and experiences. Whether you\'re a seasoned gardener or just starting out, join us to grow together!',
  image: '/placeholder.svg?height=300&width=800&text=Green+Thumbs',
  location: 'San Francisco, CA',
  members: 150,
  foundedDate: '2022-03-15',
  upcomingEvents: [
    { id: '1', name: 'Spring Planting Workshop', date: '2023-04-20' },
    { id: '2', name: 'Community Garden Clean-up', date: '2023-05-05' },
  ],
  recentDiscussions: [
    { id: '1', title: 'Best plants for shade gardens?', author: 'Alice Johnson', date: '2023-06-10', replies: 12 },
    { id: '2', title: 'Organic pest control methods', author: 'Bob Smith', date: '2023-06-08', replies: 8 },
  ]
}

export default function CommunityDetail({ params }: { params: { id: string } }) {
  const [isJoined, setIsJoined] = useState(false)
  const [newPost, setNewPost] = useState('')

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined)
    // Here you would typically send a request to your API to join/leave the community
  }

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the post to your API
    console.log('Submitting post:', newPost)
    setNewPost('')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/communities" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Communities
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={communityData.image}
              alt={communityData.name}
              width={800}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{communityData.name}</h1>
                <button
                  onClick={handleJoinCommunity}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isJoined
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isJoined ? 'Leave Community' : 'Join Community'}
                </button>
              </div>
              <p className="text-gray-600 mb-4">{communityData.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {communityData.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {communityData.members} members
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Founded {new Date(communityData.foundedDate).toLocaleDateString()}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
                  <ul className="space-y-4">
                    {communityData.upcomingEvents.map((event) => (
                      <li key={event.id} className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-800">{event.name}</h3>
                        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Discussions</h2>
                  <ul className="space-y-4">
                    {communityData.recentDiscussions.map((discussion) => (
                      <li key={discussion.id} className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-800">{discussion.title}</h3>
                        <p className="text-sm text-gray-600">
                          By {discussion.author} on {new Date(discussion.date).toLocaleDateString()}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {discussion.replies} replies
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Start a New Discussion</h2>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    rows={4}
                  ></textarea>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Post Discussion
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

