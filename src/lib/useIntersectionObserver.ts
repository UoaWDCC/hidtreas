import { useEffect, useRef, useState, useMemo } from 'react'

interface ObserverOptions {
  threshold?: number
  rootMargin?: string
}

const DEFAULT_OPTIONS: ObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
}

export function useIntersectionObserver(options?: ObserverOptions) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  // Memoize options to avoid re-creating the observer on every render
  const opts = useMemo(
    () => ({ ...DEFAULT_OPTIONS, ...options }),
    [options?.threshold, options?.rootMargin],
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        // Once triggered, stop observing — element stays visible
        observer.unobserve(element)
      }
    }, opts)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [opts])

  return [elementRef, isIntersecting] as const
}
