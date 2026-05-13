import { Box, Grid, VStack, Text, Heading, useColorModeValue, Flex, Avatar, HStack, Tooltip } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi"
import FeedPosts from "../../components/FeedPosts/FeedPosts"
import SuggestedUsers from "../../SuggestedUsers/SuggestedUsers"
import useAuthStore from "../../store/authStore"
import useUIStore from "../../store/uiStore"

const HomePage = () => {
  const bgColor = useColorModeValue('#F0F2F5', '#0A0A12')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.600')
  const cardBg = useColorModeValue('white', '#1A1A2E')
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const welcomeShadow = useColorModeValue('0 2px 10px rgba(0,0,0,0.05)', 'none')
  const toggleColor = useColorModeValue('#718096', '#A0AEC0')
  const toggleHoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')

  const authUser = useAuthStore((state) => state.user)
  const { rightSidebarOpen, toggleRight } = useUIStore()

  // Show welcome only once per browser session; auto-dismiss after 10 s
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem('anisnap-welcome-seen')
  })

  useEffect(() => {
    if (!showWelcome) return
    sessionStorage.setItem('anisnap-welcome-seen', 'true')
    const t = setTimeout(() => setShowWelcome(false), 10000)
    return () => clearTimeout(t)
  }, [showWelcome])

  return (
    <Box minH="100vh" bg={bgColor} py={5}>
      <Grid
        templateColumns={{ base: "1fr", xl: rightSidebarOpen ? "1fr 320px" : "1fr" }}
        gap={5}
        maxW="100%"
        mx="auto"
        px={4}
        transition="grid-template-columns 0.3s cubic-bezier(0.4,0,0.2,1)"
      >
        {/* Main Feed */}
        <VStack spacing={4} align="stretch" minW={0}>

          {/* Welcome card — fades out after 10 s, gone on reload */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                key="welcome"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Flex
                  bg={cardBg}
                  p={4}
                  borderRadius="2xl"
                  align="center"
                  gap={4}
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow={welcomeShadow}
                  position="relative"
                  overflow="hidden"
                >
                  <Box position="relative" flexShrink={0}>
                    <Avatar
                      size="md"
                      src={authUser?.profilePicURL}
                      border="3px solid"
                      borderColor="#E53935"
                    />
                    <Box
                      position="absolute"
                      bottom={0}
                      right={0}
                      w={3}
                      h={3}
                      bg="#4CAF50"
                      borderRadius="full"
                      border="2px solid"
                      borderColor={cardBg}
                    />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="md" fontWeight="700" color={textColor}>
                      Welcome back! 👋
                    </Text>
                    <Text fontSize="xs" color={subTextColor}>
                      See what's happening in the anime community
                    </Text>
                  </Box>
                  {/* 10 s countdown bar at the bottom */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    h="2px"
                    bg="whiteAlpha.100"
                    overflow="hidden"
                  >
                    <motion.div
                      style={{ height: "100%", background: "#E53935", width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 10, ease: "linear" }}
                    />
                  </Box>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section header + right panel toggle */}
          <Flex align="center" justify="space-between" px={1}>
            <HStack spacing={3}>
              <Box w={1.5} h={6} bgGradient="linear(to-b, #E53935, #FF6F61)" borderRadius="full" />
              <Box>
                <Heading size="sm" color={textColor} fontWeight="700">Explore</Heading>
                <Text color={subTextColor} fontSize="xs">Discover new content</Text>
              </Box>
            </HStack>

            <Tooltip
              label={rightSidebarOpen ? "Hide suggestions" : "Show suggestions"}
              placement="left"
              hasArrow
            >
              <Box
                as="button"
                onClick={toggleRight}
                display={{ base: "none", xl: "flex" }}
                alignItems="center"
                justifyContent="center"
                w={7}
                h={7}
                borderRadius="lg"
                color={toggleColor}
                _hover={{ color: "#E53935", bg: toggleHoverBg }}
                transition="all 0.2s"
                aria-label="Toggle right panel"
              >
                {rightSidebarOpen
                  ? <FiChevronsRight size={16} />
                  : <FiChevronsLeft size={16} />
                }
              </Box>
            </Tooltip>
          </Flex>

          <FeedPosts />
        </VStack>

        {/* Right panel — suggested users */}
        {rightSidebarOpen && (
          <Box display={{ base: "none", xl: "block" }} position="sticky" top={5} h="fit-content">
            <SuggestedUsers />
          </Box>
        )}
      </Grid>
    </Box>
  )
}

export default HomePage
