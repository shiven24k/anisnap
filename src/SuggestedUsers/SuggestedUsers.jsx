import { Box, Flex, Link, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
 	const { isLoading, suggestedUsers } = useGetSuggestedUsers();
 	const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')
 	const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100')

 	if (isLoading) return null;

 	return (
 		<VStack py={4} gap={4} align="stretch">
 			<SuggestedHeader />

 			{suggestedUsers.length !== 0 && (
 				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
 					<Text fontSize={12} fontWeight={"bold"} color={subTextColor}>
 						Suggested for you
 					</Text>
 					<Text fontSize={12} fontWeight={"bold"} color={"red.500"} _hover={{ color: "red.400" }} cursor={"pointer"}>
 						See All
 					</Text>
 				</Flex>
 			)}

 			{suggestedUsers.map((user) => (
 				<SuggestedUser user={user} key={user.id} />
 			))}

 			<Box fontSize={12} color={subTextColor} mt={4} alignSelf={"start"} pt={4} borderTop="1px solid" borderColor={borderColor}>
 				© 2026 {' '}
 				<Link href='#' target='_blank' color='red.500' fontSize={12} _hover={{ color: "red.400" }}>
 					AniSnap
 				</Link>
 			</Box>
 		</VStack>
 	);
};

export default SuggestedUsers;