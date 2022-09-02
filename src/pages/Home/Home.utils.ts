import { MuzikAlbum, iTunesTopAlbum } from '../../types/common'

export const cleanAlbums = (albums: iTunesTopAlbum[]): MuzikAlbum[] => {
  return albums.map((album) => ({
    id: album.id.attributes['im:id'],
    name: album['im:name'].label,
    albumArt: album['im:image'][2].label,
    trackCount: album['im:itemCount'].label,
    price: album['im:price'].label,
    artist: album['im:artist'].label,
    artistLink: album['im:artist'].attributes?.href ?? null,
  }))
}
