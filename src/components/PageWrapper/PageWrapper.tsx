import { Stack, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'
import PageWave from '../PageWave'
import './PageWrapper.scss'

interface PageWrapperProps {
  title: string
}

function PageWrapper({ title, children }: PropsWithChildren<PageWrapperProps>) {
  return (
    <Stack id="page-wrapper">
      <Stack align="center" className="page-header" pt={20} pb={40}>
        <Title align="center" order={1}>
          {title}
        </Title>
      </Stack>
      <PageWave />
      <div className="page-content">{children}</div>
    </Stack>
  )
}

export default PageWrapper
