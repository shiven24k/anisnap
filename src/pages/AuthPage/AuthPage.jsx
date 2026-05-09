import { Box, Flex, VStack, Image, Text, Container, useColorModeValue } from "@chakra-ui/react"
import AuthForm from "../../components/AuthForm/AuthForm"
import AnimeLogo from "../../components/AuthForm/Logo"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const AuthPage = () => {
  const bgColor = useColorModeValue('#F5F5F5', '#0A0A12')
  const textColor = useColorModeValue('#1A1A2E', 'white')
  const subTextColor = useColorModeValue('gray.600', 'whiteAlpha.600')
  const cardBg = useColorModeValue('rgba(255,255,255,0.95)', 'rgba(255,255,255,0.05)')
  const cardBorder = useColorModeValue('gray.200', 'whiteAlpha.100')

  return (
    <Box minH={"100vh"} position="relative" overflow="hidden" bg={bgColor}>
      <Box position="absolute" top="-20%" left="-10%" w="600px" h="600px" borderRadius="full" bgGradient="linear(to-br, red.600, red.500)" opacity={0.2} filter="blur(100px)" animation="float 12s ease-in-out infinite" />
      <Box position="absolute" bottom="-10%" right="-5%" w="500px" h="500px" borderRadius="full" bgGradient="linear(to-br, red.400, accent.400)" opacity={0.15} filter="blur(80px)" animation="float 10s ease-in-out infinite reverse" />
      <Box position="absolute" top="30%" left="5%" w="200px" h="200px" borderRadius="full" bgGradient="linear(to-br, accent.400, red.500)" opacity={0.12} filter="blur(40px)" animation="float 8s ease-in-out infinite" />

      <Image src='/Cloud.png' alt='Cloud' position="absolute" top="10%" left="5%" maxW="200px" opacity={0.4} className="animate-float" filter="blur(1px)" zIndex={0} />
      <Image src='/Cloud.png' alt='Cloud' position="absolute" bottom="15%" right="10%" maxW="180px" opacity={0.3} className="animate-float" style={{ animationDelay: '2s' }} filter="blur(2px)" zIndex={0} transform="scaleX(-1)" />

      <Flex justifyContent={"center"} alignItems={"center"} px={4} py={8} position="relative" zIndex={1} minH="100vh">
        <Container maxW={"container.lg"}>
          <Flex direction={{ base: "column", lg: "row" }} alignItems={"center"} justifyContent={"center"} gap={{ base: 8, lg: 16 }}>
            
            <VStack spacing={8} display={{ base: "none", lg: "flex" }} flex={1} maxW="500px" align="flex-start">
              <MotionBox initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="animate-float">
                <AnimeLogo />
              </MotionBox>
              
              <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700" lineHeight="1.2" color={textColor}>
                Share your anime journey
              </Text>

              <Text color={subTextColor} fontSize="lg" maxW="400px">
                Connect with fellow anime fans, share your favorite moments, and discover new series together.
              </Text>

              <VStack spacing={4} align="flex-start" w="full" pt={4}>
                <Flex gap={4} flexWrap="wrap">
                  {['Anime Feed', 'Community', 'Collections'].map((item) => (
                    <Box key={item} bg="#E53935" px={4} py={2} fontSize="sm" color="white" cursor="pointer" borderRadius="4px" _hover={{ bg: '#C62828' }} transition="all 0.3s" fontWeight="500">{item}</Box>
                  ))}
                </Flex>
              </VStack>
            </VStack>

            <VStack spacing={6} w="full" maxW={{ base: "full", lg: "420px" }} align="stretch">
              <MotionBox display={{ base: "block", lg: "none" }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} textAlign="center">
                <Box mb={4}><AnimeLogo /></Box>
              </MotionBox>

              <Box bg={cardBg} border="1px solid" borderColor={cardBorder} p={{ base: 6, md: 8 }} borderRadius="2xl" boxShadow={useColorModeValue('0 8px 30px rgba(0,0,0,0.12)', 'none')}>
                <Text color={subTextColor} fontSize="sm" mb={4} textAlign="center" fontWeight="500">Sign in to continue</Text>
                <AuthForm/>
              </Box>

              <Box bg={cardBg} border="1px solid" borderColor={cardBorder} p={4} borderRadius="xl" textAlign="center">
                <Text color={subTextColor} fontSize="sm">
                  New to AniSnap? {' '}
                  <Text as="span" color="#E53935" fontWeight="600" cursor="pointer" _hover={{ textDecoration: 'underline' }}>Join the community</Text>
                </Text>
              </Box>

              <VStack spacing={2} pt={4}>
                <Text color={subTextColor} fontSize="xs" textAlign="center">By continuing, you agree to our Terms of Service</Text>
                <Text color={subTextColor} fontSize="xs" textAlign="center">Made with love for anime fans</Text>
              </VStack>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </Box>
  )
}
export default AuthPage