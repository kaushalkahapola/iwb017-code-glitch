import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Clock, CheckCircle } from "lucide-react"

export default function PublicProfile() {
  // This would typically come from your API or props
  const user = {
    id: "123",
    name: "Jane Smith",
    picture: "/placeholder.svg?height=150&width=150&text=JS",
    bio: "Passionate about community building and skill sharing. Always eager to learn new things and help others.",
    location: "San Francisco, CA",
    averageRating: 4.8,
    isLoggedIn: true, // This would be determined by your auth system
  }

  const postedTasks = [
    { id: "1", title: "Garden Maintenance", description: "Need help with weeding and planting", offeredTask: "Cooking lessons", status: "Open" },
    { id: "2", title: "JavaScript Tutoring", description: "Looking for help with React hooks", offeredTask: "Yoga instruction", status: "In Progress" },
    { id: "3", title: "Dog Walking", description: "Need someone to walk my dog twice a week", offeredTask: "Guitar lessons", status: "Completed" },
  ]

  const completedSwaps = [
    { id: "1", title: "House Painting", swappedWith: "John Doe", rating: 5 },
    { id: "2", title: "Bike Repair", swappedWith: "Alice Green", rating: 4 },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8 md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={user.picture}
                alt={user.name}
                width={150}
                height={150}
                className="rounded-full mx-auto md:mx-0"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-gray-600">{user.location}</span>
              </div>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-2 text-gray-600">{user.averageRating.toFixed(1)} average rating</span>
              </div>
              <p className="mt-4 text-gray-600">{user.bio}</p>
              {user.isLoggedIn && (
                <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Offer Task Swap
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold mb-4">Posted Tasks</h2>
            <div className="space-y-4">
              {postedTasks.map((task) => (
                <div key={task.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Offered: {task.offeredTask}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      task.status === 'Open' ? 'bg-green-100 text-green-800' :
                      task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Completed Swaps</h2>
            <div className="space-y-4">
              {completedSwaps.map((swap) => (
                <div key={swap.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold">{swap.title}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-600">Swapped with: {swap.swappedWith}</span>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-gray-600">{swap.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}