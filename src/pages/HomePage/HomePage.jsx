import { Box, Grid, VStack } from "@chakra-ui/react"
import FeedPosts from "../../components/FeedPosts/FeedPosts"
import SuggestedUsers from "../../SuggestedUsers/SuggestedUsers"

const HomePage = () => {
  return (
    <Grid 
      templateColumns={{base: "1fr", lg: "3fr 1fr"}}
      gap={6}
      p={4}
      bg="linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
      minHeight="100vh"
    >
      <VStack 
        spacing={6} 
        w="full" 
        bg="rgba(45, 55, 72, 0.6)" 
        p={6} 
        borderRadius="xl" 
        boxShadow="2xl"
      >
        <FeedPosts/>
      </VStack>
      
      <Box 
        display={{base:"none", lg:"block"}}
        bg="rgba(45, 55, 72, 0.6)" 
        p={6} 
        borderRadius="xl" 
        boxShadow="2xl"
      >
        <SuggestedUsers/>
      </Box>
    </Grid>
  )
}

export default HomePage
