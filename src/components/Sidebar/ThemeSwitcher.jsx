import { Box, Flex, Tooltip, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')

  return (
    <Tooltip hasArrow label={colorMode === "dark" ? "Light Mode" : "Dark Mode"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
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
        onClick={toggleColorMode}
        color={textColor}
      >
        <Box p={2} borderRadius="lg" bg={iconBg}>
          {colorMode === "dark" ? <FiSun size={20} color={textColor} /> : <FiMoon size={20} color={textColor} />}
        </Box>
        <Box display={{ base: "none", md: "block" }} fontWeight="medium" fontSize="sm" color={textColor}>
          {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
        </Box>
      </Flex>
    </Tooltip>
  );
};

export default ThemeSwitcher;