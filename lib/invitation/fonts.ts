import { Bodoni_Moda, DM_Sans, Playfair_Display, Inter_Tight } from 'next/font/google'

const bodoni = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-text',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-text',
  display: 'swap',
})

export const displayFonts = { bodoni, playfair }
export const textFonts = { dmSans, interTight }

export type DisplayFontKey = keyof typeof displayFonts
export type TextFontKey = keyof typeof textFonts
