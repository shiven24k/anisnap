import { Avatar, Box, Flex, Link, Tooltip, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FiHome, FiSearch } from "react-icons/fi"
import { NotificationsLogo } from "../../assets/constants"
import useAuthStore from "../../store/authStore"
import useUIStore from "../../store/uiStore"
import ThemeSwitcher from "./ThemeSwitcher"
import CreatePost from "./CreatePost"
import SearchDrawer from "./SearchDrawer"

// Shared hook — returns common item sizing props based on sidebar state
const useItemLayout = () => {
  const { leftSidebarOpen } = useUIStore()
  return {
    isExpanded: leftSidebarOpen,
    w: leftSidebarOpen ? { base: 12, md: "full" } : 12,
    justify: leftSidebarOpen ? { base: "center", md: "flex-start" } : "center",
    showLabel: leftSidebarOpen,
    // tooltip: show always when collapsed, only mobile when expanded
    tooltipDisplay: leftSidebarOpen ? { base: "block", md: "none" } : "block",
  }
}

const NavItem = ({ icon, label, to, onClick }) => {
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const { w, justify, showLabel, tooltipDisplay } = useItemLayout()

  const inner = (
    <Flex
      alignItems="center"
      gap={3}
      _hover={{ bg: hoverBg }}
      borderRadius="xl"
      p={3}
      w={w}
      justifyContent={justify}
      transition="all 0.2s"
      cursor="pointer"
      color={textColor}
      onClick={onClick}
    >
      <Box p={2} borderRadius="lg" bg={iconBg} flexShrink={0} lineHeight={0}>
        {icon}
      </Box>
      <Box
        display={showLabel ? { base: "none", md: "block" } : "none"}
        fontWeight="medium"
        fontSize="sm"
        color={textColor}
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {label}
      </Box>
    </Flex>
  )

  return (
    <Tooltip
      hasArrow
      label={label}
      placement="right"
      openDelay={500}
      bg="gray.800"
      color="white"
      display={tooltipDisplay}
    >
      {to
        ? <Link as={RouterLink} to={to} w="full" _hover={{ textDecoration: "none" }}>{inner}</Link>
        : inner
      }
    </Tooltip>
  )
}

const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user)
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const { w, justify, showLabel, tooltipDisplay } = useItemLayout()

  return (
    <Tooltip
      hasArrow
      label="Profile"
      placement="right"
      openDelay={500}
      bg="gray.800"
      color="white"
      display={tooltipDisplay}
    >
      <Link as={RouterLink} to={`/${authUser?.username}`} w="full" _hover={{ textDecoration: "none" }}>
        <Flex
          alignItems="center"
          gap={3}
          _hover={{ bg: hoverBg }}
          borderRadius="xl"
          p={3}
          w={w}
          justifyContent={justify}
          transition="all 0.2s"
          cursor="pointer"
          color={textColor}
        >
          <Avatar
            size="sm"
            src={authUser?.profilePicURL || ""}
            border="2px solid"
            borderColor="#E53935"
            flexShrink={0}
          />
          <Box
            display={showLabel ? { base: "none", md: "block" } : "none"}
            fontWeight="medium"
            fontSize="sm"
            color={textColor}
            whiteSpace="nowrap"
          >
            Profile
          </Box>
        </Flex>
      </Link>
    </Tooltip>
  )
}

const SidebarItems = () => {
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure()

  return (
    <>
      <NavItem icon={<FiHome size={20} color="#E53935" />} label="Home" to="/" />
      <NavItem icon={<FiSearch size={20} color="#E53935" />} label="Search" onClick={onSearchOpen} />
      <NavItem icon={<NotificationsLogo />} label="Notifications" />
      <CreatePost />
      <ProfileLink />
      <ThemeSwitcher />
      <SearchDrawer isOpen={isSearchOpen} onClose={onSearchClose} />
    </>
  )
}

export default SidebarItems
