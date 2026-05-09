import { 
  Box, 
  Spinner, 
  Text, 
  Flex,
  useColorModeValue,
  Grid,
  SimpleGrid
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
    <Box>
      {/* Unique Grid Layout - Alternating sizes */}
      <Grid 
        templateColumns={{base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
        gap={4}
      >
        {posts.map((post, index) => (
          <Box
            key={post.id}
            gridColumn={index % 5 === 0 ? {base: "1", md: "span 2"} : "span 1"}
            gridRow={index % 5 === 0 ? {base: "auto", md: "span 2"} : "span 1"}
          >
            <FeedPost post={post} />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default FeedPosts