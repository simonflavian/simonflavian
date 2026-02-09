"use client"

import {
  GraduationCap,
  Briefcase,
  Users,
  FolderOpen,
  Clock,
  Cpu,
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const EDUCATION = [
  {
    period: "2020 - 2023",
    title: "Bachelor of Science in Computer Science",
    institution: "Institute of Finance Management (IFM)",
    description:
      "Comprehensive study in Information Technology and Mathematics with focus on software engineering and systems design.",
  },
  {
    period: "2022 - 2023",
    title: "UI/UX Design Certificate",
    institution: "Alison Online Learning",
    description:
      "Specialized training in user interface design, user experience principles, and design thinking methodology.",
  },
  {
    period: "2021 - 2022",
    title: "Mobile App Development Certificate",
    institution: "Alison Online Learning",
    description:
      "Focused curriculum on mobile application development using modern frameworks and cross-platform technologies.",
  },
]

const EXPERIENCE = [
  {
    period: "2020 - Present",
    title: "ICT Lead",
    company: "Projekt Inspire",
    description:
      "Leading all ICT initiatives, managing tech infrastructure, and developing digital solutions for community impact projects.",
  },
  {
    period: "2021 - 2023",
    title: "Software Developer",
    company: "WAGA Tanzania",
    description:
      "Developed web and mobile applications, collaborated with cross-functional teams, and implemented scalable solutions.",
  },
  {
    period: "2020 - Present",
    title: "Founder & Lead Developer",
    company: "TECH IQ Tanzania",
    description:
      "Founded a tech education initiative focused on STEM curriculum development and programming training for youth.",
  },
]

const STATS = [
  { icon: Users, value: "37", label: "Happy Clients" },
  { icon: FolderOpen, value: "17", label: "Projects" },
  { icon: Clock, value: "1,453", label: "Hours Support" },
  { icon: Cpu, value: "8+", label: "Technologies" },
]

export function Resume() {
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation()
  const { ref: expRef, isVisible: expVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()

  return (
    <section id="resume" className="py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            Resume
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            My education, experience, and achievements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Education */}
          <div
            ref={eduRef}
            className={`${eduVisible ? "animate-fade-in-left" : "opacity-0"}`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                Education
              </h3>
            </div>
            <div className="space-y-6">
              {EDUCATION.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-6 border-l-4 border-l-primary shadow-sm border border-border hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-xs font-heading font-semibold text-primary tracking-wider uppercase">
                    {item.period}
                  </span>
                  <h4 className="font-heading text-lg font-semibold text-foreground mt-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mt-1">
                    {item.institution}
                  </p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div
            ref={expRef}
            className={`${expVisible ? "animate-fade-in-right" : "opacity-0"}`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                Experience
              </h3>
            </div>
            <div className="space-y-6">
              {EXPERIENCE.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-6 border-l-4 border-l-primary/60 shadow-sm border border-border hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-xs font-heading font-semibold text-primary tracking-wider uppercase">
                    {item.period}
                  </span>
                  <h4 className="font-heading text-lg font-semibold text-foreground mt-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mt-1">
                    {item.company}
                  </p>
                  <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${statsVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-8 text-center shadow-sm border border-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon size={24} className="text-primary" />
              </div>
              <p className="font-heading text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
