"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const SKILLS = [
  { name: "HTML", percentage: 100 },
  { name: "CSS", percentage: 90 },
  { name: "JavaScript", percentage: 75 },
  { name: "TypeScript", percentage: 75 },
  { name: "PHP", percentage: 80 },
  { name: "Next.js", percentage: 75 },
  { name: "Node.js", percentage: 70 },
  { name: "Spring Boot", percentage: 65 },
  { name: "Flutter & Dart", percentage: 75 },
  { name: "Swift", percentage: 80 },
  { name: "Kotlin", percentage: 80 },
  { name: "WordPress / CMS", percentage: 90 },
  { name: "MySQL", percentage: 65 },
  { name: "Java", percentage: 50 },
]

function SkillBar({
  name,
  percentage,
  isVisible,
  delay,
}: {
  name: string
  percentage: number
  isVisible: boolean
  delay: number
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="font-heading font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        <span
          className="text-xs sm:text-sm font-heading font-bold text-primary transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${delay + 800}ms`,
            transitionDuration: '500ms',
          }}
        >
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 sm:h-3 rounded-full bg-muted overflow-hidden relative">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 relative overflow-hidden"
          style={{
            width: isVisible ? `${percentage}%` : "0%",
            transitionDuration: "1.4s",
            transitionDelay: `${delay}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Animated shine sweep */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              animation: isVisible ? 'shimmer 2s ease-in-out infinite' : 'none',
              animationDelay: `${delay + 1400}ms`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  const { ref, isVisible } = useScrollAnimation()

  const midpoint = Math.ceil(SKILLS.length / 2)
  const leftSkills = SKILLS.slice(0, midpoint)
  const rightSkills = SKILLS.slice(midpoint)

  return (
    <section id="skills" className="py-16 sm:py-28 px-4 sm:px-6 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-primary/[0.04] blob animate-float blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-primary/[0.03] blob animate-float-reverse blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Technologies and tools I work with
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-6 sm:gap-y-8 bg-background rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-border card-3d reveal-up ${
            isVisible ? "visible" : ""
          }`}
        >
          <div className="space-y-5 sm:space-y-7">
            {leftSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                isVisible={isVisible}
                delay={i * 120}
              />
            ))}
          </div>
          <div className="space-y-5 sm:space-y-7">
            {rightSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                isVisible={isVisible}
                delay={(i + midpoint) * 120}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
