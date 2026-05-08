import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { supabase } from "../supabase/supabaseClient";
import { mapPost } from "../supabase/mappers";

const useGetUserPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);

	useEffect(() => {
		const getPosts = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setPosts([]);

			try {
				const { data, error } = await supabase
					.from("posts")
					.select("*")
					.eq("created_by", userProfile.uid)
					.order("created_at", { ascending: false });
				if (error) throw error;
				
				const mappedPosts = data.map(mapPost);
				setPosts(mappedPosts);
				
				// Auto-heal if out of sync
				if (userProfile.uid === authUser?.uid && mappedPosts.length !== userProfile.posts.length) {
					const actualPostIds = mappedPosts.map((post) => post.id);
					await supabase
						.from("profiles")
						.update({ posts: actualPostIds })
						.eq("uid", authUser.uid);
						
					const updatedProfile = { ...userProfile, posts: actualPostIds };
					setUserProfile(updatedProfile);
					
					const updatedAuthUser = { ...authUser, posts: actualPostIds };
					setAuthUser(updatedAuthUser);
					localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));
				}
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};

		getPosts();
	}, [setPosts, userProfile, showToast, authUser, setUserProfile, setAuthUser]);

	return { isLoading, posts };
};
export default useGetUserPosts;
