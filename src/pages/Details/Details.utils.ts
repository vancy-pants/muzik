import { MuzikAlbum, iTunesSearchedAlbum } from '../../types/common'

export const mapAlbumDetails = (
  albumsDetails: iTunesSearchedAlbum
): MuzikAlbum => {
  return {
    id: albumsDetails.collectionId.toString(),
    name: albumsDetails.collectionName,
    albumArt: albumsDetails.artworkUrl100,
    trackCount: albumsDetails.trackCount,
    price: albumsDetails.collectionPrice,
    artist: albumsDetails.artistName,
    artistLink: albumsDetails.artistViewUrl,
    albumLink: albumsDetails.collectionViewUrl,
    isExplicit: albumsDetails.collectionExplicitness === 'explicit',
    country: albumsDetails.country,
    releaseDate: albumsDetails.releaseDate,
    genre: albumsDetails.primaryGenreName,
  }
}
