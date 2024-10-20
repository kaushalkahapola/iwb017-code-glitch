'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Calendar, ArrowRight } from 'lucide-react'

type Task = {
    task_id: number;
    title: string;
    description: string;
    posted_by: number;
    offered_task: string;
    status: string;
    community_id: number | null;
    created_at: [number, number]; // [seconds, nanoseconds]
}

function formatTimestamp(timestamp: [number, number]): string {
    const [seconds, _] = timestamp;
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // This will format the date according to the user's locale
}

export default function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:9090/tasks')
        if (!response.ok) {
          throw new Error('Failed to fetch tasks')
        }
        const data: Task[] = await response.json()
        const sortedTasks = data.sort((a, b) => 
          b.created_at[0] - a.created_at[0] || b.created_at[1] - a.created_at[1]
        ).slice(0, 6)
        setTasks(sortedTasks)
      } catch (err) {
        setError('Failed to load tasks. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (isLoading) {
    return <div className="text-center py-12">Loading tasks...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-gray-900">
          Recent Tasks
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task.task_id} className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{task.title}</h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Offered: {task.offered_task}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === 'Open' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatTimestamp(task.created_at)}
                </div>
                <div className="mt-4">
                  <Link
                    href={`/tasks/${task.task_id}`}
                    className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
