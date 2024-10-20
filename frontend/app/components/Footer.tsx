import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-green-200 bg-green-100">
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span className="font-bold text-green-800">TaskSwap</span>
          </Link>
          <p className="text-sm text-green-600">
            © 2023 TaskSwap. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          {[Facebook, Twitter, Instagram].map((Icon, index) => (
            <Link key={index} href="#" className="text-green-600 hover:text-green-800 transition-all duration-300 hover:scale-110">
              <Icon className="h-6 w-6" />
              <span className="sr-only">{Icon.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
