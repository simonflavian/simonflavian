"use client"

import {
  GraduationCap,
  Briefcase,
  Users,
  FolderOpen,
  Clock,
  Cpu,
} from "lucide-react"
import { useScrollAnimation, useCounter } from "@/hooks/use-scroll-animation"

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
  { icon: Users, value: 37, suffix: "", label: "Happy Clients" },
  { icon: FolderOpen, value: 17, suffix: "", label: "Projects" },
  { icon: Clock, value: 1453, suffix: "", label: "Hours Support" },
  { icon: Cpu, value: 8, suffix: "+", label: "Technologies" },
]

function AnimatedStat({ icon: Icon, value, suffix, label, isVisible, delay }: {
  icon: typeof Users
  value: number
  suffix: string
  label: string
  isVisible: boolean
  delay: number
}) {
  const count = useCounter(value, isVisible, 2000)

  return (
    <div
      className={`bg-card rounded-xl p-5 sm:p-8 text-center shadow-sm border border-border card-3d reveal-scale ${isVisible ? "visible" : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary transition-colors">
        <Icon size={22} className="text-primary sm:hidden" />
        <Icon size={24} className="text-primary hidden sm:block" />
      </div>
      <p className="font-heading text-2xl sm:text-4xl font-bold text-primary tabular-nums">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">
        {label}
      </p>
    </div>
  )
}

export function Resume() {
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation()
  const { ref: expRef, isVisible: expVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1)

  return (
    <section id="resume" className="py-16 sm:py-28 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-primary/[0.03] animate-float blur-3xl" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/[0.03] rounded-full animate-spin-slow" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            My education, experience, and achievements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 mb-16 sm:mb-24">
          {/* Education */}
          <div ref={eduRef}>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shimmer">
                <GraduationCap size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground">
                Education
              </h3>
            </div>
            <div className={`space-y-4 sm:space-y-6 stagger-children ${eduVisible ? "visible" : ""}`}>
              {EDUCATION.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-5 sm:p-6 border-l-4 border-l-primary shadow-sm border border-border card-3d"
                >
                  <span className="inline-block text-xs font-heading font-semibold text-primary-foreground tracking-wider uppercase bg-primary/90 px-2.5 py-0.5 rounded-full">
                    {item.period}
                  </span>
                  <h4 className="font-heading text-base sm:text-lg font-semibold text-foreground mt-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mt-1">
                    {item.institution}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div ref={expRef}>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shimmer">
                <Briefcase size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground">
                Experience
              </h3>
            </div>
            <div className={`space-y-4 sm:space-y-6 stagger-children ${expVisible ? "visible" : ""}`}>
              {EXPERIENCE.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-5 sm:p-6 border-l-4 border-l-primary/60 shadow-sm border border-border card-3d"
                >
                  <span className="inline-block text-xs font-heading font-semibold text-primary-foreground tracking-wider uppercase bg-primary/80 px-2.5 py-0.5 rounded-full">
                    {item.period}
                  </span>
                  <h4 className="font-heading text-base sm:text-lg font-semibold text-foreground mt-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mt-1">
                    {item.company}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Stats */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6`}
        >
          {STATS.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={statsVisible}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
