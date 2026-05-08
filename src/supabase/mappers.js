export const mapProfile = (profile) => {
	if (!profile) return null;

	return {
		uid: profile.uid,
		email: profile.email,
		username: profile.username,
		fullname: profile.fullname,
		bio: profile.bio || "",
		profilePicURL: profile.profile_pic_url || "",
		followers: profile.followers || [],
		following: profile.following || [],
		posts: profile.posts || [],
		createdAt: profile.created_at,
	};
};

export const toProfileRow = (profile) => ({
	uid: profile.uid,
	email: profile.email,
	username: profile.username,
	fullname: profile.fullname,
	bio: profile.bio || "",
	profile_pic_url: profile.profilePicURL || "",
	followers: profile.followers || [],
	following: profile.following || [],
	posts: profile.posts || [],
	created_at: profile.createdAt,
});

export const mapPost = (post) => {
	if (!post) return null;

	return {
		id: post.id,
		caption: post.caption || "",
		imageURL: post.image_url || "",
		likes: post.likes || [],
		comments: post.comments || [],
		createdAt: post.created_at,
		createdBy: post.created_by,
	};
};

export const toPostRow = (post) => ({
	caption: post.caption || "",
	image_url: post.imageURL || "",
	likes: post.likes || [],
	comments: post.comments || [],
	created_at: post.createdAt,
	created_by: post.createdBy,
});
