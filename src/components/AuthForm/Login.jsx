import { Alert, AlertIcon, Button, Input, VStack, FormControl, FormLabel } from "@chakra-ui/react"
import { useState } from "react"
import useLogin from "../../hooks/useLogin"

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const { loading, error, login } = useLogin()

    return (
        <VStack spacing={5} w="full">
            <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Email</FormLabel>
                <Input
                    placeholder="your@email.com"
                    fontSize={14}
                    type="email"
                    value={inputs.email}
                    size={"md"}
                    variant="anime"
                    _placeholder={{ color: "whiteAlpha.400" }}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
            </FormControl>
            <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Password</FormLabel>
                <Input
                    placeholder="Enter your password"
                    fontSize={14}
                    type="password"
                    value={inputs.password}
                    size={"md"}
                    variant="anime"
                    _placeholder={{ color: "whiteAlpha.400" }}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
            </FormControl>
            {error && (
                <Alert
                    status="error"
                    fontSize={13}
                    p={3}
                    borderRadius="lg"
                    bg="rgba(229, 62, 62, 0.2)"
                    border="1px solid"
                    borderColor="red.500"
                    color="red.300"
                >
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}
            <Button
                isLoading={loading}
                onClick={() => login(inputs)}
                bg="#E53935"
                color="white"
                fontSize="lg"
                fontWeight="bold"
                fontStyle="italic"
                px={6}
                py={3}
                borderRadius="4px"
                transition="all 0.3s"
                w="full"

            >
                Welcome Back
            </Button>
        </VStack>
    )
}

export default Login