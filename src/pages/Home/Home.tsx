import { Space, Stack, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { Album, iTunesTopAlbumResponse } from '../../types/common'
import './Home.scss'
import { cleanAlbums } from './Home.utils'

interface AlbumsResponse {
  data: {
    feed: {
      entry: iTunesTopAlbumResponse[]
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
    <PageWrapper>
      <Stack align="center" className="album-list" pb={50}>
        <TextInput
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          placeholder="Search the top albums..."
          icon={<IconSearch size={14} />}
          className="search-input"
        />
        <Space />
        {visibleAlbums.map((album) => (
          <AlbumCard key={album.id} {...album} />
        ))}
      </Stack>
    </PageWrapper>
  )
}

export default Home
