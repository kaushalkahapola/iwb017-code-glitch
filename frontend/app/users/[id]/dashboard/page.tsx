import Link from "next/link";
import Image from "next/image";
import { Edit, Star, Trash2, ArrowLeft } from "lucide-react";

export default function UserDashboard({ params }: { params: { id: string } }) {
  const user = {
    username: "JaneSmith",
    location: "San Francisco, CA",
    bio: "Passionate about community building and skill sharing.",
    profilePicture: "/placeholder.svg?height=100&width=100&text=JS",
    averageRating: 4.8,
  };

  const tasks = [
    {
      id: 1,
      title: "Gardening Help",
      status: "Open",
      postedDate: "2023-06-15",
    },
    {
      id: 2,
      title: "Computer Repair",
      status: "In Progress",
      postedDate: "2023-06-10",
    },
    {
      id: 3,
      title: "Dog Walking",
      status: "Completed",
      postedDate: "2023-06-05",
    },
  ];

  const communities = [
    {
      id: 1,
      name: "Green Thumbs",
      description: "For gardening enthusiasts",
      joinDate: "2023-05-01",
    },
    {
      id: 2,
      name: "Tech Support",
      description: "Help with tech issues",
      joinDate: "2023-05-15",
    },
    {
      id: 3,
      name: "Pet Lovers",
      description: "For all pet owners",
      joinDate: "2023-06-01",
    },
  ];

  const completedSwaps = [
    {
      id: 1,
      title: "Lawn Mowing",
      userInvolved: "JohnDoe",
      swapDate: "2023-06-02",
      rating: 5,
    },
    {
      id: 2,
      title: "Baking Lessons",
      userInvolved: "AliceGreen",
      swapDate: "2023-05-20",
      rating: 4,
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Homepage
      </Link>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">My Tasks</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.status}
                      </span>{" "}
                      | Posted: {task.postedDate}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors duration-300">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors duration-300">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            My Communities
          </h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            {communities.map((community) => (
              <div
                key={community.id}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {community.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {community.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Joined: {community.joinDate}
                    </p>
                  </div>
                  <Link
                    href={`/community/${community.id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Completed Swaps
        </h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          {completedSwaps.map((swap) => (
            <div
              key={swap.id}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{swap.title}</h3>
                  <p className="text-sm text-gray-600">
                    With: {swap.userInvolved} | Date: {swap.swapDate}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1 text-gray-700">{swap.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
