import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-800">
              Swap Tasks, Build Communities
            </h1>
            <p className="mx-auto max-w-[700px] text-green-700 md:text-xl">
              Join our local task exchange platform and connect with neighbors to share skills, save money, and
              strengthen your community.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white shadow hover:bg-green-700 h-9 px-4 py-2"
            >
              Get Started
            </Link>
            <Link
              href="/learn-more"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 border border-green-600 bg-white text-green-600 shadow-sm hover:bg-green-50 h-9 px-4 py-2"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
