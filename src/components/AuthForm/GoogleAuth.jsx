import { Button, Image, Spinner, HStack, Text, VStack } from '@chakra-ui/react'
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
    <Button
      variant="glass"
      w="full"
      h="44px"
      onClick={handleGoogleAuth}
      isLoading={isLoading}
      loadingText="Connecting..."
    >
      <HStack spacing={3}>
        <Image 
          src="/google.png" 
          w={5} 
          alt="Google Logo" 
        />
        <Text fontWeight="medium">
          Continue with Google
        </Text>
      </HStack>
    </Button>
  )
}

export default GoogleAuth