import { fetchJSON } from './client';
import type { Event } from '@/payload-types';

type Paginated<T> = {
    docs: T[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export async function getEvents(opts: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 10 } = opts;
    return fetchJSON<Paginated<Event>>(
        `/api/events?where[published][equals]=true&depth=2&sort=-date&page=${page}&limit=${limit}`
    );
}

export async function getEventById(id: string) {
    return fetchJSON<Event>(`/api/events/${id}?depth=2`);
}

export async function getUpcomingEvents(limit: number = 6) {
    const now = new Date().toISOString();
    return fetchJSON<Paginated<Event>>(
        `/api/events?where[published][equals]=true&where[date][greater_than]=${now}&depth=2&sort=date&limit=${limit}`
    );
}

// export async function getPastEvents(limit: number = 6) {
//     const now = new Date().toISOString();
//     return fetchJSON<Paginated<Event>>(
//         `/api/events?where[published][equals]=true&where[date][less_than]=${now}&depth=2&sort=-date&limit=${limit}`
//     );
// }