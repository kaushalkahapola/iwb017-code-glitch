'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

// Add this type definition
type FormErrors = {
  title?: string;
  description?: string;
  offeredTask?: string;
};

export default function CreateEditTask() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id') // If editing an existing task, the id will be in the URL

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
    // Clear the error for this field when the user starts typing
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
      // Here you would typically send the task data to your API
      console.log('Submitting task:', task)
      // After successful submission, redirect to the task details page
      router.push(`/tasks/${id || 'new'}`)
    }
  }

  const handleCancel = () => {
    // Redirect back to the task list or details page
    router.push('/tasks')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Task' : 'Create New Task'}</h1>
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
                className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
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
                className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
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
                className={`w-full px-3 py-2 border rounded-md ${errors.offeredTask ? 'border-red-500' : 'border-gray-300'}`}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a community</option>
                {communities.map((community) => (
                  <option key={community} value={community}>
                    {community}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Open">Open</option>
                <option value="Accepted">Accepted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {id ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
