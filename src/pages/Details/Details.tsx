import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

  return <div>Details Page</div>
}

export default Details
