import Link from "next/link"
import Image from "next/image"
import { Bell, Edit, LogOut, Star, Trash2 } from "lucide-react"

export default function UserDashboard() {
  const user = {
    username: "JaneSmith",
    location: "San Francisco, CA",
    bio: "Passionate about community building and skill sharing.",
    profilePicture: "/placeholder.svg?height=100&width=100&text=JS",
    averageRating: 4.8,
  }

  const tasks = [
    { id: 1, title: "Gardening Help", status: "Open", postedDate: "2023-06-15" },
    { id: 2, title: "Computer Repair", status: "In Progress", postedDate: "2023-06-10" },
    { id: 3, title: "Dog Walking", status: "Completed", postedDate: "2023-06-05" },
  ]

  const communities = [
    { id: 1, name: "Green Thumbs", description: "For gardening enthusiasts", joinDate: "2023-05-01" },
    { id: 2, name: "Tech Support", description: "Help with tech issues", joinDate: "2023-05-15" },
    { id: 3, name: "Pet Lovers", description: "For all pet owners", joinDate: "2023-06-01" },
  ]

  const completedSwaps = [
    { id: 1, title: "Lawn Mowing", userInvolved: "JohnDoe", swapDate: "2023-06-02", rating: 5 },
    { id: 2, title: "Baking Lessons", userInvolved: "AliceGreen", swapDate: "2023-05-20", rating: 4 },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold">TaskSwap</span>
          </Link>
        </div>
        <nav className="mt-8">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-200"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Profile
          </Link>
          <Link
            href="/notifications"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </Link>
          <Link
            href="/logout"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Image
              src={user.profilePicture}
              alt={user.username}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-gray-600">{user.location}</p>
              <p className="mt-2">{user.bio}</p>
              <div className="flex items-center mt-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="ml-1">{user.averageRating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4">My Tasks</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-600">
                        Status: {task.status} | Posted: {task.postedDate}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">My Communities</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {communities.map((community) => (
                <div key={community.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{community.name}</h3>
                      <p className="text-sm text-gray-600">{community.description}</p>
                      <p className="text-xs text-gray-500">Joined: {community.joinDate}</p>
                    </div>
                    <Link
                      href={`/community/${community.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Visit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Completed Swaps</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {completedSwaps.map((swap) => (
              <div key={swap.id} className="p-4 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{swap.title}</h3>
                    <p className="text-sm text-gray-600">
                      With: {swap.userInvolved} | Date: {swap.swapDate}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1">{swap.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}