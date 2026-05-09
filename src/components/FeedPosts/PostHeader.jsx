import { 
  Avatar, 
  Flex, 
  Text, 
  Button, 
  HStack,
  useColorModeValue
} from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'gray.400')
  const borderColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <Flex 
      justifyContent="space-between" 
      alignItems="center" 
      w="full" 
      p={4}
    >
      <HStack spacing={3} align="center">
        <Avatar 
          src={creatorProfile?.profilePicURL} 
          name={creatorProfile?.username}
          size="md"
          border="2px solid"
          borderColor="#E53935"
        />
        <Flex flexDirection="column">
          <Text 
            fontWeight="bold" 
            color={textColor}
            fontSize="md"
          >
            {creatorProfile?.username}
          </Text>
          <Text 
            color={subTextColor} 
            fontSize="xs"
          >
            {timeAgo(post.createdAt)}
          </Text>
        </Flex>
      </HStack>

      <Button
        size="sm"
        variant="outline"
        borderColor={useColorModeValue('gray.300', 'gray.600')}
        color={textColor}
        _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
        onClick={handleFollowUser}
        isLoading={isUpdating}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default PostHeader;