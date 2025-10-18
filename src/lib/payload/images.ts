import { fetchJSON } from './client'
import type { HomePageImage, AboutPageImage } from '@/payload-types'

type PaginatedResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export async function getHomePageImages(placement?: string) {
  let url = '/api/home-page-images?depth=2&sort=createdAt&limit=100'

  if (placement) {
    url += `&where[placement][equals]=${placement}`
  }

  const data = await fetchJSON<PaginatedResponse<HomePageImage>>(url)
  return data.docs
}

export async function getAboutPageImages(placement?: string) {
  let url = '/api/about-page-images?depth=2&sort=createdAt&limit=100'

  if (placement) {
    url += `&where[placement][equals]=${placement}`
  }

  const data = await fetchJSON<PaginatedResponse<AboutPageImage>>(url)
  return data.docs
}
