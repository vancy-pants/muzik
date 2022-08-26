import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './navigation/AppRouter'

function App() {
  return (
    <MantineProvider
      theme={{ fontFamily: 'Helvetica, sans-serif' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
