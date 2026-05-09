import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack, Box, useColorModeValue, Grid } from '@chakra-ui/react';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfilePost from '../../components/Profile/ProfilePost';
import useGetUserProfileByUserName from '../../hooks/useGetUserProfileByUserName';
import useGetUserPosts from '../../hooks/useGetUserPosts';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams()
  const { isLoading, userProfile } = useGetUserProfileByUserName(username)
  const { isLoading: postsLoading, posts } = useGetUserPosts()
  
  const bgColor = useColorModeValue('#F5F5F5', '#0A0A12')
  const cardBg = useColorModeValue('white', 'rgba(255,255,255,0.05)')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.600', 'whiteAlpha.600')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  
  const userNotFound = !isLoading && !userProfile
  if (userNotFound) return <UserNotFound bgColor={bgColor} textColor={textColor} subTextColor={subTextColor} />

  return (
    <Box minH="100vh" bg={bgColor} position="relative">
      <Container maxW="container.lg" py={5}>
        <Flex py={6} px={4} w={"full"} mx={"auto"} flexDirection={"column"} bg={cardBg} borderRadius="2xl" mt={4} mb={6}>
          {!isLoading && userProfile && <ProfileHeader />}
          {isLoading && <ProfileHeaderSkeleton textColor={textColor} />}
        </Flex>

        <Box bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={borderColor} p={4}>
          <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4} px={2}>Posts</Text>
          
          {postsLoading ? (
            <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}} gap={2}>
              {[0,1,2,3,4,5].map((i) => (
                <Skeleton key={i} h="200px" borderRadius="lg" />
              ))}
            </Grid>
          ) : posts.length > 0 ? (
            <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}} gap={2}>
              {posts.map((post) => (
                <ProfilePost key={post.id} post={post} />
              ))}
            </Grid>
          ) : (
            <Flex flexDir='column' textAlign={"center"} py={10}>
              <Text fontSize="3xl" mb={2}>📷</Text>
              <Text fontSize="lg" fontWeight="bold" color={textColor}>No Posts Yet</Text>
              <Text color={subTextColor} fontSize="sm">Start sharing your anime journey!</Text>
            </Flex>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default ProfilePage

const ProfileHeaderSkeleton = ({ textColor }) => {
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }} justifyContent={"center"} alignItems={"center"}>
      <SkeletonCircle size='24' border="3px solid" borderColor="red.500" />
      <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
        <Skeleton height='16px' width='150px' borderRadius="lg" />
        <Skeleton height='12px' width='100px' borderRadius="lg" />
      </VStack>
    </Flex>
  );
};

const UserNotFound = ({ bgColor, textColor, subTextColor }) => {
  return (
    <Flex flexDir='column' textAlign={"center"} mx={"auto"} bg={bgColor} minH="100vh" justifyContent="center" alignItems="center">
      <VStack spacing={6}>
        <Text fontSize={"4xl"} fontWeight="bold" color={textColor}>404</Text>
        <Text fontSize={"2xl"} color={textColor}>User Not Found</Text>
        <Text color={subTextColor} maxW="300px">The user you're looking for doesn't exist.</Text>
        <Link as={RouterLink} to={"/"} bg="#E53935" color="white" px={6} py={3} borderRadius="xl" fontWeight="bold" _hover={{ bg: '#C62828' }}>Go Home</Link>
      </VStack>
    </Flex>
  )
}