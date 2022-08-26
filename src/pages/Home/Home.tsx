import {
  ActionIcon,
  Grid,
  Space,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons';

function Home() {
  // TODO
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

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
      </Grid.Col>
    </Grid>
  )
}

export default Home
