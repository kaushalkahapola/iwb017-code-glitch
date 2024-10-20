'use client'

import { useState } from 'react'
import { Star, User, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Sample data for completed tasks
const initialCompletedTasks = [
  { id: 1, title: 'Lawn Mowing', completedBy: 'John Doe', completionDate: '2023-06-15', rating: null, review: null },
  { id: 2, title: 'Computer Repair', completedBy: 'Jane Smith', completionDate: '2023-06-10', rating: 5, review: 'Jane did an excellent job fixing my computer. Very knowledgeable and efficient!' },
  { id: 3, title: 'Dog Walking', completedBy: 'Mike Brown', completionDate: '2023-06-05', rating: null, review: null },
]

export default function RatingsAndReviews() {
  const [completedTasks, setCompletedTasks] = useState(initialCompletedTasks)
  const [activeReview, setActiveReview] = useState<{ taskId: number | null; rating: number; review: string }>({ taskId: null, rating: 0, review: '' })

  const handleRatingChange = (taskId: number, rating: number) => {
    setActiveReview(prev => ({ ...prev, taskId, rating }))
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveReview(prev => ({ ...prev, review: e.target.value }))
  }

  const handleSubmitReview = (taskId: number) => {
    setCompletedTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, rating: activeReview.rating, review: activeReview.review } : task
    ))
    setActiveReview({ taskId: null, rating: 0, review: '' })
  }

  const handleSkipReview = (taskId: number) => {
    setActiveReview({ taskId: null, rating: 0, review: '' })
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
              <span className="text-gray-900 text-sm font-medium">Ratings and Reviews</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ratings and Reviews</h1>

        <div className="space-y-6">
          {completedTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{task.title}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User className="w-4 h-4 mr-1" />
                  <span>Completed by: {task.completedBy}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Completion Date: {task.completionDate}</span>
                </div>

                {task.rating !== null ? (
                  <div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${star <= task.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill={star <= task.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{task.rating}/5</span>
                    </div>
                    <p className="text-gray-700">{task.review}</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${star <= activeReview.rating && activeReview.taskId === task.id ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill={star <= activeReview.rating && activeReview.taskId === task.id ? 'currentColor' : 'none'}
                          onClick={() => handleRatingChange(task.id, star)}
                        />
                      ))}
                    </div>
                    <textarea
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                      placeholder="Write your review here..."
                      value={activeReview.taskId === task.id ? activeReview.review : ''}
                      onChange={handleReviewChange}
                    ></textarea>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleSkipReview(task.id)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Skip
                      </button>
                      <button
                        onClick={() => handleSubmitReview(task.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
