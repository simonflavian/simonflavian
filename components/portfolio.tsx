"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All")
  const itemRefs = useRef<Array<HTMLElement | null>>([])
  const [visible, setVisible] = useState<Record<number, boolean>>({})

  const filters = ["All", "Web", "App", "Systems", "STEM"]

  const projects: {
    title: string
    category: string
    image: string
    imageFit?: "cover" | "contain"
    url?: string
  }[] = [
    {
      title: "KB Technical Solutions",
      category: "Web",
      image: "/kbtechnical.png",
      url: "https://kbtechnicalsolutions.co.tz/",
    },
    {
      title: "JEJ Tours",
      category: "Web",
      image: "/jejtours.png",
      url: "https://jejtours.co.tz/",
    },
    {
      title: "SHE Foundation",
      category: "Web",
      image: "/shefoundation.png",
      url: "https://shefoundation.or.tz/",
    },
    {
      title: "Projekt Inspire",
      category: "Web",
      image: "/projekt-inspire.png",
      url: "https://projektinspire.co.tz/",
    },
    {
      title: "WAGA Tanzania",
      category: "Web",
      image: "/professional-business-website.png",
      url: "https://wagatanzania.com/",
    },
    {
      title: "Eddeyane",
      category: "Web",
      image: "/eddeyane.png",
      url: "https://eddeyane.sc.tz/",
    },
    { title: "Electronics", category: "Web", image: "/electronics-store-interior.png" },
    { title: "STEM Park Dar", category: "Web", image: "/stemparkdar.png" },
    {
      title: "Help Tanzania Foundation",
      category: "Web",
      image: "/nonprofit-website.jpg",
      url: "https://www.helptanzaniafoundation.or.tz/",
    },
    {
      title: "JSH CLINCH",
      category: "Web",
      image: "/corporate-website.png",
      url: "https://jshclinch.co.tz/",
    },
    { title: "S4F", category: "Web", image: "/tech-startup-office.png", url: "https://www.s4f.or.tz/" },
    {
      title: "Kanisa Finance",
      category: "Systems",
      image: "/systems/kanisa finance.png",
      url: "https://kanisafinance.netlify.app/",
    },
    { title: "Manya", category: "Systems", image: "/systems/mannya.png", url: "https://mannya.co.tz/" },
    {
      title: "SmartEdu",
      category: "Systems",
      image: "/systems/smartedu.png",
      url: "https://smartedutz.netlify.app/",
    },
    {
      title: "STEM Project",
      category: "STEM",
      image: "/stem1.jpeg",
      url: "https://www.linkedin.com/posts/eng-simon-flavian-663261220_tcra-projektinspire-projektinspire-activity-7317176996118126592-zxYw?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeRCGsBqsCE5miwDvkM-YdQL1-Vg0qQWU4",
    },
    {
      title: "STEM Content Curator",
      category: "STEM",
      image: "/stem2.jpeg",
      url: "https://www.linkedin.com/posts/eng-simon-flavian-663261220_unicef-projektinspire-wokwi-activity-7320043398302777346-gRUe?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeRCGsBqsCE5miwDvkM-YdQL1-Vg0qQWU4",
    },
    {
      title: "Fursahub",
      category: "App",
      image: "/FURSAHUB.png",
      imageFit: "contain",
      url: "https://www.linkedin.com/posts/eng-simon-flavian-663261220_softwaredeveloper-iosdevelopment-swiftui-activity-7424388882584084480-d5tp?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeRCGsBqsCE5miwDvkM-YdQL1-Vg0qQWU4",
    },
  ]

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [idx]: true }))
            observer.unobserve(entry.target)
          }
        })
      },
      { root: null, rootMargin: "0px", threshold: 0.15 }
    )

    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [activeFilter, filteredProjects.length])

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h2>
          <p className="text-xl text-muted-foreground">
            Explore our diverse range of successful projects that showcase our expertise and creativity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const Card = (
              <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ring-1 ring-border">
                <div className="relative aspect-video overflow-hidden bg-muted rounded-b-none">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className={`${
                      project.imageFit === "contain" ? "object-contain" : "object-cover"
                    } group-hover:scale-105 transition-transform duration-300`}
                    priority={index < 3}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.category}</p>
                    </div>
                    <span className="inline-flex items-center justify-center rounded-full h-9 w-9 text-muted-foreground">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </div>
            )

            return project.url ? (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block transform transition-all duration-700 ease-out ${
                  visible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                ref={(el) => {
                  itemRefs.current[index] = el as unknown as HTMLElement | null
                }}
                data-index={index}
              >
                {Card}
              </a>
            ) : (
              <div
                key={project.title}
                className={`transform transition-all duration-700 ease-out ${
                  visible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                ref={(el) => {
                  itemRefs.current[index] = el as unknown as HTMLElement | null
                }}
                data-index={index}
              >
                {Card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
