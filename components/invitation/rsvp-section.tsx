import { invitation } from '@/lib/invitation/config'
import { longDate } from '@/lib/invitation/format'
import { Folio } from './folio'
import { LineReveal, Rise } from './motion'
import { RSVPForm } from './rsvp-form'

export function RSVPSection({ guestName }: { guestName?: string }) {
  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
      <Folio page="06" title="Răspuns" />

      <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col gap-8 lg:sticky lg:top-10 lg:col-span-5 lg:self-start">
          <LineReveal
            id="rsvp-title"
            lines={['Răspundeți,', 'vă rugăm']}
            className="font-serif text-[15vw] display-tight sm:text-[10vw] lg:text-[6vw]"
            lineClassName={['', 'italic']}
          />
          <Rise className="flex flex-col gap-2 border-l border-primary pl-4">
            <span className="micro text-muted-foreground">Termen</span>
            <span className="font-serif text-2xl italic">{longDate(invitation.dates.rsvpDeadline)}</span>
          </Rise>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <RSVPForm defaultName={guestName} />
        </div>
      </div>
    </section>
  )
}
