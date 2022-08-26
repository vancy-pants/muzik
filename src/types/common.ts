export interface Album {
  'im:name': {
    label: string
  }
  'im:image': {
    label: string
  }[]
  'im:itemCount': {
    label: number
  }
  'im:price': {
    label: string
  }
  title: {
    label: string
  }
  'im:artist': {
    label: string
    attributes: {
      href: string
    }
  }
  id: {
    label: string
    attributes: {
      'im:id': string
    }
  }
}
