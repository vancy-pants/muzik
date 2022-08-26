import {
  ActionIcon,
  Grid,
  Space,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Album } from '../../types/common'

interface AlbumsResponse {
  data: {
    feed: {
      entry: Album[]
    }
  }
}

function Home() {
  // TODO
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [albums, setAlbums] = useState<Album[]>([])

  const getAlbums = async () => {
    const albumsResponse: AlbumsResponse = await axios.get(
      // * seems to max out at 65 entries...
      'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    )

    albumsResponse.data.feed.entry.forEach((e) => {
      console.log('entry :>> ', e)
    })

    return albumsResponse.data.feed.entry
  }

  useEffect(() => {
    void (async () => {
      const topAlbums = await getAlbums()
      setAlbums(topAlbums)
    })()
  }, [])

  return (
    <Grid>
      <Grid.Col span={6} offset={3}>
        <Stack align="center">
          <Space h="md" />
          <Title order={1}>Muzik</Title>
          <Space h="md" />
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Stack>
        <Space h="md" />
        <Stack>
          {albums.length}
          <Space h="md" />
          {albums.map((album) => (
            <p key={album.id.attributes['im:id']}>{album['im:name'].label}</p>
          ))}
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default Home
