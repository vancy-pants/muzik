import {
  ActionIcon,
  Grid,
  Space,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core'

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
          <Title order={1}>Home</Title>
          <Space h="md" />
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? 'D' : 'L'}
          </ActionIcon>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default Home
