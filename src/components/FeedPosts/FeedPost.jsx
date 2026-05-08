import { 
  Box, 
  Image, 
  VStack, 
  Divider, 
  chakra 
} from '@chakra-ui/react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const AnimatedBox = chakra(Box, {
  baseStyle: {
    transition: "all 0.3s ease",
    _hover: {
      transform: "scale(1.015)",
      boxShadow: "xl"
    }
  }
})

const FeedPost = ({post}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <AnimatedBox 
      bg="gray.700" 
      borderRadius="2xl" 
      overflow="hidden"
      position="relative"
      border="1px solid"
      borderColor="gray.600"
      mb={6}
      maxWidth={{base: "full", md: "500px"}}
    >
      <VStack spacing={0} w="full">
        <PostHeader post={post} creatorProfile={userProfile} />
        <Divider borderColor="gray.600" />
        <Box 
          w="full" 
          maxHeight="500px" 
          overflow="hidden"
        >
          <Image 
            src={post.imageURL} 
            alt="Feed Post" 
            objectFit="cover" 
            w="100em" 
            h="full"
            transition="transform 0.3s ease"
            _hover={{
              transform: "scale(1.05)"
            }}
          />
        </Box>
        <Divider borderColor="gray.600" />
        <PostFooter post={post} creatorProfile={userProfile}/>
      </VStack>
    </AnimatedBox>
  )
}

export default FeedPost
