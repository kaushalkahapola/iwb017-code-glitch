"use client";

import { useState } from "react";
import { Users, MapPin, ArrowUpRight, Plus } from "lucide-react";

// Sample data for communities
const communitiesData = [
  {
    id: 1,
    name: "Green Thumbs",
    location: "San Francisco, CA",
    description: "A community for gardening enthusiasts",
    members: 150,
    activity: 85,
  },
  {
    id: 2,
    name: "Tech Wizards",
    location: "New York, NY",
    description: "Share and learn about the latest in technology",
    members: 300,
    activity: 95,
  },
  {
    id: 3,
    name: "Fitness Fanatics",
    location: "Los Angeles, CA",
    description: "Get fit and stay healthy together",
    members: 200,
    activity: 90,
  },
  {
    id: 4,
    name: "Culinary Artists",
    location: "Chicago, IL",
    description: "Explore the art of cooking and baking",
    members: 175,
    activity: 80,
  },
  {
    id: 5,
    name: "Book Lovers",
    location: "Boston, MA",
    description: "Discuss and share your favorite reads",
    members: 225,
    activity: 75,
  },
  {
    id: 6,
    name: "DIY Crafters",
    location: "Seattle, WA",
    description: "Create, upcycle, and craft together",
    members: 125,
    activity: 70,
  },
];

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState(communitiesData);
  const [sortBy, setSortBy] = useState("popularity");

  const handleSort = (method: string) => {
    setSortBy(method);
    let sortedCommunities = [...communities];
    switch (method) {
      case "location":
        sortedCommunities.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case "popularity":
        sortedCommunities.sort((a, b) => b.members - a.members);
        break;
      case "activity":
        sortedCommunities.sort((a, b) => b.activity - a.activity);
        break;
    }
    setCommunities(sortedCommunities);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Communities</h1>

        {/* Sort section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200 flex justify-end">
          <label
            htmlFor="sort"
            className="mr-2 text-sm font-medium text-gray-700 self-center"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="popularity">Popularity</option>
            <option value="activity">Activity</option>
            <option value="location">Location</option>
          </select>
        </div>

        {/* Community grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {community.name}
                </h2>
                <p className="text-gray-600 mb-4">{community.description}</p>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{community.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{community.members} members</span>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between">
                  <button className="text-green-600 hover:text-green-800 font-medium flex items-center transition-colors duration-300">
                    View Details
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                  <button className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors duration-300">
                    Join Community
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create new community button */}
        <button className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex items-center">
          <Plus className="w-6 h-6 mr-2" />
          Create New Community
        </button>
      </div>
    </div>
  );
}
