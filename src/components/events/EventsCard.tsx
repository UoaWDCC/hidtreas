import Image from 'next/image'
import { useState } from 'react'
import KiwiBird from '@/assets/kiwiBird.svg'
import type { EventType } from '@/types/event'

export default function EventsCard({
  event,
  onOpenModal,
}: {
  event: EventType
  onOpenModal: () => void
}) {
  const [isTitleExpanded, setIsTitleExpanded] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const MAX_TITLE_LENGTH = 40
  const MAX_DESCRIPTION_LENGTH = 120

  const titleNeedsTruncation = event.title.length > MAX_TITLE_LENGTH
  const descriptionNeedsTruncation = event.description.length > MAX_DESCRIPTION_LENGTH

  const truncatedTitle = `${event.title.slice(0, MAX_TITLE_LENGTH - 1).trimEnd()}…`
  const displayedTitle = isTitleExpanded || !titleNeedsTruncation ? event.title : truncatedTitle

  const truncatedDescription = `${event.description.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd()}…`
  const displayedDescription =
    isDescriptionExpanded || !descriptionNeedsTruncation ? event.description : truncatedDescription

  return (
    <div className="flex flex-col items-center w-70 min-h-[28rem] border-4 border-[#13384E] rounded-xl gap-y-3 px-4 pt-6 pb-6 bg-[#FFF8F3]">
      <div className="flex flex-col items-center gap-1">
        <Image src={KiwiBird} alt="kiwi-bird" width={36} />
        <h3 className="text-2xl text-center">
          {displayedTitle}
          {titleNeedsTruncation && (
            <button
              type="button"
              onClick={() => setIsTitleExpanded((prev) => !prev)}
              className={`inline-flex cursor-pointer ml-2 align-baseline text-xs uppercase tracking-wide ${
                isTitleExpanded ? 'text-[#13384E]' : 'text-[#13384E]/70'
              }`}
              aria-label={isTitleExpanded ? 'Show less title text' : 'Show full event title'}
            >
              {isTitleExpanded ? 'SHOW LESS' : 'SHOW MORE'}
            </button>
          )}
        </h3>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="relative flex justify-center items-center">
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={210}
            height={140}
            className="w-[210px] h-[140px] object-cover rounded-lg"
          />
          <p className="absolute text-xs rotate-270 origin-left -left-[8px] top-32 whitespace-nowrap">
            HOSTED BY: {event.hostedBy}
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#13384E]">
          VENUE: {event.venue ?? 'TBA'}
        </p>
        <p className="text-xs text-center">
          {displayedDescription}
          {descriptionNeedsTruncation && (
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              className={`inline-flex cursor-pointer ml-2 align-baseline text-xs uppercase tracking-wide ${
                isDescriptionExpanded ? 'text-[#13384E]' : 'text-[#13384E]/70'
              }`}
              aria-label={
                isDescriptionExpanded
                  ? 'Show less event description'
                  : 'Show full event description'
              }
            >
              {isDescriptionExpanded ? 'SHOW LESS' : 'SHOW MORE'}
            </button>
          )}
        </p>
        <button
          onClick={onOpenModal}
          className="font-bold border-2 rounded-md gap px-2 cursor-pointer"
        >
          READ EVENT RECAP HERE
        </button>
      </div>
    </div>
  )
}
