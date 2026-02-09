"use client"

import { Quote } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const TESTIMONIALS = [
  {
    name: "Saul Goodman",
    role: "CEO, TechVentures",
    initial: "S",
    quote:
      "Simon delivered an exceptional web application that exceeded our expectations. His attention to detail and commitment to quality is unmatched. Highly recommended!",
  },
  {
    name: "Sara Wilsson",
    role: "Lead Designer, Creative Studio",
    initial: "S",
    quote:
      "Working with Simon was a fantastic experience. He understood our design vision perfectly and translated it into a beautiful, functional product.",
  },
  {
    name: "Matt Brandon",
    role: "Freelance Developer",
    initial: "M",
    quote:
      "Simon is a brilliant developer and a great collaborator. His code is clean, well-documented, and he always delivers on time. A true professional.",
  },
  {
    name: "John Larson",
    role: "Entrepreneur",
    initial: "J",
    quote:
      "The mobile app Simon built for my startup was instrumental in our early growth. His technical expertise and creative problem-solving are truly impressive.",
  },
]

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="testimonials" className="py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            Testimonials
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            What my clients say about working with me
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-6 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:-translate-y-1 transition-all duration-300"
              style={{
                animationDelay: isVisible ? `${i * 100}ms` : undefined,
              }}
            >
              <Quote size={28} className="text-primary/30 mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-8 italic">
                {`"${testimonial.quote}"`}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-primary-foreground text-lg">
                    {testimonial.initial}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
