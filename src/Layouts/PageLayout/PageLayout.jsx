import { Box, Flex, Spinner, useColorModeValue } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import useSupabaseAuth from "../../hooks/useSupabaseAuth"

const PageLayout = ({children}) => {
    const {pathname} = useLocation()
    const {user, loading} = useSupabaseAuth()
    const canRenderSidebar = pathname !=="/auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== "/auth" 
    const checkingUserIsAuth = !user && loading
    
    const bgColor = useColorModeValue('#F5F5F5', '#0A0A12')
    const orbColor = useColorModeValue('red.100', 'purple.600')

    if(checkingUserIsAuth) return  <PageLayoutSpinner bgColor={bgColor} />

  return (
    <Flex 
      flexDirection={canRenderNavbar ? "column" :"row"}
      minH="100vh"
      bg={bgColor}
      position="relative"
    >
      <Box 
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100%"
        pointerEvents="none"
        zIndex={0}
        overflow="hidden"
        display={canRenderSidebar ? "block" : "none"}
      >
        <Box 
          position="absolute"
          top="10%"
          left="20%"
          w="300px"
          h="300px"
          borderRadius="full"
          bgGradient="linear(to-br, red.400, red.300)"
          opacity={0.15}
          filter="blur(60px)"
        />
        <Box 
          position="absolute"
          bottom="20%"
          right="10%"
          w="250px"
          h="250px"
          borderRadius="full"
          bgGradient="linear(to-br, red.300, pink.300)"
          opacity={0.12}
          filter="blur(50px)"
        />
      </Box>
      
      {canRenderSidebar ? 
      (<Box 
        w={{base:"70px",md:"240px"}} 
        position="relative"
        zIndex={2}
      >
        <Sidebar/> 
      </Box>) : 
      
      null}
      {canRenderNavbar ? <Navbar/> : null}
      
      <Box 
        flex={1} 
        w={{base:"calc(100% - 70px)",md:"calc(100%-240px)"}} 
        mx={"auto"}
        position="relative"
        zIndex={1}
      >
        {children}
      </Box>
    </Flex>
  )
}
export default PageLayout

const PageLayoutSpinner = ({ bgColor }) =>{
  return (
   <Flex 
    flexDir='column' 
    h='100vh' 
    alignItems='center' 
    justifyContent='center'
    bg={bgColor}
   >
     <Spinner 
      size='xl' 
      color="red.500"
      thickness="4px"
    />
   </Flex>
  )
}