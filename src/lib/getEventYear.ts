export function getEventYear(date: Date | string | number | null | undefined): number | null {
  if (date === null || date === undefined) return null

  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return null
  return d.getFullYear()
}

export default getEventYear
