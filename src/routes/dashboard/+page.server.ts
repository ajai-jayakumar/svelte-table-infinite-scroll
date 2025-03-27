import { send } from '$lib/server/api';
import { clearAllTokens, getRefreshToken } from '$lib/server/auth.js';

export const actions = {
	default: async ({ cookies }) => {
		try {
			const refreshToken = getRefreshToken(cookies);
			await send({
				method: 'POST',
				path: 'auth/sign-out',
				data: {
					refreshToken: refreshToken
				}
			});
			clearAllTokens(cookies);

			return {
				success: true
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
};
