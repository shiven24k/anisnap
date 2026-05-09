import { Avatar, Box, Button, Flex, VStack, Text, useColorModeValue } from "@chakra-ui/react";
import useFollowUser from "../hooks/useFollowUser";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
 	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
 	const authUser = useAuthStore((state) => state.user);
 	const textColor = useColorModeValue('#1A1A2E', 'whiteAlpha.900')
 	const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')
 	const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.100')

 	const onFollowUser = async () => {
 		await handleFollowUser();
 		if (setUser) {
 			setUser({
 				...user,
 				followers: isFollowing
 					? user.followers.filter((follower) => follower.uid !== authUser.uid)
 					: [...user.followers, authUser],
 			});
 		}
 	};

 	return (
 		<Flex 
 			justifyContent={"space-between"} 
 			alignItems={"center"} 
 			w={"full"}
 			p={3}
 			borderRadius="xl"
 			transition="all 0.3s"
 			_hover={{ bg: hoverBg }}
 		>
 			<Flex alignItems={"center"} gap={3}>
 				<Link to={`/${user.username}`}>
 					<Avatar 
 						src={user.profilePicURL} 
 						size={"md"}
 						border="2px solid"
 						borderColor="red.500"
 					/>
 				</Link>
 				<VStack spacing={1} alignItems={"flex-start"}>
 					<Link to={`/${user.username}`}>
 						<Text fontSize={13} fontWeight={"bold"} color={textColor} _hover={{ color: "red.500" }}>
 							{user.username}
 						</Text>
 					</Link>
 					<Box fontSize={11} color={subTextColor}>
 						{user.followers.length} followers
 					</Box>
 				</VStack>
 			</Flex>
 			{authUser.uid !== user.uid && (
 				<Button
 					fontSize={12}
 					bg="transparent"
 					p={2}
 					h={"max-content"}
 					fontWeight={"medium"}
 					color={"red.500"}
 					cursor={"pointer"}
 					borderRadius="lg"
 					_hover={{ color: "red.600", bg: "red.50" }}
 					onClick={onFollowUser}
 					isLoading={isUpdating}
 					transition="all 0.3s"
 				>
 					{isFollowing ? "Following" : "Follow"}
 				</Button>
 			)}
 		</Flex>
 	);
};

export default SuggestedUser;