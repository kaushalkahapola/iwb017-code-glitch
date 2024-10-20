import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-green-200 bg-green-100">
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span className="font-bold text-green-800">TaskSwap</span>
          </Link>
          <p className="text-sm text-green-600">
            © 2023 TaskSwap. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-green-600 hover:text-green-800">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-green-600 hover:text-green-800">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-green-600 hover:text-green-800">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
