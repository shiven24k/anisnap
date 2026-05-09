import { Box, Flex, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";

const Search = () => {
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const iconBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const iconColor = useColorModeValue('#1A1A2E', 'white')

  return (
    <Tooltip hasArrow label={"Search"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }} bg="red.600">
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
      >
        <Box p={2} borderRadius="lg" bg={iconBg}>
          <SearchLogo />
        </Box>
        <Box display={{ base: "none", md: "block" }} fontWeight="medium">
          Search
        </Box>
      </Flex>
    </Tooltip>
  );
}; 

export default Search;