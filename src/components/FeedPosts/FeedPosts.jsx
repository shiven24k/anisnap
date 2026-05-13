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
  const {isLoading, posts} = useGetFeedPosts();
  const subTextColor = useColorModeValue('gray.500', 'gray.400')
  const textColor = useColorModeValue('#1A1A2E', 'white')

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
        bg={useColorModeValue('white', '#1A1A2E')}
        borderRadius="2xl"
        border="1px solid"
        borderColor={useColorModeValue('gray.100', 'whiteAlpha.100')}
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
        columnCount: [1, 1, 2, 3],
        columnGap: '16px',
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
            marginBottom: '16px',
          }}
        >
          <FeedPost post={post} />
        </Box>
      ))}
    </Box>
  )
}

export default FeedPosts
