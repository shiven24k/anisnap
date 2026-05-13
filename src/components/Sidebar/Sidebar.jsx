import { Box, Divider, Flex, Image, Link, Tooltip, VStack, useColorModeValue } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FiChevronsLeft, FiChevronsRight, FiLogOut } from "react-icons/fi"
import useLogout from "../../hooks/useLogout"
import useUIStore from "../../store/uiStore"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout()
  const { leftSidebarOpen, toggleLeft } = useUIStore()

  const bgColor = useColorModeValue('white', 'rgba(12,12,22,0.95)')
  const borderColor = useColorModeValue('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.06)')
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const dividerColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subtleColor = useColorModeValue('gray.400', 'whiteAlpha.400')

  // On desktop: show label only when expanded. On mobile: always icon-only.
  const showLabel = leftSidebarOpen

  const itemProps = {
    w: showLabel ? { base: 12, md: "full" } : 12,
    justifyContent: showLabel ? { base: "center", md: "flex-start" } : "center",
  }

  return (
    <Box
      height="100vh"
      position="sticky"
      top={0}
      left={0}
      py={5}
      px={showLabel ? { base: 2, md: 3 } : 2}
      bg={bgColor}
      backdropFilter="blur(20px)"
      borderRight="1px solid"
      borderColor={borderColor}
      transition="padding 0.28s cubic-bezier(0.4,0,0.2,1)"
      overflowY="auto"
      overflowX="hidden"
      css={{ '&::-webkit-scrollbar': { display: 'none' } }}
    >
      <Flex direction="column" gap={4} w="full" minH="full">

        {/* Logo */}
        <Flex
          px={showLabel ? { base: 0, md: 1 } : 0}
          justify={showLabel ? { base: "center", md: "flex-start" } : "center"}
          flexShrink={0}
        >
          <Link as={RouterLink} to="/" _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
            {/* Desktop: full logo when expanded, mini when collapsed */}
            <Image
              src='/logo.png'
              alt="AniSnap"
              maxH="40px"
              objectFit="contain"
              display={showLabel ? { base: "none", md: "block" } : "none"}
            />
            <Image
              src='/nobglgo.png'
              alt="AniSnap"
              maxH="34px"
              objectFit="contain"
              display={showLabel ? { base: "block", md: "none" } : "block"}
            />
          </Link>
        </Flex>

        {/* Nav items */}
        <VStack spacing={0.5} align="stretch" flex={1}>
          <SidebarItems />
        </VStack>

        {/* Bottom controls */}
        <VStack spacing={0.5} align="stretch" flexShrink={0}>
          <Divider borderColor={dividerColor} mb={1} />

          {/* Collapse / Expand — desktop only */}
          <Tooltip
            hasArrow
            label={leftSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            placement="right"
            openDelay={500}
            bg="gray.800"
            color="white"
            display={{ base: "none", md: "block" }}
          >
            <Flex
              as="button"
              onClick={toggleLeft}
              alignItems="center"
              gap={3}
              _hover={{ bg: hoverBg, color: '#E53935' }}
              borderRadius="xl"
              p={3}
              cursor="pointer"
              color={subtleColor}
              transition="all 0.2s"
              display={{ base: "none", md: "flex" }}
              {...itemProps}
            >
              <Box p={2} borderRadius="lg" bg={iconBg} flexShrink={0}>
                {leftSidebarOpen
                  ? <FiChevronsLeft size={18} />
                  : <FiChevronsRight size={18} />
                }
              </Box>
              <Box
                display={showLabel ? { base: "none", md: "block" } : "none"}
                fontWeight="medium"
                fontSize="sm"
                whiteSpace="nowrap"
              >
                {leftSidebarOpen ? "Collapse" : "Expand"}
              </Box>
            </Flex>
          </Tooltip>

          {/* Logout */}
          <Tooltip
            hasArrow
            label="Log out"
            placement="right"
            openDelay={500}
            bg="gray.800"
            color="white"
            display={showLabel ? { base: "block", md: "none" } : "block"}
          >
            <Flex
              onClick={!isLoggingOut ? handleLogout : undefined}
              alignItems="center"
              gap={3}
              _hover={{ bg: hoverBg, color: '#E53935' }}
              borderRadius="xl"
              p={3}
              cursor={isLoggingOut ? "not-allowed" : "pointer"}
              color={textColor}
              opacity={isLoggingOut ? 0.5 : 1}
              transition="all 0.2s"
              {...itemProps}
            >
              <Box p={2} borderRadius="lg" bg={iconBg} flexShrink={0}>
                <FiLogOut size={18} />
              </Box>
              <Box
                display={showLabel ? { base: "none", md: "block" } : "none"}
                fontWeight="medium"
                fontSize="sm"
                whiteSpace="nowrap"
              >
                Log out
              </Box>
            </Flex>
          </Tooltip>
        </VStack>

      </Flex>
    </Box>
  )
}

export default Sidebar
