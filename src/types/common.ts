export interface iTunesTopAlbum {
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

export interface SearchedAlbumsResponse {
  data: {
    resultCount: number
    results: iTunesSearchedAlbum[]
  }
}

export interface iTunesSearchedAlbum {
  collectionId: number
  artistName: string
  collectionName: string
  artistViewUrl: string
  collectionViewUrl: string
  artworkUrl100: string
  collectionPrice: string
  collectionExplicitness: string
  trackCount: number
  country: string
  currency: string
  releaseDate: string
  primaryGenreName: string
}

export interface MuzikAlbum {
  id: string
  name: string
  albumArt: string
  trackCount: number
  price: string
  artist: string
  artistLink: string
  albumLink?: string
  isExplicit?: boolean
  country?: string
  releaseDate?: string
  genre?: string
}
