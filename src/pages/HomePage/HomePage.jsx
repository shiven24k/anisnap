import {
  Box, Flex, Grid, Heading, HStack, Text, Tooltip,
  VStack, Avatar, useColorModeValue,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { FiUsers } from "react-icons/fi"
import FeedPosts from "../../components/FeedPosts/FeedPosts"
import SuggestedUsers from "../../SuggestedUsers/SuggestedUsers"
import useAuthStore from "../../store/authStore"
import useUIStore from "../../store/uiStore"

const HomePage = () => {
  const bgColor = useColorModeValue('#F0F2F5', '#0A0A12')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const cardBg = useColorModeValue('white', '#1A1A2E')
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const welcomeShadow = useColorModeValue('0 2px 10px rgba(0,0,0,0.05)', 'none')
  const peopleBorderColor = useColorModeValue('gray.200', 'whiteAlpha.150')
  const peopleHoverBg = useColorModeValue('gray.50', 'whiteAlpha.100')

  const authUser = useAuthStore((state) => state.user)
  const { rightSidebarOpen, toggleRight } = useUIStore()

  // Show welcome card once per session; auto-dismiss after 10 s
  const [showWelcome, setShowWelcome] = useState(() => (
    !sessionStorage.getItem('anisnap-welcome-seen')
  ))

  useEffect(() => {
    if (!showWelcome) return
    sessionStorage.setItem('anisnap-welcome-seen', 'true')
    const t = setTimeout(() => setShowWelcome(false), 10000)
    return () => clearTimeout(t)
  }, [showWelcome])

  return (
    <Box minH="100vh" bg={bgColor} pt={4} pb={8}>
      <Grid
        templateColumns={{ base: "1fr", xl: rightSidebarOpen ? "1fr 260px" : "1fr" }}
        gap={4}
        w="100%"
        px={3}
        transition="grid-template-columns 0.28s cubic-bezier(0.4,0,0.2,1)"
      >

        {/* ─── Main feed column ─── */}
        <VStack spacing={4} align="stretch" minW={0}>

          {/* Welcome banner — auto-dismisses */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                key="welcome"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Flex
                  bg={cardBg}
                  px={4}
                  py={3}
                  borderRadius="2xl"
                  align="center"
                  gap={3}
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow={welcomeShadow}
                  position="relative"
                  overflow="hidden"
                >
                  <Box position="relative" flexShrink={0}>
                    <Avatar
                      size="sm"
                      src={authUser?.profilePicURL}
                      border="2px solid #E53935"
                    />
                    <Box
                      position="absolute"
                      bottom={0}
                      right={0}
                      w="9px"
                      h="9px"
                      bg="#4CAF50"
                      borderRadius="full"
                      border="1.5px solid"
                      borderColor={cardBg}
                    />
                  </Box>
                  <Box flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight="700" color={textColor} lineHeight="1.3">
                      Welcome back! 👋
                    </Text>
                    <Text fontSize="11px" color={subTextColor}>
                      See what's happening in the anime community
                    </Text>
                  </Box>
                  {/* countdown bar */}
                  <Box position="absolute" bottom={0} left={0} right={0} h="2px" overflow="hidden">
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

          {/* Section header */}
          <Flex align="center" justify="space-between" px={1}>
            <HStack spacing={2.5}>
              <Box w="3px" h={5} bgGradient="linear(to-b, #E53935, #FF6F61)" borderRadius="full" />
              <Box>
                <Heading size="sm" color={textColor} fontWeight="700" lineHeight="1.2">
                  Explore
                </Heading>
                <Text color={subTextColor} fontSize="10px">
                  Discover new content
                </Text>
              </Box>
            </HStack>

            {/* "People" pill — only visible when right panel is hidden */}
            {!rightSidebarOpen && (
              <Tooltip
                hasArrow
                label="Show suggestions"
                placement="left"
                openDelay={400}
                bg="gray.800"
                color="white"
              >
                <Flex
                  as="button"
                  onClick={toggleRight}
                  display={{ base: "none", xl: "flex" }}
                  align="center"
                  gap={1.5}
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  border="1px solid"
                  borderColor={peopleBorderColor}
                  color={subTextColor}
                  fontSize="11px"
                  fontWeight="600"
                  _hover={{ color: '#E53935', borderColor: '#E53935', bg: peopleHoverBg }}
                  transition="all 0.2s"
                  cursor="pointer"
                  aria-label="Show suggestions panel"
                >
                  <FiUsers size={12} />
                  People
                </Flex>
              </Tooltip>
            )}
          </Flex>

          <FeedPosts />
        </VStack>

        {/* ─── Right panel ─── */}
        {rightSidebarOpen && (
          <Box
            display={{ base: "none", xl: "block" }}
            position="sticky"
            top={4}
            h="fit-content"
          >
            <SuggestedUsers />
          </Box>
        )}

      </Grid>
    </Box>
  )
}

export default HomePage
