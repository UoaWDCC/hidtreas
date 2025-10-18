import {fetchJSON} from './client'
import type {Member} from '@/payload-types'
import type {Paginated} from "@/types/pagination";


export async function getMembers() {
  const data = await fetchJSON<Paginated<Member>>('/api/members?depth=2&sort=createdAt&limit=100')
  return data.docs
}
