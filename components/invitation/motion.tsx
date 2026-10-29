'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const EASE = [0.22, 1, 0.36, 1] as const

type LineRevealProps = {
  lines: string[]
  as?: ElementType
  className?: string
  /** A single class for every line, or one entry per line (must be serializable from Server Components). */
  lineClassName?: string | readonly string[]
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
}

export function LineReveal({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  immediate = false,
  id,
}: LineRevealProps & { id?: string }) {
  const reduce = useReducedMotion()
  // Observe the static heading, not the lines: each line starts translated out of its clipping mask and would never intersect.
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const revealed = immediate || inView

  return (
    <Tag ref={ref} id={id} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => {
        const transition = { duration: 1.1, ease: EASE, delay: delay + i * stagger }
        return (
          <span
            key={`${line}-${i}`}
            aria-hidden="true"
            className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
          >
            <motion.span
              className={cn(
                'block',
                typeof lineClassName === 'string' ? lineClassName : lineClassName?.[i],
              )}
              initial={reduce ? false : { y: '110%' }}
              animate={revealed ? { y: '0%' } : undefined}
              transition={transition}
            >
              {line}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

type RiseProps = {
  children: ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}

/** A short, low-amplitude rise for supporting copy. Used sparingly. */
export function Rise({ children, className, delay = 0, immediate = false }: RiseProps) {
  const reduce = useReducedMotion()
  const target = { opacity: 1, y: 0 }
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, amount: 0.4 } })}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

type RuleProps = { className?: string; delay?: number; immediate?: boolean }

/** A fine typographic rule that draws from left to right. */
export function DrawnRule({ className, delay = 0, immediate = false }: RuleProps) {
  const reduce = useReducedMotion()
  // A scaleX(0) node has no area to intersect, so observe a full-width track instead.
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} aria-hidden="true" className={cn('h-px', className)}>
      <motion.div
        className="h-px origin-left bg-current opacity-25"
        initial={reduce ? false : { scaleX: 0 }}
        animate={immediate || inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.4, ease: EASE, delay }}
      />
    </div>
  )
}
