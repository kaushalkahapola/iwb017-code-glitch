import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-green-100/95 backdrop-blur supports-[backdrop-filter]:bg-green-100/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
          <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
          <span className="font-bold text-green-800">TaskSwap</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {["Dashboard", "Communities", "Tasks", "Profile"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="transition-colors duration-300 hover:text-green-700 relative group">
              {item}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </nav>
        <Link
          href="/join"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white shadow hover:bg-green-700 hover:shadow-lg h-9 px-4 py-2 transform hover:-translate-y-0.5"
        >
          Join the Community
        </Link>
      </div>
    </header>
  )
}
