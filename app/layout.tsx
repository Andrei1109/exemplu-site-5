import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { invitation } from '@/lib/invitation/config'
import { displayFonts, textFonts } from '@/lib/invitation/fonts'
import './globals.css'

const displayFont = displayFonts[invitation.theme.fonts.display]
const textFont = textFonts[invitation.theme.fonts.text]

const palette = {
  '--paper': invitation.theme.colors.paper,
  '--ink': invitation.theme.colors.ink,
  '--accent-ink': invitation.theme.colors.accent,
  '--stone': invitation.theme.colors.stone,
  '--mist': invitation.theme.colors.mist,
} as React.CSSProperties

export const metadata: Metadata = {
  title: invitation.meta.title,
  description: invitation.meta.description,
  generator: 'v0.app',
  robots: { index: false, follow: false },
  openGraph: {
    title: invitation.meta.title,
    description: invitation.meta.description,
    images: invitation.photos.hero.src ? [invitation.photos.hero.src] : undefined,
    locale: 'ro_RO',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: invitation.theme.colors.paper,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ro"
      style={palette}
      className={`${displayFont.variable} ${textFont.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
