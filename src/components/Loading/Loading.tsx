import { Stack } from '@mantine/core'
import './Loading.scss'

function Loading() {
  return (
    <Stack align="center" className="error-wrapper">
      <div className="loader-rings" />
    </Stack>
  )
}

export default Loading
