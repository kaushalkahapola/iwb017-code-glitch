import Link from "next/link"
import Image from "next/image"
import { Bell, MessageSquare, User } from 'lucide-react'

export default function AuthenticatedHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span className="font-bold text-green-600">TaskSwap</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">Dashboard</Link>
            <Link href="/tasks" className="text-gray-600 hover:text-green-600 transition-colors">Tasks</Link>
            <Link href="/communities" className="text-gray-600 hover:text-green-600 transition-colors">Communities</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-green-600 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-green-600 transition-colors">
              <MessageSquare className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-green-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
