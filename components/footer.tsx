"use client"

import { Instagram, Linkedin, ArrowUp, Heart } from "lucide-react"

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/simonflavian/", icon: Instagram },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eng-simon-flavian-663261220/",
    icon: Linkedin,
  },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-primary/[0.03] blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left flex items-center gap-1.5">
            © 2026 Simon Flavian.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <item.icon className="h-4 w-4" />
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/25 btn-magnetic"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
