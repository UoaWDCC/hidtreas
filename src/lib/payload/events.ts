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

export async function getUpcomingEvents(): Promise<EventType[]> {
    const now = new Date().toISOString()
    const data = await fetchJSON<Paginated<Event>>(
      `/api/events?where[date][greater_than]=${encodeURIComponent(now)}&sort=date&limit=5&depth=2`
    )
    return data.docs.map(mapPayloadEvent)
}

export async function getPastEvents(): Promise<EventType[]> {
    const now = new Date().toISOString()
    const data = await fetchJSON<Paginated<Event>>(
      `/api/events?where[date][less_than]=${encodeURIComponent(now)}&sort=date&limit=0&depth=2`
    )
    return data.docs.map(mapPayloadEvent)
}
