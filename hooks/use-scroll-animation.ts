"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}

/** Animated counter — counts from 0 to target over `duration` ms */
export function useCounter(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isVisible || hasRun.current) return
    hasRun.current = true

    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      // Ease-out curve
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      current = Math.round(eased * target)
      setCount(current)
      if (step >= steps) {
        setCount(target)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return count
}

/** Parallax scroll offset hook */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distFromCenter = elementCenter - windowHeight / 2
      setOffset(distFromCenter * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { ref, offset }
}

/** Typewriter text hook */
export function useTypewriter(words: string[], isVisible: boolean, typingSpeed = 100, deletingSpeed = 60, pauseDuration = 2000) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const currentWord = words[wordIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1))
        }, deletingSpeed)
      } else {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, isVisible, typingSpeed, deletingSpeed, pauseDuration])

  return text
}

/** Mouse/touch tilt for 3D interactive cards */
export function useTilt3D(intensity = 15) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width - 0.5
    const y = (clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`
  }, [intensity])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      handleMove(t.clientX, t.clientY)
    }

    el.addEventListener("mousemove", onMouseMove)
    el.addEventListener("mouseleave", handleLeave)
    el.addEventListener("touchmove", onTouchMove, { passive: true })
    el.addEventListener("touchend", handleLeave)

    return () => {
      el.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("mouseleave", handleLeave)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", handleLeave)
    }
  }, [handleMove, handleLeave])

  return ref
}
