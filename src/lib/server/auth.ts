import type { Cookies } from '@sveltejs/kit';

export function getaccessToken(cookies: Cookies) {
	const accessToken = cookies.get('accessToken');
	return accessToken;
}

export function getRefreshToken(cookies: Cookies) {
	const refreshToken = cookies.get('refreshToken');
	return refreshToken;
}

export function setToken(cookies: Cookies, name: string, token: string, maxAge: number) {
	const IS_PROD_ENV = import.meta.env.PROD;

	cookies.set(name, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: IS_PROD_ENV,
		maxAge: maxAge
	});
}

export function clearAllTokens(cookies: Cookies) {
	cookies.delete('accessToken', { path: '/' });
	cookies.delete('refreshToken', { path: '/' });
}
