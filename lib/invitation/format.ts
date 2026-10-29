import { invitation, type Venue } from './config'

const timeZone = invitation.event.timeZone
const ROMAN_MONTHS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

function part(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('ro-RO', { timeZone, ...options }).format(new Date(iso))
}

export function dateParts(iso: string) {
  const monthIndex = Number(part(iso, { month: 'numeric' })) - 1
  return {
    day: part(iso, { day: 'numeric' }),
    dayPadded: part(iso, { day: '2-digit' }),
    month: part(iso, { month: 'long' }),
    monthRoman: ROMAN_MONTHS[monthIndex],
    monthPadded: part(iso, { month: '2-digit' }),
    year: part(iso, { year: 'numeric' }),
    weekday: part(iso, { weekday: 'long' }),
    time: part(iso, { hour: '2-digit', minute: '2-digit', hour12: false }),
  }
}

export function longDate(iso: string) {
  const d = dateParts(iso)
  return `${d.day} ${d.month} ${d.year}`
}

export function mapsUrlFor(venue: Venue) {
  if (venue.mapsUrl) return venue.mapsUrl
  const query = [venue.name, venue.address].filter(Boolean).join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
