import { Avatar, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthStore from "../store/authStore";

const SuggestedHeader = () => {
 	const { handleLogout, isLoggingOut } = useLogout();
 	const authUser = useAuthStore((state) => state.user);
 	const textColor = useColorModeValue('#1A1A2E', 'whiteAlpha.900')

 	if (!authUser) return null;

 	return (
 		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} p={2}>
 			<Flex alignItems={"center"} gap={3}>
 				<Link to={`/${authUser.username}`}>
 					<Avatar 
 						size={"md"} 
 						src={authUser.profilePicURL}
 						border="2px solid"
 						borderColor="red.500"
 					/>
 				</Link>
 				<Link to={`/${authUser.username}`}>
 					<Text fontSize={13} fontWeight={"bold"} color={textColor} _hover={{ color: "red.500" }}>
 						{authUser.username}
 					</Text>
 				</Link>
 			</Flex>
 			<Button
 				size={"xs"}
 				background={"transparent"}
 				_hover={{ background: "red.50", color: "red.500" }}
 				fontSize={12}
 				fontWeight={"medium"}
 				color={"red.500"}
 				onClick={handleLogout}
 				isLoading={isLoggingOut}
 				cursor={"pointer"}
 				borderRadius="lg"
 				transition="all 0.3s"
 			>
 				Switch
 			</Button>
 		</Flex>
 	);
};

export default SuggestedHeader;