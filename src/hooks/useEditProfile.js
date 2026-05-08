import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { supabase } from "../supabase/supabaseClient";
import { toProfileRow } from "../supabase/mappers";
import { uploadDataUrl } from "../supabase/storage";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		let URL = "";
		try {
			if (selectedFile) {
				console.log("selectedFile type:", typeof selectedFile);
				console.log("selectedFile preview:", selectedFile?.substring(0, 50));
				const timestamp = Date.now();
				URL = await uploadDataUrl("profile-pictures", `${authUser.uid}/profile_${timestamp}`, selectedFile);
			}

			const updatedUser = {
				...authUser,
				fullname: inputs.fullname || authUser.fullname,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
			};

			const { error } = await supabase.from("profiles").update(toProfileRow(updatedUser)).eq("uid", authUser.uid);
			if (error) throw error;
			const { data: check } = await supabase.from("profiles").select("profile_pic_url").eq("uid", authUser.uid).single();
			console.log("DB profile_pic_url after update:", check);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;
