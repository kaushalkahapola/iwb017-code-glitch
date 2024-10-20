import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-green-100/95 backdrop-blur supports-[backdrop-filter]:bg-green-100/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
          <span className="font-bold text-green-800">TaskSwap</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="transition-colors hover:text-green-700">
            Dashboard
          </Link>
          <Link href="/communities" className="transition-colors hover:text-green-700">
            Communities
          </Link>
          <Link href="/tasks" className="transition-colors hover:text-green-700">
            Tasks
          </Link>
          <Link href="/profile" className="transition-colors hover:text-green-700">
            Profile
          </Link>
        </nav>
        <Link
          href="/join"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white shadow hover:bg-green-700 h-9 px-4 py-2"
        >
          Join the Community
        </Link>
      </div>
    </header>
  )
}
