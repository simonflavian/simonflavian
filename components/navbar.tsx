"use client"

import { useState, useEffect, useMemo } from "react"
import { Menu, X } from "lucide-react"
import { useActiveSection } from "@/hooks/use-scroll-animation"

const NAV_ITEMS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Resume", href: "resume" },
  { label: "Skills", href: "skills" },
  { label: "Portfolio", href: "portfolio" },
  { label: "Services", href: "services" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.href), [])
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    const close = () => setIsOpen(false)
    window.addEventListener("scroll", close, { passive: true })
    return () => window.removeEventListener("scroll", close)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="font-heading text-lg sm:text-xl font-bold text-primary"
          >
            SIMON FLAVIAN
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.href
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background/95 backdrop-blur-xl border-t border-border px-4 sm:px-6 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.href
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
