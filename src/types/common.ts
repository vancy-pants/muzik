export interface iTunesAlbum {
  'im:name': {
    label: string
  }
  // Spits out 3 images. Use the 3rd one
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

export interface Album {
  id: string
  name: string
  albumArt: string
  trackCount: number
  price: string
  artist: string
  artistLink: string
}
