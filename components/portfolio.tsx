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
    description: string
    imageFit?: "cover" | "contain"
    url?: string
  }[] = [
      {
        title: "iProtect Security",
        category: "Web",
        image: "/iprotect.png",
        url: "https://www.iprotectsecurity.co.tz/",
        description: "A professional web solution for a leading security firm, streamlining service inquiries and building brand trust."
      },
      {
        title: "JK Cement",
        category: "Web",
        image: "/jkcement.png",
        imageFit: "contain",
        url: "https://jkcement.netlify.app/",
        description: "Corporate portal for JK Cement, facilitating product information access for distributors and construction partners."
      },
      {
        title: "KB Technical Solutions",
        category: "Web",
        image: "/kbtechnical.png",
        url: "https://kbtechnicalsolutions.co.tz/",
        description: "An engineering services platform that connects technical experts with industrial maintenance needs."
      },
      {
        title: "JEJ Tours",
        category: "Web",
        image: "/jejtours.png",
        url: "https://jejtours.co.tz/",
        description: "A dynamic tourism platform that simplifies safari bookings and showcases Tanzania's natural wonders."
      },
      {
        title: "SHE Foundation",
        category: "Web",
        image: "/shefoundation.png",
        url: "https://shefoundation.or.tz/",
        description: "Non-profit website focused on women empowerment, enabling global outreach and donation management."
      },
      {
        title: "Projekt Inspire",
        category: "Web",
        image: "/projekt-inspire.png",
        url: "https://projektinspire.co.tz/",
        description: "Educational hub promoting STEM education through interactive resources and youth engagement programs."
      },
      {
        title: "WAGA Tanzania",
        category: "Web",
        image: "/professional-business-website.png",
        url: "https://wagatanzania.com/",
        description: "Business consultancy website bridging the gap between agricultural experts and local entrepreneurs."
      },
      {
        title: "Eddeyane",
        category: "Web",
        image: "/eddeyane.png",
        url: "https://eddeyane.sc.tz/",
        description: "Corporate consultancy website providing a professional digital presence for business management services."
      },
      {
        title: "Electronics Store",
        category: "Web",
        image: "/electronics-store-interior.png",
        description: "Retail e-commerce solution with integrated inventory management for electronics and tech gear."
      },
      {
        title: "STEM Park Dar",
        category: "Web",
        image: "/stemparkdar.png",
        description: "Community platform for the first STEM park in Dar es Salaam, managing visitor experiences and workshops."
      },
      {
        title: "Help Tanzania Foundation",
        category: "Web",
        image: "/nonprofit-website.jpg",
        url: "https://www.helptanzaniafoundation.or.tz/",
        description: "Charity platform that enhances transparency for donor contributions and community development projects."
      },
      {
        title: "JSH CLINCH",
        category: "Web",
        image: "/corporate-website.png",
        url: "https://jshclinch.co.tz/",
        description: "Multi-sector corporate website showcasing diverse business solutions and commitment to industrial quality."
      },
      {
        title: "S4F",
        category: "Web",
        image: "/tech-startup-office.png",
        url: "https://www.s4f.or.tz/",
        description: "Digital hub for a sustainable development NGO, promoting technology for social good across Tanzania."
      },
      {
        title: "Kanisa Finance",
        category: "Systems",
        image: "/systems/kanisa finance.png",
        url: "https://kanisafinance.netlify.app/",
        description: "Specialized financial system for religious organizations, ensuring transparent tracking of contributions and funds."
      },
      {
        title: "Manya POS",
        category: "Systems",
        image: "/systems/mannya.png",
        imageFit: "contain",
        url: "https://pos.mannya.co.tz/",
        description: "Enterprise POS system for retail businesses, featuring real-time inventory tracking and comprehensive sales analytics."
      },
      {
        title: "SmartEdu",
        category: "Systems",
        image: "/systems/smartedu.png",
        imageFit: "contain",
        url: "https://smartedu.techiq.co.tz/",
        description: "Automated school management system streamlining student records, academic grading, and parent-school communication."
      },
      {
        title: "Benchmark Business Consultants",
        category: "Systems",
        image: "/systems/benchmark.png",
        imageFit: "contain",
        url: "https://www.benchmarkbusinessconsult.co.tz/",
        description: "Operational system for consultancy firms to manage client portfolios and project timelines efficiently."
      },
      {
        title: "Projekt Inspire Store",
        category: "Systems",
        image: "/systems/projekt-inspire-store.png",
        imageFit: "contain",
        url: "https://store.projektinspire.co.tz/",
        description: "Niche e-commerce system for STEM kits, handling complex inventory and nationwide delivery logistics."
      },
      {
        title: "STEM Project Showcase",
        category: "STEM",
        image: "/stem1.jpeg",
        url: "https://www.linkedin.com/posts/eng-simon-flavian-663261220_tcra-projektinspire-projektinspire-activity-7317176996118126592-zxYw?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeRCGsBqsCE5miwDvkM-YdQL1-Vg0qQWU4",
        description: "Interactive STEM training project empowering youth with hands-on electronics and robotics skills."
      },
      {
        title: "STEM Content Curator",
        category: "STEM",
        image: "/stem2.jpeg",
        url: "https://www.linkedin.com/posts/eng-simon-flavian-663261220_unicef-projektinspire-wokwi-activity-7320043398302777346-gRUe?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeRCGsBqsCE5miwDvkM-YdQL1-Vg0qQWU4",
        description: "Curating technical educational content and workshops to inspire innovation among Tanzanian students."
      },
      {
        title: "FursaHub Mobile App",
        category: "App",
        image: "/fursahub-showcase.png",
        imageFit: "cover",
        url: "https://www.linkedin.com/posts/eng-simon-flavian-663261220_softwaredeveloper-iosdevelopment-swiftui-activity-7424388882584084480-d5tp?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeRCGsBqsCE5miwDvkM-YdQL1-Vg0qQWU4",
        description: "A comprehensive mobile solution connecting youth to career opportunities, educational resources, and professional mentorship."
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
      { root: null, rootMargin: "0px", threshold: 0.1 }
    )

    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [activeFilter, filteredProjects.length])

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-muted/30 relative overflow-hidden">
      {/* 3D Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary/[0.04] blob animate-float blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-primary/[0.03] blob animate-float-slow blur-2xl" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-primary/[0.03] rounded-full animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-2">
            A curated showcase of our most impactful digital solutions, from enterprise systems to engaging mobile experiences.
          </p>
        </div>

        {/* Filter buttons - scrollable on mobile */}
        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 px-1 sm:px-0 -mx-1 sm:mx-0 scrollbar-hide">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => {
                setActiveFilter(filter)
                setVisible({})
              }}
              className={`rounded-full whitespace-nowrap flex-shrink-0 text-sm sm:text-base ${activeFilter === filter
                  ? "shadow-lg shadow-primary/25"
                  : ""
                }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            const Card = (
              <div className="group relative bg-card border border-border rounded-xl overflow-hidden card-3d">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`${project.imageFit === "contain" ? "object-contain" : "object-cover"
                      } group-hover:scale-110 transition-transform duration-500 ease-out`}
                    priority={index < 3}
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-xl font-bold leading-tight">{project.title}</h3>
                    <span className="inline-flex items-center justify-center rounded-full h-7 w-7 sm:h-8 sm:w-8 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                      <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            )

            return project.url ? (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block transition-all duration-700 ${visible[index] ? "opacity-100 translate-y-0 scale-100 rotate-0" : "opacity-0 translate-y-12 scale-95"}`}
                style={{ transitionDelay: `${(index % 3) * 120}ms`, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
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
                className={`transition-all duration-700 ${visible[index] ? "opacity-100 translate-y-0 scale-100 rotate-0" : "opacity-0 translate-y-12 scale-95"}`}
                style={{ transitionDelay: `${(index % 3) * 120}ms`, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
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
