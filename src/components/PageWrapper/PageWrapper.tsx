import { Stack, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'
import PageWave from '../PageWave'

function PageWrapper({ children }: PropsWithChildren) {
  return (
    <Stack id="page-wrapper">
      <Stack align="center" className="page-header" pt={20} pb={40}>
        <Title order={1}>Muzik!</Title>
        <Title order={3}>iTunes Top Albums</Title>
      </Stack>
      <PageWave />
      {children}
    </Stack>
  )
}

export default PageWrapper
