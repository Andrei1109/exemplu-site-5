import { invitation } from '@/lib/invitation/config'
import { longDate } from '@/lib/invitation/format'
import { EditorialImage } from './editorial-image'
import { LineReveal, Rise } from './motion'

export function Closing() {
  const { copy, photos, couple, event, dates } = invitation

  return (
    <>
      <section aria-labelledby="closing-title" className="bg-ink px-5 py-20 text-paper sm:px-8 lg:px-10 lg:py-32">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 flex flex-col justify-between gap-10 lg:col-span-7">
            <LineReveal
              id="closing-title"
              lines={copy.closingTitle}
              className="font-serif text-[19vw] display-tight sm:text-[14vw] lg:text-[9vw]"
              lineClassName={['', 'italic pl-[12vw] lg:pl-[8vw]']}
            />
            <Rise>
              <p className="max-w-md font-serif text-2xl leading-snug text-pretty text-paper/85">{copy.closingText}</p>
            </Rise>
          </div>

          <figure className="col-span-9 col-start-4 flex flex-col gap-3 sm:col-span-6 sm:col-start-7 lg:col-span-4 lg:col-start-9">
            <EditorialImage
              photo={photos.closing}
              reveal="up"
              parallax={4}
              sizes="(min-width: 1024px) 30vw, 70vw"
              className="aspect-[3/4] w-full"
            />
            {photos.closing.caption ? (
              <figcaption className="micro text-paper/60">{photos.closing.caption}</figcaption>
            ) : null}
          </figure>
        </div>
      </section>

      <footer className="bg-ink px-5 pb-8 text-paper sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-paper/20 pt-6 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-1 sm:col-span-1">
            <span className="micro text-paper/60">Colofon</span>
            <span className="font-serif text-xl italic">
              {couple.partnerOne} &amp; {couple.partnerTwo}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="micro text-paper/60">Ediția</span>
            <span className="text-sm">
              {event.issue} · {event.season}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="micro text-paper/60">Data</span>
            <span className="text-sm">{longDate(dates.weddingStartsAt)}</span>
          </div>
          <div className="col-span-2 flex flex-col gap-1 sm:col-span-1 sm:text-right">
            <span className="micro text-paper/60">Publicat de</span>
            <span className="text-sm">Palfi Events</span>
          </div>
        </div>
      </footer>
    </>
  )
}
