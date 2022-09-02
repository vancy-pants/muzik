import { Stack } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AlbumDetails from '../../components/AlbumDetails/AlbumDetails'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { MuzikAlbum, SearchedAlbumsResponse } from '../../types/common'
import './Details.scss'
import { mapAlbumDetails } from './Details.utils'

function Details() {
  const { albumId } = useParams()
  const [albumInfo, setAlbumInfo] = useState<MuzikAlbum>()

  useEffect(() => {
    const getAlbumDetails = async () => {
      if (!albumId) {
        return undefined
      }

      const albumDetailsResponse: SearchedAlbumsResponse = await axios.get(
        `https://itunes.apple.com/search?term=${albumId}&entity=album`
      )

      // TODO: what if more than one comes?
      return mapAlbumDetails(albumDetailsResponse.data.results[0])
    }

    void (async () => {
      if (albumId) {
        const albumDetails = await getAlbumDetails()
        setAlbumInfo(albumDetails)
      }
    })()
  }, [albumId])

  return (
    <PageWrapper title="Album Details">
      <Stack align="center" className="album-details-section">
        {albumInfo && <AlbumDetails {...albumInfo} />}
      </Stack>
    </PageWrapper>
  )
}

export default Details
