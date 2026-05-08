import {useEffect, useState} from 'react'
import useShowToast from './useShowToast';
import useUserProfileStore from "../store/userProfileStore"
import { supabase } from '../supabase/supabaseClient';
import { mapProfile } from '../supabase/mappers';

const useGetUserProfileByUserName = (username) => {
  const [isLoading,setIsLoading] = useState(true)
  const showToast = useShowToast();
//   const {userProfile, setUserProfile} = useUserProfileStore()
   const {userProfile, setUserProfile} = useUserProfileStore()

  useEffect(()=>{
    const getUserProfile = async() => {
        setIsLoading(true)
        try{
           const { data, error } = await supabase.from("profiles").select("*").eq("username", username).maybeSingle();
           if (error) throw error;
           setUserProfile(mapProfile(data));

        }
        catch(error){
           showToast('Error',error.message,'error')
        } finally{
          setIsLoading(false)

        }
    }
    getUserProfile();
  },[setUserProfile,username,showToast]);
  return {isLoading,userProfile};
}

export default useGetUserProfileByUserName
