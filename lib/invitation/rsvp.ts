import { invitation } from './config'

export type Attendance = 'yes' | 'no'

export type RSVPPayload = {
  eventId: string
  guestName: string
  attendance: Attendance
  companions: number
  dietary: string[]
  dietaryNote: string
  message: string
}

export type RSVPErrors = Partial<Record<'guestName' | 'attendance' | 'companions' | 'dietaryNote' | 'message', string>>

export type RSVPResult =
  | { status: 'saved' }
  | { status: 'demo' }
  | { status: 'error'; message: string }

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  dietaryNoteMax: 200,
  messageMax: 500,
}

export function isDemoMode() {
  return !invitation.rsvp.endpoint
}

export function validateRSVP(payload: RSVPPayload): RSVPErrors {
  const errors: RSVPErrors = {}
  const name = payload.guestName.trim()

  if (name.length < LIMITS.nameMin) {
    errors.guestName = 'Vă rugăm să ne spuneți numele dumneavoastră.'
  } else if (name.length > LIMITS.nameMax) {
    errors.guestName = `Numele poate avea cel mult ${LIMITS.nameMax} de caractere.`
  }

  if (payload.attendance !== 'yes' && payload.attendance !== 'no') {
    errors.attendance = 'Alegeți dacă veți fi alături de noi.'
  }

  const max = invitation.rsvp.maxCompanions
  if (
    payload.attendance === 'yes' &&
    (!Number.isInteger(payload.companions) || payload.companions < 0 || payload.companions > max)
  ) {
    errors.companions = `Puteți veni cu cel mult ${max} însoțitori.`
  }

  if (payload.dietaryNote.length > LIMITS.dietaryNoteMax) {
    errors.dietaryNote = `Folosiți cel mult ${LIMITS.dietaryNoteMax} de caractere.`
  }

  if (payload.message.length > LIMITS.messageMax) {
    errors.message = `Mesajul poate avea cel mult ${LIMITS.messageMax} de caractere.`
  }

  return errors
}

/**
 * Single integration point for Palfi Events. Without a configured endpoint it
 * resolves to `demo` and nothing leaves the browser.
 */
export async function submitRSVP(payload: RSVPPayload): Promise<RSVPResult> {
  const endpoint = invitation.rsvp.endpoint

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return { status: 'demo' }
  }

  const normalized: RSVPPayload = {
    ...payload,
    guestName: payload.guestName.trim(),
    companions: payload.attendance === 'yes' ? payload.companions : 0,
    dietary: payload.attendance === 'yes' ? payload.dietary : [],
    dietaryNote: payload.attendance === 'yes' ? payload.dietaryNote.trim() : '',
    message: payload.message.trim(),
  }

  try {
    const response = await fetch(endpoint.replace('{eventId}', encodeURIComponent(payload.eventId)), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized),
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: 'Răspunsul nu a putut fi trimis. Vă rugăm să încercați din nou în câteva momente.',
      }
    }

    return { status: 'saved' }
  } catch {
    return {
      status: 'error',
      message: 'Nu ne-am putut conecta. Verificați conexiunea la internet și încercați din nou.',
    }
  }
}
