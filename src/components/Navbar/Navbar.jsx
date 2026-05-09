import { Button, Container, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const bgColor = useColorModeValue('white', 'transparent')
  const textColor = useColorModeValue('#1A1A2E', 'white')

  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex 
        w={"full"} 
        justifyContent={{ base: "center", sm: "space-between" }} 
        alignItems={"center"}
        bg={bgColor}
        px={4}
        py={3}
        borderRadius="xl"
        boxShadow={useColorModeValue('0 2px 10px rgba(0,0,0,0.1)', 'none')}
      >
        <Image src='/logo.png' h={16} display={{ base: "none", sm: "block" }} cursor={"pointer"} />
        <Flex gap={3}>
          <Link to='/auth'>
            <Button 
              bg="#E53935" 
              color="white" 
              size="sm"
              _hover={{ bg: '#C62828' }}
            >
              Login
            </Button>
          </Link>
          <Link to='/auth'>
            <Button 
              variant="outline" 
              size="sm"
              borderColor={useColorModeValue('gray.300', 'whiteAlpha.300')}
              color={textColor}
              _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
            >
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;