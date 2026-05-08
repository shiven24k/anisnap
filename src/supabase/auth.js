export const getAuthRedirectUrl = () => {
	return import.meta.env.VITE_AUTH_REDIRECT_URL || window.location.origin;
};
