import { Space, Stack, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import useRequestStatus from '../../hooks/useRequestStatus'
import { iTunesTopAlbum, MuzikAlbum } from '../../types/common'
import './Home.scss'
import { cleanAlbums } from './Home.utils'

interface AlbumsResponse {
  data: {
    feed: {
      entry: iTunesTopAlbum[]
    }
  }
}

function Home() {
  const [topAlbums, setTopAlbums] = useState<MuzikAlbum[]>([])
  const [visibleAlbums, setVisibleAlbums] = useState<MuzikAlbum[]>([])
  const { isLoading, setIsLoading, isError, setIsError } = useRequestStatus()

  const getAlbums = useCallback(async () => {
    try {
      const albumsResponse: AlbumsResponse = await axios.get(
        // * seems to max out at 65 entries...
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
      )

      return albumsResponse.data.feed.entry
    } catch {
      setIsError(true)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setIsError])

  useEffect(() => {
    void (async () => {
      const topAlbums = await getAlbums()
      const cleanedAlbums = cleanAlbums(topAlbums)

      setTopAlbums(cleanedAlbums)
      setVisibleAlbums(cleanedAlbums)
    })()
  }, [getAlbums])

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
    <PageWrapper
      title="iTunes Top Albums"
      isLoading={isLoading}
      isError={isError}
    >
      <Stack align="center" className="album-list">
        <TextInput
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          placeholder="Search the top albums..."
          icon={<IconSearch size={14} />}
          className="search-input"
        />
        <Space />
        {visibleAlbums.map((album, index) => (
          <AlbumCard rank={index + 1} key={album.id} {...album} />
        ))}
      </Stack>
    </PageWrapper>
  )
}

export default Home
