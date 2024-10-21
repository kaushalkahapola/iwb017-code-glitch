'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { MapPin, Users, Info } from 'lucide-react'
import {jwtDecode} from 'jwt-decode';

type CreateCommunityRequest = {
    name: string;
    description: string;
    location: string;
}

export default function CreateCommunity() {
  const router = useRouter()
  const [comData, setcomData] = useState<CreateCommunityRequest>({
    name: '',
    description: '',
    location: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem('token');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setcomData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin','http://localhost:3000');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');

      let decoded: { id: number; username: string; email: string } | undefined; // Declare decoded as possibly undefined
      if (token) {
        decoded = jwtDecode(token) as { id: number; username: string; email: string }; // Assign decoded properly
      }

      // let formdata = comData.copy(); // This line is causing the error
      let formdata = { 
        ...comData,
        created_by: decoded ? decoded.id : null // Use a conditional to
      }; // Create a shallow copy of comData

      const response = await fetch('/api/communities', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formdata),
      })

      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to create community')
      }
      router.push(`/communities`)
    } catch (err) {
      setError('Failed to create community. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Create a New Community</h1>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Community Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={comData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter community name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={comData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Describe your community"
                ></textarea>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={comData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter community location"
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Community'}
              </button>
            </form>
          </div>
          <div className="mt-8 max-w-2xl mx-auto bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
              <Info className="w-5 h-5 mr-2" />
              Tips for Creating a Successful Community
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-800">
              <li>Choose a clear and descriptive name</li>
              <li>Write a compelling description that outlines the community's purpose</li>
              <li>Specify the location to attract local members</li>
              <li>Be prepared to engage with members and foster discussions</li>
              <li>Create initial tasks or events to kickstart community activity</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
