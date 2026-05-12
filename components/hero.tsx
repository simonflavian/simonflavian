"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown, Instagram, Linkedin, Send } from "lucide-react"
import { useScrollAnimation, useTypewriter, useTilt3D } from "@/hooks/use-scroll-animation"
import { ParticleField } from "@/components/particle-field"

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
  const tiltRef = useTilt3D(10)
  const [loaded, setLoaded] = useState(false)
  const typedRole = useTypewriter(
    ["Full Stack Developer", "Software Engineer", "App Creator", "UI/UX Designer"],
    loaded,
    90,
    50,
    2500
  )

  useEffect(() => {
    // Trigger entrance after a small delay for dramatic effect
    const t = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 pb-24 sm:pb-32 overflow-hidden bg-background"
    >
      {/* ── Particle Network Background ── */}
      <ParticleField count={35} />

      {/* ── 3D Floating Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-primary/5 blob animate-float blur-3xl"
        />
        <div
          className="absolute top-1/3 -left-16 w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-primary/8 blob animate-float-slow blur-2xl"
        />
        <div
          className="absolute bottom-20 right-1/4 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-primary/6 blob animate-float-reverse blur-xl"
        />
        {/* Spinning rings */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-primary/5 rounded-full animate-spin-slow" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-primary/[0.03] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        {/* Orbiting dot */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit">
            <div className="w-2.5 h-2.5 rounded-full bg-primary/40 shadow-lg shadow-primary/30" />
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center"
      >
        {/* 3D Interactive Profile Image */}
        <div
          className={`flex items-center justify-center mb-6 sm:mb-8 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-75"
          }`}
        >
          <div ref={tiltRef} className="relative group cursor-pointer" style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}>
            {/* Ripple rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-100 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 rounded-full border border-primary/10 scale-125 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-glow scale-125" />
            {/* Image */}
            <div className="relative h-24 w-24 sm:h-36 sm:w-36 rounded-full overflow-hidden ring-4 ring-primary/20 bg-muted shadow-2xl shadow-primary/10">
              <Image
                src="/simonimage.png"
                alt="Simon Flavian"
                fill
                sizes="(min-width: 640px) 144px, 112px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Welcome badge */}
        <div className={`transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-2 text-primary font-medium text-[10px] sm:text-xs tracking-widest uppercase mb-4 sm:mb-6 font-heading px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Welcome to my portfolio
          </span>
        </div>

        {/* Name with gradient */}
        <h1 className={`font-heading text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-3 sm:mb-5 text-balance text-foreground transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {"I'm "}
          <span className="gradient-text">Simon Flavian</span>
        </h1>

        {/* Typewriter role */}
        <h2 className={`font-heading text-lg sm:text-2xl md:text-3xl font-semibold text-foreground/70 mb-3 sm:mb-4 h-8 sm:h-12 transition-all duration-700 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {"I'm a "}
          <span className="text-primary typewriter-cursor">{typedRole}</span>
        </h2>

        {/* Description */}
        <p className={`text-muted-foreground text-xs sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 transition-all duration-700 delay-[900ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Full Stack Software Developer & UI/UX Designer crafting digital experiences that
          inspire and deliver results.
        </p>

        {/* Social links */}
        <div className={`flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10 transition-all duration-700 delay-[1100ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {SOCIAL_LINKS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={item.label}
              className="inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-muted text-foreground/80 hover:text-primary-foreground hover:bg-primary hover:scale-110 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0 transition-all duration-700 delay-[1300ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button
            type="button"
            onClick={() => scrollTo("about")}
            className="w-full sm:w-auto btn-magnetic bg-primary text-primary-foreground font-heading font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 shimmer text-sm sm:text-base"
          >
            Learn More
            <ArrowDown size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto btn-magnetic border border-border bg-background text-foreground font-heading font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            Contact Me
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Scroll indicator - hidden on small mobile to prevent overlap */}
      <div className={`absolute z-20 bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 transition-all duration-700 delay-[1500ms] ${loaded ? "opacity-100 flex animate-bounce" : "opacity-0 hidden"}`}>
        <span className="text-muted-foreground text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-4 h-7 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  )
}
