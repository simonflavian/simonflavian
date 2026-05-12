"use client"

import { Globe, Smartphone, Palette, BookOpen, Code2, MonitorIcon as MonitorCog } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Building modern, responsive, and high-performance websites using the latest web technologies and best practices.",
    color: "from-blue-500/20 to-primary/20",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Creating cross-platform mobile applications with intuitive interfaces and seamless user experiences.",
    color: "from-purple-500/20 to-primary/20",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Designing beautiful, user-centered interfaces with a focus on usability, accessibility, and visual appeal.",
    color: "from-pink-500/20 to-primary/20",
  },
  {
    icon: BookOpen,
    title: "STEM Curriculum",
    description:
      "Developing comprehensive STEM educational programs and curricula for schools and training institutions.",
    color: "from-green-500/20 to-primary/20",
  },
  {
    icon: Code2,
    title: "Coding Training",
    description:
      "Providing hands-on coding workshops and training sessions for beginners and intermediate developers.",
    color: "from-orange-500/20 to-primary/20",
  },
  {
    icon: MonitorCog,
    title: "IT Consultation",
    description:
      "Offering expert IT consulting services to help businesses leverage technology for growth and efficiency.",
    color: "from-cyan-500/20 to-primary/20",
  },
]

export function Services() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="services" className="py-16 sm:py-28 px-4 sm:px-6 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-primary/[0.04] blob animate-float-slow blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-primary/[0.03] blob animate-float blur-2xl" />
        <div className="hidden md:block absolute top-1/4 left-1/3 w-[500px] h-[500px] border border-primary/[0.03] rounded-full animate-spin-slow" style={{ animationDuration: '25s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            What I can do for you
          </p>
        </div>

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children ${
            isVisible ? "visible" : ""
          }`}
        >
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-background rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-border card-3d group relative overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-primary group-hover:shadow-xl group-hover:shadow-primary/25 group-hover:scale-110 transition-all duration-400">
                  <service.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors duration-300 sm:hidden" />
                  <service.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors duration-300 hidden sm:block" />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
