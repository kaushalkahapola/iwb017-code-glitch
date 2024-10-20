import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span className="font-bold">TaskSwap</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/communities" className="transition-colors hover:text-primary">
              Communities
            </Link>
            <Link href="/tasks" className="transition-colors hover:text-primary">
              Tasks
            </Link>
            <Link href="/profile" className="transition-colors hover:text-primary">
              Profile
            </Link>
          </nav>
          <Link
            href="/join"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Join the Community
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Swap Tasks, Build Communities
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our local task exchange platform and connect with neighbors to share skills, save money, and
                  strengthen your community.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  Get Started
                </Link>
                <Link
                  href="/learn-more"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Featured Communities
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((community) => (
                <div key={community} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Community+${community}`}
                    alt={`Community ${community}`}
                    width={400}
                    height={200}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Community {community}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      A brief description of the community and its focus.
                    </p>
                    <Link
                      href={`/community/${community}`}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    >
                      Join Community
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Testimonials</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Alice Johnson", review: "TaskSwap has transformed how I interact with my neighbors. It's not just about tasks; it's about building real connections." },
                { name: "Bob Smith", review: "I've saved so much money and learned new skills thanks to TaskSwap. It's a game-changer for our community!" },
                { name: "Carol Davis", review: "The platform is user-friendly and the community is so supportive. I've met amazing people while getting things done." },
              ].map((testimonial, index) => (
                <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${testimonial.name.charAt(0)}`}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Community Member</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
              <span className="font-bold">TaskSwap</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 TaskSwap. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-primary">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}