import { invitation } from '@/lib/invitation/config'
import { Folio } from './folio'
import { LineReveal, Rise } from './motion'

export function Letter() {
  const { copy } = invitation
  const [lead, ...rest] = copy.letterParagraphs

  return (
    <section aria-labelledby="letter-title" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-32">
      <Folio page="02" title={copy.letterKicker} />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <LineReveal
            id="letter-title"
            lines={copy.letterTitle}
            className="font-serif text-[13vw] display-tight text-balance sm:text-[10vw] lg:text-[6.6vw]"
            lineClassName={['', 'italic pl-[8vw] lg:pl-[6vw]']}
          />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Rise>
            <p className="font-serif text-2xl leading-snug text-pretty lg:text-[1.75rem]">{lead}</p>
          </Rise>
          {rest.map((p, i) => (
            <Rise key={p} delay={0.08 * (i + 1)}>
              <p className="max-w-prose text-base leading-relaxed text-pretty text-muted-foreground">{p}</p>
            </Rise>
          ))}
          <Rise delay={0.25}>
            <p className="font-serif text-xl italic text-primary">{copy.letterSignature}</p>
          </Rise>
        </div>
      </div>
    </section>
  )
}
