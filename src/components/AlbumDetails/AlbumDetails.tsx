import { Anchor, Group, Image, Paper, Stack, Text } from '@mantine/core'
import { MuzikAlbum } from '../../types/common'
import './AlbumDetails.scss'

type AlbumDetailsProps = Omit<MuzikAlbum, 'id'>

function AlbumDetails({
  name,
  albumArt,
  trackCount,
  price,
  artist,
  artistLink,
  albumLink,
  isExplicit,
  country,
  releaseDate,
  genre,
}: AlbumDetailsProps) {
  return (
    <Paper
      component={Group}
      shadow="xs"
      withBorder
      className="album-details-card"
    >
      <Image
        radius="md"
        src={albumArt}
        alt={`${artist} album cover`}
        className="album-image"
      />
      <Stack className="album-info" py={10} pr={10}>
        <Text size="lg" weight={700} className="album-text">
          Album Name:{' '}
          {albumLink ? (
            <Anchor href={albumLink} target="_blank" rel="noopener noreferrer">
              {name}
            </Anchor>
          ) : (
            name
          )}
        </Text>
        <Text className="album-text">
          {artist.includes(',') ? 'Artists' : 'Artist'}:{' '}
          {artistLink ? (
            <Anchor href={artistLink} target="_blank" rel="noopener noreferrer">
              {artist}
            </Anchor>
          ) : (
            artist
          )}
        </Text>
        <Text className="album-text">Tracks: {trackCount}</Text>
        <Text className="album-text">Price: {price}</Text>
        <Text className="album-text">Genre: {genre}</Text>
        <Text className="album-text">Country: {country}</Text>
        <Text className="album-text">Release Date: {releaseDate}</Text>
        {isExplicit && <Text className="album-text">Explicit</Text>}
      </Stack>
    </Paper>
  )
}

export default AlbumDetails