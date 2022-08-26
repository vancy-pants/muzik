import { MantineProvider } from '@mantine/core'
import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

// * add providers here
const AllTheProviders = ({ children }: { children: React.ReactElement }) => (
  <MantineProvider
    theme={{ fontFamily: 'Helvetica, sans-serif', colorScheme: 'dark' }}
    withGlobalStyles
    withNormalizeCSS
  >
    <BrowserRouter>{children}</BrowserRouter>
  </MantineProvider>
)

const muzikRender = (ui: React.ReactElement, options = {}) => ({
  user: userEvent.setup(),
  ...render(ui, {
    wrapper: AllTheProviders,
    ...options,
  }),
})

export * from '@testing-library/react'
// * override render export
export { muzikRender as render }

