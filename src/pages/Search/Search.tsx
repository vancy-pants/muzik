import { Button, Stack, Text, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import useRequestStatus from '../../hooks/useRequestStatus'
import { MuzikAlbum, SearchedAlbumsResponse } from '../../types/common'
import { mapAlbumDetails } from '../Details/Details.utils'
import './Search.scss'

function Search() {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState<MuzikAlbum[]>([])
  const { isLoading, setIsLoading, isError, setIsError } =
    useRequestStatus(false)

  const searchItunes = useCallback(
    async (searchTerm: string) => {
      const term = searchTerm.replaceAll(' ', '+')

      setIsLoading(true)

      try {
        const searchResponse: SearchedAlbumsResponse = await axios.get(
          `https://itunes.apple.com/search?term=${term}&limit=25&entity=album`
        )
        setAlbums(
          searchResponse.data.results.map((albumResult) =>
            mapAlbumDetails(albumResult)
          )
        )
      } catch {
        setIsError(true)
        setAlbums([])
      } finally {
        setIsLoading(false)
      }
    },
    [setIsError, setIsLoading]
  )

  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchVal] = useDebouncedValue(searchValue, 200)

  useEffect(() => {
    void (async () => {
      if (debouncedSearchVal.length > 0) {
        await searchItunes(debouncedSearchVal)
      } else {
        setAlbums([])
      }
    })()
  }, [debouncedSearchVal, searchItunes])

  const noResults =
    !isLoading &&
    !isError &&
    debouncedSearchVal.length > 0 &&
    albums.length === 0

  return (
    <PageWrapper title="Album Details" isLoading={isLoading} isError={isError}>
      <Stack align="center" className="album-list">
        <Button onClick={() => navigate('/')}>Back to Top Albums</Button>
        <TextInput
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          placeholder="Search all iTunes albums..."
          icon={<IconSearch size={14} />}
          className="search-input"
        />
        {noResults ? (
          <Text>No results found...</Text>
        ) : (
          albums.map((album) => <AlbumCard key={album.id} {...album} />)
        )}
      </Stack>
    </PageWrapper>
  )
}

export default Search
