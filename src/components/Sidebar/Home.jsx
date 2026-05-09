import { Box, Link, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const iconColor = useColorModeValue('#1A1A2E', 'white')

  return (
    <Tooltip hasArrow label={"Home"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
      <Link
        display={"flex"}
        to={"/"}
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
        <Box p={2} borderRadius="lg" bg={iconBg}>
          <AiFillHome size={22} color={iconColor} />
        </Box>
        <Box display={{ base: "none", md: "block" }} fontWeight="medium">
          Home
        </Box>
      </Link>
    </Tooltip>
  );
};

export default Home;