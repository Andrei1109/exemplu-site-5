'use client'

import { ArrowRight, Loader2 } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { invitation } from '@/lib/invitation/config'
import { longDate } from '@/lib/invitation/format'
import {
  LIMITS,
  isDemoMode,
  submitRSVP,
  validateRSVP,
  type Attendance,
  type RSVPErrors,
  type RSVPPayload,
} from '@/lib/invitation/rsvp'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'saved' | 'demo' | 'error'

const FIELD_ORDER: (keyof RSVPErrors)[] = ['guestName', 'attendance', 'companions', 'dietaryNote', 'message']

const inputClass =
  'w-full border-0 border-b border-input bg-transparent px-0 py-3 text-lg text-foreground placeholder:text-muted-foreground/70 outline-none transition-[border-color,box-shadow] focus:border-foreground focus:shadow-[0_1px_0_0_var(--ink)] aria-[invalid=true]:border-primary'

const choiceClass =
  'relative flex cursor-pointer items-center justify-center border border-input px-4 py-4 text-base transition-colors hover:border-foreground has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary'

export function RSVPForm({ defaultName = '' }: { defaultName?: string }) {
  const uid = useId()
  const { rsvp, event } = invitation
  const demo = isDemoMode()

  const [guestName, setGuestName] = useState(defaultName)
  const [attendance, setAttendance] = useState<Attendance | ''>('')
  const [companions, setCompanions] = useState(0)
  const [dietary, setDietary] = useState<string[]>([])
  const [dietaryNote, setDietaryNote] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<RSVPErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')

  const pending = useRef(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  const done = status === 'saved' || status === 'demo'

  useEffect(() => {
    if (done) resultRef.current?.focus()
    if (status === 'error') errorRef.current?.focus()
  }, [done, status])

  const ids = {
    name: `${uid}-name`,
    attendance: `${uid}-attendance`,
    companions: `${uid}-companions`,
    dietaryNote: `${uid}-dietary-note`,
    message: `${uid}-message`,
  }
  const errId = (field: keyof RSVPErrors) => `${uid}-${field}-error`

  function clearError(field: keyof RSVPErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending.current) return

    const payload: RSVPPayload = {
      eventId: event.id,
      guestName,
      attendance: attendance as Attendance,
      companions,
      dietary,
      dietaryNote,
      message,
    }

    const found = validateRSVP(payload)
    setErrors(found)
    const first = FIELD_ORDER.find((f) => found[f])
    if (first) {
      const target =
        first === 'guestName'
          ? ids.name
          : first === 'attendance'
            ? `${ids.attendance}-yes`
            : first === 'companions'
              ? `${ids.companions}-0`
              : first === 'dietaryNote'
                ? ids.dietaryNote
                : ids.message
      document.getElementById(target)?.focus()
      return
    }

    pending.current = true
    setStatus('submitting')
    setSubmitError('')
    const result = await submitRSVP(payload)
    pending.current = false

    if (result.status === 'error') {
      setSubmitError(result.message)
      setStatus('error')
    } else {
      setStatus(result.status)
    }
  }

  if (done) {
    const attending = attendance === 'yes'
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col gap-6 border-t border-foreground pt-8 outline-none"
      >
        <p className="micro text-primary">{status === 'demo' ? 'Mod demonstrativ' : 'Răspuns primit'}</p>
        <p className="font-serif text-4xl leading-tight text-balance italic lg:text-5xl">
          {attending ? `Mulțumim, ${guestName.trim()}. Ne bucurăm nespus.` : `Mulțumim, ${guestName.trim()}. Ne veți lipsi.`}
        </p>
        <p className="max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">
          {status === 'demo'
            ? 'Formularul a fost completat corect. Această invitație rulează în mod demonstrativ, așa că răspunsul nu a fost salvat și nu a fost trimis nimănui.'
            : attending
              ? `Am notat ${companions === 0 ? 'prezența dumneavoastră' : `prezența dumneavoastră și ${companions === 1 ? 'a unui însoțitor' : `a ${companions} însoțitori`}`}. Ne vedem pe ${longDate(invitation.dates.weddingStartsAt)}.`
              : 'Am notat răspunsul dumneavoastră. Vă mulțumim că ne-ați anunțat.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="w-fit border-b border-foreground pb-1 text-base transition-opacity hover:opacity-70"
        >
          Modificați răspunsul
        </button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={submitting} className="flex flex-col gap-12">
      {demo ? (
        <div className="flex flex-col gap-1 border border-primary/40 p-4">
          <p className="micro text-primary">Mod demonstrativ</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Formularul poate fi testat, dar răspunsurile nu sunt salvate și nu sunt trimise.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-1">
        <label htmlFor={ids.name} className="micro">
          Nume și prenume
        </label>
        <input
          id={ids.name}
          name="guestName"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.nameMax}
          required
          value={guestName}
          onChange={(e) => {
            setGuestName(e.target.value)
            clearError('guestName')
          }}
          aria-invalid={Boolean(errors.guestName)}
          aria-describedby={errors.guestName ? errId('guestName') : undefined}
          className={cn(inputClass, 'font-serif text-2xl')}
          placeholder="Ex. Ioana Popescu"
        />
        <FieldError id={errId('guestName')} message={errors.guestName} />
      </div>

      <fieldset
        className="flex flex-col gap-3"
        aria-invalid={Boolean(errors.attendance)}
        aria-describedby={errors.attendance ? errId('attendance') : undefined}
      >
        <legend className="micro mb-3">Veți fi alături de noi?</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              { value: 'yes', label: 'Da, cu mare drag' },
              { value: 'no', label: 'Din păcate, nu pot' },
            ] as const
          ).map((opt) => (
            <label key={opt.value} className={cn(choiceClass, 'font-serif text-xl italic')}>
              <input
                id={`${ids.attendance}-${opt.value}`}
                type="radio"
                name="attendance"
                value={opt.value}
                checked={attendance === opt.value}
                onChange={() => {
                  setAttendance(opt.value)
                  clearError('attendance')
                }}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
        <FieldError id={errId('attendance')} message={errors.attendance} />
      </fieldset>

      {attendance === 'yes' ? (
        <>
          <fieldset
            className="flex flex-col gap-3"
            aria-describedby={`${ids.companions}-hint${errors.companions ? ` ${errId('companions')}` : ''}`}
          >
            <legend className="micro mb-3">Însoțitori</legend>
            <p id={`${ids.companions}-hint`} className="-mt-2 text-sm text-muted-foreground">
              Pe lângă dumneavoastră. Invitația este valabilă pentru cel mult {rsvp.maxCompanions}{' '}
              {rsvp.maxCompanions === 1 ? 'însoțitor' : 'însoțitori'}.
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: rsvp.maxCompanions + 1 }, (_, n) => (
                <label key={n} className={cn(choiceClass, 'size-14 p-0 font-serif text-2xl tabular-nums')}>
                  <input
                    id={`${ids.companions}-${n}`}
                    type="radio"
                    name="companions"
                    value={n}
                    checked={companions === n}
                    onChange={() => {
                      setCompanions(n)
                      clearError('companions')
                    }}
                    className="sr-only"
                  />
                  <span aria-hidden="true">{n}</span>
                  <span className="sr-only">
                    {n === 0 ? 'Fără însoțitori' : n === 1 ? 'Un însoțitor' : `${n} însoțitori`}
                  </span>
                </label>
              ))}
            </div>
            <FieldError id={errId('companions')} message={errors.companions} />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="micro mb-3">Preferințe alimentare (opțional)</legend>
            <div className="flex flex-wrap gap-2">
              {rsvp.dietaryOptions.map((opt) => (
                <label key={opt} className={cn(choiceClass, 'px-4 py-2.5 text-sm')}>
                  <input
                    type="checkbox"
                    name="dietary"
                    value={opt}
                    checked={dietary.includes(opt)}
                    onChange={(e) =>
                      setDietary((prev) => (e.target.checked ? [...prev, opt] : prev.filter((d) => d !== opt)))
                    }
                    className="sr-only"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <label htmlFor={ids.dietaryNote} className="text-sm text-muted-foreground">
                Detalii pentru bucătărie
              </label>
              <input
                id={ids.dietaryNote}
                name="dietaryNote"
                type="text"
                maxLength={LIMITS.dietaryNoteMax}
                value={dietaryNote}
                onChange={(e) => {
                  setDietaryNote(e.target.value)
                  clearError('dietaryNote')
                }}
                aria-invalid={Boolean(errors.dietaryNote)}
                aria-describedby={errors.dietaryNote ? errId('dietaryNote') : undefined}
                className={inputClass}
                placeholder="Ex. alergie la nuci"
              />
              <FieldError id={errId('dietaryNote')} message={errors.dietaryNote} />
            </div>
          </fieldset>
        </>
      ) : null}

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={ids.message} className="micro">
            Un gând pentru miri (opțional)
          </label>
          <span className="text-xs tabular-nums text-muted-foreground" aria-hidden="true">
            {message.length}/{LIMITS.messageMax}
          </span>
        </div>
        <textarea
          id={ids.message}
          name="message"
          rows={3}
          maxLength={LIMITS.messageMax}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            clearError('message')
          }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errId('message') : undefined}
          className={cn(inputClass, 'resize-none leading-relaxed')}
        />
        <FieldError id={errId('message')} message={errors.message} />
      </div>

      <div className="flex flex-col gap-4">
        {status === 'error' && submitError ? (
          <p ref={errorRef} tabIndex={-1} role="alert" className="text-base text-primary outline-none">
            {submitError}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="group flex w-full items-center justify-between gap-4 bg-primary px-6 py-5 text-left text-primary-foreground transition-[background-color,opacity] hover:bg-primary/90 disabled:cursor-wait disabled:opacity-80"
        >
          <span className="font-serif text-2xl italic">{submitting ? 'Se trimite…' : 'Trimiteți răspunsul'}</span>
          {submitting ? (
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
          ) : (
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
          )}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Folosim aceste informații doar pentru organizarea nunții.
        </p>
      </div>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1 text-sm text-primary">
      {message}
    </p>
  )
}
