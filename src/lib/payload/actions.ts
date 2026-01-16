'use server'

import { getPayload } from '@/lib/payload/getPayload'

/**
 * Server action to create a new subscriber
 * This runs on the server so it can use the Payload Local API
 */
export async function createSubscriberAction(firstName: string, lastName: string, email: string) {
  const payload = await getPayload()

  try {
    const subscriber = await payload.create({
      collection: 'subscribers',
      data: { firstName, lastName, email },
    })
    return { success: true, data: subscriber }
  } catch (error) {
    console.error('Error creating subscriber:', error)
    return { success: false, error: 'Failed to create subscriber' }
  }
}

/**
 * Server action to create a new event subscriber
 * This runs on the server so it can use the Payload Local API
 */
export async function createEventSubscriberAction(
  eventId: string,
  email: string,
  firstName: string,
  lastName: string,
) {
  const payload = await getPayload()

  try {
    const subscriber = await payload.create({
      collection: 'event-subscribers',
      data: { event: eventId, email, firstName, lastName },
    })
    return { success: true, data: subscriber }
  } catch (error) {
    console.error('Error creating event subscriber:', error)
    return { success: false, error: 'Failed to subscribe to event' }
  }
}
