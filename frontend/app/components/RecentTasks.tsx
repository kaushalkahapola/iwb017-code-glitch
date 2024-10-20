import Link from "next/link"

export default function RecentTasks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Recent Tasks</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((task) => (
            <div key={task} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-bold">Task Title {task}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Short description of the task goes here.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Offered: Task {task + 1}</span>
                  <Link
                    href={`/task/${task}`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 py-2"
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
