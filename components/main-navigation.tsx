"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export default function MainNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/projects", label: "Projects" },
  ]

  return (
    <nav className="fixed right-4 top-4 z-[9999]">
      <div className="rounded-full border border-white/5 bg-gray-800 p-2">
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#FF512F] text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
