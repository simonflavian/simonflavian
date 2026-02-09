"use client"

import { MapPin, Mail, Phone } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "Dar es Salaam, Tanzania",
  },
  {
    icon: Mail,
    label: "Email",
    value: "simonflavian6@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+255687016669",
  },
]

export function Contact() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation()

  return (
    <section id="contact" className="py-28 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {"Let's work together on your next project"}
          </p>
        </div>

        <div
          ref={leftRef}
          className={`max-w-2xl mx-auto space-y-5 ${leftVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {CONTACT_INFO.map((info) => (
            <div
              key={info.label}
              className="bg-background rounded-xl p-6 flex items-center gap-4 shadow-sm border border-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <info.icon size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{info.label}</p>
                <p className="font-heading font-semibold text-foreground">
                  {info.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
