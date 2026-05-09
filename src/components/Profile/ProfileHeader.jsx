import { Avatar, Flex, VStack, Text, Button, useDisclosure, Box, HStack, useColorModeValue } from '@chakra-ui/react'
import userProfileStore from '../../store/userProfileStore'
import EditProfile from './EditProfile'
import useAuthStore from '../../store/authStore'
import useFollowUser from '../../hooks/useFollowUser'

const ProfileHeader = () => {
  const { userProfile } = userProfileStore();
  const authUser = useAuthStore(state => state.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.600', 'whiteAlpha.600')
  const buttonBg = useColorModeValue('gray.100', 'whiteAlpha.100')

  const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username

  return (
    <Flex 
      gap={{ base: 6, md: 10 }} 
      py={8} 
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "center", md: "flex-start" }}
      justifyContent="center"
      w="full"
    >
      <Box position="relative">
        <Box 
          p={1}
          borderRadius="full"
          bgGradient="linear(135deg, #E53935, #FF6F61)"
        >
          <Avatar 
            src={userProfile.profilePicURL} 
            alt='Profile' 
            size="2xl"
            border="4px solid"
            borderColor={useColorModeValue('white', 'gray.800')}
          />
        </Box>
      </Box>

      <VStack 
        alignItems={{ base: "center", md: "flex-start" }} 
        gap={4} 
        flex={1}
        maxW="600px"
        pt={2}
      >
        <Flex 
          gap={4} 
          direction={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text 
            fontSize={{ base: "3xl", md: "4xl" }} 
            fontWeight="bold"
            color={textColor}
            letterSpacing="tight"
          >
            {userProfile.username}
          </Text>
          
          {visitingOwnProfileAndAuth && (
            <Button 
              bg={buttonBg}
              color={textColor}
              _hover={{ bg: 'gray.200' }}
              size="md"
              borderRadius="xl"
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          )}

          {visitingAnotherProfileAndAuth && (
            <Button 
              bg="#E53935"
              color="white"
              _hover={{ bg: '#C62828' }}
              size="md"
              borderRadius="xl"
              onClick={handleFollowUser}
              isLoading={isUpdating}
              px={6}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </Flex>

        <HStack 
          spacing={8} 
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Box textAlign="center">
            <Text as="span" fontWeight="bold" fontSize="xl" color={textColor}>
              {userProfile.followers.length}
            </Text>
            <Text fontSize="sm" color={subTextColor} ml={1}>Followers</Text>
          </Box>
          <Box textAlign="center">
            <Text as="span" fontWeight="bold" fontSize="xl" color={textColor}>
              {userProfile.following.length}
            </Text>
            <Text fontSize="sm" color={subTextColor} ml={1}>Following</Text>
          </Box>
        </HStack>

        <VStack 
          alignItems={{ base: "center", md: "flex-start" }} 
          spacing={1}
          w="full"
        >
          <Text 
            fontSize="lg" 
            fontWeight="600"
            color={textColor}
          >
            {userProfile.fullName}
          </Text>
          
          {userProfile.bio && (
            <Text 
              fontSize="md" 
              color={subTextColor}
              textAlign={{ base: "center", md: "left" }}
              maxW="500px"
            >
              {userProfile.bio}
            </Text>
          )}
        </VStack>
      </VStack>

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  )
}

export default ProfileHeader