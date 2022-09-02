import { Button, Stack, Text } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlbumDetails from '../../components/AlbumDetails/AlbumDetails'
import Loading from '../../components/Loading/Loading'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import useRequestStatus from '../../hooks/useRequestStatus'
import { MuzikAlbum, SearchedAlbumsResponse } from '../../types/common'
import './Details.scss'
import { mapAlbumDetails } from './Details.utils'

function Details() {
  const { albumId } = useParams()
  const navigate = useNavigate()
  const [albumInfo, setAlbumInfo] = useState<MuzikAlbum>()
  const { isLoading, setIsLoading, isError, setIsError } = useRequestStatus()

  useEffect(() => {
    const getAlbumDetails = async () => {
      if (!albumId) {
        return undefined
      }

      try {
        const albumDetailsResponse: SearchedAlbumsResponse = await axios.get(
          `https://itunes.apple.com/search?term=${albumId}&entity=album`
        )

        if (albumDetailsResponse.data.resultCount === 0) {
          return undefined
        }
        return mapAlbumDetails(albumDetailsResponse.data.results[0])
      } catch {
        setIsError(true)
        return undefined
      } finally {
        setIsLoading(false)
      }
    }

    void (async () => {
      if (albumId) {
        const albumDetails = await getAlbumDetails()
        setAlbumInfo(albumDetails)
      }
    })()
  }, [albumId, setIsError, setIsLoading])

  return (
    <PageWrapper title="Album Details" isError={isError}>
      <Stack align="center" className="album-details-section">
        <Button onClick={() => navigate('/')}>Back to Top Albums</Button>
        {isLoading ? (
          <Loading />
        ) : !albumInfo ? (
          <Text size="xl" className="no-results-text">
            Sorry, we can&apos;t find that album!
          </Text>
        ) : (
          <AlbumDetails {...albumInfo} />
        )}
      </Stack>
    </PageWrapper>
  )
}

export default Details
