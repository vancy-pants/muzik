import { Anchor, Button, Group, Image, Paper, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { MuzikAlbum } from '../../types/common'
import './AlbumCard.scss'

interface AlbumCardProps extends MuzikAlbum {
  rank?: number // searched albums won't have a rank
}

function AlbumCard({
  rank,
  id,
  name,
  albumArt,
  artist,
  artistLink,
  trackCount,
  price,
}: AlbumCardProps) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`details/${id}`)
  }

  return (
    <Paper component={Group} shadow="xs" withBorder className="album-card">
      {rank && (
        <Text align="center" className="album-rank">
          {rank}
        </Text>
      )}
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
        <Button
          compact
          variant="gradient"
          className="view-more-button"
          gradient={{ from: '#ed6ea0', to: '#ec8c69' }}
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </Stack>
    </Paper>
  )
}

export default AlbumCard
