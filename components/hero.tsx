"use client"

import Image from "next/image"
import { ArrowDown, Instagram, Linkedin, Send } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/simonflavian/", icon: Instagram },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eng-simon-flavian-663261220/",
    icon: Linkedin,
  },
  { label: "X", href: "https://x.com/simon_flavian", icon: ArrowDown },
]

export function Hero() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-start justify-center pt-24 sm:pt-0 sm:items-center overflow-hidden bg-background"
    >
      <div
        ref={ref}
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-center mb-10">
          <div className="relative h-36 w-36 rounded-full overflow-hidden ring-4 ring-border bg-muted">
            <Image
              src="/simonimage.png"
              alt="Simon Flavian"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <p className="text-primary font-medium text-sm tracking-widest uppercase mb-6 font-heading">
          Welcome to my portfolio
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-5 text-balance text-foreground">
          {"I'm "}
          <span className="text-primary">Simon Flavian</span>
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground/70 mb-4">
          {"I'm a "}
          <span className="text-primary">Developer</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Apps, Web Developer & UI/UX Designer crafting digital experiences that
          inspire and deliver results.
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={item.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted text-foreground/80 hover:text-foreground hover:bg-muted/70 transition-colors"
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo("about")}
            className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-sm flex items-center gap-2"
          >
            Learn More
            <ArrowDown size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="border border-border bg-background text-foreground font-heading font-semibold px-8 py-3.5 rounded-xl hover:bg-muted transition-all duration-300 flex items-center gap-2"
          >
            Contact Me
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute z-20 bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown size={16} className="text-muted-foreground" />
      </div>
    </section>
  )
}
