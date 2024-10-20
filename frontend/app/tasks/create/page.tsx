'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Add this type definition
type FormErrors = {
  title?: string;
  description?: string;
  offeredTask?: string;
};

export default function CreateEditTask() {
  const router = useRouter()

  const [task, setTask] = useState({
    title: '',
    description: '',
    offeredTask: '',
    community: '',
    status: 'Open'
  })

  const [errors, setErrors] = useState<FormErrors>({});

  const communities = ['Green Thumbs', 'Tech Enthusiasts', 'Fitness Fanatics', 'Culinary Artists', 'Language Exchange']

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!task.title.trim()) newErrors.title = 'Title is required'
    if (!task.description.trim()) newErrors.description = 'Description is required'
    if (!task.offeredTask.trim()) newErrors.offeredTask = 'Offered task is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Submitting task:', task)
      router.push('/tasks')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/tasks" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Tasks
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 text-sm font-medium">Create New Task</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter task title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Task Description
              </label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Describe your task in detail"
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="offeredTask" className="block text-sm font-medium text-gray-700 mb-1">
                Offered Task
              </label>
              <input
                type="text"
                id="offeredTask"
                name="offeredTask"
                value={task.offeredTask}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.offeredTask ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="What will you offer in return?"
              />
              {errors.offeredTask && <p className="mt-1 text-sm text-red-500">{errors.offeredTask}</p>}
            </div>

            <div>
              <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-1">
                Community (Optional)
              </label>
              <select
                id="community"
                name="community"
                value={task.community}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a community</option>
                {communities.map((community) => (
                  <option key={community} value={community}>
                    {community}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/tasks"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
