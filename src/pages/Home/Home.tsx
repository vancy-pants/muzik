import { Stack, TextInput, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
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
  const [topAlbums, setTopAlbums] = useState<Album[]>([])
  const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([])

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
      setTopAlbums(cleanedAlbums)
      setVisibleAlbums(cleanedAlbums)
    })()
  }, [])

  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchVal] = useDebouncedValue(searchValue, 200)

  useEffect(() => {
    if (debouncedSearchVal.length > 0) {
      const lowerCaseSearchVal = debouncedSearchVal.toLowerCase()
      const newVisibleAlbums = topAlbums.filter(
        (album) =>
          album.artist.toLowerCase().includes(lowerCaseSearchVal) ||
          album.name.toLowerCase().includes(lowerCaseSearchVal)
      )
      setVisibleAlbums(newVisibleAlbums)
    } else {
      setVisibleAlbums(topAlbums)
    }
  }, [debouncedSearchVal, topAlbums])

  return (
    <Stack id="page-wrapper">
      <Stack align="center" className="page-header" pt={20} pb={40}>
        <Title order={1}>Muzik!</Title>
        <Title order={3}>iTunes Top Albums</Title>
        <TextInput
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          placeholder="Search the top albums..."
          icon={<IconSearch size={14} />}
          className="search-input"
        />
      </Stack>
      <PageWave />
      <Stack align="center" className="album-list" pb={50}>
        {visibleAlbums.map((album) => (
          <AlbumCard key={album.id} {...album} />
        ))}
      </Stack>
    </Stack>
  )
}

export default Home
