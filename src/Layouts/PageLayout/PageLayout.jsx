import { Box, Flex, Spinner, useColorModeValue } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import useSupabaseAuth from "../../hooks/useSupabaseAuth"
import useUIStore from "../../store/uiStore"
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi"

const PageLayout = ({children}) => {
  const {pathname} = useLocation()
  const {user, loading} = useSupabaseAuth()
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth"
  const checkingUserIsAuth = !user && loading

  const { leftSidebarOpen, toggleLeft } = useUIStore()

  const bgColor = useColorModeValue('#F5F5F5', '#0A0A12')
  const toggleBg = useColorModeValue('white', '#1A1A2E')
  const toggleBorder = useColorModeValue('gray.200', 'whiteAlpha.200')
  const toggleBorderVal = useColorModeValue('#E2E8F0', 'rgba(255,255,255,0.1)')
  const toggleColor = useColorModeValue('#718096', '#A0AEC0')

  if (checkingUserIsAuth) return <PageLayoutSpinner bgColor={bgColor} />

  return (
    <Flex
      flexDirection={canRenderNavbar ? "column" : "row"}
      minH="100vh"
      bg={bgColor}
      position="relative"
    >
      {/* Background orbs */}
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100%"
        pointerEvents="none"
        zIndex={0}
        overflow="hidden"
        display={canRenderSidebar ? "block" : "none"}
      >
        <Box
          position="absolute"
          top="10%"
          left="20%"
          w="300px"
          h="300px"
          borderRadius="full"
          bgGradient="linear(to-br, red.400, red.300)"
          opacity={0.15}
          filter="blur(60px)"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          w="250px"
          h="250px"
          borderRadius="full"
          bgGradient="linear(to-br, red.300, pink.300)"
          opacity={0.12}
          filter="blur(50px)"
        />
      </Box>

      {/* Left Sidebar — collapses to 0 width with smooth transition */}
      {canRenderSidebar && (
        <Box
          w={leftSidebarOpen ? { base: "70px", md: "240px" } : "0px"}
          flexShrink={0}
          overflow="hidden"
          transition="width 0.3s cubic-bezier(0.4,0,0.2,1)"
          position="relative"
          zIndex={2}
        >
          <Sidebar />
        </Box>
      )}

      {/* Left sidebar toggle tab — always visible on md+ */}
      {canRenderSidebar && (
        <Box
          as="button"
          onClick={toggleLeft}
          position="fixed"
          left={leftSidebarOpen ? { base: "70px", md: "240px" } : "0px"}
          top="68px"
          transition="left 0.3s cubic-bezier(0.4,0,0.2,1)"
          zIndex={100}
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          h="36px"
          w="16px"
          bg={toggleBg}
          borderLeft="none"
          borderRight={`1px solid ${toggleBorderVal}`}
          borderTop={`1px solid ${toggleBorderVal}`}
          borderBottom={`1px solid ${toggleBorderVal}`}
          borderRadius="0 6px 6px 0"
          color={toggleColor}
          boxShadow="2px 0 8px rgba(0,0,0,0.12)"
          cursor="pointer"
          _hover={{ color: "#E53935", borderColor: "#E53935" }}
          aria-label="Toggle sidebar"
        >
          {leftSidebarOpen
            ? <FiChevronsLeft size={12} />
            : <FiChevronsRight size={12} />
          }
        </Box>
      )}

      {canRenderNavbar ? <Navbar /> : null}

      <Box
        flex={1}
        position="relative"
        zIndex={1}
        minW={0}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default PageLayout

const PageLayoutSpinner = ({ bgColor }) => {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
    >
      <Spinner size="xl" color="red.500" thickness="4px" />
    </Flex>
  )
}
