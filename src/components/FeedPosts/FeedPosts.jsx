import {
  Box,
  Spinner,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();
  const subTextColor = useColorModeValue('gray.500', 'gray.400')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const emptyBg = useColorModeValue('white', '#1A1A2E')
  const emptyBorder = useColorModeValue('gray.100', 'whiteAlpha.100')

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
        <Text fontSize="xl" fontWeight="700" color={textColor} mb={2}>Welcome to AniSnap!</Text>
        <Text color={subTextColor} fontSize="sm" textAlign="center" maxW="300px">
          Start following anime fans to see their posts here
        </Text>
      </Flex>
    )
  }

  return (
    <Box
      sx={{
        // columnWidth lets the browser fit as many columns as possible
        // at ~260px each — automatically gains columns as sidebars collapse
        columnWidth: '260px',
        columnGap: '10px',
      }}
    >
      {posts.map((post) => (
        <Box
          key={post.id}
          sx={{
            breakInside: 'avoid',
            pageBreakInside: 'avoid',
            display: 'inline-block',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          <FeedPost post={post} />
        </Box>
      ))}
    </Box>
  )
}

export default FeedPosts
