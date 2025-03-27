import { send } from '$lib/server/api';
import { clearAllTokens, getRefreshToken } from '$lib/server/auth.js';

import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
	// NOTE: using z.number() pre-fills the input with 0, to keep the input empty the following approach is taken
	employees: z
		.string()
		.optional()
		.refine(
			(val) => {
				const num = parseFloat(val || '');
				if (isNaN(num)) return false;
				return num >= 350;
			},
			{ message: 'Value must be at least 350' }
		)
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	return {
		form
	};
};

export const actions = {
	createEmployee: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Make API call to backend

		return {
			form
		};
	},
	logout: async ({ cookies }) => {
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
