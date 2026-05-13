import { Box, Flex, Tooltip, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { FiMoon, FiSun } from "react-icons/fi"
import useUIStore from "../../store/uiStore"

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { leftSidebarOpen } = useUIStore()

  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')

  const label = colorMode === "dark" ? "Light mode" : "Dark mode"
  const showLabel = leftSidebarOpen
  const w = leftSidebarOpen ? { base: 12, md: "full" } : 12
  const justify = leftSidebarOpen ? { base: "center", md: "flex-start" } : "center"
  const tooltipDisplay = leftSidebarOpen ? { base: "block", md: "none" } : "block"

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
        onClick={toggleColorMode}
        color={textColor}
      >
        <Box p={2} borderRadius="lg" bg={iconBg} flexShrink={0} lineHeight={0}>
          {colorMode === "dark"
            ? <FiSun size={20} color="#E53935" />
            : <FiMoon size={20} color="#E53935" />
          }
        </Box>
        <Box
          display={showLabel ? { base: "none", md: "block" } : "none"}
          fontWeight="medium"
          fontSize="sm"
          color={textColor}
          whiteSpace="nowrap"
        >
          {label}
        </Box>
      </Flex>
    </Tooltip>
  )
}

export default ThemeSwitcher
