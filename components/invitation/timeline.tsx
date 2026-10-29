import { invitation } from '@/lib/invitation/config'
import { longDate } from '@/lib/invitation/format'
import { Folio } from './folio'
import { LineReveal, Rise } from './motion'

/** The day's schedule, typeset like a magazine table of contents. */
export function Timeline() {
  const { timeline, dates } = invitation

  return (
    <section aria-labelledby="timeline-title" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
      <Folio page="05" title="Programul zilei" />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <LineReveal
            id="timeline-title"
            lines={['Cuprins']}
            className="font-serif text-[20vw] display-tight sm:text-[12vw] lg:text-[6.4vw]"
          />
          <Rise>
            <p className="max-w-xs text-base leading-relaxed text-pretty text-muted-foreground">
              {longDate(dates.weddingStartsAt)}, de la primul „da” până după miezul nopții.
            </p>
          </Rise>
        </div>

        <ol className="flex flex-col lg:col-span-7 lg:col-start-6">
          {timeline.map((item, i) => (
            <li key={`${item.time}-${item.title}`} className="border-t border-border last:border-b">
              <Rise delay={i * 0.05} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 py-5 sm:grid-cols-[7rem_1fr_auto] lg:py-6">
                <span className="font-serif text-3xl tabular-nums lg:text-4xl">{item.time}</span>
                <span className="font-serif text-2xl leading-tight italic text-pretty lg:text-3xl">{item.title}</span>
                {item.description ? (
                  <span className="col-start-2 mt-1 text-sm leading-relaxed text-muted-foreground sm:col-start-3 sm:mt-0 sm:text-right">
                    {item.description}
                  </span>
                ) : null}
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
