import { Box, Flex, Link, Tooltip, Avatar, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SearchLogo, NotificationsLogo, CreatePostLogo } from "../../assets/constants";
import useAuthStore from "../../store/authStore";
import ThemeSwitcher from "./ThemeSwitcher";

const SidebarItem = ({ icon, label, to, onClick, isAvatar, avatarSrc }) => {
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')

  const content = (
    <Flex
      alignItems={"center"}
      gap={3}
      _hover={{ bg: hoverBg, color: '#E53935' }}
      borderRadius={12}
      p={3}
      w={{ base: 12, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
      transition="all 0.3s"
      cursor="pointer"
      color={textColor}
      onClick={onClick}
    >
      <Box p={2} borderRadius="lg" bg={iconBg}>
        {icon}
      </Box>
      <Box display={{ base: "none", md: "block" }} fontWeight="medium" color={textColor}>
        {label}
      </Box>
    </Flex>
  )

  if (to) {
    return (
      <Tooltip hasArrow label={label} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
        <Link as={RouterLink} to={to} w="full">
          {content}
        </Link>
      </Tooltip>
    )
  }

  return (
    <Tooltip hasArrow label={label} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
      {content}
    </Tooltip>
  )
}

const HomeItem = () => {
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  
  return (
    <Tooltip hasArrow label={"Home"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
      <Link as={RouterLink} to="/" w="full">
        <Flex alignItems={"center"} gap={3} _hover={{ bg: hoverBg, color: '#E53935' }} borderRadius={12} p={3} w={{ base: 12, md: "full" }} justifyContent={{ base: "center", md: "flex-start" }} transition="all 0.3s" color={textColor}>
          <Box p={2} borderRadius="lg" bg={useColorModeValue('gray.100', 'whiteAlpha.100')}>
            <AiFillHome size={22} color={textColor} />
          </Box>
          <Box display={{ base: "none", md: "block" }} fontWeight="medium" color={textColor}>Home</Box>
        </Flex>
      </Link>
    </Tooltip>
  )
}

const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user)
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')

  return (
    <Tooltip hasArrow label={"Profile"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
      <Link as={RouterLink} to={`/${authUser?.username}`} w="full">
        <Flex alignItems={"center"} gap={3} _hover={{ bg: hoverBg, color: '#E53935' }} borderRadius={12} p={3} w={{ base: 12, md: "full" }} justifyContent={{ base: "center", md: "flex-start" }} transition="all 0.3s" color={textColor}>
          <Avatar size="sm" src={authUser?.profilePicURL || ""} border="2px solid" borderColor="#E53935" />
          <Box display={{ base: "none", md: "block" }} fontWeight="medium" color={textColor}>Profile</Box>
        </Flex>
      </Link>
    </Tooltip>
  )
}

const SidebarItems = () => {
  return (
    <>
      <HomeItem />
      <SidebarItem icon={<SearchLogo />} label="Search" />
      <SidebarItem icon={<NotificationsLogo />} label="Notifications" />
      <SidebarItem icon={<CreatePostLogo />} label="Create" onClick={() => {}} />
      <ProfileLink />
      <ThemeSwitcher />
    </>
  );
};

export default SidebarItems;