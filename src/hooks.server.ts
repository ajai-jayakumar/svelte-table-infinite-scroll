import { getaccessToken } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

const public_paths = ['/'];

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const isPublic = public_paths.includes(pathname);

	const accessToken = getaccessToken(event.cookies);

	if (!isPublic && !accessToken) {
		throw redirect(302, '/');
	}

	const response = await resolve(event);

	return response;
};
