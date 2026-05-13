import { GridItem, Image, Flex, Box, Text, HStack, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import useShowToast from '../../hooks/useShowToast'
import usePostStore from '../../store/postStore'
import { supabase } from '../../supabase/supabaseClient'
import { removeStorageFile } from '../../supabase/storage'
import CommentsModal from '../Modals/CommentsModal'

const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const userProfile = useUserProfileStore((state) => state.userProfile)
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const deletePost = usePostStore(state => state.deletePost)
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost)
    const setAuthUser = useAuthStore((state) => state.setUser)

    const isOwner = authUser?.uid === userProfile?.uid

    const handleDeletePost = async () => {
        if (isDeleting) return
        try {
            setIsDeleting(true)
            onClose()
            await removeStorageFile("post-image", `${post.id}/image`)
            const { error: deleteError } = await supabase.from("posts").delete().eq("id", post.id)
            if (deleteError) throw deleteError

            const nextUserPosts = authUser.posts.filter((id) => id !== post.id)
            const { error: profileError } = await supabase
                .from("profiles")
                .update({ posts: nextUserPosts })
                .eq("uid", authUser.uid)
            if (profileError) throw profileError

            const updatedAuthUser = { ...authUser, posts: nextUserPosts }
            setAuthUser(updatedAuthUser)
            localStorage.setItem("user-info", JSON.stringify(updatedAuthUser))

            deletePost(post.id)
            decrementPostsCount(post.id)
            showToast("Success", "Post deleted successfully", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <GridItem
                cursor="pointer"
                borderRadius="xl"
                overflow="hidden"
                position="relative"
                aspectRatio={1}
                onClick={onOpen}
                role="group"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{ transform: 'translateY(-2px)', boxShadow: '0 10px 28px rgba(0,0,0,0.32)' }}
                boxShadow="0 2px 6px rgba(0,0,0,0.18)"
            >
                <Image
                    src={post.imageURL}
                    alt="profile post"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                />

                {/* Hover overlay */}
                <Flex
                    position="absolute"
                    inset={0}
                    bg="blackAlpha.600"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.2s"
                    justify="center"
                    align="center"
                    zIndex={2}
                >
                    <HStack spacing={6}>
                        <Flex align="center" gap={1.5}>
                            <AiFillHeart size={20} color="#E53935" />
                            <Text fontWeight="700" color="white" fontSize="sm">
                                {(post.likes || []).length}
                            </Text>
                        </Flex>
                        <Flex align="center" gap={1.5}>
                            <FiMessageSquare size={18} color="white" />
                            <Text fontWeight="700" color="white" fontSize="sm">
                                {(post.comments || []).length}
                            </Text>
                        </Flex>
                    </HStack>
                </Flex>
            </GridItem>

            {isOpen && (
                <CommentsModal
                    isOpen={isOpen}
                    onClose={onClose}
                    post={post}
                    isOwner={isOwner}
                    onDelete={handleDeletePost}
                />
            )}
        </>
    )
}

export default ProfilePost
