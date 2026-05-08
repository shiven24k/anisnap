import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { supabase } from "../supabase/supabaseClient";
import { mapProfile } from "../supabase/mappers";

const useGetSuggestedUsers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();

	useEffect(() => {
		const getSuggestedUsers = async () => {
			setIsLoading(true);
			try {
				const excludedUsers = [authUser.uid, ...authUser.following];
				const { data, error } = await supabase
					.from("profiles")
					.select("*")
					.not("uid", "in", `(${excludedUsers.join(",")})`)
					.order("uid")
					.limit(3);
				if (error) throw error;

				setSuggestedUsers(data.map((user) => ({ ...mapProfile(user), id: user.uid })));
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getSuggestedUsers();
	}, [authUser, showToast]);

	return { isLoading, suggestedUsers };
};
export default useGetSuggestedUsers;
