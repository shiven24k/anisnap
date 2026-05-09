import { Box, Flex, Link, Tooltip, VStack, Image, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const bgColor = useColorModeValue('white', 'rgba(15,15,26,0.9)')
  const borderColor = useColorModeValue('gray.200', 'rgba(255,255,255,0.05)')
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')

  return (
    <Box 
      height={"100vh"} 
      position={"sticky"} 
      top={0} 
      left={0} 
      py={6} 
      px={{ base: 2, md: 4 }}
      bg={bgColor}
      backdropFilter="blur(20px)"
      borderRight="1px solid"
      borderColor={borderColor}
    >
      <Flex direction={"column"} gap={6} w='full' height={"full"}>
        
        <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer' _hover={{ opacity: 0.8 }} w="fit-content">
          <Image src='/logo.png' alt="Logo" maxH="50px" objectFit="contain" className="animate-float" />
        </Link>

        <Link to={"/"} as={RouterLink} p={2} display={{ base: "block", md: "none" }} borderRadius={12} _hover={{ bg: hoverBg }} w={12} mx="auto" cursor='pointer'>
          <Image src='/logo.png' alt="Mobile Logo" maxH="40px" objectFit="contain" />
        </Link>

        <VStack spacing={2} cursor={"pointer"} align="stretch" flex={1}>
          <SidebarItems />
        </VStack>

        <Tooltip hasArrow label={"Logout"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
          <Flex onClick={handleLogout} alignItems={"center"} gap={3} _hover={{ bg: hoverBg }} borderRadius={12} p={3} w={{ base: 12, md: "full" }} mt={"auto"} justifyContent={{ base: "center", md: "flex-start" }} transition="all 0.3s" cursor="pointer" color={textColor}>
            <Box p={2} borderRadius="lg" bg={iconBg}><BiLogOut size={20} /></Box>
            <Box display={{ base: "none", md: "block" }} fontWeight="medium" fontSize="sm" color={textColor}>Logout</Box>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;