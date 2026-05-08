import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { supabase } from "../supabase/supabaseClient";
import { mapProfile } from "../supabase/mappers";

const useGetUserProfileById = (userId) => {
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);

	const showToast = useShowToast();

	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			setUserProfile(null);
			try {
				const { data, error } = await supabase.from("profiles").select("*").eq("uid", userId).maybeSingle();
				if (error) throw error;
				setUserProfile(mapProfile(data));
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};
		getUserProfile();
	}, [showToast, setUserProfile, userId]);

	return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
