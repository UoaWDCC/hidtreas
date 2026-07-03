'use server'

import { getPayload } from '@/lib/payload/getPayload'

type Result =
  | { success: true }
  | { success: false; code: 'DUPLICATE' | 'NO_CONSENT' | 'INVALID' | 'DB' | 'ERROR' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Duplicate-key from Mongo (E11000) or a Payload ValidationError on a unique
// field. The public ValidationError `.message` is generic ("field is invalid"),
// so the substring lives in `.data` — never match on `.message` alone.
function isDuplicate(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const e = error as { code?: number; name?: string; data?: unknown; message?: unknown }
  if (e.code === 11000) return true
  if (e.name === 'ValidationError' && Array.isArray(e.data)) {
    return (e.data as Array<{ message?: unknown }>).some((d) =>
      /unique|already|exist/i.test(String(d?.message ?? '')),
    )
  }
  return /duplicate|e11000|must be unique/i.test(String(e.message ?? ''))
}

export async function createSubscriberAction(input: {
  firstName: string
  lastName: string
  email: string
  agreed: boolean
  company?: string // honeypot — bots fill it, humans leave it empty
}): Promise<Result> {
  if (input.company) return { success: true } // honeypot tripped: pretend success, insert nothing
  if (!input.agreed) return { success: false, code: 'NO_CONSENT' }
  if (!EMAIL_RE.test(input.email) || !input.firstName || !input.lastName)
    return { success: false, code: 'INVALID' }

  const payload = await getPayload()
  if (!payload) return { success: false, code: 'DB' }

  try {
    await payload.create({
      collection: 'subscribers',
      data: { firstName: input.firstName, lastName: input.lastName, email: input.email },
    })
    return { success: true }
  } catch (error) {
    if (isDuplicate(error)) return { success: false, code: 'DUPLICATE' }
    console.error('Error creating subscriber:', error)
    return { success: false, code: 'ERROR' }
  }
}

export async function createEventSubscriberAction(input: {
  eventId: string
  email: string
  firstName: string
  lastName: string
  agreed: boolean
  company?: string // honeypot
}): Promise<Result> {
  if (input.company) return { success: true }
  if (!input.agreed) return { success: false, code: 'NO_CONSENT' }
  if (!EMAIL_RE.test(input.email) || !input.firstName || !input.lastName || !input.eventId)
    return { success: false, code: 'INVALID' }

  const payload = await getPayload()
  if (!payload) return { success: false, code: 'DB' }

  try {
    await payload.create({
      collection: 'event-subscribers',
      data: {
        event: input.eventId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
      },
    })
    return { success: true }
  } catch (error) {
    if (isDuplicate(error)) return { success: false, code: 'DUPLICATE' }
    console.error('Error creating event subscriber:', error)
    return { success: false, code: 'ERROR' }
  }
}
