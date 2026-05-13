import { 
  Box, 
  Image, 
  Flex,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
  Input,
  Collapse,
  VStack,
  Spinner
} from '@chakra-ui/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { timeAgo } from '../../utils/timeAgo'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import useLikePost from '../../hooks/useLikePost'
import usePostComment from '../../hooks/usePostComment'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import { Link } from 'react-router-dom'

const CommentItem = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')

  if (isLoading) {
    return <Spinner size="xs" color="#E53935" />
  }

  return (
    <Text fontSize="sm">
      <Link to={`/${userProfile?.username}`}>
        <Text 
          as="span" 
          fontWeight="600" 
          color={textColor} 
          _hover={{ color: '#E53935' }}
        >
          {userProfile?.username || 'User'}
        </Text>
      </Link>
      <Text as="span" color={subTextColor}> {comment.comment}</Text>
    </Text>
  )
}

const FeedPost = ({post}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const { isLiked, likes, handleLikePost, isUpdating: isLiking } = useLikePost(post);
  const { handlePostComment, isCommenting } = usePostComment();
  const authUser = useAuthStore((state) => state.user);
  
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  
  const cardBg = useColorModeValue('white', '#1A1A2E')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const inputBg = useColorModeValue('gray.100', 'whiteAlpha.100')

  const postLikes = post.likes || []
  const postComments = post.comments || []
  const currentLikes = likes !== undefined ? likes : postLikes.length
  const currentIsLiked = isLiked !== undefined ? isLiked : postLikes.includes(authUser?.uid)

  const handleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await handleLikePost()
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim() || isCommenting) return
    await handlePostComment(post.id, commentText.trim())
    setCommentText("")
    setShowComments(true)
  }

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)' }}
      boxShadow={useColorModeValue('0 4px 20px rgba(0,0,0,0.08)', '0 4px 20px rgba(0,0,0,0.4)')}
    >
      {/* Header */}
      <Flex align="center" justify="space-between" p={3}>
        <HStack spacing={3}>
          <Link to={`/${userProfile?.username}`}>
            <Avatar 
              src={userProfile?.profilePicURL} 
              name={userProfile?.username}
              size="sm"
              border="2px solid"
              borderColor="#E53935"
              _hover={{ transform: 'scale(1.1)' }}
              transition="transform 0.2s"
            />
          </Link>
          <Link to={`/${userProfile?.username}`}>
            <Text fontWeight="600" fontSize="sm" color={textColor} _hover={{ color: '#E53935' }}>
              {userProfile?.username}
            </Text>
          </Link>
        </HStack>
        <Text fontSize="xs" color={subTextColor}>
          {timeAgo(post.createdAt)}
        </Text>
      </Flex>

      {/* Image with Like Overlay */}
      <Box position="relative" overflow="hidden">
        <Image 
          src={post.imageURL}
          alt="Feed Post"
          objectFit="cover"
          w="100%"
          h="auto"
          transition="transform 0.4s"
          _hover={{ transform: 'scale(1.02)' }}
          cursor="pointer"
        />
        
        {/* Like Button - Clean Circle Design */}
        <Box 
          as="button"
          position="absolute"
          bottom={4}
          right={4}
          onClick={handleLike}
          bg={currentIsLiked ? '#E53935' : 'white'}
          borderRadius="full"
          p={3}
          boxShadow="0 2px 10px rgba(0,0,0,0.3)"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.1)', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' }}
          disabled={isLiking}
          zIndex={2}
        >
          {currentIsLiked ? 
            <AiFillHeart size={24} color="white" /> : 
            <AiOutlineHeart size={24} color="#E53935" />
          }
        </Box>
      </Box>

      {/* Actions & Info */}
      <Box p={4}>
        {/* Like Count */}
        {currentLikes > 0 && (
          <Text fontSize="sm" fontWeight="600" color={textColor} mb={3}>
            {currentLikes} likes
          </Text>
        )}

        {/* Caption */}
        {post.caption && (
          <Text fontSize="sm" color={subTextColor} mb={3}>
            <Text as="span" fontWeight="600" color={textColor} mr={1}>{userProfile?.username}</Text>
            {post.caption}
          </Text>
        )}

        {/* Comments Toggle */}
        {postComments.length > 0 && (
          <Text 
            fontSize="sm" 
            color={subTextColor} 
            cursor="pointer" 
            fontWeight="500"
            _hover={{ color: '#E53935' }}
            onClick={() => setShowComments(!showComments)}
            mb={2}
          >
            {showComments ? 'Hide comments' : `Show ${postComments.length} comments`}
          </Text>
        )}

        {/* Comments List - Inline */}
        <Collapse in={showComments} animateOpacity>
          <VStack align="stretch" spacing={2} mb={3} pl={2} borderLeft="2px solid" borderColor="#E53935">
            {postComments.map((comment, idx) => (
              <CommentItem key={idx} comment={comment} />
            ))}
          </VStack>
        </Collapse>

        {/* Add Comment Input */}
        {authUser ? (
          <form onSubmit={handleCommentSubmit}>
            <Flex align="center" gap={2}>
              <Avatar size="xs" src={authUser.profilePicURL} />
              <Input
                placeholder="Add a comment..."
                size="sm"
                bg={inputBg}
                border="none"
                borderRadius="full"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                _focus={{ boxShadow: 'none' }}
              />
              {commentText.trim() && (
                <Text 
                  as="button"
                  type="submit"
                  color="#E53935" 
                  fontWeight="600" 
                  fontSize="sm" 
                  cursor="pointer"
                  _hover={{ color: '#C62828' }}
                >
                  {isCommenting ? '...' : 'Post'}
                </Text>
              )}
            </Flex>
          </form>
        ) : (
          <Text fontSize="xs" color={subTextColor} mt={2}>
            Log in to like and comment
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default FeedPost