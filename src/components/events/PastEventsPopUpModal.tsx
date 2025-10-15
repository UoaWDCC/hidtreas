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
  // Index of the slide currently focused in the carousel
  const [currentIdx, setCurrentIdx] = useState(initialIdx)
  // Horizontal scroll container for the slide carousel
  const scrollRef = useRef<HTMLDivElement>(null)
  // Range track element for the custom scrollbar UI
  const trackRef = useRef<HTMLDivElement>(null)
  // Stores the latest animation frame id while we debounce scroll updates
  const rafRef = useRef<number | null>(null)
  // Tracks pointer drag state for the scrollbar thumb so drag can continue across events
  const dragStateRef = useRef<DragState | null>(null)
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
  // Spacer width added at carousel edges to center the active card on small screens
  const [edgeSpacer, setEdgeSpacer] = useState(0)
  // Track per-slide title expansion state so toggles persist while browsing
  const [expandedTitles, setExpandedTitles] = useState<Record<string, boolean>>({})
  // Track per-slide description expansion state so toggles persist while browsing
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({})

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
  const slides = useMemo(() => {
    if (!events || events.length === 0) {
      return []
    }

    return events.map(({ galleryImages = [], venue, ...event }) => {
      const gallery = [event.imageUrl, ...galleryImages].filter(Boolean) as (
        | string
        | StaticImageData
      )[]
      const originalTitle = event.title ?? ''
      const originalDescription = event.description ?? ''
      const titleNeedsTruncation = originalTitle.length > 72
      const descriptionNeedsTruncation = originalDescription.length > 420

      const truncatedTitle = titleNeedsTruncation ? truncate(originalTitle, 72) : originalTitle
      const truncatedDescription = descriptionNeedsTruncation
        ? truncate(originalDescription, 420)
        : originalDescription

      return {
        event: {
          ...event,
          venue,
        },
        gallery,
        originalTitle,
        originalDescription,
        truncatedTitle,
        truncatedDescription,
        venue,
        isTitleTruncated: titleNeedsTruncation,
        isDescriptionTruncated: descriptionNeedsTruncation,
      }
    })
  }, [events, truncate])

  // Keeps scroll padding symmetrical so the active card sits centered within the viewport
  const updateScrollPadding = useCallback(() => {
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
  }, [])

  // Recalculate thumb width/offset so the scrollbar reflects current carousel scroll
  const updateThumbMetrics = useCallback(() => {
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
    const maxThumbOffset = trackWidth - width
    const left = (scrollLeft / maxScroll) * maxThumbOffset

    setThumbMetrics({ width, left })
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

    const childWidth = child.offsetWidth
    const scrollRange = container.scrollWidth - container.clientWidth

    if (scrollRange <= 0) {
      container.scrollTo({ left: 0, behavior })
      return
    }

    const targetLeft = child.offsetLeft - (container.clientWidth - childWidth) / 2
    const clampedTarget = Math.min(Math.max(targetLeft, 0), scrollRange)

    container.scrollTo({ left: clampedTarget, behavior })
  }, [])

  // Recompute scroll padding whenever layout-affecting inputs change
  useEffect(() => {
    updateScrollPadding()
  }, [updateScrollPadding, slides.length, signOpen, currentIdx])

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

  // When modal opens or the initial index changes, clamp and scroll to that slide
  useEffect(() => {
    updateScrollPadding()

    if (!slides.length || !signOpen) {
      return
    }

    const clampedIdx = Math.max(0, Math.min(initialIdx, slides.length - 1))
    setCurrentIdx(clampedIdx)

    const scheduleScroll = () => scrollToIndex(clampedIdx, 'auto')
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(scheduleScroll)
    } else {
      scheduleScroll()
    }
  }, [initialIdx, scrollToIndex, signOpen, slides.length])

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

    if (rafRef.current !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(rafRef.current)
    }

    const updateCurrentIndex = () => {
      const nodes = Array.from(container.querySelectorAll<HTMLElement>('[data-slide-item="true"]'))
      if (!nodes.length) {
        return
      }

      const { scrollLeft, scrollWidth, clientWidth } = container
      const maxScroll = scrollWidth - clientWidth
      const edgeThreshold = Math.max(12, clientWidth * 0.05)

      // Close to the left edge: lock index to the first slide to avoid center mis-detection
      if (scrollLeft <= edgeThreshold) {
        setCurrentIdx((prev) => (prev === 0 ? prev : 0))
        updateThumbMetrics()
        return
      }

      // Close to the right edge: lock index to the final slide
      if (maxScroll > 0 && maxScroll - scrollLeft <= edgeThreshold) {
        const lastIdx = nodes.length - 1
        setCurrentIdx((prev) => (prev === lastIdx ? prev : lastIdx))
        updateThumbMetrics()
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

      setCurrentIdx((prev) => (prev === closestIdx ? prev : closestIdx))
      updateThumbMetrics()
    }

    if (typeof window !== 'undefined') {
      rafRef.current = window.requestAnimationFrame(updateCurrentIndex)
    } else {
      updateCurrentIndex()
    }
  }, [updateThumbMetrics])

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

      const { scrollWidth, clientWidth } = container
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) {
        return
      }

      const trackWidth = track.clientWidth
      const thumbWidth = thumbMetrics.width
      const maxThumbOffset = trackWidth - thumbWidth

      dragStateRef.current = {
        pointerId,
        startX,
        startThumbLeft: thumbMetrics.left,
        trackWidth,
        thumbWidth,
        maxThumbOffset,
        scrollRange: maxScroll,
      }

      const target = event.currentTarget
      target.setPointerCapture(pointerId)
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
    container.scrollLeft = ratio * dragState.scrollRange
    setThumbMetrics((prev) => ({ ...prev, left: nextThumbLeft }))
  }, [])

  // Release pointer capture and clear drag state at gesture end/cancel
  const handleThumbPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    dragStateRef.current = null

    const target = event.currentTarget
    target.releasePointerCapture(event.pointerId)
  }, [])

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
        className="relative flex w-full flex-col items-center gap-8 px-6 py-10 md:gap-10 md:px-12 max-h-[85vh] overflow-y-auto"
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
            {slide.event.venue && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#13384E]/40" />
                VENUE: {slide.event.venue}
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
                aria-label="Previous event"
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
              className="flex w-full snap-x snap-mandatory items-center gap-6 overflow-x-auto scroll-smooth px-6 pb-6 pt-2 md:pl-16 md:pr-12 no-scrollbar"
            >
              {edgeSpacer > 0 && (
                <div aria-hidden className="flex-shrink-0" style={{ width: `${edgeSpacer}px` }} />
              )}

              {slides.map((entry, index) => {
                const image = entry.gallery[0] ?? PlaceholderImage
                const isActive = index === currentIdx

                return (
                  <button
                    data-slide-item="true"
                    key={entry.event.id}
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
                    aria-label={`View event ${entry.event.title}`}
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
                    <span
                      className={`mt-3 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#13384E]/70 md:text-sm ${
                        isActive ? 'text-[#13384E]' : ''
                      }`}
                    >
                      {(entry.venue ?? entry.event.venue)
                        ? `VENUE: ${entry.venue ?? entry.event.venue}`
                        : 'VENUE: TBA'}
                    </span>
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
                aria-label="Next event"
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
                  container.scrollTo({
                    left: ratio * (container.scrollWidth - container.clientWidth),
                    behavior: 'smooth',
                  })

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
                  className="absolute top-1/2 -translate-y-1/2 touch-none rounded-full bg-[#13384E]"
                  style={{
                    width: `${thumbMetrics.width}px`,
                    left: `${thumbMetrics.left}px`,
                    height: '0.75rem',
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
