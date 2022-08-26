import {
  ActionIcon,
  Grid,
  Image,
  Space,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  Paper,
  Group,
  Center,
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
    <Stack>
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
      <Center>
        <Stack>
          {albums.map((album) => (
            <Paper
              key={album.id.attributes['im:id']}
              component={Group}
              shadow="xs"
              p="md"
              withBorder
              
            >
              <Image
                radius="md"
                src={album['im:image'][2].label}
                alt={`${album['im:name'].label} album cover`}
                withPlaceholder
                placeholder={
                  <Text align="center">
                    {album['im:name'].label} album cover
                  </Text>
                }
                width={100}
              />
              <Stack>
                <Text>{album['im:name'].label}</Text>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Center>
    </Stack>
  )
}

export default Home
