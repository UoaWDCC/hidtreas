import { NextResponse } from 'next/server'
import events from '@/data/events.json'

export async function GET() {
  return NextResponse.json(events)
}
