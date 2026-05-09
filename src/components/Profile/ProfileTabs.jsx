import { Box, Flex ,Text} from '@chakra-ui/react'
import {BsBookmark, BsGrid3X3, BsSuitHeart} from 'react-icons/bs'

const ProfileTabs=()=> {
  return (
    <Flex 
      w={"full"}
      justifyContent={"center"}
      gap={{base:2,sm:8}}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex 
        borderTop={"2px solid"} 
        borderColor="brand.500"
        alignItems={"center"} 
        p={4} 
        gap={2} 
        cursor={"pointer"}
        transition="all 0.3s"
        _hover={{ bg: "whiteAlpha.50" }}
      >
        <Box 
          fontSize={20} 
          color="brand.400"
        >
          <BsGrid3X3/>
        </Box>
        <Text 
          fontSize={{base:"xs",sm:"sm"}} 
          display={{base:"none",sm:"block"}}
          color="whiteAlpha.900"
        >
          Posts
        </Text>
      </Flex>

      <Flex 
        alignItems={"center"} 
        p={4} 
        gap={2} 
        cursor={"pointer"}
        transition="all 0.3s"
        _hover={{ bg: "whiteAlpha.50" }}
        borderTop="2px solid transparent"
      >
        <Box fontSize={20} color="whiteAlpha.500">
          <BsBookmark/>
        </Box>
        <Text 
          fontSize={{base:"xs",sm:"sm"}} 
          display={{base:"none",sm:"block"}}
          color="whiteAlpha.500"
        >
          Saved
        </Text>
      </Flex>

      <Flex 
        alignItems={"center"} 
        p={4} 
        gap={2} 
        cursor={"pointer"}
        transition="all 0.3s"
        _hover={{ bg: "whiteAlpha.50" }}
        borderTop="2px solid transparent"
      >
        <Box fontSize={20} color="whiteAlpha.500">
          <BsSuitHeart/>
        </Box>
        <Text 
          fontSize={{base:"xs",sm:"sm"}} 
          display={{base:"none",sm:"block"}}
          color="whiteAlpha.500"
        >
          Tagged
        </Text>
      </Flex>
    </Flex>
  )
}

export default ProfileTabs