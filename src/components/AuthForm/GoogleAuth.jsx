import { Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { useState } from 'react';
import useShowToast from '../../hooks/useShowToast';
import { supabase } from '../../supabase/supabaseClient';
import { getAuthRedirectUrl } from '../../supabase/auth';

const GoogleAuth = ({ prefix }) => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();

  const handleGoogleAuth = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getAuthRedirectUrl(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    }
    catch (error) {
      setIsLoading(false);
      showToast("Error", error.message, "error");
    }
  }

  return (
    <Flex 
      alignItems={"center"} 
      justifyContent={"center"} 
      cursor={"pointer"}
      onClick={handleGoogleAuth}
      bg="whiteAlpha.200"
      p={2}
      borderRadius={6}
      border="1px solid"
      borderColor="whiteAlpha.300"
      transition="all 0.3s"
      _hover={{
        bg: "whiteAlpha.300",
        transform: "scale(1.02)"
      }}
    >
      {isLoading ? (
        <Spinner size="sm" mr={2} />
      ) : (
        <Image 
          src="/google.png" 
          w={5} 
          alt="Google Logo" 
          mr={2}
        />
      )}
      <Text 
        color={"white"} 
        fontWeight={"semibold"}
      >
        {prefix} in with Google
      </Text>
    </Flex>
  )
}

export default GoogleAuth
