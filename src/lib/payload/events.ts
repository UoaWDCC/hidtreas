import { mapPayloadEvent } from '@/lib/mapEvent'
import { EventType } from '@/types/event'
import type { Event } from '@/payload-types'
import {fetchJSON} from "@/lib/payload/client";

type Paginated<T> = {
    docs: T[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

/**
 * Fetch upcoming events (future-dated).
 *
 * @param limit - Maximum number of events to fetch. Defaults to 5
 *  Events are sorted ascending by date
 */
export async function getUpcomingEvents(limit: number = 5): Promise<EventType[]> {
    const now = new Date().toISOString()
    const data = await fetchJSON<Paginated<Event>>(
      `/api/events?where[date][greater_than]=${encodeURIComponent(now)}&sort=date&limit=${limit}&depth=2`
    )
    return data.docs.map(mapPayloadEvent)
}

/**
 * Fetch past events
 *
 * @param limit - Maximum number of events to fetch.
 *  Defaults to 0 (meaning all past events)
 *  Pass a positive number to restrict to the N most recent events.
 *  Events are sorted descending by date
 */
export async function getPastEvents(limit: number = 0): Promise<EventType[]> {
    const now = new Date().toISOString()
    const data = await fetchJSON<Paginated<Event>>(
      `/api/events?where[date][less_than]=${encodeURIComponent(now)}&sort=-date&limit=${limit}&depth=2`
    )
    return data.docs.map(mapPayloadEvent)
}
