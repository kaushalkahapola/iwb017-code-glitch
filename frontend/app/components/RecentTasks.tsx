import Link from "next/link"

export default function RecentTasks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-800">Recent Tasks</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((task) => (
            <div key={task} className="rounded-lg border border-green-200 bg-white text-green-800 shadow-sm">
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-bold">Task Title {task}</h3>
                <p className="text-sm text-green-600">Short description of the task goes here.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Offered: Task {task + 1}</span>
                  <Link
                    href={`/task/${task}`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 border border-green-600 bg-white text-green-600 shadow-sm hover:bg-green-50 h-8 px-3 py-2"
                  >
                    View Details
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
