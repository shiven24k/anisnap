import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { FiSearch, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"
import useSearchUser from "../../hooks/useSearchUser"
import useFollowUser from "../../hooks/useFollowUser"
import useAuthStore from "../../store/authStore"

const ResultUser = ({ user, onClose }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid)
  const authUser = useAuthStore((s) => s.user)
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.500', 'whiteAlpha.500')
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.100')

  return (
    <Flex
      align="center"
      justify="space-between"
      p={3}
      borderRadius="xl"
      _hover={{ bg: hoverBg }}
      transition="background 0.2s"
    >
      <Link to={`/${user.username}`} onClick={onClose} style={{ flex: 1, minWidth: 0 }}>
        <Flex align="center" gap={3}>
          <Avatar
            src={user.profilePicURL}
            size="md"
            border="2px solid #E53935"
            flexShrink={0}
          />
          <Box minW={0}>
            <Text fontSize="13px" fontWeight="700" color={textColor} noOfLines={1}>
              {user.username}
            </Text>
            <Text fontSize="11px" color={subTextColor}>
              {(user.followers || []).length} followers
            </Text>
          </Box>
        </Flex>
      </Link>
      {authUser?.uid !== user.uid && (
        <Button
          size="xs"
          fontSize="11px"
          fontWeight="600"
          bg="transparent"
          color="#E53935"
          _hover={{ bg: useColorModeValue('red.50', 'whiteAlpha.150'), color: '#C62828' }}
          borderRadius="lg"
          onClick={handleFollowUser}
          isLoading={isUpdating}
          flexShrink={0}
          ml={2}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </Flex>
  )
}

const SearchDrawer = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("")
  const { isLoading, getUserProfile, user, setUser } = useSearchUser()

  const bg = useColorModeValue('white', '#141420')
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const inputBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.400', 'whiteAlpha.400')
  const headingColor = useColorModeValue('gray.600', 'whiteAlpha.600')

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    getUserProfile(query.trim())
  }

  const handleClear = () => {
    setQuery("")
    setUser(null)
  }

  const handleClose = () => {
    handleClear()
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} placement="left" size="xs">
      <DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <DrawerContent
        bg={bg}
        borderRight="1px solid"
        borderColor={borderColor}
        ml={{ base: 0, md: "70px" }}
        maxW="300px"
        boxShadow="xl"
      >
        <DrawerBody p={0}>
          <Flex direction="column" h="100%" py={5} px={4} gap={5}>

            {/* Header */}
            <Flex align="center" justify="space-between">
              <Text fontSize="lg" fontWeight="700" color={textColor}>Search</Text>
              <Flex
                as="button"
                onClick={handleClose}
                align="center"
                justify="center"
                w={8}
                h={8}
                borderRadius="lg"
                color={subTextColor}
                _hover={{ color: textColor, bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <FiX size={16} />
              </Flex>
            </Flex>

            {/* Search input */}
            <form onSubmit={handleSearch}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" h="full">
                  <FiSearch size={15} color={subTextColor} />
                </InputLeftElement>
                <Input
                  placeholder="Search username…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  bg={inputBg}
                  border="none"
                  borderRadius="xl"
                  fontSize="sm"
                  color={textColor}
                  _placeholder={{ color: subTextColor }}
                  _focus={{ boxShadow: '0 0 0 2px #E53935', bg: inputBg }}
                  autoFocus
                />
              </InputGroup>
            </form>

            {/* Results */}
            <Box flex={1} overflowY="auto">
              {isLoading && (
                <Flex justify="center" align="center" py={10}>
                  <Spinner size="sm" color="#E53935" thickness="3px" />
                </Flex>
              )}

              {!isLoading && user && (
                <VStack spacing={1} align="stretch">
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={headingColor}
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                    px={3}
                    mb={1}
                  >
                    Result
                  </Text>
                  <ResultUser user={user} onClose={handleClose} />
                </VStack>
              )}

              {!isLoading && !user && query && (
                <Flex direction="column" align="center" py={10} gap={2}>
                  <Text fontSize="2xl">🔍</Text>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>No user found</Text>
                  <Text fontSize="xs" color={subTextColor}>Try a different username</Text>
                </Flex>
              )}

              {!isLoading && !user && !query && (
                <Flex direction="column" align="center" py={10} gap={2}>
                  <Text fontSize="2xl">👤</Text>
                  <Text fontSize="xs" color={subTextColor} textAlign="center">
                    Search for an anime fan by username
                  </Text>
                </Flex>
              )}
            </Box>

          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default SearchDrawer
