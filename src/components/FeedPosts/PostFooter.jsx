import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const textColor = useColorModeValue('#1A1A2E', 'white')
	const subTextColor = useColorModeValue('gray.600', 'gray.400')
	const inputColor = useColorModeValue('#1A1A2E', 'white')

	const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
	};

	return (
		<Box mb={10} marginTop={"auto"} w={"full"} p={4}>
			<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
				<Box onClick={handleLikePost} cursor={"pointer"} fontSize={18} color={textColor}>
					{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
				</Box>

				<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current?.focus()} color={textColor}>
					<CommentLogo />
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={"sm"} color={textColor}>
				{likes} likes
			</Text>

			{isProfilePage && (
				<Text fontSize='12' color={subTextColor}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
					<Text fontSize='sm' fontWeight={700} color={textColor}>
						{creatorProfile?.username}{" "}
						<Text as='span' fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={subTextColor} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)}
					{isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
				</>
			)}

			{authUser && (
				<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
					<InputGroup>
						<Input
							variant={"flushed"}
							placeholder={"Add a comment..."}
							fontSize={14}
							color={inputColor}
							_placeholder={{ color: subTextColor }}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							ref={commentRef}
						/>
						<InputRightElement>
							<Button
								fontSize={14}
								color={subTextColor}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: textColor }}
								bg={"transparent"}
								onClick={handleSubmitComment}
								isLoading={isCommenting}
							>
								Post
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			)}
		</Box>
	);
};

export default PostFooter;