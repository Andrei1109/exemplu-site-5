'use client'

import { invitation } from '@/lib/invitation/config'
import { dateParts, longDate } from '@/lib/invitation/format'
import { EditorialImage } from './editorial-image'
import { DrawnRule, LineReveal, Rise } from './motion'

export function Cover({ guestName }: { guestName?: string }) {
  const { couple, event, copy, photos, dates, venues } = invitation
  const d = dateParts(dates.weddingStartsAt)

  return (
    <header className="relative flex min-h-svh flex-col overflow-hidden px-5 pt-4 pb-6 sm:px-8 lg:h-svh lg:min-h-[760px] lg:px-10 lg:pt-6 lg:pb-8">
      <h1 className="sr-only">
        {couple.partnerOne} și {couple.partnerTwo} se căsătoresc pe {longDate(dates.weddingStartsAt)}
      </h1>

      <Rise immediate className="flex items-center justify-between gap-4">
        <span className="micro">{event.issue}</span>
        <span className="micro text-primary">{copy.coverLabel}</span>
        <span className="micro">{event.season}</span>
      </Rise>
      <DrawnRule immediate delay={0.1} className="mt-3" />

      <div className="relative mt-5 min-h-[500px] flex-1 lg:mt-8">
        <EditorialImage
          photo={photos.hero}
          priority
          immediate
          reveal="down"
          parallax={5}
          delay={0.15}
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 60vw, 78vw"
          className="absolute top-[7%] right-0 bottom-[12%] w-[76%] sm:w-[60%] lg:top-0 lg:bottom-0 lg:left-[37%] lg:w-[27%]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 font-serif text-paper mix-blend-difference"
        >
          <LineReveal
            as="span"
            immediate
            delay={0.45}
            lines={[couple.partnerOne]}
            className="absolute top-0 left-0 text-[19.5vw] font-medium display-tight sm:text-[17vw] lg:top-[7%] lg:left-[2%] lg:text-[12.2vw]"
          />
          <LineReveal
            as="span"
            immediate
            delay={0.6}
            lines={[couple.partnerTwo]}
            className="absolute right-0 bottom-0 text-[26vw] italic display-tight sm:text-[22vw] lg:right-auto lg:bottom-[4%] lg:left-[48%] lg:text-[12.2vw]"
          />
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-[15%] left-0 font-serif text-[18vw] italic leading-none text-primary sm:text-[14vw] lg:bottom-[6%] lg:left-[27%] lg:text-[8vw]"
        >
          &amp;
        </span>

        <Rise
          immediate
          delay={1.1}
          className="absolute top-[38%] right-0 hidden w-[22%] flex-col gap-4 text-right lg:flex"
        >
          {copy.coverLines.map((line) => (
            <p key={line} className="font-serif text-xl leading-snug text-pretty italic">
              {line}
            </p>
          ))}
        </Rise>
      </div>

      <DrawnRule immediate delay={0.9} className="mt-6 lg:mt-8" />
      <Rise
        immediate
        delay={1}
        className="mt-4 grid grid-cols-[auto_1fr] items-end gap-x-5 gap-y-5 sm:grid-cols-[auto_1fr_auto] lg:gap-x-10"
      >
        <div className="flex items-end gap-3">
          <span className="font-serif text-7xl leading-[0.8] tracking-tight lg:text-8xl">{d.dayPadded}</span>
          <div className="flex flex-col gap-1 border-l border-border pl-3">
            <span className="font-serif text-2xl leading-none italic capitalize">{d.month}</span>
            <span className="micro text-muted-foreground">
              {d.year} · {d.weekday}
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-1 justify-self-end text-right sm:justify-self-start sm:text-left">
          {venues.map((venue) => (
            <li key={venue.id} className="micro">
              <span className="text-muted-foreground">{venue.title}</span>{' '}
              <span>{dateParts(venue.startsAt).time}</span>
            </li>
          ))}
        </ul>

        <div className="col-span-2 flex flex-col gap-1 border-t border-border pt-3 sm:col-span-1 sm:border-t-0 sm:pt-0 sm:text-right">
          <span className="micro text-muted-foreground">
            {guestName ? 'Invitație personală pentru' : 'Răspuns până la'}
          </span>
          <span className="font-serif text-xl leading-tight italic text-pretty">
            {guestName ?? longDate(dates.rsvpDeadline)}
          </span>
        </div>
      </Rise>
    </header>
  )
}
