import { Box, Flex, Tooltip } from "@chakra-ui/react";
// import { useColorMode } from "@chakra-ui/react";

// const { colorMode, toggleColorMode } = useColorMode()
const Toggle = () => {
    return (
		<Tooltip
			hasArrow
			label={"toggle"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }} >
            {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button> */}
			<Flex
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				
				<Box display={{ base: "none", md: "block" }}>Toggle</Box>
			</Flex>
		</Tooltip>
	);
}

export default Toggle
