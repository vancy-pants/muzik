import {
  Anchor,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PageWave from '../../components/PageWave'
import { Album, iTunesAlbum } from '../../types/common'
import './Home.scss'
import { cleanAlbums } from './Home.utils'

interface AlbumsResponse {
  data: {
    feed: {
      entry: iTunesAlbum[]
    }
  }
}

function Home() {
  const [albums, setAlbums] = useState<Album[]>([])

  const getAlbums = async () => {
    const albumsResponse: AlbumsResponse = await axios.get(
      // * seems to max out at 65 entries...
      'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    )

    return albumsResponse.data.feed.entry
  }

  useEffect(() => {
    void (async () => {
      const topAlbums = await getAlbums()
      const cleanedAlbums = cleanAlbums(topAlbums)
      console.log(cleanedAlbums.length)
      setAlbums(cleanedAlbums)
    })()
  }, [])

  return (
    <Stack id="page-wrapper">
      <Stack align="center" className="page-header">
        <Space h="md" />
        <Title order={1}>Muzik</Title>
        <Space h="md" />
      </Stack>
      <PageWave />
      <Stack align="center">
        {albums.map((album) => (
          <Paper
            key={album.id}
            component={Group}
            shadow="xs"
            p="md"
            withBorder
            className="album-card"
          >
            <Image
              radius="md"
              src={album.albumArt}
              alt={`${album.artist} album cover`}
              width={150}
            />
            <Stack className="album-info">
              <Text size="lg" weight={700}>
                Album Name: {album.name}
              </Text>
              <Text>
                Artist:{' '}
                {album.artistLink ? (
                  <Anchor
                    href={album.artistLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {album.artist}
                  </Anchor>
                ) : (
                  album.artist
                )}
              </Text>
              <Text>Track Count: {album.trackCount}</Text>
              <Text>Price: {album.price}</Text>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  )
}

export default Home
