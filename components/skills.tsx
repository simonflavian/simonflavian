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
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-heading font-semibold text-sm text-foreground">
          {name}
        </span>
        <span className="text-sm font-heading font-semibold text-primary">
          {percentage}%
        </span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all ease-out"
          style={{
            width: isVisible ? `${percentage}%` : "0%",
            transitionDuration: "1.2s",
            transitionDelay: `${delay}ms`,
          }}
        />
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
    <section id="skills" className="py-28 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            Skills
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Technologies and tools I work with
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-x-16 gap-y-8 bg-background rounded-2xl p-8 md:p-12 shadow-sm border border-border ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="space-y-7">
            {leftSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                isVisible={isVisible}
                delay={i * 150}
              />
            ))}
          </div>
          <div className="space-y-7">
            {rightSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                isVisible={isVisible}
                delay={(i + midpoint) * 150}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
