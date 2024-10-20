"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, MapPin, ArrowUpRight, Plus, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Community = {
  community_id: number;
  name: string;
  description: string;
  location: string;
  created_by: number;
  created_at: [number, number]; // [seconds, nanoseconds]
  memberCount?: number; // We'll add this after fetching
};

type User = {
  user_id: number;
  username: string;
  email: string;
  location: string;
  bio: string;
  rating: number;
  created_at: [number, number];
};

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [sortBy, setSortBy] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('http://localhost:9090/communities')
        if (!response.ok) {
          throw new Error('Failed to fetch communities')
        }
        const data: Community[] = await response.json()
        
        // Fetch member count for each community
        const communitiesWithMemberCount = await Promise.all(data.map(async (community) => {
          const membersResponse = await fetch(`http://localhost:9090/communityMembers/${community.community_id}`)
          if (membersResponse.ok) {
            const members: User[] = await membersResponse.json()
            return { ...community, memberCount: members.length }
          }
          return community
        }))

        setCommunities(communitiesWithMemberCount)
      } catch (err) {
        setError('Failed to load communities. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommunities()
  }, [])

  const handleSort = (method: string) => {
    setSortBy(method);
    if (method === "popular") {
      const sortedCommunities = [...communities].sort((a, b) => 
        (b.memberCount || 0) - (a.memberCount || 0)
      );
      setCommunities(sortedCommunities);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-12">Loading communities...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Communities</h1>

      {/* Search and Sort section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="none">None</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      {/* Community grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <div
            key={community.community_id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-800">{community.name}</h2>
              <p className="text-gray-600 mb-4">{community.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{community.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Users className="w-4 h-4 mr-1" />
                <span>{community.memberCount || 0} members</span>
              </div>
              <Link
                href={`/communities/${community.community_id}`}
                className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
              >
                View Details
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create new community button */}
      <Link href="/communities/create" className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex items-center">
        <Plus className="w-6 h-6 mr-2" />
        Create New Community
      </Link>
      </div>
      <Footer />
    </>
  );
}
