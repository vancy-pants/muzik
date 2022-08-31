import { Anchor, Group, Image, Paper, Stack, Text } from '@mantine/core'
import { Album } from '../../types/common'
import './AlbumCard.scss'

type AlbumCardProps = Omit<Album, 'id'>

function AlbumCard({
  name,
  albumArt,
  artist,
  artistLink,
  trackCount,
  price,
}: AlbumCardProps) {
  return (
    <Paper component={Group} shadow="xs" withBorder className="album-card">
      <Image
        radius="md"
        src={albumArt}
        alt={`${artist} album cover`}
        className="album-image"
      />
      <Stack className="album-info" py={10} pr={10}>
        <Text size="lg" weight={700} className="album-text">
          Album Name: {name}
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
      </Stack>
    </Paper>
  )
}

export default AlbumCard
