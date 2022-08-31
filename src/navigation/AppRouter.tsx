import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'

function AppRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={'search'} element={<Search />} />
      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Routes>
  )
}

export default AppRouter
