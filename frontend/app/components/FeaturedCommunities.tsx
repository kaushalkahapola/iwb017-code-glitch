'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, MapPin } from 'lucide-react'

type Community = {
    community_id: number;
    name: string;
    description: string;
    location: string;
    created_by: number;
    created_at: [number, number]; // [seconds, nanoseconds]
}

function formatTimestamp(timestamp: [number, number]): string {
    const [seconds, _] = timestamp;
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString(); // Format as date only
}

export default function FeaturedCommunities() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('http://localhost:9090/communities')
        if (!response.ok) {
          throw new Error('Failed to fetch communities')
        }
        const data: Community[] = await response.json()
        // Sort communities by creation date (newest first) and take the first 3
        const sortedCommunities = data.sort((a, b) => 
          b.created_at[0] - a.created_at[0] || b.created_at[1] - a.created_at[1]
        ).slice(0, 3)
        setCommunities(sortedCommunities)
      } catch (err) {
        setError('Failed to load communities. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommunities()
  }, [])

  if (isLoading) {
    return <div className="text-center py-12">Loading communities...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
          Featured Communities
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <div key={community.community_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(community.name)}`}
                alt={community.name}
                width={400}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{community.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{community.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Created on {formatTimestamp(community.created_at)}</span>
                </div>
                <Link
                  href={`/communities/${community.community_id}`}
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  Join Community
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
