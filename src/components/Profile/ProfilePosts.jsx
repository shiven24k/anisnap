import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
 	const { isLoading, posts } = useGetUserPosts();

 	const noPostsFound = !isLoading && posts.length === 0;
 	if (noPostsFound) return <NoPostsFound />;

 	return (
 		<Grid
 			templateColumns={{
 				sm: "repeat(1, 1fr)",
 				md: "repeat(3, 1fr)",
 			}}
 			gap={3}
 			columnGap={3}
 			p={2}
 		>
 			{isLoading &&
 				[0, 1, 2, 3, 4, 5].map((_, idx) => (
 					<VStack key={idx} alignItems={"flex-start"} gap={4}>
 						<Skeleton 
 							w={"full"} 
 							startColor="#2A2A3E" 
 							endColor="#3A3A4E"
 							borderRadius="xl"
 						>
 							<Box h='300px'>contents wrapped</Box>
 						</Skeleton>
 					</VStack>
 				))}

 			{!isLoading && (
 				<>
 					{posts.map((post) => (
 						<ProfilePost post={post} key={post.id} />
 					))}
 				</>
 			)}
 		</Grid>
 	);
};

export default ProfilePosts;

const NoPostsFound = () => {
 	return (
 		<Flex 
 			flexDir='column' 
 			textAlign={"center"} 
 			mx={"auto"} 
 			mt={16}
 			mb={8}
 			p={8}
 		>
 			<Box 
 				w="80px" 
 				h="80px" 
 				mx="auto" 
 				mb={4}
 				borderRadius="full"
 				bg="whiteAlpha.50"
 				display="flex"
 				alignItems="center"
 				justifyContent="center"
 			>
 				<Text fontSize="3xl">📷</Text>
 			</Box>
 			<Text 
 				fontSize={"xl"} 
 				fontWeight="bold"
 				color="whiteAlpha.800"
 			>
 				No Posts Yet
 			</Text>
 			<Text 
 				color="whiteAlpha.500" 
 				mt={2}
 				fontSize="sm"
 			>
 				Start sharing your anime journey!
 			</Text>
 		</Flex>
 	);
};