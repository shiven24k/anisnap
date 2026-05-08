import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { supabase } from "../supabase/supabaseClient";
import { mapProfile } from "../supabase/mappers";

const useLogin = () => {
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (inputs) => {
		if (!inputs.email || !inputs.password) {
			return showToast("Error", "Please fill all the fields", "error");
		}
		try {
			setLoading(true);
			setError(null);
			const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
				email: inputs.email,
				password: inputs.password,
			});
			if (loginError) throw loginError;

			if (authData.user) {
				const { data: profile, error: profileError } = await supabase
					.from("profiles")
					.select("*")
					.eq("uid", authData.user.id)
					.single();
				if (profileError) throw profileError;

				const mappedProfile = mapProfile(profile);
				localStorage.setItem("user-info", JSON.stringify(mappedProfile));
				loginUser(mappedProfile);
			}
		} catch (error) {
			setError(error);
			showToast("Error", error.message, "error");
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, login };
};

export default useLogin;
