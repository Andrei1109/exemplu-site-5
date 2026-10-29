import { invitation } from '@/lib/invitation/config'
import { EditorialImage } from './editorial-image'

export function Spread() {
  const { photos, couple, event } = invitation
  return (
    <figure className="flex flex-col gap-3">
      <EditorialImage
        photo={photos.spread}
        reveal="left"
        parallax={8}
        sizes="100vw"
        className="h-[62svh] w-full sm:h-[78svh] lg:h-[92svh]"
      />
      <figcaption className="flex items-baseline justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <span className="micro text-muted-foreground">{photos.spread.caption}</span>
        <span className="micro hidden text-muted-foreground sm:inline">
          {couple.partnerOne} &amp; {couple.partnerTwo}, {event.season}
        </span>
      </figcaption>
    </figure>
  )
}
