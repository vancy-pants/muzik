import { Stack, Text, Title } from '@mantine/core'
import './Error.scss'

function Error() {
  return (
    <Stack align="center" className="error-wrapper">
      <Title order={2}>An error occurred!</Title>
      <Text>Please refresh the page!</Text>
    </Stack>
  )
}

export default Error
