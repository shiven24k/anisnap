import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { supabase } from "../supabase/supabaseClient";
import { mapProfile, toProfileRow } from "../supabase/mappers";

const useSignUpWithEmailAndPassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const signup = async (inputs) => {
		if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

		try {
			setLoading(true);
			setError(null);

			// ✅ Step 1: Sign up first (no DB query before auth)
			const { data: authData, error: signUpError } = await supabase.auth.signUp({
				email: inputs.email,
				password: inputs.password,
			});
			if (signUpError) throw signUpError;

			if (authData.user) {
				const userDoc = {
					uid: authData.user.id,
					email: inputs.email,
					username: inputs.username,
					fullname: inputs.fullname,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};

				// ✅ Step 2: Insert profile after auth
				const { data: profile, error: profileError } = await supabase
					.from("profiles")
					.insert(toProfileRow(userDoc))
					.select()
					.single();

				// ✅ Step 3: Catch duplicate username via unique constraint
				if (profileError) {
					if (profileError.code === "23505") {
						showToast("Error", "Username already taken", "error");
						return;
					}
					throw profileError;
				}

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

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
