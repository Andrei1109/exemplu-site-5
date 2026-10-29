import { invitation } from '@/lib/invitation/config'
import { DrawnRule } from './motion'

/** Running header, like the top of a magazine page. */
export function Folio({ page, title }: { page: string; title: string }) {
  const { couple } = invitation
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="micro">p. {page}</span>
        <span className="micro">{title}</span>
        <span className="micro hidden opacity-70 sm:inline">
          {couple.partnerOne} &amp; {couple.partnerTwo}
        </span>
      </div>
      <DrawnRule />
    </div>
  )
}
