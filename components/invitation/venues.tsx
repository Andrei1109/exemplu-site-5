import { ArrowUpRight } from 'lucide-react'
import { invitation } from '@/lib/invitation/config'
import { dateParts, mapsUrlFor } from '@/lib/invitation/format'
import { cn } from '@/lib/utils'
import { Folio } from './folio'
import { LineReveal, Rise } from './motion'

export function Venues() {
  const { venues } = invitation

  return (
    <section
      aria-labelledby="venues-title"
      className="bg-ink px-5 py-20 text-paper sm:px-8 lg:px-10 lg:py-32"
    >
      <Folio page="04" title="Locații" />

      <LineReveal
        id="venues-title"
        lines={['Unde', '& când']}
        className="mt-14 font-serif text-[18vw] display-tight sm:text-[12vw] lg:mt-24 lg:text-[7vw]"
        lineClassName={['', 'italic pl-[10vw] lg:pl-[5vw]']}
      />

      <ol className="mt-16 flex flex-col lg:mt-24">
        {venues.map((venue, index) => {
          const time = dateParts(venue.startsAt).time
          const flipped = index % 2 === 1
          return (
            <li
              key={venue.id}
              className="grid grid-cols-1 gap-6 border-t border-paper/20 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-16"
            >
              <LineReveal
                as="p"
                lines={[String(index + 1).padStart(2, '0')]}
                className={cn(
                  'font-serif text-[38vw] leading-[0.78] tracking-tighter text-paper/90 lg:text-[15vw]',
                  flipped ? 'lg:order-2 lg:col-span-5 lg:col-start-8 lg:text-right' : 'lg:col-span-5',
                )}
              />

              <Rise
                className={cn(
                  'flex flex-col gap-6 lg:self-end',
                  flipped ? 'lg:order-1 lg:col-span-5 lg:col-start-2' : 'lg:col-span-5 lg:col-start-7',
                )}
              >
                <div className="flex items-baseline justify-between gap-4 border-b border-paper/20 pb-3">
                  <span className="micro text-paper/70">{venue.kind}</span>
                  <span className="font-serif text-4xl tabular-nums lg:text-5xl">{time}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-4xl italic lg:text-5xl">{venue.title}</h3>
                  <p className="text-xl leading-snug font-medium text-pretty lg:text-2xl">{venue.name}</p>
                  {venue.address ? (
                    <p className="text-base leading-relaxed text-paper/70">{venue.address}</p>
                  ) : null}
                </div>

                {venue.note ? (
                  <p className="max-w-md text-base leading-relaxed text-pretty text-paper/70">{venue.note}</p>
                ) : null}

                <a
                  href={mapsUrlFor(venue)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2 border-b border-paper/50 pb-1 text-base transition-colors hover:border-paper focus-visible:outline-paper"
                >
                  Indicații către {venue.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="sr-only">(se deschide într-o filă nouă)</span>
                </a>
              </Rise>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
