import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react'
import Modal from '../common/Modal'
import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { EventType } from '@/types/event'
import PlaceholderImage from '@/assets/landscape_placeholder.png'

type ThumbMetrics = {
  width: number
  left: number
}

type DragState = {
  pointerId: number
  startX: number
  startThumbLeft: number
  trackWidth: number
  thumbWidth: number
  maxThumbOffset: number
  scrollRange: number
  scrollMin: number
}

export default function PastEventsPopUpModal({
  signOpen,
  setSignOpen,
  events,
  initialIdx,
}: {
  signOpen: boolean
  setSignOpen: (open: boolean) => void
  events: EventType[]
  initialIdx: number
}) {
  // Index of the event selected when the modal opens
  const [selectedEventIdx, setSelectedEventIdx] = useState(initialIdx)
  // Index of the slide currently focused in the carousel (image within the selected event)
  const [currentIdx, setCurrentIdx] = useState(0)
  const currentIdxRef = useRef(currentIdx)
  // Horizontal scroll container for the slide carousel
  const scrollRef = useRef<HTMLDivElement>(null)
  // Range track element for the custom scrollbar UI
  const trackRef = useRef<HTMLDivElement>(null)
  // Stores the latest animation frame id while we debounce scroll updates
  const rafRef = useRef<number | null>(null)
  // Tracks pointer drag state for the scrollbar thumb so drag can continue across events
  const dragStateRef = useRef<DragState | null>(null)
  // Tracks whether a programmatic scroll is targeting a specific index
  const programmaticTargetIdxRef = useRef<number | null>(null)
  // Reference to the modal body for managing scroll positioning
  const modalBodyRef = useRef<HTMLDivElement>(null)
  // Reference to the description area to center it when expanding text
  const descriptionContainerRef = useRef<HTMLDivElement>(null)
  // Remember if the current slide's description is expanded to avoid redundant scrolling
  const prevDescriptionExpandedRef = useRef(false)
  // Keep the slide id for which the description was last expanded
  const prevDescriptionSlideRef = useRef<string | null>(null)
  // Current size and position of the custom scrollbar thumb
  const [thumbMetrics, setThumbMetrics] = useState<ThumbMetrics>({ width: 0, left: 0 })
  const [isThumbDragging, setIsThumbDragging] = useState(false)
  const lastThumbLeftRef = useRef<number>(0)
  const userScrollingRef = useRef<boolean>(false)
  const scrollStopTimerRef = useRef<number | null>(null)
  // Spacer width added at carousel edges to center the active card on small screens
  const [edgeSpacer, setEdgeSpacer] = useState(0)
  // Track per-slide title expansion state so toggles persist while browsing
  const [expandedTitles, setExpandedTitles] = useState<Record<string, boolean>>({})
  // Track per-slide description expansion state so toggles persist while browsing
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({})
  const [isContentVisible, setIsContentVisible] = useState(false)
  const scrollBoundsRef = useRef<{ min: number; max: number }>({ min: 0, max: 0 })
  const touchSwipeRef = useRef<{
    pointerId: number | null
    startX: number
    lastX: number
    startScrollLeft: number
    startIdx: number
    isActive: boolean
  }>({ pointerId: null, startX: 0, lastX: 0, startScrollLeft: 0, startIdx: 0, isActive: false })

  // Helper that cuts text to a maximum length and appends an ellipsis
  const truncate = useCallback((value: string | undefined | null, maxChars: number) => {
    if (!value) {
      return ''
    }
    if (value.length <= maxChars) {
      return value
    }

    return `${value.slice(0, maxChars - 1).trimEnd()}…`
  }, [])

  // Normalize incoming events data into lightweight slide objects consumed by the carousel
  const selectedEvent = events[selectedEventIdx] ?? null

  useEffect(() => {
    if (!events.length) {
      if (selectedEventIdx !== 0) {
        setSelectedEventIdx(0)
      }
      return
    }

    const clampedIdx = Math.max(0, Math.min(initialIdx, events.length - 1))
    if (clampedIdx !== selectedEventIdx) {
      setSelectedEventIdx(clampedIdx)
    }
  }, [events.length, initialIdx, selectedEventIdx])

  const slides = useMemo(() => {
    if (!selectedEvent) {
      return []
    }

    const { galleryImages = [], venue, ...event } = selectedEvent
    const primaryImage = selectedEvent.imageUrl || PlaceholderImage
    const gallery = [primaryImage, ...galleryImages].filter(Boolean) as (string | StaticImageData)[]
    const originalTitle = event.title ?? ''
    const originalDescription = event.description ?? ''
    const titleNeedsTruncation = originalTitle.length > 72
    const descriptionNeedsTruncation = originalDescription.length > 420

    const truncatedTitle = titleNeedsTruncation ? truncate(originalTitle, 72) : originalTitle
    const truncatedDescription = descriptionNeedsTruncation
      ? truncate(originalDescription, 420)
      : originalDescription

    return gallery.map((image, index) => ({
      event: {
        ...event,
        venue,
      },
      image,
      originalTitle,
      originalDescription,
      truncatedTitle,
      truncatedDescription,
      venue,
      isTitleTruncated: titleNeedsTruncation,
      isDescriptionTruncated: descriptionNeedsTruncation,
      imageIndex: index,
    }))
  }, [selectedEvent, truncate])

  useEffect(() => {
    currentIdxRef.current = currentIdx
  }, [currentIdx])

  useEffect(() => {
    if (!signOpen) {
      return
    }

    setCurrentIdx(0)
  }, [selectedEventIdx, signOpen])

  // Keeps scroll padding symmetrical so the active card sits centered within the viewport
  const computeScrollBounds = useCallback(() => {
    const container = scrollRef.current
    if (!container) {
      scrollBoundsRef.current = { min: 0, max: 0 }
      return
    }

    const slidesEls = container.querySelectorAll<HTMLElement>('[data-slide-item="true"]')
    if (!slidesEls.length) {
      scrollBoundsRef.current = { min: 0, max: 0 }
      return
    }

    const scrollableWidth = container.scrollWidth - container.clientWidth
    if (scrollableWidth <= 0) {
      scrollBoundsRef.current = { min: 0, max: 0 }
      return
    }

    const computeTarget = (slide: HTMLElement) => {
      const slideWidth = slide.offsetWidth
      const targetLeft = slide.offsetLeft - (container.clientWidth - slideWidth) / 2
      return Math.min(Math.max(targetLeft, 0), scrollableWidth)
    }

    const firstTarget = computeTarget(slidesEls[0])
    const lastTarget = computeTarget(slidesEls[slidesEls.length - 1])

    scrollBoundsRef.current = {
      min: Math.min(firstTarget, lastTarget),
      max: Math.max(firstTarget, lastTarget),
    }
  }, [])

  const updateScrollPadding = useCallback(() => {
    computeScrollBounds()

    const container = scrollRef.current
    if (!container) {
      return
    }

    const activeSlide = container.querySelector<HTMLElement>(
      '[data-slide-item="true"][aria-current="true"]',
    )
    const fallbackSlide = container.querySelector<HTMLElement>('[data-slide-item="true"]')
    const referenceSlide = activeSlide ?? fallbackSlide
    if (!referenceSlide) {
      return
    }

    const slideWidth = referenceSlide.getBoundingClientRect().width
    if (slideWidth <= 0) {
      return
    }

    const basePadding = (container.clientWidth - slideWidth) / 2
    const padding = Math.max(basePadding, 12)
    container.style.scrollPaddingLeft = `${padding}px`
    container.style.scrollPaddingRight = `${padding}px`

    setEdgeSpacer((prev) => (Math.abs(prev - padding) > 1 ? padding : prev))
  }, [computeScrollBounds])

  // Recalculate thumb width/offset so the scrollbar reflects current carousel scroll
  const updateThumbMetrics = useCallback(() => {
    computeScrollBounds()

    const container = scrollRef.current
    const track = trackRef.current
    if (!container || !track) {
      return
    }

    const trackWidth = track.clientWidth
    if (trackWidth <= 0) {
      return
    }

    const { scrollWidth, clientWidth, scrollLeft } = container
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll <= 0) {
      setThumbMetrics({ width: trackWidth, left: 0 })
      return
    }

    const ratio = clientWidth / scrollWidth
    const width = Math.max(Math.min(ratio * trackWidth, trackWidth * 0.5), 16)
    const maxThumbOffset = Math.max(trackWidth - width, 0)

    const { min, max } = scrollBoundsRef.current
    const effectiveRange = Math.max(max - min, 0)

    if (maxThumbOffset === 0 || effectiveRange <= 0) {
      setThumbMetrics({ width: trackWidth, left: 0 })
      return
    }

    const rawProgress = (scrollLeft - min) / effectiveRange
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1)
    const targetLeft = clampedProgress * maxThumbOffset

    // Use exact subpixel positioning for smooth updates without jitter
    lastThumbLeftRef.current = targetLeft
    setThumbMetrics({ width, left: targetLeft })
  }, [computeScrollBounds, isThumbDragging])

  const updateCurrentIndexFromScroll = useCallback((container: HTMLDivElement) => {
    // Avoid changing active index while dragging the custom thumb to prevent layout shifts
    if (dragStateRef.current) {
      return
    }
    const programmaticTarget = programmaticTargetIdxRef.current
    if (programmaticTarget !== null) {
      const slidesEls = container.querySelectorAll<HTMLElement>('[data-slide-item="true"]')
      const targetSlide = slidesEls[programmaticTarget]
      if (targetSlide) {
        const containerRect = container.getBoundingClientRect()
        const containerCenter = containerRect.left + containerRect.width / 2
        const rect = targetSlide.getBoundingClientRect()
        const nodeCenter = rect.left + rect.width / 2

        if (Math.abs(containerCenter - nodeCenter) <= Math.max(1, rect.width * 0.05)) {
          programmaticTargetIdxRef.current = null
          setCurrentIdx(programmaticTarget)
        }
        return
      }
    }

    const nodes = Array.from(container.querySelectorAll<HTMLElement>('[data-slide-item="true"]'))
    if (!nodes.length) {
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = container
    const maxScroll = scrollWidth - clientWidth
    const edgeThreshold = Math.max(12, clientWidth * 0.05)

    if (scrollLeft <= edgeThreshold) {
      setCurrentIdx((prev) => (prev === 0 ? prev : 0))
      return
    }

    if (maxScroll > 0 && maxScroll - scrollLeft <= edgeThreshold) {
      const lastIdx = nodes.length - 1
      setCurrentIdx((prev) => (prev === lastIdx ? prev : lastIdx))
      return
    }

    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2

    let closestIdx = 0
    let closestDistance = Number.POSITIVE_INFINITY

    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect()
      const nodeCenter = rect.left + rect.width / 2
      const distance = Math.abs(containerCenter - nodeCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIdx = index
      }
    })

    // Hysteresis: only switch when crossing midpoint with margin to avoid rapid flip-flop
    const current = currentIdxRef.current
    if (closestIdx !== current && current >= 0 && current < nodes.length) {
      const currentRect = nodes[current].getBoundingClientRect()
      const targetRect = nodes[closestIdx].getBoundingClientRect()
      const currentCenter = currentRect.left + currentRect.width / 2
      const targetCenter = targetRect.left + targetRect.width / 2
      const midpoint = (currentCenter + targetCenter) / 2
      const margin = Math.max(8, Math.min(currentRect.width, targetRect.width) * 0.06)

      const movingRight = closestIdx > current
      const allowSwitch = movingRight
        ? containerCenter > midpoint + margin
        : containerCenter < midpoint - margin

      if (!allowSwitch) {
        return
      }
    }

    setCurrentIdx((prev) => (prev === closestIdx ? prev : closestIdx))
  }, [])

  // Centers the carousel on a given slide index; used when clicking arrows or cards
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current
    if (!container) {
      return
    }

    const slidesEls = container.querySelectorAll<HTMLElement>('[data-slide-item="true"]')
    const child = slidesEls[index]
    if (!child) {
      return
    }

    const scrollRange = container.scrollWidth - container.clientWidth
    if (scrollRange <= 0) {
      container.scrollTo({ left: 0, behavior })
      return
    }

    // Center based on actual on-screen geometry for maximum accuracy
    const containerRect = container.getBoundingClientRect()
    const childRect = child.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2
    const childCenter = childRect.left + childRect.width / 2

    const delta = childCenter - containerCenter
    const targetLeft = container.scrollLeft + delta
    const clampedTarget = Math.min(Math.max(targetLeft, 0), scrollRange)

    programmaticTargetIdxRef.current = index
    container.scrollTo({ left: clampedTarget, behavior })
  }, [])

  const snapToNearestSlide = useCallback(() => {
    const container = scrollRef.current
    if (!container) {
      return
    }

    const slidesEls = container.querySelectorAll<HTMLElement>('[data-slide-item="true"]')
    if (!slidesEls.length) {
      return
    }

    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2

    let closestIdx = 0
    let closestDistance = Number.POSITIVE_INFINITY

    slidesEls.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect()
      const nodeCenter = rect.left + rect.width / 2
      const distance = Math.abs(containerCenter - nodeCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIdx = index
      }
    })

    if (currentIdxRef.current !== closestIdx) {
      setCurrentIdx(closestIdx)
    }

    scrollToIndex(closestIdx)
  }, [scrollToIndex])

  // Recompute scroll padding whenever layout-affecting inputs change
  useEffect(() => {
    updateScrollPadding()
  }, [updateScrollPadding, slides.length, signOpen])

  // Attach resize listener so padding and thumb sizing stay in sync with viewport changes
  useEffect(() => {
    const handleResize = () => {
      updateScrollPadding()
      updateThumbMetrics()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [updateScrollPadding, updateThumbMetrics])

  // Cleanup any pending raf or drag state when component unmounts
  useEffect(() => {
    return () => {
      if (rafRef.current !== null && typeof window !== 'undefined') {
        window.cancelAnimationFrame(rafRef.current)
      }
      dragStateRef.current = null
    }
  }, [])

  // When modal closes, reset expanded title/description state to avoid stale UI next open
  useEffect(() => {
    if (!signOpen) {
      setExpandedTitles({})
      setExpandedDescriptions({})
    }
  }, [signOpen])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    if (!signOpen) {
      return
    }

    const body = document.body
    const originalOverflow = body.style.overflow
    const originalPaddingRight = body.style.paddingRight
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      body.style.overflow = originalOverflow
      body.style.paddingRight = originalPaddingRight
    }
  }, [signOpen])

  // When modal opens or the initial index changes, clamp and scroll to that slide
  useEffect(() => {
    if (!signOpen) {
      setIsContentVisible(false)
      return
    }

    if (!slides.length) {
      setIsContentVisible(false)
      return
    }

    // Hide content initially, then center and show
    setIsContentVisible(false)

    // Use a more reliable approach: wait for the next frame after DOM is ready
    const centerSlide = () => {
      updateScrollPadding()

      // Use scrollToIndex but with 'auto' behavior to avoid animation
      scrollToIndex(currentIdxRef.current, 'auto')

      // Now show the content after centering is complete
      setIsContentVisible(true)
    }

    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(centerSlide, 0)

    return () => clearTimeout(timeoutId)
  }, [scrollToIndex, signOpen, slides.length, selectedEventIdx, updateScrollPadding])

  // When slides array length changes, ensure current index stays within bounds
  useEffect(() => {
    if (!slides.length) {
      return
    }

    updateScrollPadding()

    setCurrentIdx((prev) => {
      if (prev <= slides.length - 1) {
        return prev
      }
      return slides.length - 1
    })
  }, [slides.length, updateScrollPadding])

  // Debounced scroll handler that keeps currentIdx aligned with the card closest to center
  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) {
      return
    }

    userScrollingRef.current = true
    if (scrollStopTimerRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(scrollStopTimerRef.current)
    }

    if (rafRef.current !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(rafRef.current)
    }

    const schedule = () => {
      updateCurrentIndexFromScroll(container)
      updateThumbMetrics()
      if (typeof window !== 'undefined') {
        scrollStopTimerRef.current = window.setTimeout(() => {
          userScrollingRef.current = false
        }, 80)
      }
    }

    if (typeof window !== 'undefined') {
      rafRef.current = window.requestAnimationFrame(schedule)
    } else {
      schedule()
    }
  }, [updateCurrentIndexFromScroll, updateThumbMetrics])

  // Begin drag gesture on scrollbar thumb and cache starting metrics
  const handleThumbPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = scrollRef.current
      const track = trackRef.current
      if (!container || !track) {
        return
      }

      event.preventDefault()

      const pointerId = event.pointerId
      const startX = event.clientX

      const { min, max } = scrollBoundsRef.current
      const effectiveRange = Math.max(max - min, 0)
      if (effectiveRange <= 0) {
        return
      }

      const trackWidth = track.clientWidth
      const thumbWidth = thumbMetrics.width
      const maxThumbOffset = Math.max(trackWidth - thumbWidth, 0)

      if (maxThumbOffset <= 0) {
        return
      }

      dragStateRef.current = {
        pointerId,
        startX,
        startThumbLeft: thumbMetrics.left,
        trackWidth,
        thumbWidth,
        maxThumbOffset,
        scrollRange: effectiveRange,
        scrollMin: min,
      }

      const target = event.currentTarget
      target.setPointerCapture(pointerId)
      setIsThumbDragging(true)
    },
    [thumbMetrics.left, thumbMetrics.width],
  )

  // Update carousel scroll position while thumb is dragged
  const handleThumbPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current
    if (!container) {
      return
    }

    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragState.startX
    const nextThumbLeft = Math.min(
      Math.max(dragState.startThumbLeft + deltaX, 0),
      dragState.maxThumbOffset,
    )

    const ratio = nextThumbLeft / dragState.maxThumbOffset
    container.scrollLeft = dragState.scrollMin + ratio * dragState.scrollRange
  }, [])

  // Release pointer capture and clear drag state at gesture end/cancel
  const handleThumbPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return
      }

      dragStateRef.current = null

      const target = event.currentTarget
      target.releasePointerCapture(event.pointerId)
      snapToNearestSlide()
      setIsThumbDragging(false)
    },
    [snapToNearestSlide],
  )

  // Sync thumb metrics whenever slide count or modal visibility changes
  useEffect(() => {
    updateThumbMetrics()
  }, [slides.length, signOpen, updateThumbMetrics])

  // If the current slide's description is expanded, ensure it remains in view when switching slides
  useEffect(() => {
    const slide = slides[currentIdx]

    if (!slide) {
      prevDescriptionExpandedRef.current = false
      prevDescriptionSlideRef.current = null
      return
    }

    const slideId = slide.event.id
    const isExpanded = expandedDescriptions[slideId] ?? false

    if (!isExpanded) {
      prevDescriptionExpandedRef.current = false
      prevDescriptionSlideRef.current = null
      return
    }

    const modalBody = modalBodyRef.current
    const descriptionContainer = descriptionContainerRef.current

    if (!modalBody || !descriptionContainer) {
      return
    }

    const slideHasChanged = prevDescriptionSlideRef.current !== slideId
    const wasCollapsed = !prevDescriptionExpandedRef.current

    prevDescriptionExpandedRef.current = true
    prevDescriptionSlideRef.current = slideId

    const shouldCenter = wasCollapsed || slideHasChanged
    if (!shouldCenter) {
      return
    }

    const targetNode = descriptionContainer
    const scrollOptions: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'nearest',
    }

    if ('scrollTo' in modalBody) {
      const modalRect = modalBody.getBoundingClientRect()
      const targetRect = targetNode.getBoundingClientRect()
      const offset = targetRect.top - modalRect.top - modalRect.height * 0.1

      modalBody.scrollTo({
        top: modalBody.scrollTop + offset,
        behavior: 'smooth',
      })
    } else {
      targetNode.scrollIntoView(scrollOptions)
    }
  }, [currentIdx, expandedDescriptions, slides])

  const slide = slides[currentIdx]

  if (!slide) {
    return null
  }

  const slideId = slide.event.id
  const isTitleExpanded = expandedTitles[slideId] ?? false
  const isDescriptionExpanded = expandedDescriptions[slideId] ?? false
  const fullTitle =
    slide.originalTitle && slide.originalTitle.length > 0 ? slide.originalTitle : slide.event.title
  const truncatedTitle = slide.truncatedTitle ?? truncate(fullTitle, 72)
  const previewTitle = truncatedTitle
  const displayTitleText = isTitleExpanded || !slide.isTitleTruncated ? fullTitle : previewTitle

  const fullDescription =
    slide.originalDescription !== undefined && slide.originalDescription !== null
      ? slide.originalDescription
      : (slide.event.description ?? '')
  const truncatedDescription = slide.truncatedDescription ?? truncate(fullDescription, 420)
  const displayDescriptionText = isDescriptionExpanded ? fullDescription : truncatedDescription
  const canToggleDescription = slide.isDescriptionTruncated && fullDescription.length > 0

  return (
    <Modal
      open={signOpen}
      onClose={() => setSignOpen(false)}
      className="w-full max-w-[64rem] !bg-[#FFF8F3] rounded-[2.5rem] shadow-lg"
      superClassName="bg-black/40 px-4"
      noHeader
    >
      {/* Scrollable modal body containing slide content and metadata */}
      <div
        ref={modalBodyRef}
        className={`relative flex w-full flex-col items-center gap-8 px-6 py-10 md:gap-10 md:px-12 max-h-[85vh] overflow-y-auto transition-opacity duration-200 ${
          isContentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Dismiss modal button */}
        <button
          type="button"
          onClick={() => setSignOpen(false)}
          className="absolute right-2 top-1 cursor-pointer text-[#13384E] md:right-6 md:top-6"
          aria-label="Close"
        >
          <IconX size={28} />
        </button>

        {/* Headline section: title, date, venue */}
        <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center">
          <h2
            className={`${!isTitleExpanded ? 'clamp-2' : ''} text-3xl font-black text-[#13384E] md:text-4xl`}
            title={slide.originalTitle ?? slide.event.title}
          >
            {displayTitleText}
          </h2>
          {slide.isTitleTruncated && (
            <button
              type="button"
              onClick={() =>
                setExpandedTitles((prev) => {
                  const nextExpanded = !isTitleExpanded

                  if (!nextExpanded) {
                    const updated = { ...prev }
                    delete updated[slideId]
                    return updated
                  }

                  return {
                    ...prev,
                    [slideId]: true,
                  }
                })
              }
              className="inline-flex cursor-pointer align-baseline text-xs uppercase tracking-wide text-[#13384E]/80"
              aria-label={isTitleExpanded ? 'Show less event title' : 'Show full event title'}
            >
              {isTitleExpanded ? 'SHOW LESS' : 'SHOW MORE'}
            </button>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#13384E]/70 md:text-sm">
            <span>
              {slide.event.date.toLocaleDateString('en-NZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            {selectedEvent?.venue && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#13384E]/40" />
                VENUE: {selectedEvent.venue}
              </span>
            )}
          </div>
        </div>

        {/* Carousel of past events with horizontal scroll */}
        <div className="w-full">
          <div className="relative -mx-6 md:-mx-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-2 md:hidden">
              <button
                type="button"
                onClick={() => {
                  const nextIdx = Math.max(0, currentIdx - 1)
                  setCurrentIdx(nextIdx)
                  scrollToIndex(nextIdx)
                }}
                className="pointer-events-auto flex items-center justify-center p-1 transition disabled:opacity-40"
                aria-label="Previous image"
                disabled={currentIdx === 0}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#13384E] text-white shadow-md">
                  <IconChevronLeft size={12} />
                </span>
              </button>
            </div>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              onTouchStart={(event) => {
                const touch = event.touches[0]
                if (!touch) {
                  return
                }

                touchSwipeRef.current = {
                  pointerId: null,
                  startX: touch.clientX,
                  lastX: touch.clientX,
                  startScrollLeft: scrollRef.current ? scrollRef.current.scrollLeft : 0,
                  startIdx: currentIdx,
                  isActive: true,
                }
              }}
              onTouchMove={(event) => {
                const swipeState = touchSwipeRef.current
                if (!swipeState.isActive) {
                  return
                }

                const touch = event.touches[0]
                if (!touch) {
                  return
                }

                swipeState.lastX = touch.clientX
              }}
              onTouchEnd={(event) => {
                const swipeState = touchSwipeRef.current
                if (!swipeState.isActive) {
                  return
                }

                const container = scrollRef.current
                if (!container) {
                  touchSwipeRef.current = {
                    pointerId: null,
                    startX: 0,
                    lastX: 0,
                    startScrollLeft: 0,
                    startIdx: 0,
                    isActive: false,
                  }
                  return
                }

                const touch = event.changedTouches[0]
                const endX = touch ? touch.clientX : swipeState.lastX

                const deltaX = endX - swipeState.startX
                const deltaScroll = container.scrollLeft - swipeState.startScrollLeft

                touchSwipeRef.current = {
                  pointerId: null,
                  startX: 0,
                  lastX: 0,
                  startScrollLeft: 0,
                  startIdx: 0,
                  isActive: false,
                }

                if (Math.abs(deltaScroll) < 15) {
                  snapToNearestSlide()
                  return
                }

                let targetIdx = swipeState.startIdx

                if (deltaX <= -40) {
                  targetIdx = Math.min(swipeState.startIdx + 1, slides.length - 1)
                } else if (deltaX >= 40) {
                  targetIdx = Math.max(swipeState.startIdx - 1, 0)
                } else {
                  snapToNearestSlide()
                  return
                }

                if (currentIdxRef.current !== targetIdx) {
                  setCurrentIdx(targetIdx)
                }

                scrollToIndex(targetIdx)
              }}
              onTouchCancel={(event) => {
                const swipeState = touchSwipeRef.current
                if (!swipeState.isActive) {
                  return
                }

                const touch = event.changedTouches ? event.changedTouches[0] : null
                if (touch) {
                  swipeState.lastX = touch.clientX
                }

                touchSwipeRef.current = {
                  pointerId: null,
                  startX: 0,
                  lastX: 0,
                  startScrollLeft: 0,
                  startIdx: 0,
                  isActive: false,
                }

                snapToNearestSlide()
              }}
              className={`flex w-full items-center gap-6 overflow-x-auto px-6 pb-6 pt-2 md:pl-16 md:pr-12 no-scrollbar ${
                isThumbDragging ? 'snap-none scroll-auto' : 'snap-x snap-mandatory scroll-smooth'
              }`}
            >
              {edgeSpacer > 0 && (
                <div aria-hidden className="flex-shrink-0" style={{ width: `${edgeSpacer}px` }} />
              )}

              {slides.map((entry, index) => {
                const image = entry.image ?? PlaceholderImage
                const isActive = index === currentIdx

                return (
                  <button
                    data-slide-item="true"
                    key={`${entry.event.id}-${entry.imageIndex}`}
                    type="button"
                    onClick={() => {
                      setCurrentIdx(index)
                      scrollToIndex(index)
                    }}
                    className={`flex-shrink-0 snap-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13384E] transition-all duration-300 w-full mx-auto md:mx-0 ${
                      isActive
                        ? 'pointer-events-none max-w-[23rem] md:max-w-none md:w-[23rem]'
                        : 'max-w-[20rem] md:max-w-none md:w-[21rem]'
                    }`}
                    aria-label={`View image ${index + 1} for ${entry.event.title}`}
                    aria-current={isActive}
                  >
                    <div className="flex items-center justify-center transition-all duration-300">
                      <div
                        className={`relative mx-auto aspect-[4/3] overflow-hidden transition-all duration-300 ${
                          isActive
                            ? 'w-full max-w-[22rem] md:max-w-none'
                            : 'w-[86%] max-w-[19rem] md:max-w-none'
                        }`}
                      >
                        <Image
                          src={image || PlaceholderImage}
                          alt={entry.event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 80vw, 320px"
                        />
                      </div>
                    </div>
                    <span className="mt-3 block h-2" />
                  </button>
                )
              })}

              {edgeSpacer > 0 && (
                <div aria-hidden className="flex-shrink-0" style={{ width: `${edgeSpacer}px` }} />
              )}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 md:hidden">
              <button
                type="button"
                onClick={() => {
                  const nextIdx = Math.min(slides.length - 1, currentIdx + 1)
                  setCurrentIdx(nextIdx)
                  scrollToIndex(nextIdx)
                }}
                className="pointer-events-auto flex items-center justify-center p-1 transition disabled:opacity-40"
                aria-label="Next image"
                disabled={currentIdx >= slides.length - 1}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#13384E] text-white shadow-md">
                  <IconChevronRight size={12} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Custom scrollbar control for the carousel (hidden on single slide) */}
        {slides.length > 1 && (
          <div className="flex w-full max-w-3xl items-center">
            <div
              className="relative w-full rounded-full bg-[#E5DEDA]"
              style={{ height: '0.65rem' }}
            >
              <div
                ref={trackRef}
                className="relative h-full w-full rounded-full"
                onPointerDown={(event) => {
                  const dragState = dragStateRef.current
                  if (dragState) {
                    return
                  }

                  if (event.target !== event.currentTarget) {
                    return
                  }

                  const container = scrollRef.current
                  if (!container) {
                    return
                  }

                  const track = trackRef.current
                  if (!track) {
                    return
                  }

                  const rect = track.getBoundingClientRect()
                  const clickX = event.clientX - rect.left
                  const thumbHalf = thumbMetrics.width / 2
                  let targetLeft = clickX - thumbHalf

                  const maxThumbOffset = rect.width - thumbMetrics.width
                  if (maxThumbOffset <= 0) {
                    return
                  }

                  targetLeft = Math.min(Math.max(targetLeft, 0), maxThumbOffset)
                  const ratio = targetLeft / maxThumbOffset

                  const slidesEls = container.querySelectorAll<HTMLElement>(
                    '[data-slide-item="true"]',
                  )
                  if (slidesEls.length > 0) {
                    const targetIdx = Math.min(
                      slidesEls.length - 1,
                      Math.max(0, Math.round(ratio * (slidesEls.length - 1))),
                    )

                    if (currentIdxRef.current !== targetIdx) {
                      setCurrentIdx(targetIdx)
                    }

                    scrollToIndex(targetIdx)
                  } else {
                    container.scrollTo({
                      left: ratio * (container.scrollWidth - container.clientWidth),
                      behavior: 'smooth',
                    })
                  }

                  setThumbMetrics((prev) => ({ ...prev, left: targetLeft }))
                }}
              >
                <div
                  role="scrollbar"
                  aria-label="Event carousel position"
                  aria-valuemin={0}
                  aria-valuemax={slides.length - 1}
                  aria-valuenow={currentIdx}
                  onPointerDown={handleThumbPointerDown}
                  onPointerMove={handleThumbPointerMove}
                  onPointerUp={handleThumbPointerUp}
                  onPointerCancel={handleThumbPointerUp}
                  onPointerLeave={(event) => {
                    if (
                      dragStateRef.current &&
                      dragStateRef.current.pointerId === event.pointerId
                    ) {
                      handleThumbPointerUp(event as unknown as ReactPointerEvent<HTMLDivElement>)
                    }
                  }}
                  className="absolute top-1/2 touch-none rounded-full bg-[#13384E]"
                  style={{
                    width: `${thumbMetrics.width}px`,
                    height: '0.75rem',
                    transform: `translate3d(${thumbMetrics.left}px, -50%, 0)`,
                    willChange: 'transform',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Event description with expandable "show more" toggle */}
        <div
          className={`w-full max-w-3xl ${isDescriptionExpanded ? 'text-left' : 'text-center'}`}
          ref={descriptionContainerRef}
        >
          <div
            className={`${
              !isDescriptionExpanded ? 'clamp-5 text-center' : 'text-left'
            } text-sm leading-relaxed text-[#1F1F1F] md:text-base whitespace-pre-wrap`}
            title={slide.originalDescription ?? slide.event.description}
            ref={isDescriptionExpanded ? descriptionContainerRef : null}
          >
            {displayDescriptionText}
          </div>
          {canToggleDescription && (
            <div className={`mt-3 ${isDescriptionExpanded ? 'text-left' : 'text-center'}`}>
              <button
                type="button"
                onClick={() =>
                  setExpandedDescriptions((prev) => {
                    const nextExpanded = !isDescriptionExpanded

                    if (!nextExpanded) {
                      prevDescriptionExpandedRef.current = false
                      prevDescriptionSlideRef.current = null
                    }

                    return {
                      ...prev,
                      [slideId]: nextExpanded,
                    }
                  })
                }
                className="inline-flex cursor-pointer align-baseline text-sm uppercase tracking-wide text-[#13384E]/80"
                aria-label={
                  isDescriptionExpanded
                    ? 'Show less event description'
                    : 'Show full event description'
                }
              >
                {isDescriptionExpanded ? 'SHOW LESS' : 'SHOW MORE'}
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
