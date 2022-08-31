import { Space, Stack, Title } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
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
        <Title order={3}>iTunes Top Albums</Title>
        <Space h="md" />
      </Stack>
      <PageWave />
      <Stack align="center" className="album-list">
        {albums.map((album) => (
          <AlbumCard key={album.id} {...album} />
        ))}
      </Stack>
    </Stack>
  )
}

export default Home
