import {useState} from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { supabase } from '../supabase/supabaseClient';

const useLogout = () => {
    const[isLoggingOut,setIsLoggingOut] = useState(false);
    const[error,setError] = useState(null);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try{
        setIsLoggingOut(true);
        setError(null);
        const {error: signOutError} = await supabase.auth.signOut();
        if(signOutError) throw signOutError;
        localStorage.removeItem('user-info');
        logoutUser();
        }
        catch (error){
            setError(error);
            showToast('Error',error.message,'error')

        } finally {
            setIsLoggingOut(false);
        }

    }
  
    return {handleLogout,isLoggingOut,error}
}
export default useLogout
