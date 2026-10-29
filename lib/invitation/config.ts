import type { DisplayFontKey, TextFontKey } from './fonts'

export type Photo = {
  /** Path in /public or absolute URL. `null` renders an editorial placeholder panel. */
  src: string | null
  alt: string
  caption?: string
  /** CSS object-position and zoom used to art-direct the crop. */
  position?: string
  zoom?: number
}

export type Venue = {
  id: string
  kind: string
  title: string
  name: string
  /** ISO 8601 with offset. */
  startsAt: string
  /** Leave undefined unless the address has been verified with the couple. */
  address?: string
  /** Explicit maps link. When missing, a Google Maps search for name + address is generated. */
  mapsUrl?: string
  note?: string
}

export type TimelineItem = {
  time: string
  title: string
  description?: string
}

export type InvitationConfig = {
  event: {
    /** Unique Palfi Events identifier, sent with every RSVP. */
    id: string
    slug: string
    issue: string
    season: string
    timeZone: string
  }
  couple: {
    partnerOne: string
    partnerTwo: string
  }
  dates: {
    /** ISO 8601 with offset — the start of the ceremony. */
    weddingStartsAt: string
    /** ISO 8601 with offset — the moment after which the day is considered over. */
    weddingEndsAt: string
    rsvpDeadline: string
  }
  copy: {
    coverLabel: string
    coverLines: string[]
    letterKicker: string
    letterTitle: string[]
    letterParagraphs: string[]
    letterSignature: string
    closingTitle: string[]
    closingText: string
  }
  story: {
    kicker: string
    title: string[]
    quote: string
    paragraphs: string[]
    photo: Photo
  }
  photos: {
    hero: Photo
    spread: Photo
    closing: Photo
  }
  venues: Venue[]
  timeline: TimelineItem[]
  rsvp: {
    /**
     * Palfi Events RSVP endpoint. `{eventId}` is replaced with `event.id`.
     * When null, the form runs in an explicitly labelled demo mode.
     */
    endpoint: string | null
    maxCompanions: number
    dietaryOptions: string[]
  }
  audio: {
    src: string | null
    title: string
    artist?: string
  }
  features: {
    countdown: boolean
    story: boolean
    spread: boolean
    timeline: boolean
    rsvp: boolean
    audio: boolean
  }
  theme: {
    colors: {
      paper: string
      ink: string
      accent: string
      stone: string
      mist: string
    }
    fonts: {
      display: DisplayFontKey
      text: TextFontKey
    }
  }
  meta: {
    title: string
    description: string
  }
}

