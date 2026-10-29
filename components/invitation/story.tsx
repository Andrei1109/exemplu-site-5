import { invitation } from '@/lib/invitation/config'
import { EditorialImage } from './editorial-image'
import { Folio } from './folio'
import { LineReveal, Rise } from './motion'

export function Story() {
  const { story } = invitation

  return (
    <section aria-labelledby="story-title" className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
      <Folio page="03" title={story.kicker} />

      <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-12 lg:mt-24 lg:gap-x-10">
        <div className="col-span-10 col-start-2 sm:col-span-6 sm:col-start-1 lg:col-span-4 lg:col-start-2">
          <EditorialImage
            photo={story.photo}
            reveal="up"
            parallax={4}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw"
            className="aspect-[4/5] w-full"
          />
          {story.photo.caption ? (
            <p className="micro mt-3 text-muted-foreground">{story.photo.caption}</p>
          ) : null}
        </div>

        <div className="col-span-12 flex flex-col gap-10 sm:col-span-6 lg:col-span-6 lg:col-start-7">
          <LineReveal
            id="story-title"
            lines={story.title}
            className="font-serif text-[18vw] display-tight sm:text-[10vw] lg:text-[8vw]"
            lineClassName={['', 'italic']}
          />

          <Rise>
            <blockquote className="border-t border-border pt-6">
              <p className="font-serif text-3xl leading-tight text-pretty italic lg:text-4xl">
                <span className="text-primary">„</span>
                {story.quote}
                <span className="text-primary">”</span>
              </p>
            </blockquote>
          </Rise>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {story.paragraphs.map((p, i) => (
              <Rise key={p} delay={0.08 * i}>
                <p className="text-base leading-relaxed text-pretty text-muted-foreground">{p}</p>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
