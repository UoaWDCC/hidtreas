'use client'

import { useEffect, useState } from 'react'
import { getUpcomingEvents } from '@/lib/payload/events'
import type { Event } from '@/payload-types'

export default function EventsTest() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("useEffect called!")
    const fetchEvents = async () => {
      try {
        console.log("fetching")
        const upcoming = await getUpcomingEvents(3)
        console.log(upcoming)
        setUpcomingEvents(upcoming.docs || [])
      } catch (err) {
        setError('Failed to load events')
        console.error(err)
        setUpcomingEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (isLoading) return <div className="p-4">Loading events...</div>

  if (error) return <div className="p-4 text-red-500">{error}</div>

  if (!upcomingEvents) return <div className="p-4">No events data available</div>

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Events Test Component</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Upcoming Events ({upcomingEvents.length})</h3>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          <ul className="space-y-2">
            {upcomingEvents.map(event => (
              <li key={event.id} className="bg-white p-3 rounded shadow">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(event.date || '').toLocaleDateString()}
                </p>
                <p className="text-sm">{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}