export interface MediaItem {
  id: string
  title: string
  type: 'film' | 'serial'
  year: number
  duration: string
  maturity: '7+' | '13+' | '16+'
  badge: string
  ranking: string
  description: string
  shortDescription: string
  poster: string
  cover: string
  trailer: string
  videoSources: Record<string, string>
  genres: string[]
  cast: string[]
  music: string
  trivia: string[]
}

export interface ProfileLike {
  kids?: boolean
}

const mediaCatalog: MediaItem[] = [
  {
    id: 'agent-zeta',
    title: 'Agent Zeta',
    type: 'film',
    year: 2026,
    duration: '2 h 13 min',
    maturity: '16+',
    badge: 'NOWY FILM',
    ranking: '#5 w Polsce',
    description:
      'Czterech bylych agentow wywiadu zostaje zabitych lata po operacji Cienaga. Zeta, najlepszy agent CNI, szuka jedynego ocalalego.',
    shortDescription:
      'Mocne kino akcji z dynamicznym tempem, poscigami i tajemnica sprzed lat.',
    poster: '/images/posters/poster-1.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Akcja', 'Thriller'],
    cast: ['Jan Lis', 'Marek Rudzki', 'Oskar Bielski'],
    music: 'K. Mroz',
    trivia: [
      'Zdjecia do filmu realizowano w 3 krajach.',
      'Glowne sceny akcji nakrecono praktycznie bez CGI.',
      'Film byl numerem 1 w dniu premiery.',
    ],
  },
  {
    id: 'czarna-fala',
    title: 'Czarna Fala',
    type: 'film',
    year: 2025,
    duration: '1 h 49 min',
    maturity: '13+',
    badge: 'TOP 10',
    ranking: '#2 w Polsce',
    description:
      'Mroczny thriller o dziennikarce, ktora odkrywa tajemnice zaginionego miasta portowego.',
    shortDescription: 'Mroczny klimat, tajemnice i mocna intryga.',
    poster: '/images/posters/poster-2.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Thriller', 'Dramat'],
    cast: ['Anna Wilk', 'Filip Rataj', 'Kamil Pietra'],
    music: 'L. Sowa',
    trivia: [
      'Scenariusz byl rozwijany przez 4 lata.',
      'Czesc scen powstala w prawdziwym porcie.',
    ],
  },
  {
    id: 'kruk',
    title: 'Kruk',
    type: 'film',
    year: 2024,
    duration: '2 h 02 min',
    maturity: '16+',
    badge: 'W PAKIECIE',
    ranking: '#8 w Polsce',
    description:
      'Byly sledczy wraca do gry, gdy seria brutalnych zdarzen laczy sie z jego przeszloscia.',
    shortDescription: 'Mocny thriller z kryminalnym klimatem.',
    poster: '/images/posters/poster-3.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Thriller', 'Kryminal'],
    cast: ['Tomasz Ziel', 'Mila Korda'],
    music: 'N. Cichy',
    trivia: ['Glowne zdjecia trwaly 68 dni.'],
  },
  {
    id: 'wielki-marsz',
    title: 'Wielki Marsz',
    type: 'film',
    year: 2026,
    duration: '2 h 01 min',
    maturity: '13+',
    badge: 'NOWY FILM',
    ranking: '#6 w Polsce',
    description:
      'W dorocznym Wielkim Marszu bierze udzial piecdziesieciu wyselekcjonowanych nastolatkow. Zasada jest prosta: kto zostaje w tyle, ten odpada.',
    shortDescription: 'Wielka przygoda i mocne emocje.',
    poster: '/images/posters/poster-4.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Przygodowy', 'Dramat'],
    cast: ['Piotr Mazur', 'Karol Duda'],
    music: 'A. Sztorm',
    trivia: ['Film wykorzystuje rozbudowane sceny zbiorowe.'],
  },
  {
    id: 'miasto-bez-snu',
    title: 'Miasto Bez Snu',
    type: 'serial',
    year: 2026,
    duration: '1 sezon',
    maturity: '16+',
    badge: 'SERIAL',
    ranking: '#1 w Polsce',
    description:
      'Nocne miasto, sekrety i policjant, ktory nie moze odpuscic jednej sprawy.',
    shortDescription: 'Serial kryminalny z mocnym klimatem.',
    poster: '/images/posters/poster-5.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Serial', 'Kryminal'],
    cast: ['Jakub Klim', 'Marta Zorza'],
    music: 'R. Kaczor',
    trivia: ['Pierwszy sezon ma 8 odcinkow.'],
  },
  {
    id: 'granica-mroku',
    title: 'Granica Mroku',
    type: 'serial',
    year: 2025,
    duration: '2 sezony',
    maturity: '16+',
    badge: 'SERIAL',
    ranking: '#6 w Polsce',
    description:
      'Na granicy panstwa dochodzi do zdarzen, ktore zmieniaja zycie calej jednostki.',
    shortDescription: 'Surowy klimat i mocna fabula.',
    poster: '/images/posters/poster-6.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Serial', 'Dramat', 'Akcja'],
    cast: ['Mikolaj Bor', 'Eryk Galecki'],
    music: 'D. Rybak',
    trivia: ['Drugi sezon rozwija watek polityczny.'],
  },
  {
    id: 'widmo',
    title: 'Widmo',
    type: 'serial',
    year: 2024,
    duration: '1 sezon',
    maturity: '13+',
    badge: 'SERIAL',
    ranking: '#9 w Polsce',
    description:
      'Tajemnicze znikniecia i psychologiczna gra wokol jednej rodziny.',
    shortDescription: 'Psychologiczny serial z tajemnica.',
    poster: '/images/posters/poster-7.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Serial', 'Mystery'],
    cast: ['Olga Wrona', 'Pawel Tyl'],
    music: 'K. Mroz',
    trivia: ['Najwiekszy nacisk postawiono na klimat i oswietlenie.'],
  },
  {
    id: 'strefa-cienia',
    title: 'Strefa Cienia',
    type: 'film',
    year: 2026,
    duration: '1 h 58 min',
    maturity: '16+',
    badge: 'TOP 10',
    ranking: '#3 w Polsce',
    description:
      'Dwoje agentow trafia do strefy, z ktorej nikt nie wraca bez sladu.',
    shortDescription: 'Szybka akcja i tajne operacje.',
    poster: '/images/posters/poster-8.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Akcja', 'Szpiegowski'],
    cast: ['Hubert Walczak', 'Mila Brzeg'],
    music: 'D. Mlynek',
    trivia: ['Glowne lokacje powstaly na zbudowanych planach.'],
  },
  {
    id: 'punkt-krytyczny',
    title: 'Punkt Krytyczny',
    type: 'serial',
    year: 2025,
    duration: '1 sezon',
    maturity: '16+',
    badge: 'SERIAL',
    ranking: '#10 w Polsce',
    description:
      'Gdy cyberatak sparalizowal miasto, grupa ekspertow walczy z czasem.',
    shortDescription: 'Nowoczesny thriller technologiczny.',
    poster: '/images/posters/poster-9.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Serial', 'Tech thriller'],
    cast: ['Lena Kret', 'Bartosz Fala'],
    music: 'R. Nocek',
    trivia: ['Tworcy konsultowali serial z ekspertami IT.'],
  },
  {
    id: 'projekt-zero',
    title: 'Projekt Zero',
    type: 'film',
    year: 2026,
    duration: '2 h 04 min',
    maturity: '16+',
    badge: 'NOWY FILM',
    ranking: '#7 w Polsce',
    description:
      'Eksperyment wojskowy wymyka sie spod kontroli i zmienia zasady gry.',
    shortDescription: 'Science fiction z militarnym klimatem.',
    poster: '/images/posters/poster-10.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Sci-fi', 'Akcja'],
    cast: ['Adam Wicher', 'Natalia Lipa'],
    music: 'P. Tone',
    trivia: ['Koncepcja swiata byla rozwijana z concept artistami.'],
  },
  {
    id: 'dark-city',
    title: 'Dark City',
    type: 'film',
    year: 2025,
    duration: '1 h 51 min',
    maturity: '16+',
    badge: 'W PAKIECIE',
    ranking: '#11 w Polsce',
    description:
      'Miasto pograza sie w chaosie, gdy dochodzi do serii dziwnych blackoutow.',
    shortDescription: 'Klimatyczne kino nocnego miasta.',
    poster: '/images/posters/poster-11.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Thriller', 'Sci-fi'],
    cast: ['Norbert Lis', 'Joanna Brzask'],
    music: 'M. Vox',
    trivia: ['Kolorystyka filmu jest jednym z glownych znakow rozpoznawczych.'],
  },
  {
    id: 'ostatnia-linia',
    title: 'Ostatnia Linia',
    type: 'serial',
    year: 2026,
    duration: '1 sezon',
    maturity: '13+',
    badge: 'SERIAL',
    ranking: '#12 w Polsce',
    description:
      'Oddzial ratunkowy dziala na granicy wytrzymalosci po serii katastrof.',
    shortDescription: 'Serial katastroficzny i dramatyczny.',
    poster: '/images/posters/poster-12.jpg',
    cover: '/images/hero/hero-main.jpg',
    trailer: '/videos/demo-trailer.mp4',
    videoSources: {
      '480p': '/videos/demo-stream.mp4',
      '720p': '/videos/demo-stream.mp4',
      '1080p': '/videos/demo-stream.mp4',
    },
    genres: ['Serial', 'Dramat'],
    cast: ['Kaja Noc', 'Marek Wronski'],
    music: 'T. Rydz',
    trivia: ['Kazdy odcinek pokazuje inna akcje ratunkowa.'],
  },
]

const maturityRank: Record<MediaItem['maturity'], number> = {
  '7+': 7,
  '13+': 13,
  '16+': 16,
}

export const useCatalog = () => {
  const catalog = mediaCatalog

  const getById = (id: string) => catalog.find(item => item.id === id)

  const getByIds = (ids: string[]) =>
    ids
      .map(id => getById(id))
      .filter((item): item is MediaItem => Boolean(item))

  const filterVisible = (items: MediaItem[], profile?: ProfileLike | null, hiddenIds: string[] = []) => {
    const hiddenSet = new Set(hiddenIds)

    return items.filter((item) => {
      if (hiddenSet.has(item.id)) {
        return false
      }

      if (profile?.kids) {
        return maturityRank[item.maturity] <= 13
      }

      return true
    })
  }

  const movies = catalog.filter(item => item.type === 'film')
  const series = catalog.filter(item => item.type === 'serial')

  return {
    catalog,
    movies,
    series,
    getById,
    getByIds,
    filterVisible,
  }
}
