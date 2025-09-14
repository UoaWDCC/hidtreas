'use client'

import { ReactNode } from 'react'
import { useIntersectionObserver } from '@/lib/useIntersectionObserver'

interface AnimatedSectionProps {
  children: ReactNode
  animationClass?: string
  className?: string
  delay?: number
}

export default function AnimatedSection({
  children,
  animationClass = 'animate-slide-in-bottom',
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver()

  // Get the initial transform based on animation class
  const getInitialTransform = () => {
    if (animationClass.includes('slide-in-left')) return 'translateX(-100px)'
    if (animationClass.includes('slide-in-right')) return 'translateX(100px)'
    if (animationClass.includes('slide-in-top')) return 'translateY(-50px)'
    if (animationClass.includes('slide-in-bottom')) return 'translateY(50px)'
    if (animationClass.includes('scale-in')) return 'scale(0.8)'
    return 'translateY(50px)' // default
  }

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-800 ease-out`}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'none' : getInitialTransform(),
        animationDelay: isIntersecting ? `${delay}s` : '0s',
      }}
    >
      {children}
    </div>
  )
}
