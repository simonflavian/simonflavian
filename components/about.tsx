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
    <section id="about" className="py-28 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Passionate about creating innovative digital solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div
            ref={leftRef}
            className={`${leftVisible ? "animate-fade-in-left" : "opacity-0"}`}
          >
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
                Who am I?
              </h3>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
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

          {/* Right Column */}
          <div
            ref={rightRef}
            className={`space-y-4 ${rightVisible ? "animate-fade-in-right" : "opacity-0"}`}
          >
            {INFO_CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-background rounded-xl p-5 flex items-center gap-4 shadow-sm border border-border hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <card.icon size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="font-heading font-semibold text-foreground">
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
