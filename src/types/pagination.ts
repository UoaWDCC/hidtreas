export type Paginated<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  pagingCounter?: number
  prevPage?: number | null
  nextPage?: number | null
}
