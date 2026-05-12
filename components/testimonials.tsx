"use client"

import { Quote, Star } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const TESTIMONIALS = [
  {
    name: "Saul Goodman",
    role: "CEO, TechVentures",
    initial: "S",
    rating: 5,
    quote:
      "Simon delivered an exceptional web application that exceeded our expectations. His attention to detail and commitment to quality is unmatched. Highly recommended!",
  },
  {
    name: "Sara Wilsson",
    role: "Lead Designer, Creative Studio",
    initial: "S",
    rating: 5,
    quote:
      "Working with Simon was a fantastic experience. He understood our design vision perfectly and translated it into a beautiful, functional product.",
  },
  {
    name: "Matt Brandon",
    role: "Freelance Developer",
    initial: "M",
    rating: 5,
    quote:
      "Simon is a brilliant developer and a great collaborator. His code is clean, well-documented, and he always delivers on time. A true professional.",
  },
  {
    name: "John Larson",
    role: "Entrepreneur",
    initial: "J",
    rating: 5,
    quote:
      "The mobile app Simon built for my startup was instrumental in our early growth. His technical expertise and creative problem-solving are truly impressive.",
  },
]

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="testimonials" className="py-16 sm:py-28 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-primary/[0.03] blob animate-float blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-primary/[0.04] blob animate-float-reverse blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground inline-block mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            What my clients say about working with me
          </p>
        </div>

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 gap-4 sm:gap-6 stagger-children ${
            isVisible ? "visible" : ""
          }`}
        >
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border card-3d group relative overflow-hidden"
            >
              {/* Subtle hover highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Quote size={24} className="text-primary/30 group-hover:text-primary/60 transition-colors duration-300 sm:hidden" />
                  <Quote size={28} className="text-primary/30 group-hover:text-primary/60 transition-colors duration-300 hidden sm:block" />
                  {/* Star rating */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 italic text-sm sm:text-base">
                  {`"${testimonial.quote}"`}
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <span className="font-heading font-bold text-primary-foreground text-base sm:text-lg">
                      {testimonial.initial}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm sm:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
