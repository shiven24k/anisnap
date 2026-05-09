import { Avatar, Box, Link, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user);
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')

  return (
    <Tooltip hasArrow label={"Profile"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
      <Link
        display={"flex"}
        to={`/${authUser?.username}`}
        as={RouterLink}
        alignItems={"center"}
        gap={3}
        _hover={{ bg: hoverBg, color: '#E53935' }}
        borderRadius={12}
        p={3}
        w={{ base: 12, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        transition="all 0.3s"
        color={textColor}
      >
        <Avatar 
          size="sm" 
          src={authUser?.profilePicURL || ""}
          border="2px solid"
          borderColor="#E53935"
        />
        <Box display={{ base: "none", md: "block" }} fontWeight="medium">
          Profile
        </Box>
      </Link>
    </Tooltip>
  );
};

export default ProfileLink;