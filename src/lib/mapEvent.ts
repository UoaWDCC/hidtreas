import PlaceholderImg from '@/assets/event-pic.png'
import type { Event } from '@/payload-types'
import { EventType } from '@/types/event'

/**
 * Maps a raw Payload CMS 'Event' document into the internal 'EventType'.
 *
 * @param e - Raw 'Event' object returned from Payload CMS API.
 * @returns Normalised 'EventType' for use in the frontend.
 */
export function mapPayloadEvent(e: Event): EventType {
  return {
    id: e.id,
    title: e.title,
    description: e.description ?? '',
    date: new Date(e.date),
    hostedBy: e.host?.join(', ') ?? 'Unknown host',
    imageUrl:
      typeof e.image === 'object' && e.image?.url
        ? e.image.url
        : PlaceholderImg,
  }
}
