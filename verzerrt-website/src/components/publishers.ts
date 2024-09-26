interface Publisher {
  logo: string
  name: string
}
const publishers: Publisher[] = [
  {
    name: 'SZ',
    logo: '/logos/sz.svg',
  },
  {
    name: 'Zeit',
    logo: '/logos/zeit.svg',
  },
  {
    name: 'FAZ',
    logo: '/logos/faz.png',
  },
  {
    name: 'Bild',
    logo: '/logos/bild.png',
  },
]

export function getLogoPath(publisherName: string): string {
  return publishers.find((p) => p.name.toLowerCase() === publisherName)?.logo ?? ''
}
