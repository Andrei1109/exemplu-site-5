'use client'

import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { invitation } from '@/lib/invitation/config'

/** Music never starts on its own; guests must press play. Hidden when no track is configured. */
export function AudioControl() {
  const { audio, features } = invitation
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  if (!features.audio || !audio.src || unavailable) return null

  async function toggle() {
    const el = ref.current
    if (!el) return
    if (el.paused) {
      try {
        await el.play()
      } catch {
        setUnavailable(true)
      }
    } else {
      el.pause()
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 lg:right-8 lg:bottom-8">
      <audio
        ref={ref}
        src={audio.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setUnavailable(true)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="flex items-center gap-3 border border-foreground/30 bg-background/90 px-4 py-3 backdrop-blur transition-colors hover:border-foreground"
      >
        {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
        <span className="micro">{playing ? 'Oprește muzica' : 'Pornește muzica'}</span>
        <span className="sr-only">: {audio.title}</span>
      </button>
    </div>
  )
}
