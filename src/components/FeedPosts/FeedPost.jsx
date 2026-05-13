import {
  Box,
  Image,
  Flex,
  Text,
  Avatar,
  HStack,
} from '@chakra-ui/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import useLikePost from '../../hooks/useLikePost'
import useAuthStore from '../../store/authStore'
import { Link } from 'react-router-dom'

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy)
  const { isLiked, likes, handleLikePost, isUpdating: isLiking } = useLikePost(post)
  const authUser = useAuthStore((state) => state.user)

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
      borderRadius="12px"
      overflow="hidden"
      position="relative"
      role="group"
      cursor="pointer"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: '0 10px 28px rgba(0,0,0,0.32)' }}
      boxShadow="0 2px 6px rgba(0,0,0,0.18)"
    >
      {/* Image — natural aspect ratio */}
      <Image
        src={post.imageURL}
        alt={post.caption || ''}
        w="100%"
        h="auto"
        display="block"
      />

      {/* Dark scrim — hover only */}
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.500"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.2s"
      />

      {/* Mini liked badge — bottom-right, always visible when liked, hides on hover */}
      {currentIsLiked && (
        <Flex
          position="absolute"
          bottom={2}
          right={2}
          align="center"
          gap="3px"
          bg="blackAlpha.700"
          borderRadius="full"
          px="6px"
          py="3px"
          zIndex={4}
          opacity={1}
          _groupHover={{ opacity: 0 }}
          transition="opacity 0.18s"
          pointerEvents="none"
        >
          <AiFillHeart size={9} color="#E53935" />
          {currentLikes > 0 && (
            <Text color="white" fontSize="9px" fontWeight="700" lineHeight={1}>
              {currentLikes}
            </Text>
          )}
        </Flex>
      )}

      {/* Bottom overlay — hover only: user info + single like button */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-t, blackAlpha.900, blackAlpha.500, transparent)"
        px={3}
        pb={3}
        pt={10}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.2s"
        zIndex={3}
      >
        <Flex align="center" justify="space-between">
          {/* User info */}
          <HStack spacing={1.5} minW={0} flex={1} mr={2}>
            <Link to={`/${userProfile?.username}`} onClick={e => e.stopPropagation()}>
              <Avatar
                size="xs"
                src={userProfile?.profilePicURL}
                name={userProfile?.username}
                border="1.5px solid white"
                flexShrink={0}
              />
            </Link>
            <Link to={`/${userProfile?.username}`} onClick={e => e.stopPropagation()}>
              <Text
                color="white"
                fontSize="11px"
                fontWeight="600"
                lineHeight={1}
                noOfLines={1}
              >
                {userProfile?.username}
              </Text>
            </Link>
          </HStack>

          {/* Like button — the only like control */}
          {authUser && (
            <Flex
              as="button"
              onClick={handleLike}
              align="center"
              gap="3px"
              bg={currentIsLiked ? 'rgba(229,57,53,0.25)' : 'whiteAlpha.200'}
              borderRadius="full"
              px="8px"
              py="4px"
              transition="background 0.15s"
              _hover={{ bg: currentIsLiked ? 'rgba(229,57,53,0.4)' : 'whiteAlpha.300' }}
              disabled={isLiking}
              flexShrink={0}
              cursor="pointer"
              border="none"
            >
              {currentIsLiked
                ? <AiFillHeart size={13} color="#E53935" />
                : <AiOutlineHeart size={13} color="white" />
              }
              {currentLikes > 0 && (
                <Text color="white" fontSize="10px" fontWeight="700" lineHeight={1}>
                  {currentLikes}
                </Text>
              )}
            </Flex>
          )}
        </Flex>

        {/* Caption — one line, compact */}
        {post.caption && (
          <Text
            color="whiteAlpha.750"
            fontSize="10px"
            mt="6px"
            noOfLines={1}
            pl="26px"
          >
            {post.caption}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default FeedPost
