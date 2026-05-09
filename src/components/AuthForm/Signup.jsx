import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { 
    Alert, 
    AlertIcon, 
    Button, 
    Input, 
    InputGroup, 
    InputRightElement, 
    VStack,
    FormControl,
    FormLabel 
} from "@chakra-ui/react"
import { useState } from "react"
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
    }) 
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error, signup } = useSignUpWithEmailAndPassword()

    return (
        <VStack spacing={4} w="full">
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
                <FormLabel fontSize="sm" color="whiteAlpha.700">Username</FormLabel>
                <Input
                    placeholder="anime_lover"
                    fontSize={14}
                    type="text"
                    value={inputs.username}
                    size={"md"}
                    variant="anime"
                    _placeholder={{ color: "whiteAlpha.400" }}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
            </FormControl>
            <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Full Name</FormLabel>
                <Input
                    placeholder="Your Name"
                    fontSize={14}
                    type="text"
                    value={inputs.fullname}
                    size={"md"}
                    variant="anime"
                    _placeholder={{ color: "whiteAlpha.400" }}
                    onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                />
            </FormControl>
            <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Password</FormLabel>
                <InputGroup>
                    <Input
                        placeholder="Create a password"
                        fontSize={14}
                        type={showPassword ? "text" : "password"}
                        value={inputs.password}
                        size={"md"}
                        variant="anime"
                        _placeholder={{ color: "whiteAlpha.400" }}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />
                    <InputRightElement h="full">
                        <Button 
                            variant={"ghost"} 
                            size={"sm"} 
                            color="whiteAlpha.600"
                            _hover={{ color: "white" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
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
                w={"full"} 
                size={"md"} 
                fontSize={14} 
                isLoading={loading}
                variant="gradient"
                h="44px"
                onClick={() => signup(inputs)}
            >
                Join AniSnap
            </Button>
        </VStack>
    )
}

export default Signup