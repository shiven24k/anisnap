import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react"
import Comment from "../Comment/Comment"
import usePostComment from "../../hooks/usePostComment"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import useAuthStore from "../../store/authStore"
import useLikePost from "../../hooks/useLikePost"
import { useEffect, useRef, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FiTrash2, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"

const CommentsModal = ({ isOpen, onClose, post, isOwner = false, onDelete }) => {
  const { handlePostComment, isCommenting } = usePostComment()
  const { userProfile } = useGetUserProfileById(post.createdBy)
  const { isLiked, likes, handleLikePost } = useLikePost(post)
  const authUser = useAuthStore((state) => state.user)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const commentRef = useRef(null)
  const commentsContainerRef = useRef(null)

  const modalBg = useColorModeValue('white', '#1A1A2E')
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const inputBg = useColorModeValue('gray.50', 'whiteAlpha.100')
  const deleteHoverBg = useColorModeValue('red.50', 'whiteAlpha.100')
  const confirmBg = useColorModeValue('red.50', 'rgba(229,57,53,0.08)')

  const postComments = post.comments || []
  const currentLikes = likes !== undefined ? likes : (post.likes || []).length
  const currentIsLiked = isLiked !== undefined ? isLiked : (post.likes || []).includes(authUser?.uid)

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!commentRef.current?.value.trim()) return
    await handlePostComment(post.id, commentRef.current.value.trim())
    commentRef.current.value = ""
  }

  const handleConfirmDelete = () => {
    setConfirmDelete(false)
    onDelete()
  }

  useEffect(() => {
    if (!isOpen) setConfirmDelete(false)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && commentsContainerRef.current) {
      setTimeout(() => {
        commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight
      }, 100)
    }
  }, [isOpen, postComments.length])

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="4xl">
      <ModalOverlay bg="rgba(0,0,0,0.75)" backdropFilter="blur(8px)" />
      <ModalContent
        bg={modalBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        overflow="hidden"
        maxH="90vh"
      >
        <Flex direction={{ base: "column", md: "row" }} h={{ base: "auto", md: "85vh" }} maxH="85vh">

          {/* ── Left: image ── */}
          <Box
            flex="1"
            bg="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH={{ base: "200px", md: "auto" }}
            maxH={{ base: "280px", md: "100%" }}
            overflow="hidden"
          >
            <Image
              src={post.imageURL}
              alt="post"
              objectFit="contain"
              w="100%"
              h="100%"
            />
          </Box>

          {/* ── Right: comments panel ── */}
          <Flex
            direction="column"
            w={{ base: "100%", md: "340px" }}
            flexShrink={0}
            borderLeft={{ base: "none", md: "1px solid" }}
            borderTop={{ base: "1px solid", md: "none" }}
            borderColor={borderColor}
          >
            {/* Post author header — flips to confirm row when delete is pending */}
            {confirmDelete ? (
              <Flex
                align="center"
                justify="space-between"
                px={4}
                py={3}
                borderBottom="1px solid"
                borderColor={borderColor}
                bg={confirmBg}
                gap={3}
              >
                <Flex align="center" gap={2} minW={0}>
                  <FiTrash2 size={14} color="#E53935" />
                  <Box minW={0}>
                    <Text fontSize="12px" fontWeight="700" color="#E53935" noOfLines={1}>
                      Delete this post?
                    </Text>
                    <Text fontSize="10px" color={subTextColor}>
                      This can't be undone
                    </Text>
                  </Box>
                </Flex>
                <Flex gap={2} flexShrink={0}>
                  <Button
                    size="xs"
                    variant="ghost"
                    borderRadius="lg"
                    color={subTextColor}
                    _hover={{ bg: borderColor }}
                    onClick={() => setConfirmDelete(false)}
                    leftIcon={<FiX size={11} />}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    bg="#E53935"
                    color="white"
                    borderRadius="lg"
                    _hover={{ bg: '#C62828' }}
                    _active={{ bg: '#B71C1C' }}
                    leftIcon={<FiTrash2 size={11} />}
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex align="center" gap={3} p={4} borderBottom="1px solid" borderColor={borderColor}>
                <Link to={`/${userProfile?.username}`} onClick={onClose}>
                  <Avatar
                    size="sm"
                    src={userProfile?.profilePicURL}
                    border="2px solid #E53935"
                  />
                </Link>
                <Box flex={1} minW={0}>
                  <Link to={`/${userProfile?.username}`} onClick={onClose}>
                    <Text fontSize="13px" fontWeight="700" color={textColor} _hover={{ color: '#E53935' }}>
                      {userProfile?.username}
                    </Text>
                  </Link>
                  {post.caption && (
                    <Text fontSize="12px" color={subTextColor} noOfLines={2}>
                      {post.caption}
                    </Text>
                  )}
                </Box>
                {isOwner && onDelete && (
                  <IconButton
                    icon={<FiTrash2 size={15} />}
                    size="sm"
                    variant="ghost"
                    color={subTextColor}
                    _hover={{ color: '#E53935', bg: deleteHoverBg }}
                    borderRadius="lg"
                    aria-label="Delete post"
                    onClick={() => setConfirmDelete(true)}
                    flexShrink={0}
                  />
                )}
                <IconButton
                  icon={<FiX size={15} />}
                  size="sm"
                  variant="ghost"
                  color={subTextColor}
                  _hover={{ color: textColor, bg: deleteHoverBg }}
                  borderRadius="lg"
                  aria-label="Close"
                  onClick={onClose}
                  flexShrink={0}
                />
              </Flex>
            )}

            {/* Comments list */}
            <VStack
              ref={commentsContainerRef}
              flex={1}
              overflowY="auto"
              align="stretch"
              spacing={0}
              p={4}
              gap={3}
              css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(229,57,53,0.3)', borderRadius: '4px' } }}
            >
              {postComments.length === 0 ? (
                <Flex direction="column" align="center" justify="center" h="100%" py={8}>
                  <Text fontSize="2xl" mb={2}>💬</Text>
                  <Text fontSize="sm" fontWeight="700" color={textColor}>No comments yet</Text>
                  <Text fontSize="xs" color={subTextColor}>Be the first to comment!</Text>
                </Flex>
              ) : (
                postComments.map((comment, idx) => (
                  <Comment key={comment.id || idx} comment={comment} />
                ))
              )}
            </VStack>

            {/* Like + comment input footer */}
            <Box borderTop="1px solid" borderColor={borderColor} p={3}>
              {/* Like row */}
              <Flex align="center" gap={2} mb={3}>
                <Box
                  as="button"
                  onClick={handleLikePost}
                  color={currentIsLiked ? '#E53935' : textColor}
                  _hover={{ color: '#E53935' }}
                  transition="color 0.2s"
                  lineHeight={0}
                >
                  {currentIsLiked
                    ? <AiFillHeart size={22} color="#E53935" />
                    : <AiOutlineHeart size={22} />
                  }
                </Box>
                {currentLikes > 0 && (
                  <Text fontSize="13px" fontWeight="700" color={textColor}>
                    {currentLikes} {currentLikes === 1 ? 'like' : 'likes'}
                  </Text>
                )}
              </Flex>

              {/* Comment input */}
              {authUser && (
                <form onSubmit={handleSubmitComment}>
                  <Flex gap={2} align="center">
                    <Avatar size="xs" src={authUser.profilePicURL} border="1.5px solid #E53935" flexShrink={0} />
                    <Input
                      ref={commentRef}
                      placeholder="Add a comment…"
                      size="sm"
                      bg={inputBg}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="full"
                      color={textColor}
                      _placeholder={{ color: subTextColor }}
                      _focus={{ borderColor: '#E53935', boxShadow: 'none' }}
                      flex={1}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      bg="#E53935"
                      color="white"
                      borderRadius="full"
                      px={3}
                      _hover={{ bg: '#C62828' }}
                      isLoading={isCommenting}
                      flexShrink={0}
                    >
                      Post
                    </Button>
                  </Flex>
                </form>
              )}
            </Box>
          </Flex>

        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default CommentsModal
