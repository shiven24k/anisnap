import { Box, Image } from "@chakra-ui/react";

const AnimeLogo = () => {
  return (
    <Image 
      src='/logo.png' 
      alt='AniSnap Logo' 
      objectFit="contain"
      maxH={{ base: "50px", md: "70px" }}
    />
  );
};

export default AnimeLogo;