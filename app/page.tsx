import { AudioControl } from '@/components/invitation/audio-control'
import { Closing } from '@/components/invitation/closing'
import { Countdown } from '@/components/invitation/countdown'
import { Cover } from '@/components/invitation/cover'
import { Letter } from '@/components/invitation/letter'
import { RSVPSection } from '@/components/invitation/rsvp-section'
import { Spread } from '@/components/invitation/spread'
import { Story } from '@/components/invitation/story'
import { Timeline } from '@/components/invitation/timeline'
import { Venues } from '@/components/invitation/venues'
import { invitation } from '@/lib/invitation/config'

function readGuestName(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  const name = raw?.replace(/\s+/g, ' ').trim().slice(0, 80)
  return name || undefined
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const guestName = readGuestName(params.invitat)
  const { features } = invitation

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <Cover guestName={guestName} />
      <Letter />
      {features.story ? <Story /> : null}
      {features.spread ? <Spread /> : null}
      <Venues />
      {features.timeline ? <Timeline /> : null}
      {features.countdown ? <Countdown /> : null}
      {features.rsvp ? <RSVPSection guestName={guestName} /> : null}
      <Closing />
      <AudioControl />
    </main>
  )
}
