import { Flex, GridItem, Text, Image, useDisclosure, Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalBody, Avatar, Divider, VStack, Button, HStack, Box, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Comment from '../Comment/Comment'
import PostFooter from "../FeedPosts/PostFooter"
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import useShowToast from '../../hooks/useShowToast'
import usePostStore from '../../store/postStore'
import Caption from '../Comment/Caption'
import { supabase } from '../../supabase/supabaseClient'
import { removeStorageFile } from '../../supabase/storage'


const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePost = usePostStore(state => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
    const setAuthUser = useAuthStore((state) => state.setUser);

    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        if (isDeleting) return;
        try {
            setIsDeleting(true);
            await removeStorageFile("post-image", `${post.id}/image`);
            const { error: deleteError } = await supabase.from("posts").delete().eq("id", post.id);
            if (deleteError) throw deleteError;

            const nextUserPosts = authUser.posts.filter((id) => id !== post.id);
            const { error: profileError } = await supabase
                .from("profiles")
                .update({ posts: nextUserPosts })
                .eq("uid", authUser.uid);
            if (profileError) throw profileError;

            const updatedAuthUser = { ...authUser, posts: nextUserPosts };
            setAuthUser(updatedAuthUser);
            localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));

            deletePost(post.id);
            decrementPostsCount(post.id);
            showToast("Success", "Post deleted successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsDeleting(false);
        }
    }
    return (
        <>
            <GridItem
                cursor={"pointer"}
                borderRadius="xl"
                overflow={"hidden"}
                position={"relative"}
                aspectRatio={1 / 1}
                onClick={onOpen}
                transition="all 0.3s"
                _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
                }}
            >
                <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, blackAlpha.600, transparent)"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="all 0.3s ease"
                    zIndex={1}
                />

                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={"blackAlpha.600"}
                    transition={"all 0.3s ease"}
                    zIndex={2}
                    justifyContent={"center"}
                    alignItems="center"
                >
                    <HStack spacing={8}>
                        <Flex alignItems={"center"} gap={2}>
                            <Box color="pink.400">
                                <AiFillHeart size={24} />
                            </Box>
                            <Text fontWeight={"bold"} color="white">
                                {post.likes.length}
                            </Text>
                        </Flex>

                        <Flex alignItems={"center"} gap={2}>
                            <Box color="blue.400">
                                <FaComment size={20} />
                            </Box>
                            <Text fontWeight={"bold"} color="white">
                                {post.comments.length}
                            </Text>
                        </Flex>
                    </HStack>
                </Flex>
                
                <Image 
                    src={post.imageURL} 
                    alt='profile post' 
                    w={"100%"} 
                    h={"100%"} 
                    objectFit={"cover"} 
                />
            </GridItem>

            <Modal isOpen={isOpen} onClose={onClose}
                isCentered={true}
                size={{ base: "full", md: "5xl" }}>
                <ModalOverlay 
                    bg="rgba(0, 0, 0, 0.8)"
                    backdropFilter="blur(10px)"
                />
                <ModalContent 
                    bg="anime.dark"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    className="glass-card"
                    mx={2}
                >
                    <ModalCloseButton 
                        bg="whiteAlpha.200"
                        borderRadius="full"
                        _hover={{ bg: "whiteAlpha.300" }}
                    />
                    <ModalBody p={0}>
                        <Flex 
                            gap={0} 
                            w="full" 
                            maxH={{ base: "80vh", md: "80vh" }}
                            direction={{ base: "column", md: "row" }}
                        >
                            <Flex
                                flex={1.5}
                                justifyContent={"center"}
                                alignItems={"center"}
                                bg="black"
                                borderRadius={{ base: "none", md: "2xl 0 0 2xl" }}
                                overflow="hidden"
                            >
                                <Image 
                                    src={post.imageURL} 
                                    alt='profile post' 
                                    maxH={{ base: "50vh", md: "80vh" }}
                                    w="full"
                                    objectFit="contain"
                                />
                            </Flex>
                            
                            <Flex 
                                flex={1} 
                                flexDir={"column"} 
                                p={6}
                                display={{ base: "none", md: "flex" }}
                            >
                                <Flex alignItems={"center"} justifyContent={"space-between"} mb={4}>
                                    <HStack spacing={3}>
                                        <Avatar 
                                            src={userProfile.profilePicURL} 
                                            size="sm"
                                            border="2px solid"
                                            borderColor="brand.500"
                                        />
                                        <Text fontWeight={"bold"} fontSize="sm" className="gradient-text">
                                            {userProfile.username}
                                        </Text>
                                    </HStack>

                                    {authUser?.uid === userProfile.uid && (
                                        <Button
                                            size={"sm"}
                                            variant="ghost"
                                            color="red.400"
                                            _hover={{ bg: "red.900" }}
                                            borderRadius="lg"
                                            onClick={handleDeletePost}
                                            isLoading={isDeleting}
                                        >
                                            <MdDelete size={20} />
                                        </Button>
                                    )}
                                </Flex>

                                <Divider my={2} bg={"whiteAlpha.200"} />

                                <VStack 
                                    w="full" 
                                    alignItems={"start"} 
                                    maxH={"350px"} 
                                    overflowY={"auto"}
                                    spacing={4}
                                >
                                    {post.caption && <Caption post={post} />}
                                    {post.comments.map((comment, idx) => (
                                        <Comment key={comment.id || idx} comment={comment} />
                                    ))}
                                </VStack>

                                <Divider my={4} bg={"whiteAlpha.200"} />
                                <PostFooter isProfilePage={"true"} post={post} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfilePost