import { 
  Avatar, 
  Flex, 
  Text, 
  Button, 
  HStack 
} from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

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
          borderColor="gray.600"
        />
        <Flex flexDirection="column">
          <Text 
            fontWeight="bold" 
            color="white"
            fontSize="md"
          >
            {creatorProfile?.username}
          </Text>
          <Text 
            color="gray.400" 
            fontSize="xs"
          >
            {timeAgo(post.createdAt)}
          </Text>
        </Flex>
      </HStack>

      <Button
        size="sm"
        variant="outline"
        colorScheme="gray"
        onClick={handleFollowUser}
        isLoading={isUpdating}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default PostHeader;
