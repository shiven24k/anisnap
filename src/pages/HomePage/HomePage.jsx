import { Box, Grid, VStack, Text, Heading, useColorModeValue, Flex, Avatar, HStack } from "@chakra-ui/react"
import FeedPosts from "../../components/FeedPosts/FeedPosts"
import SuggestedUsers from "../../SuggestedUsers/SuggestedUsers"
import useAuthStore from "../../store/authStore"
import { Link } from "react-router-dom"

const HomePage = () => {
  const bgColor = useColorModeValue('#F0F2F5', '#0A0A12')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.600')
  const cardBg = useColorModeValue('white', '#1A1A2E')
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const authUser = useAuthStore((state) => state.user)

  return (
    <Box minH="100vh" bg={bgColor} py={6}>
      <Grid templateColumns={{base: "1fr", xl: "1fr 380px"}} gap={6} maxW="1400px" mx="auto" px={4}>
        
        {/* Main Feed */}
        <VStack spacing={6} align="stretch">
          {/* Welcome Header */}
          <Flex 
            bg={cardBg} 
            p={5} 
            borderRadius="2xl"
            align="center"
            gap={4}
            border="1px solid"
            borderColor={borderColor}
            boxShadow={useColorModeValue('0 2px 10px rgba(0,0,0,0.05)', 'none')}
          >
            <Box position="relative">
              <Avatar 
                size="lg" 
                src={authUser?.profilePicURL}
                border="3px solid"
                borderColor="#E53935"
              />
              <Box 
                position="absolute" 
                bottom={0} 
                right={0} 
                w={4} 
                h={4} 
                bg="#E53935" 
                borderRadius="full"
                border="2px solid"
                borderColor={cardBg}
              />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="700" color={textColor}>
                Welcome back! 👋
              </Text>
              <Text fontSize="sm" color={subTextColor}>
                See what's happening in the anime community
              </Text>
            </Box>
          </Flex>

          {/* Section Title */}
          <HStack spacing={3} px={2}>
            <Box w={2} h={8} bgGradient="linear(to-b, #E53935, #FF6F61)" borderRadius="full" />
            <Box>
              <Heading size="md" color={textColor} fontWeight="700">Explore</Heading>
              <Text color={subTextColor} fontSize="xs">Discover new content</Text>
            </Box>
          </HStack>

          <FeedPosts/>
        </VStack>
        
        {/* Sidebar - Desktop Only */}
        <Box display={{base:"none", xl:"block"}} position="sticky" top={6} h="fit-content">
          <SuggestedUsers/>
        </Box>
      </Grid>
    </Box>
  )
}

export default HomePage