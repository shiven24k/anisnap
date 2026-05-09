import { Box, Flex, VStack, Text, Button, HStack } from "@chakra-ui/react"
import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import GoogleAuth from "./GoogleAuth"

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <VStack spacing={5} w="full">
            <Box w="full">
                {isLogin ? <Login /> : <Signup />}
            </Box>



            <HStack w="full" align="center">
                <Box flex={1} h="1px" bg="whiteAlpha.200" />
                <Text
                    mx={3}
                    color="whiteAlpha.500"
                    fontSize="sm"
                    fontWeight="medium"
                >
                    OR
                </Text>
                <Box flex={1} h="1px" bg="whiteAlpha.200" />
            </HStack>

            <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />

            <Box w="full" textAlign="center" pt={2}>
                <Text
                    fontSize="sm"
                    color="whiteAlpha.600"
                    display="inline"
                >
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                </Text>
                <Button
                    variant="link"
                    size="sm"
                    color="red.400"
                    fontWeight="bold"
                    ml={1}
                    onClick={() => setIsLogin(!isLogin)}
                    _hover={{ color: "red.300" }}
                >
                    {isLogin ? "Sign Up" : "Log in"}
                </Button>
            </Box>
        </VStack>
    )
}

export default AuthForm