'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, MapPin, Calendar, ArrowLeft, CheckCircle } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {jwtDecode} from 'jwt-decode'

type Community = {
    community_id: number;
    name: string;
    description: string;
    location: string;
    created_by: number;
    created_at: [number, number]; // [seconds, nanoseconds]
}

type User = {
    user_id: number;
    username: string;
    email: string;
    location: string;
    bio: string;
    rating: number;
    created_at: [number, number];
}

type Task = {
    task_id: number;
    title: string;
    description: string;
    posted_by: number;
    offered_task: string;
    status: string;
    community_id: number | null;
    created_at: [number, number];
}

function formatTimestamp(timestamp: [number, number]): string {
    const [seconds, _] = timestamp;
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString();
}

export default function CommunityDetail({ params }: { params: { id: string } }) {
  const [community, setCommunity] = useState<Community | null>(null)
  const [members, setMembers] = useState<User[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMember, setIsMember] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [creator, setCreator] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Access localStorage in a client-side effect
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      const decoded = jwtDecode(storedToken) as { id: number; username: string; email: string }
      setUserId(decoded.id)
    }
  }, [])

  useEffect(() => {
    const fetchCommunityData = async () => {
      if (!token) return;

      try {
        // Fetch community details
        const communityResponse = await fetch(`http://localhost:9090/communities/${params.id}`)
        if (!communityResponse.ok) {
          throw new Error('Failed to fetch community details')
        }
        const communityData: Community = await communityResponse.json()
        setCommunity(communityData)

        // Fetch community members
        const membersResponse = await fetch(`http://localhost:9090/communityMembers/${params.id}`)
        if (membersResponse.ok) {
          const membersData: User[] = await membersResponse.json()
          setMembers(membersData)

          let decoded: { id: number; username: string; email: string } | undefined; // Declare decoded as possibly undefined
          if (token) {
            decoded = jwtDecode(token) as { id: number; username: string; email: string }; // Assign decoded properly
          }

          if (decoded && decoded.id) {
            const isMember = membersData.some(member => member.user_id === decoded.id)
            setIsMember(isMember)
          }
        }

        // Fetch community tasks
        const tasksResponse = await fetch(`http://localhost:9090/tasks/community/${params.id}`)
        if (tasksResponse.ok) {
          const tasksData: Task[] = await tasksResponse.json()
          setTasks(tasksData)
        }

        // Fetch creator details
        if (communityData.created_by) {
          const creatorResponse = await fetch(`http://localhost:9090/users/${communityData.created_by}`)
          if (creatorResponse.ok) {
            const creatorData: User = await creatorResponse.json()
            setCreator(creatorData)
          }
        }
      } catch (err) {
        setError('Failed to load community data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommunityData()
  }, [params.id, token])

  // New effect to log members after state update
  useEffect(() => {
    console.log('Updated members state:', members)
  }, [members])

  const handleMembership = async () => {
    if (!token || userId === null) {
      console.error('User not authenticated')
      return
    }

    try {
      let response;
      if (isMember) {
        // Leave community
        response = await fetch(`http://localhost:9090/communityMembers/${params.id}/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } else {
        // Join community
        response = await fetch('http://localhost:9090/communityMembers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            community_id: parseInt(params.id),
            user_id: userId
          })
        })
      }

      if (response.ok) {
        setIsMember(!isMember)
        // Optionally, you can refetch the members list here to update the UI
        // fetchMembers()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || `Failed to ${isMember ? 'leave' : 'join'} community`)
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>
  }

  if (error || !community) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">{error || 'Community not found'}</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link href="/communities" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition duration-300">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Communities
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold text-gray-900">{community.name}</h1>
                <button
                  onClick={handleMembership}
                  className={`px-6 py-2 rounded-full text-white font-semibold transition duration-300 ${
                    isMember
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isMember ? 'Leave Community' : 'Join Community'}
                </button>
              </div>
              <p className="text-xl text-gray-600 mb-8">{community.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-10">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  {community.location}
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  {members.length} members
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                  Founded {formatTimestamp(community.created_at)}
                </div>
                {creator && (
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 mr-2 text-orange-500" />
                    Created by {creator.username}
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Community Tasks</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                  <div key={task.task_id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{task.title}</h3>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-500">Offered: {task.offered_task}</span>
                      <span className={`px-3 py-1 rounded-full ${
                        task.status === 'Open' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
