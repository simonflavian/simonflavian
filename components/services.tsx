"use client"

import { Globe, Smartphone, Palette, BookOpen, Code2, MonitorIcon as MonitorCog } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Building modern, responsive, and high-performance websites using the latest web technologies and best practices.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Creating cross-platform mobile applications with intuitive interfaces and seamless user experiences.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Designing beautiful, user-centered interfaces with a focus on usability, accessibility, and visual appeal.",
  },
  {
    icon: BookOpen,
    title: "STEM Curriculum Development",
    description:
      "Developing comprehensive STEM educational programs and curricula for schools and training institutions.",
  },
  {
    icon: Code2,
    title: "Programming & Coding Training",
    description:
      "Providing hands-on coding workshops and training sessions for beginners and intermediate developers.",
  },
  {
    icon: MonitorCog,
    title: "IT Consultation",
    description:
      "Offering expert IT consulting services to help businesses leverage technology for growth and efficiency.",
  },
]

export function Services() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="services" className="py-28 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            What I can do for you
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="bg-background rounded-2xl p-8 text-center shadow-sm border border-border hover:-translate-y-1 transition-all duration-300"
              style={{
                animationDelay: isVisible ? `${i * 100}ms` : undefined,
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <service.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
