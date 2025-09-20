import { fetchJSON } from './client'
import type { Event } from '@/payload-types'

type Paginated<T> = {
    docs: T[]
    totalDocs: number
    limit: number
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
}

export async function getUpcomingEvents() {
    const now = new Date().toISOString()

    return fetchJSON<Paginated<Event>>(
        `/api/events?where[date][greater_than]=${encodeURIComponent(now)}&sort=date&limit=5`
    )
}

export async function getPastEvents() {
    const now = new Date().toISOString()

    return fetchJSON<Paginated<Event>>(
        `/api/events?where[date][less_than]=${encodeURIComponent(now)}&sort=date&limit=0`
    )
}