export const invitation: InvitationConfig = {
  event: {
    id: 'evt_demo_alexandra-matei-2027',
    slug: 'alexandra-si-matei',
    issue: 'Nr. 06',
    season: 'Vara 2027',
    timeZone: 'Europe/Bucharest',
  },
  couple: {
    partnerOne: 'Alexandra',
    partnerTwo: 'Matei',
  },
  dates: {
    weddingStartsAt: '2027-06-12T15:00:00+03:00',
    weddingEndsAt: '2027-06-13T04:00:00+03:00',
    rsvpDeadline: '2027-05-15T23:59:00+03:00',
  },
  copy: {
    coverLabel: 'O poveste în doi',
    coverLines: [
      'Cununia religioasă — Biserica Sfântul Nicolae',
      'Recepția — The Garden Estate',
    ],
    letterKicker: 'Cuvânt înainte',
    letterTitle: ['Vă invităm', 'să fiți martorii', 'începutului nostru.'],
    letterParagraphs: [
      'Există zile care se scriu singure și zile pe care le scriem împreună. Pe 12 iunie 2027, ne spunem „da” în fața celor dragi și am vrea ca această pagină să vă poarte și numele.',
      'Vă invităm să ne fiți alături la cununia religioasă și apoi la o seară lungă de vară, cu mese întinse, muzică și oameni care ne-au format, fiecare în felul lui.',
      'Nu vă cerem decât prezența. Restul — emoția, dansul și poveștile spuse până târziu — îl vom împărți împreună.',
    ],
    letterSignature: 'Cu drag, Alexandra & Matei',
    closingTitle: ['Ne vedem', 'în iunie.'],
    closingText:
      'Vă mulțumim că faceți parte din povestea noastră. Fără voi, ziua aceasta ar fi doar o dată în calendar.',
  },
  story: {
    kicker: 'Interviu',
    title: ['Cum', 'a început'],
    quote: 'Ne-am cunoscut într-o zi obișnuită. Tot ce a urmat a fost orice, numai obișnuit nu.',
    paragraphs: [
      'Șapte ani, două orașe și nenumărate drumuri de noapte mai târziu, am înțeles că acasă nu e un loc, ci un om.',
      'Am ales o zi de vară, o biserică veche și o grădină plină de lumină. Și pe voi, cei care ne-ați văzut crescând.',
    ],
    photo: {
      src: '/images/story-hands.png',
      alt: 'Mâinile mirilor, împletite, fotografiate în alb-negru.',
      caption: 'Fig. 02 — Promisiunea',
      position: '50% 50%',
      zoom: 1.08,
    },
  },
  photos: {
    hero: {
      src: '/images/hero-couple.png',
      alt: 'Alexandra și Matei, fotografiați în alb-negru, frunte lângă frunte, lângă o fereastră înaltă.',
      position: '50% 35%',
      zoom: 1.12,
    },
    spread: {
      src: '/images/spread-walk.png',
      alt: 'Mirii pășind mână în mână pe o alee de grădină, printre chiparoși.',
      caption: 'Fig. 03 — Drumul spre grădină',
      position: '50% 55%',
      zoom: 1.05,
    },
    closing: {
      src: '/images/closing-table.png',
      alt: 'O masă lungă, așezată în grădină, cu lumânări aprinse și flori de câmp.',
      caption: 'Fig. 04 — Seara',
      position: '50% 50%',
      zoom: 1.06,
    },
  },
  venues: [
    {
      id: 'ceremony',
      kind: 'Cununia religioasă',
      title: 'Ceremonia',
      name: 'Biserica Sfântul Nicolae',
      startsAt: '2027-06-12T15:00:00+03:00',
      note: 'Vă rugăm să ajungeți cu aproximativ 15 minute înainte de începerea slujbei.',
    },
    {
      id: 'reception',
      kind: 'Petrecerea',
      title: 'Recepția',
      name: 'The Garden Estate',
      startsAt: '2027-06-12T19:00:00+03:00',
      note: 'Seara începe în grădină, cu un aperitiv la apus.',
    },
  ],
  timeline: [
    { time: '15:00', title: 'Cununia religioasă', description: 'Biserica Sfântul Nicolae' },
    { time: '16:30', title: 'Fotografii cu familia', description: 'Pe treptele bisericii' },
    { time: '19:00', title: 'Recepția', description: 'Aperitiv în grădină, The Garden Estate' },
    { time: '20:30', title: 'Cina', description: 'Meniu de sezon, la masa lungă' },
    { time: '22:00', title: 'Primul dans', description: 'Și ringul se deschide pentru toți' },
    { time: '00:00', title: 'Tortul', description: 'Sub cerul liber' },
  ],
  rsvp: {
    endpoint: process.env.NEXT_PUBLIC_PALFI_RSVP_ENDPOINT ?? null,
    maxCompanions: 3,
    dietaryOptions: ['Vegetarian', 'Vegan', 'Fără gluten', 'Fără lactoză', 'Alergii alimentare'],
  },
  audio: {
    src: null,
    title: 'Coloana sonoră a serii',
  },
  features: {
    countdown: true,
    story: true,
    spread: true,
    timeline: true,
    rsvp: true,
    audio: true,
  },
  theme: {
    colors: {
      paper: '#F3F0EA',
      ink: '#191919',
      accent: '#5C2636',
      stone: '#6E675F',
      mist: '#E2DDD4',
    },
    fonts: {
      display: 'bodoni',
      text: 'dmSans',
    },
  },
  meta: {
    title: 'Alexandra & Matei — 12 iunie 2027',
    description:
      'Invitație la nunta Alexandrei și a lui Matei. Cununia religioasă la Biserica Sfântul Nicolae, recepția la The Garden Estate.',
  },
}
