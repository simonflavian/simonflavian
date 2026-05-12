"use client"

import { MapPin, Mail, Phone, Send } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "Dar es Salaam, Tanzania",
    href: "",
  },
  {
    icon: Mail,
    label: "Email",
    value: "simonflavian6@gmail.com",
    href: "mailto:simonflavian6@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+255687016669",
    href: "tel:+255687016669",
  },
]

export function Contact() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation()

  return (
    <section id="contact" className="py-16 sm:py-28 px-4 sm:px-6 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-primary/[0.04] blob animate-float blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-primary/[0.03] blob animate-float-reverse blur-2xl" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/[0.04] rounded-full animate-spin-slow" style={{ animationDuration: '25s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            {"Let's work together on your next project"}
          </p>
        </div>

        <div
          ref={leftRef}
          className={`max-w-2xl mx-auto stagger-children ${leftVisible ? "visible" : ""}`}
        >
          {CONTACT_INFO.map((info) => {
            const Inner = (
              <div className="bg-background rounded-xl p-5 sm:p-6 flex items-center gap-3 sm:gap-4 shadow-sm border border-border card-3d group">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shimmer">
                  <info.icon size={18} className="text-primary-foreground sm:hidden" />
                  <info.icon size={20} className="text-primary-foreground hidden sm:block" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">{info.label}</p>
                  <p className="font-heading font-semibold text-foreground text-sm sm:text-base truncate">
                    {info.value}
                  </p>
                </div>
                {info.href && (
                  <Send size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" />
                )}
              </div>
            )

            return info.href ? (
              <a
                key={info.label}
                href={info.href}
                className="block mb-3 sm:mb-4"
              >
                {Inner}
              </a>
            ) : (
              <div key={info.label} className="mb-3 sm:mb-4">
                {Inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
