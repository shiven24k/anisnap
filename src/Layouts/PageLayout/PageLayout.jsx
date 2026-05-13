import { Box, Flex, Spinner, useColorModeValue } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import useSupabaseAuth from "../../hooks/useSupabaseAuth"
import useUIStore from "../../store/uiStore"

const PageLayout = ({ children }) => {
  const { pathname } = useLocation()
  const { user, loading } = useSupabaseAuth()
  const canRenderSidebar = pathname !== "/auth" && user
  const canRenderNavbar = !user && !loading && pathname !== "/auth"
  const checkingUserIsAuth = !user && loading

  const { leftSidebarOpen } = useUIStore()
  const bgColor = useColorModeValue('#F5F5F5', '#0A0A12')

  if (checkingUserIsAuth) return <PageLayoutSpinner bgColor={bgColor} />

  return (
    <Flex
      flexDirection={canRenderNavbar ? "column" : "row"}
      minH="100vh"
      bg={bgColor}
      position="relative"
    >
      {/* Ambient background orbs */}
      <Box
        position="fixed" top="0" left="0" w="100%" h="100%"
        pointerEvents="none" zIndex={0} overflow="hidden"
        display={canRenderSidebar ? "block" : "none"}
      >
        <Box
          position="absolute" top="10%" left="20%" w="300px" h="300px"
          borderRadius="full" bgGradient="linear(to-br, red.400, red.300)"
          opacity={0.12} filter="blur(70px)"
        />
        <Box
          position="absolute" bottom="20%" right="10%" w="250px" h="250px"
          borderRadius="full" bgGradient="linear(to-br, red.300, pink.300)"
          opacity={0.10} filter="blur(60px)"
        />
      </Box>

      {/* Left sidebar — always visible; 70px (icon-only) or 240px (full) */}
      {canRenderSidebar && (
        <Box
          w={leftSidebarOpen ? { base: "70px", md: "240px" } : "70px"}
          flexShrink={0}
          overflow="hidden"
          transition="width 0.28s cubic-bezier(0.4, 0, 0.2, 1)"
          position="relative"
          zIndex={2}
        >
          <Sidebar />
        </Box>
      )}

      {canRenderNavbar ? <Navbar /> : null}

      <Box flex={1} position="relative" zIndex={1} minW={0}>
        {children}
      </Box>
    </Flex>
  )
}

export default PageLayout

const PageLayoutSpinner = ({ bgColor }) => (
  <Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center" bg={bgColor}>
    <Spinner size="xl" color="red.500" thickness="4px" />
  </Flex>
)
