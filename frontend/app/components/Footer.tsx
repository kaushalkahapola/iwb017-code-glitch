import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
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
  )
}
