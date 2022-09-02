import { Stack, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'
import PageWave from '../PageWave'

interface PageWrapperProps {
  title: string
}

function PageWrapper({ title, children }: PropsWithChildren<PageWrapperProps>) {
  return (
    <Stack id="page-wrapper">
      <Stack align="center" className="page-header" pt={20} pb={40}>
        <Title order={1}>{title}</Title>
      </Stack>
      <PageWave />
      {children}
    </Stack>
  )
}

export default PageWrapper
