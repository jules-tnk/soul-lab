import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'

export default function AppShell() {
  return (
    <Box minH="100vh">
      <TopNav />
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
  )
}
