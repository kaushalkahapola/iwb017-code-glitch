import Link from "next/link"
import Image from "next/image"

export default function FeaturedCommunities() {
  return (
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
  )
}
