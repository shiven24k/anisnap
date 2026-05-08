import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { supabase } from "../supabase/supabaseClient";
import { mapProfile, toProfileRow } from "../supabase/mappers";

const loadOrCreateProfile = async (authUser) => {
	const { data, error } = await supabase.from("profiles").select("*").eq("uid", authUser.id).maybeSingle();
	if (error) throw error;
	if (data) return mapProfile(data);

	const email = authUser.email || "";
	const fallbackUsername = email ? email.split("@")[0] : `user_${authUser.id.slice(0, 8)}`;
	const username = authUser.user_metadata?.user_name || fallbackUsername;
	const userDoc = {
		uid: authUser.id,
		email,
		username,
		fullname: authUser.user_metadata?.full_name || authUser.user_metadata?.name || fallbackUsername,
		bio: "",
		profilePicURL: authUser.user_metadata?.avatar_url || "",
		followers: [],
		following: [],
		posts: [],
		createdAt: Date.now(),
	};

	const { data: insertedProfile, error: insertError } = await supabase
		.from("profiles")
		.insert(toProfileRow(userDoc))
		.select()
		.single();
	if (insertError?.code === "23505") {
		const retryUserDoc = {
			...userDoc,
			username: `${username}_${authUser.id.slice(0, 6)}`,
		};
		const { data: retryProfile, error: retryError } = await supabase
			.from("profiles")
			.insert(toProfileRow(retryUserDoc))
			.select()
			.single();
		if (retryError) throw retryError;
		return mapProfile(retryProfile);
	}
	if (insertError) throw insertError;

	return mapProfile(insertedProfile);
};

const useSupabaseAuth = () => {
	const [loading, setLoading] = useState(true);
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const logoutUser = useAuthStore((state) => state.logout);

	useEffect(() => {
		let mounted = true;

		const syncSession = async () => {
			try {
				const { data } = await supabase.auth.getSession();
				const sessionUser = data.session?.user;

				if (!sessionUser) {
					localStorage.removeItem("user-info");
					logoutUser();
					return;
				}

				const profile = await loadOrCreateProfile(sessionUser);
				if (!mounted) return;
				localStorage.setItem("user-info", JSON.stringify(profile));
				setUser(profile);
			} finally {
				if (mounted) setLoading(false);
			}
		};

		syncSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (!session?.user) {
				localStorage.removeItem("user-info");
				logoutUser();
				setLoading(false);
			}
		});

		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, [logoutUser, setUser]);

	return { user, loading };
};

export default useSupabaseAuth;
