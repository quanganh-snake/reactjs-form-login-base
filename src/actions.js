export const saveTokenToLocalStorage = (token) => {
	if (token) {
		localStorage.setItem("accessToken", token.accessToken);
		localStorage.setItem("refreshToken", token.refreshToken);
	}
};
