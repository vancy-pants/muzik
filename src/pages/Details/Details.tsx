import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { SearchedAlbumsResponse } from '../../types/common'
import { mapAlbumDetails } from './Details.utils'

function Details() {
  const { albumId } = useParams()

  useEffect(() => {
    const getAlbumDetails = async () => {
      const albumDetailsResponse: SearchedAlbumsResponse = await axios.get(
        `https://itunes.apple.com/search?term=${albumId}&entity=album`
      )

      console.log(albumDetailsResponse.data.results[0])
      console.log(mapAlbumDetails(albumDetailsResponse.data.results[0]))
    }

    void (async () => {
      if (albumId) {
        await getAlbumDetails()
      }
    })()
  }, [albumId])

  return (
    <PageWrapper title="Album Details">
      <div>Details Page</div>
    </PageWrapper>
  )
}

export default Details
