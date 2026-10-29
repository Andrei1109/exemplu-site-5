'use client'

import Image from 'next/image'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import type { Photo } from '@/lib/invitation/config'
import { cn } from '@/lib/utils'
import { EASE } from './motion'

type EditorialImageProps = {
  photo: Photo
  className?: string
  sizes: string
  priority?: boolean
  /** Vertical parallax travel as a percentage of the frame height. */
  parallax?: number
  /** Reveal direction for the clip-path mask. */
  reveal?: 'up' | 'down' | 'left' | 'none'
  immediate?: boolean
  delay?: number
}

const HIDDEN_CLIP = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  none: 'inset(0% 0% 0% 0%)',
}

export function EditorialImage({
  photo,
  className,
  sizes,
  priority = false,
  parallax = 0,
  reveal = 'up',
  immediate = false,
  delay = 0,
}: EditorialImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const travel = reduce ? 0 : parallax
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`])

  // Observe the unclipped frame: a fully-inset clip-path on the observed node keeps it from ever intersecting.
  const inView = useInView(ref, { once: true, amount: 0.25 })

  const zoom = (photo.zoom ?? 1) + travel / 50
  const animated = !reduce && reveal !== 'none'
  const revealed = immediate || inView

  const hasImage = Boolean(photo.src) && !failed

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
    <motion.div
      className="absolute inset-0 overflow-hidden bg-mist"
      initial={animated ? { clipPath: HIDDEN_CLIP[reveal] } : false}
      animate={animated && revealed ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      transition={{ duration: 1.5, ease: EASE, delay }}
    >
      {hasImage ? (
        <motion.div className="absolute inset-0" style={{ y, scale: zoom }}>
          <Image
            src={photo.src as string}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setFailed(true)}
            className="object-cover grayscale"
            style={{ objectPosition: photo.position ?? '50% 50%' }}
          />
        </motion.div>
      ) : (
        <div
          role="img"
          aria-label={photo.alt}
          className="grain absolute inset-0 flex items-end bg-mist p-5 text-stone"
        >
          <span className="micro max-w-[18ch]">{photo.caption ?? 'Fotografie în curând'}</span>
        </div>
      )}
    </motion.div>
    </div>
  )
}
