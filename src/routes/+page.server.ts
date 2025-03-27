import { setToken } from '$lib/server/auth.js';
import { send } from '$lib/server/api';
import { USER_EMAIL, USER_PASSWORD } from '$env/static/private';

export const actions = {
	default: async ({ cookies }) => {
		try {
			const response = await send({
				method: 'POST',
				path: 'auth/sign-in',
				data: {
					email: USER_EMAIL,
					password: USER_PASSWORD
				}
			});

			// In Production app, the cookies has to be set by the BE
			setToken(cookies, 'accessToken', response.accessToken, 60 * 60);
			setToken(cookies, 'refreshToken', response.refreshToken, 60 * 60 * 24 * 7);

			return {
				success: true
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
};
