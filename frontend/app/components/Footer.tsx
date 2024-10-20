import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-4 py-8 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-green-600">Task</span>
                <span className="text-gray-900">Swap</span>
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-1 animate-pulse"></span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Empowering communities through task exchange
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">About</h3>
              <ul className="text-gray-600">
                <li className="mb-2">
                  <Link href="/about" className="hover:underline">About Us</Link>
                </li>
                <li className="mb-2">
                  <Link href="/how-it-works" className="hover:underline">How It Works</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Legal</h3>
              <ul className="text-gray-600">
                <li className="mb-2">
                  <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                </li>
                <li className="mb-2">
                  <Link href="/terms" className="hover:underline">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2023 TaskSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
