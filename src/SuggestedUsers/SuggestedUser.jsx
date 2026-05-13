import { Avatar, Box, Button, Flex, Text, VStack, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useFollowUser from "../hooks/useFollowUser"
import useAuthStore from "../store/authStore"

const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid)
  const authUser = useAuthStore((state) => state.user)

  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.50')
  const followBtnHoverBg = useColorModeValue('red.50', 'whiteAlpha.150')

  const onFollowUser = async () => {
    await handleFollowUser()
    if (setUser) {
      setUser({
        ...user,
        followers: isFollowing
          ? user.followers.filter((f) => f.uid !== authUser.uid)
          : [...user.followers, authUser],
      })
    }
  }

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w="full"
      px={2}
      py={2}
      borderRadius="xl"
      transition="background 0.2s"
      _hover={{ bg: hoverBg }}
    >
      <Flex alignItems="center" gap={2.5}>
        <Link to={`/${user.username}`}>
          <Avatar
            src={user.profilePicURL}
            size="sm"
            border="2px solid"
            borderColor="#E53935"
          />
        </Link>
        <VStack spacing={0} alignItems="flex-start">
          <Link to={`/${user.username}`}>
            <Text
              fontSize="12px"
              fontWeight="700"
              color={textColor}
              _hover={{ color: '#E53935' }}
              transition="color 0.2s"
              lineHeight="1.3"
            >
              {user.username}
            </Text>
          </Link>
          <Text fontSize="10px" color={subTextColor} lineHeight="1.3">
            {user.followers.length} followers
          </Text>
        </VStack>
      </Flex>

      {authUser.uid !== user.uid && (
        <Button
          size="xs"
          fontSize="11px"
          bg="transparent"
          px={2.5}
          fontWeight="600"
          color="#E53935"
          cursor="pointer"
          borderRadius="lg"
          _hover={{ color: "#C62828", bg: followBtnHoverBg }}
          onClick={onFollowUser}
          isLoading={isUpdating}
          transition="all 0.2s"
          flexShrink={0}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </Flex>
  )
}

export default SuggestedUser
