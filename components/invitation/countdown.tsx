'use client'

import { useSyncExternalStore } from 'react'
import { invitation } from '@/lib/invitation/config'
import { longDate } from '@/lib/invitation/format'
import { DrawnRule } from './motion'

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 30_000)
  return () => window.clearInterval(id)
}

const minuteNow = () => Math.floor(Date.now() / 60_000) * 60_000
const serverNow = () => null

function plural(n: number, one: string, few: string, many: string) {
  if (n === 1) return one
  const rest = n % 100
  if (n === 0 || (rest >= 1 && rest <= 19)) return few
  return many
}

export function Countdown() {
  const now = useSyncExternalStore(subscribe, minuteNow, serverNow)
  const start = new Date(invitation.dates.weddingStartsAt).getTime()
  const end = new Date(invitation.dates.weddingEndsAt).getTime()
  const date = longDate(invitation.dates.weddingStartsAt)

  let content: React.ReactNode
  if (now === null) {
    content = <p className="font-serif text-3xl italic opacity-0">{date}</p>
  } else if (now >= end) {
    content = (
      <div className="flex flex-col gap-3">
        <p className="font-serif text-4xl leading-tight italic text-balance lg:text-6xl">
          Povestea a fost scrisă pe {date}.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground">
          Vă mulțumim tuturor celor care au fost alături de noi.
        </p>
      </div>
    )
  } else if (now >= start) {
    content = (
      <p className="font-serif text-5xl leading-tight italic lg:text-7xl">Astăzi spunem „da”.</p>
    )
  } else {
    const totalMinutes = Math.floor((start - now) / 60_000)
    const units = [
      { value: Math.floor(totalMinutes / 1440), label: ['zi', 'zile', 'de zile'] as const },
      { value: Math.floor((totalMinutes % 1440) / 60), label: ['oră', 'ore', 'de ore'] as const },
      { value: totalMinutes % 60, label: ['minut', 'minute', 'de minute'] as const },
    ]
    content = (
      <dl className="grid grid-cols-3">
        {units.map(({ value, label }, i) => (
          <div
            key={label[0]}
            className={`flex flex-col-reverse gap-2 ${i > 0 ? 'border-l border-border pl-4 lg:pl-8' : ''}`}
          >
            <dt className="micro text-muted-foreground">{plural(value, label[0], label[1], label[2])}</dt>
            <dd className="font-serif text-[15vw] leading-none tabular-nums tracking-tight sm:text-[11vw] lg:text-[8vw]">
              {String(value).padStart(2, '0')}
            </dd>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <section aria-label="Timp rămas până la nuntă" className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10">
        <p className="micro text-primary lg:col-span-3">Până la „da”</p>
        <div className="lg:col-span-9" aria-live="off">
          {content}
        </div>
      </div>
      <DrawnRule className="mt-12" />
    </section>
  )
}
