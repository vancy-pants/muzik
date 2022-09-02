import { Stack, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import PageWave from '../PageWave'
import './PageWrapper.scss'

interface PageWrapperProps {
  title: string
  isLoading: boolean
  isError: boolean
}

function PageWrapper({
  title,
  isLoading,
  isError,
  children,
}: PropsWithChildren<PageWrapperProps>) {
  const pageContent = () => {
    if (isLoading) {
      return <Loading />
    }
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
