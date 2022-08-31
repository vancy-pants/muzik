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
        width={150}
      />
      <Stack className="album-info">
        <Text size="lg" weight={700}>
          Album Name: {name}
        </Text>
        <Text>
          Artist:{' '}
          {artistLink ? (
            <Anchor href={artistLink} target="_blank" rel="noopener noreferrer">
              {artist}
            </Anchor>
          ) : (
            artist
          )}
        </Text>
        <Text>Track Count: {trackCount}</Text>
        <Text>Price: {price}</Text>
      </Stack>
    </Paper>
  )
}

export default AlbumCard
