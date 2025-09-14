import { NextResponse } from 'next/server'
import upcomingEvents from '@/data/upcomingEvents.json'

export async function GET() {
  return NextResponse.json(upcomingEvents)
}
