import { useState } from "react";
import useShowToast from "./useShowToast";
import { supabase } from "../supabase/supabaseClient";
import { mapProfile } from "../supabase/mappers";

const useSearchUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const showToast = useShowToast();

	const getUserProfile = async (username) => {
		setIsLoading(true);
		setUser(null);
		try {
			const { data, error } = await supabase.from("profiles").select("*").eq("username", username).maybeSingle();
			if (error) throw error;
			if (!data) return showToast("Error", "User not found", "error");

			setUser(mapProfile(data));
		} catch (error) {
			showToast("Error", error.message, "error");
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
