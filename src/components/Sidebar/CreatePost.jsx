import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
  useColorModeValue,
  Text,
  VStack,
} from "@chakra-ui/react"
import { CreatePostLogo } from "../../assets/constants"
import { BsFillImageFill } from "react-icons/bs"
import { useRef, useState } from "react"
import usePreviewImg from "../../hooks/usePreviewImg"
import useShowToast from "../../hooks/useShowToast"
import useAuthStore from "../../store/authStore"
import usePostStore from "../../store/postStore"
import useUserProfileStore from "../../store/userProfileStore"
import useUIStore from "../../store/uiStore"
import { useLocation } from "react-router-dom"
import { supabase } from "../../supabase/supabaseClient"
import { mapPost, toPostRow } from "../../supabase/mappers"
import { uploadDataUrl } from "../../supabase/storage"

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [caption, setCaption] = useState("")
  const imageRef = useRef(null)
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg()
  const showToast = useShowToast()
  const { isLoading, handleCreatePost } = useCreatePost()
  const { leftSidebarOpen } = useUIStore()

  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const modalBg = useColorModeValue('white', '#1A1A2E')
  const modalBorder = useColorModeValue('gray.100', 'whiteAlpha.100')
  const uploadAreaBorder = useColorModeValue('gray.200', 'whiteAlpha.200')
  const uploadAreaHoverBg = useColorModeValue('gray.50', 'whiteAlpha.50')
  const inputBg = useColorModeValue('gray.50', 'whiteAlpha.100')

  const showLabel = leftSidebarOpen
  const w = leftSidebarOpen ? { base: 12, md: "full" } : 12
  const justify = leftSidebarOpen ? { base: "center", md: "flex-start" } : "center"
  const tooltipDisplay = leftSidebarOpen ? { base: "block", md: "none" } : "block"

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption)
      onClose()
      setCaption("")
      setSelectedFile(null)
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return (
    <>
      <Tooltip
        hasArrow
        label="Create Post"
        placement="right"
        openDelay={500}
        bg="gray.800"
        color="white"
        display={tooltipDisplay}
      >
        <Flex
          alignItems="center"
          gap={3}
          _hover={{ bg: hoverBg }}
          borderRadius="xl"
          p={3}
          w={w}
          justifyContent={justify}
          onClick={onOpen}
          transition="all 0.2s"
          cursor="pointer"
          color={textColor}
        >
          <Box p={2} borderRadius="lg" bg={iconBg} flexShrink={0} lineHeight={0}>
            <CreatePostLogo />
          </Box>
          <Box
            display={showLabel ? { base: "none", md: "block" } : "none"}
            fontWeight="medium"
            fontSize="sm"
            whiteSpace="nowrap"
          >
            Create
          </Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
        <ModalOverlay bg="rgba(0,0,0,0.75)" backdropFilter="blur(8px)" />
        <ModalContent
          bg={modalBg}
          border="1px solid"
          borderColor={modalBorder}
          borderRadius="2xl"
          shadow="2xl"
        >
          <ModalHeader borderBottom="1px solid" borderColor={modalBorder} pb={4}>
            <VStack align="start" spacing={0.5}>
              <Text fontWeight="700" color={textColor}>Create Post</Text>
              <Text fontSize="xs" fontWeight="normal" color={useColorModeValue('gray.500', 'whiteAlpha.500')}>
                Share your anime moment
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton color={textColor} />

          <ModalBody pb={6} pt={5}>
            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              bg={inputBg}
              border="1px solid"
              borderColor={modalBorder}
              borderRadius="xl"
              _focus={{ borderColor: '#E53935', boxShadow: '0 0 0 1px #E53935' }}
              _placeholder={{ color: useColorModeValue('gray.400', 'whiteAlpha.400') }}
              color={textColor}
              minH="90px"
              resize="none"
              mb={4}
            />

            <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />

            {!selectedFile && (
              <Flex
                align="center"
                gap={3}
                cursor="pointer"
                onClick={() => imageRef.current.click()}
                p={4}
                borderRadius="xl"
                border="2px dashed"
                borderColor={uploadAreaBorder}
                _hover={{ borderColor: '#E53935', bg: uploadAreaHoverBg }}
                transition="all 0.2s"
              >
                <Box p={2} borderRadius="lg" bg={iconBg} lineHeight={0}>
                  <BsFillImageFill size={18} color="#E53935" />
                </Box>
                <Text color={useColorModeValue('gray.500', 'whiteAlpha.600')} fontSize="sm">
                  Click to add an image
                </Text>
              </Flex>
            )}

            {selectedFile && (
              <Flex mt={4} w="full" position="relative" justifyContent="center">
                <Image
                  src={selectedFile}
                  alt="Selected image"
                  maxH="400px"
                  objectFit="contain"
                  borderRadius="xl"
                />
                <CloseButton
                  position="absolute"
                  top={2}
                  right={2}
                  bg="blackAlpha.700"
                  color="white"
                  borderRadius="full"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  _hover={{ bg: 'blackAlpha.800' }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter gap={3} borderTop="1px solid" borderColor={modalBorder} pt={4}>
            <Button
              variant="ghost"
              onClick={onClose}
              color={useColorModeValue('gray.600', 'whiteAlpha.700')}
              _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
              borderRadius="xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostCreation}
              isLoading={isLoading}
              bg="#E53935"
              color="white"
              borderRadius="xl"
              _hover={{ bg: '#C62828' }}
              _active={{ bg: '#B71C1C' }}
              px={6}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost

function useCreatePost() {
  const showToast = useShowToast()
  const [isLoading, setIsLoading] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const createPost = usePostStore((state) => state.createPost)
  const addPost = useUserProfileStore((state) => state.addPost)
  const userProfile = useUserProfileStore((state) => state.userProfile)
  const setAuthUser = useAuthStore((state) => state.setUser)
  const { pathname } = useLocation()

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return
    if (!authUser) { showToast("Error", "You must be logged in", "error"); return }
    if (!selectedFile) throw new Error("Please select an image")
    setIsLoading(true)

    const newPost = {
      caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    }

    try {
      const { data: insertedPost, error: insertError } = await supabase
        .from("posts").insert(toPostRow(newPost)).select().single()
      if (insertError) throw insertError

      const downloadURL = await uploadDataUrl("post-image", `${insertedPost.id}/image`, selectedFile)
      const { data: updatedPost, error: imageError } = await supabase
        .from("posts").update({ image_url: downloadURL }).eq("id", insertedPost.id).select().single()
      if (imageError) throw imageError

      const nextUserPosts = [...new Set([insertedPost.id, ...(authUser.posts || [])])]
      const { error: userError } = await supabase
        .from("profiles").update({ posts: nextUserPosts }).eq("uid", authUser.uid)
      if (userError) throw userError

      const createdPost = mapPost(updatedPost)
      const updatedAuthUser = { ...authUser, posts: nextUserPosts }
      setAuthUser(updatedAuthUser)
      localStorage.setItem("user-info", JSON.stringify(updatedAuthUser))

      if (userProfile?.uid === authUser.uid) createPost(createdPost)
      if (pathname !== "/" && userProfile?.uid === authUser.uid) addPost(createdPost)

      showToast("Success", "Post created successfully", "success")
    } catch (error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreatePost }
}
