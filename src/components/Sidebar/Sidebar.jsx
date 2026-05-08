import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Logo, MobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Box 
      height={"100vh"} 
      borderRight={"1px solid"} 
      borderColor={"blue.900"} 
      py={8} 
      position={"sticky"} 
      top={0} 
      left={0} 
      px={{ base: 2, md: 4 }}
      bg={"gray.700"}
      color={"white"}
    >
      <Flex direction={"column"} gap={10} w='full' height={"full"}>
        <Link 
          to={"/"} 
          as={RouterLink} 
          pl={2} 
          display={{ base: "none", md: "block" }} 
          cursor='pointer'
          _hover={{ opacity: 0.8 }}
        >
          <Logo />
        </Link>

        <Link 
          to={"/"} 
          as={RouterLink} 
          p={2} 
          display={{ base: "block", md: "none" }} 
          borderRadius={6} 
          _hover={{ bg: "blue.700" }}
          w={10} 
          cursor='pointer'
        >
          <MobileLogo />
        </Link>

        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>

        {/* LOGOUT */}
        <Tooltip 
          hasArrow 
          label={"Logout"} 
          placement='right' 
          ml={1} 
          openDelay={500} 
          display={{ base: "block", md: "none" }}
        >
          <Flex 
            onClick={handleLogout} 
            alignItems={"center"} 
            gap={4} 
            _hover={{ bg: "blue.700" }} 
            borderRadius={6} 
            p={2} 
            w={{ base: 10, md: "full" }} 
            mt={"auto"} 
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} color="white" />
            <Button 
              display={{ base: "none", md: "block" }} 
              variant={"ghost"} 
              color={"white"}
              _hover={{ bg: "blue.800" }} 
              isLoading={isLoggingOut}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
