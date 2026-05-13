import { Box, Flex, Link, Text, VStack, useColorModeValue, Tooltip } from "@chakra-ui/react"
import { FiUsers, FiChevronsRight } from "react-icons/fi"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers"
import useUIStore from "../store/uiStore"

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers()
  const subTextColor = useColorModeValue('gray.400', 'whiteAlpha.400')
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const closeBtnHoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const { toggleRight } = useUIStore()

  if (isLoading) return null

  return (
    <VStack py={2} gap={2} align="stretch">

      {/* Panel header */}
      <Flex align="center" justify="space-between" px={2} mb={1}>
        <Flex align="center" gap={1.5} color={subTextColor}>
          <FiUsers size={11} />
          <Text fontSize="10px" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em">
            People
          </Text>
        </Flex>
        <Tooltip
          hasArrow
          label="Hide panel"
          placement="left"
          openDelay={400}
          bg="gray.800"
          color="white"
        >
          <Flex
            as="button"
            onClick={toggleRight}
            align="center"
            justify="center"
            w={6}
            h={6}
            borderRadius="md"
            color={subTextColor}
            _hover={{ color: '#E53935', bg: closeBtnHoverBg }}
            transition="all 0.2s"
            cursor="pointer"
            aria-label="Hide suggestions panel"
          >
            <FiChevronsRight size={14} />
          </Flex>
        </Tooltip>
      </Flex>

      <SuggestedHeader />

      {suggestedUsers.length > 0 && (
        <Flex alignItems="center" justifyContent="space-between" w="full" px={2} mt={1}>
          <Text fontSize="10px" fontWeight="700" color={subTextColor} textTransform="uppercase" letterSpacing="0.08em">
            Suggested
          </Text>
          <Text fontSize="11px" fontWeight="600" color="#E53935" _hover={{ color: "#C62828" }} cursor="pointer">
            See All
          </Text>
        </Flex>
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      <Box
        fontSize="10px"
        color={subTextColor}
        mt={2}
        alignSelf="start"
        px={2}
        pt={3}
        borderTop="1px solid"
        borderColor={borderColor}
        w="full"
      >
        © 2026{' '}
        <Link href="#" color="#E53935" fontSize="10px" _hover={{ color: "#C62828" }}>
          AniSnap
        </Link>
      </Box>

    </VStack>
  )
}

export default SuggestedUsers
