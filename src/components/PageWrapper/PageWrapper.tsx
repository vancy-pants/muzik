import { Stack, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'
import Error from '../Error/Error'
import PageWave from '../PageWave'
import './PageWrapper.scss'

interface PageWrapperProps {
  title: string
  isError: boolean
}

function PageWrapper({
  title,
  isError,
  children,
}: PropsWithChildren<PageWrapperProps>) {
  const pageContent = () => {
    if (isError) {
      return <Error />
    }
    return children
  }

  return (
    <Stack id="page-wrapper">
      <Stack align="center" className="page-header" pt={20} pb={40}>
        <Title align="center" order={1}>
          {title}
        </Title>
      </Stack>
      <PageWave />
      <div className="page-content">{pageContent()}</div>
    </Stack>
  )
}

export default PageWrapper
