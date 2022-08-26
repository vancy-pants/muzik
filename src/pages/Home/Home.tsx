import {
  ActionIcon,
  Anchor,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Album } from '../../types/common'
import './Home.scss'

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
    <Stack id="page-wrapper">
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
      <Stack align="center">
        {albums.map((album) => (
          <Paper
            key={album.id.attributes['im:id']}
            component={Group}
            shadow="xs"
            p="md"
            withBorder
            className="album-card"
          >
            <Image
              radius="md"
              src={album['im:image'][2].label}
              alt={`${album['im:name'].label} album cover`}
              width={150}
            />
            <Stack className="album-info">
              <Text size="lg" weight={700}>
                Album Name: {album['im:name'].label}
              </Text>
              <Text>
                Artist:{' '}
                {album['im:artist'].attributes &&
                album['im:artist'].attributes.href ? (
                  <Anchor
                    href={album['im:artist'].attributes.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {album['im:artist'].label}
                  </Anchor>
                ) : (
                  album['im:artist'].label
                )}
              </Text>
              <Text>Track Count: {album['im:itemCount'].label}</Text>
              <Text>Price: {album['im:price'].label}</Text>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  )
}

export default Home
