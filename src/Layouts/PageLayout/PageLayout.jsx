import { Box, Flex, Spinner } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import useSupabaseAuth from "../../hooks/useSupabaseAuth"

const PageLayout = ( {children}) => {
    const {pathname} = useLocation()
    const {user, loading} = useSupabaseAuth()
    const canRenderSidebar = pathname !=="/auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== "/auth" 
    const checkingUserIsAuth = !user && loading
    if(checkingUserIsAuth) return  <PageLayoutSpinner/>

  return (
    <Flex flexDirection={canRenderNavbar ? "column" :"row"}>
    {/* sidebar on left */}
    {canRenderSidebar ? 
    (<Box w={{base:"70px",md:"240px"}}><Sidebar/> </Box>) : 
    
    null}
    {canRenderNavbar ? <Navbar/> : null}
    {/* Page content on right */}
    <Box flex={1} w={{base:"calc(100% - 70px)",md:"calc(100%-240px)"}} mx={"auto"}>
        {children}
    </Box>
    </Flex>
  )
}
export default PageLayout

const PageLayoutSpinner = () =>{
  return (
   <Flex flexDir='column' h='100vh' alignItems='center' justifyContent= 'center' >
     <Spinner size='xl'/>
   </Flex>
  )
}
