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
 	Text,
 	VStack,
 	useColorModeValue,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { mapPost, toPostRow } from "../../supabase/mappers";
import { uploadDataUrl } from "../../supabase/storage";

const CreatePost = () => {
 	const { isOpen, onOpen, onClose } = useDisclosure();
 	const [caption, setCaption] = useState("");
 	const imageRef = useRef(null);
 	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
 	const showToast = useShowToast();
 	const { isLoading, handleCreatePost } = useCreatePost();

 	const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100');
 	const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100');
 	const textColor = useColorModeValue('#1A1A2E', 'white');

 	const handlePostCreation = async () => {
 		try {
 			await handleCreatePost(selectedFile, caption);
 			onClose();
 			setCaption("");
 			setSelectedFile(null);
 		} catch (error) {
 			showToast("Error", error.message, "error");
 		}
 	};

 	return (
 		<>
 			<Tooltip
 				hasArrow
 				label={"Create Post"}
 				placement='right'
 				ml={1}
 				openDelay={500}
 				display={{ base: "block", md: "none" }}
 				bg="red.600"
 			>
 				<Flex
 					alignItems={"center"}
 					gap={3}
 					_hover={{ bg: hoverBg, color: '#E53935' }}
 					borderRadius={12}
 					p={3}
 					w={{ base: 12, md: "full" }}
 					justifyContent={{ base: "center", md: "flex-start" }}
 					onClick={onOpen}
 					transition="all 0.3s"
 					cursor="pointer"
 					color={textColor}
 				>
 					<Box p={2} borderRadius="lg" bg={iconBg}>
 						<CreatePostLogo />
 					</Box>
 					<Box display={{ base: "none", md: "block" }} fontWeight="medium">
 						Create
 					</Box>
 				</Flex>
 			</Tooltip>

 			<Modal isOpen={isOpen} onClose={onClose} size='xl' motionPreset='slideInBottom'>
 				<ModalOverlay 
 					bg="rgba(0, 0, 0, 0.7)"
 					backdropFilter="blur(10px)"
 				/>

 				<ModalContent 
 					bg="anime.dark" 
 					border="1px solid"
 					borderColor="whiteAlpha.100"
 					borderRadius="2xl"
 					className="glass-card"
 				>
 					<ModalHeader 
 						fontWeight="bold" 
 						borderBottom="1px solid"
 						borderColor="whiteAlpha.100"
 					>
 						<VStack align="start" spacing={1}>
 							<Text>Create Post</Text>
 							<Text fontSize="xs" fontWeight="normal" color="whiteAlpha.500">
 								Share your anime moment
 							</Text>
 						</VStack>
 					</ModalHeader>
 					<ModalCloseButton />
 					<ModalBody pb={6}>
 						<Textarea
 							placeholder='Write a caption about your post...'
 							value={caption}
 							onChange={(e) => setCaption(e.target.value)}
 							variant="anime"
 							minH="100px"
 							mb={4}
 							_placeholder={{ color: "whiteAlpha.400" }}
 						/>

 						<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

 						<Flex 
 							align="center" 
 							gap={3}
 							cursor="pointer"
 							onClick={() => imageRef.current.click()}
 							p={4}
 							borderRadius="xl"
 							border="2px dashed"
 							borderColor="whiteAlpha.200"
 							_hover={{ borderColor: "brand.500", bg: "whiteAlpha.50" }}
 							transition="all 0.3s"
 						>
 							<Box p={2} borderRadius="lg" bg="whiteAlpha.100">
 								<BsFillImageFill size={20} />
 							</Box>
 							<Text color="whiteAlpha.600" fontSize="sm">
 								Click to add image
 							</Text>
 						</Flex>

 						{selectedFile && (
 							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
 								<Image 
 									src={selectedFile} 
 									alt='Selected img' 
 									maxH="400px"
 									objectFit="contain"
 									borderRadius="xl"
 								/>
 								<CloseButton
 									position={"absolute"}
 									top={2}
 									right={2}
 									bg="blackAlpha.700"
 									borderRadius="full"
 									size="sm"
 									onClick={() => {
 										setSelectedFile(null);
 									}}
 								/>
 							</Flex>
 						)}
 					</ModalBody>

 					<ModalFooter gap={3}>
 						<Button 
 							variant="ghost" 
 							onClick={onClose}
 						>
 							Cancel
 						</Button>
 						<Button 
 							onClick={handlePostCreation} 
 							isLoading={isLoading}
 							variant="gradient"
 						>
 							Post
 						</Button>
 					</ModalFooter>
 				</ModalContent>
 			</Modal>
 		</>
 	);
};

export default CreatePost;

function useCreatePost() {
 	const showToast = useShowToast();
 	const [isLoading, setIsLoading] = useState(false);
 	const authUser = useAuthStore((state) => state.user);
 	const createPost = usePostStore((state) => state.createPost);
 	const addPost = useUserProfileStore((state) => state.addPost);
 	const userProfile = useUserProfileStore((state) => state.userProfile);
 	const setAuthUser = useAuthStore((state) => state.setUser);
 	const { pathname } = useLocation();

 	const handleCreatePost = async (selectedFile, caption) => {
 		console.log("authUser:", authUser);
 		console.log("authUser.uid:", authUser?.uid);
 		if (isLoading) return;
 		if (!authUser) {
 			showToast("Error", "You must be logged in", "error");
 			return;
 		}
 		if (!selectedFile) throw new Error("Please select an image");
 		setIsLoading(true);
 		const newPost = {
 			caption: caption,
 			likes: [],
 			comments: [],
 			createdAt: Date.now(),
 			createdBy: authUser.uid,
 		};

 		try {
 			const { data: insertedPost, error: insertError } = await supabase
 				.from("posts")
 				.insert(toPostRow(newPost))
 				.select()
 				.single();
 			if (insertError) throw insertError;

 			const downloadURL = await uploadDataUrl("post-image", `${insertedPost.id}/image`, selectedFile);
 			const { data: updatedPost, error: imageError } = await supabase
 				.from("posts")
 				.update({ image_url: downloadURL })
 				.eq("id", insertedPost.id)
 				.select()
 				.single();
 			if (imageError) throw imageError;

 			const nextUserPosts = [...new Set([insertedPost.id, ...(authUser.posts || [])])];
 			const { error: userError } = await supabase
 				.from("profiles")
 				.update({ posts: nextUserPosts })
 				.eq("uid", authUser.uid);
 			if (userError) throw userError;

 			const createdPost = mapPost(updatedPost);

 			const updatedAuthUser = { ...authUser, posts: nextUserPosts };
 			setAuthUser(updatedAuthUser);
 			localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));

 			if (userProfile?.uid === authUser.uid) createPost(createdPost);
 			if (pathname !== "/" && userProfile?.uid === authUser.uid) addPost(createdPost);

 			showToast("Success", "Post created successfully", "success");
 		} catch (error) {
 			showToast("Error", error.message, "error");
 		} finally {
 			setIsLoading(false);
 		}
 	};

 	return { isLoading, handleCreatePost };
}