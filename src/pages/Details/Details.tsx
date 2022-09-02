import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper/PageWrapper'

function Details() {
  const { albumId } = useParams()

  console.log('albumId :>> ', albumId)

  useEffect(() => {
    const getAlbumDetails = async () => {
      const albumDetailsResponse: any = await axios.get(
        `https://itunes.apple.com/search?term=${albumId}&entity=album`
      )

      console.log(albumDetailsResponse)
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
