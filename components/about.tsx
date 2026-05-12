"use client"

import { MapPin, Mail, Phone, GraduationCap, Briefcase } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const INFO_CARDS = [
  { icon: MapPin, label: "Location", value: "Dar es Salaam, Tanzania" },
  { icon: Mail, label: "Email", value: "simonflavian6@gmail.com" },
  { icon: Phone, label: "Phone", value: "+255687016669" },
  {
    icon: GraduationCap,
    label: "Degree",
    value: "Bachelor of Science in Computer Science",
  },
  { icon: Briefcase, label: "Freelance", value: "Available" },
]

export function About() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation()
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation()

  return (
    <section id="about" className="py-16 sm:py-28 px-4 sm:px-6 bg-card relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-primary/[0.03] blob animate-float-slow blur-2xl" />
        <div className="absolute -top-20 -left-20 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-primary/[0.04] blob animate-float blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Passionate about creating innovative digital solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          {/* Left Column */}
          <div
            ref={leftRef}
            className={`perspective-800 ${leftVisible ? "" : ""}`}
          >
            <div className={`bg-background rounded-2xl p-6 sm:p-8 shadow-sm border border-border card-3d reveal-left ${leftVisible ? "visible" : ""}`}>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
                Who am I?
              </h3>
              <div className="space-y-4 sm:space-y-5 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  Hello! I am Simon Flavian, a creative and dedicated Software
                  Developer, App Developer, and UI/UX Designer based in Dar es
                  Salaam, Tanzania.
                </p>
                <p>
                  With a strong foundation in web and mobile technologies, I
                  bring ideas to life through clean code and thoughtful design. I
                  specialize in building modern applications that are both
                  beautiful and functional.
                </p>
                <p>
                  My passion extends beyond development; I am committed to STEM
                  education and empowering the next generation of tech
                  innovators in Tanzania and East Africa.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — staggered info cards */}
          <div
            ref={rightRef}
            className={`space-y-3 sm:space-y-4 stagger-children ${rightVisible ? "visible" : ""}`}
          >
            {INFO_CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-background rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-sm border border-border card-3d"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shimmer">
                  <card.icon size={18} className="text-primary-foreground sm:hidden" />
                  <card.icon size={20} className="text-primary-foreground hidden sm:block" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">{card.label}</p>
                  <p className="font-heading font-semibold text-foreground text-sm sm:text-base truncate">
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
