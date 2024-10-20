import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
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
  )
}
