import {
  Box,
  Spinner,
  Text,
  Flex,
  VStack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'
import useUIStore from '../../store/uiStore'

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts()
  const subTextColor = useColorModeValue('gray.500', 'gray.400')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const emptyBg = useColorModeValue('white', '#1A1A2E')
  const emptyBorder = useColorModeValue('gray.100', 'whiteAlpha.100')

  const { leftSidebarOpen, rightSidebarOpen } = useUIStore()

  // Base column count from viewport breakpoint
  const bpCols = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 3, xl: 3 }) ?? 2

  // Gain an extra column at xl+ when both sidebars are collapsed (more real estate)
  const numCols = bpCols === 3 && !leftSidebarOpen && !rightSidebarOpen ? 4 : bpCols

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="60vh" w="full">
        <Spinner size="xl" color="#E53935" thickness="4px" />
      </Flex>
    )
  }

  if (!posts.length) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="50vh"
        bg={emptyBg}
        borderRadius="2xl"
        border="1px solid"
        borderColor={emptyBorder}
      >
        <Box
          w={20}
          h={20}
          borderRadius="full"
          bgGradient="linear(to-br, #E53935, #FF6F61)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={4}
        >
          <Text fontSize="3xl">🎌</Text>
        </Box>
        <Text fontSize="xl" fontWeight="700" color={textColor} mb={2}>
          Welcome to AniSnap!
        </Text>
        <Text color={subTextColor} fontSize="sm" textAlign="center" maxW="300px">
          Start following anime fans to see their posts here
        </Text>
      </Flex>
    )
  }

  // Round-robin distribute posts across columns for masonry effect
  const columns = Array.from({ length: numCols }, (_, colIdx) =>
    posts.filter((_, postIdx) => postIdx % numCols === colIdx)
  )

  return (
    <Flex w="100%" gap={3} align="flex-start">
      {columns.map((colPosts, colIdx) => (
        <VStack key={colIdx} spacing={3} align="stretch" flex={1} minW={0}>
          {colPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </VStack>
      ))}
    </Flex>
  )
}

export default FeedPosts
