import {
  Box,
  Image,
  Flex,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import useLikePost from '../../hooks/useLikePost'
import useAuthStore from '../../store/authStore'
import { Link } from 'react-router-dom'

const FeedPost = ({post}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const { isLiked, likes, handleLikePost, isUpdating: isLiking } = useLikePost(post);
  const authUser = useAuthStore((state) => state.user);

  const postLikes = post.likes || []
  const currentLikes = likes !== undefined ? likes : postLikes.length
  const currentIsLiked = isLiked !== undefined ? isLiked : postLikes.includes(authUser?.uid)

  const handleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await handleLikePost()
  }

  return (
    <Box
      borderRadius="16px"
      overflow="hidden"
      position="relative"
      role="group"
      cursor="pointer"
      transition="transform 0.25s, box-shadow 0.25s"
      _hover={{ transform: 'translateY(-3px)', boxShadow: '0 12px 30px rgba(0,0,0,0.35)' }}
      boxShadow="0 2px 8px rgba(0,0,0,0.15)"
    >
      {/* Image - natural aspect ratio, no cropping */}
      <Image
        src={post.imageURL}
        alt={post.caption || "post"}
        w="100%"
        h="auto"
        display="block"
      />

      {/* Dark scrim on hover */}
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.500"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.25s"
        borderRadius="16px"
      />

      {/* Like button - top right, hidden until hover (always shown if liked) */}
      {authUser && (
        <Box
          as="button"
          position="absolute"
          top={2}
          right={2}
          onClick={handleLike}
          bg={currentIsLiked ? '#E53935' : 'whiteAlpha.900'}
          borderRadius="full"
          w={8}
          h={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 2px 8px rgba(0,0,0,0.3)"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.15)' }}
          opacity={currentIsLiked ? 1 : 0}
          _groupHover={{ opacity: 1 }}
          disabled={isLiking}
          zIndex={3}
        >
          {currentIsLiked ?
            <AiFillHeart size={16} color="white" /> :
            <AiOutlineHeart size={16} color="#E53935" />
          }
        </Box>
      )}

      {/* Bottom gradient overlay with user info - shows on hover */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-t, blackAlpha.900, blackAlpha.500, transparent)"
        p={3}
        pt={10}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.25s"
        zIndex={2}
      >
        <Flex align="center" justify="space-between">
          <HStack spacing={2}>
            <Link to={`/${userProfile?.username}`} onClick={e => e.stopPropagation()}>
              <Avatar
                size="xs"
                src={userProfile?.profilePicURL}
                name={userProfile?.username}
                border="1.5px solid white"
              />
            </Link>
            <Link to={`/${userProfile?.username}`} onClick={e => e.stopPropagation()}>
              <Text color="white" fontSize="xs" fontWeight="600">
                {userProfile?.username}
              </Text>
            </Link>
          </HStack>
          {currentLikes > 0 && (
            <HStack spacing={1}>
              <AiFillHeart size={12} color="#ff6b6b" />
              <Text color="white" fontSize="xs" fontWeight="600">{currentLikes}</Text>
            </HStack>
          )}
        </Flex>
        {post.caption && (
          <Text color="whiteAlpha.700" fontSize="xs" mt={1} noOfLines={2} pl={7}>
            {post.caption}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default FeedPost
