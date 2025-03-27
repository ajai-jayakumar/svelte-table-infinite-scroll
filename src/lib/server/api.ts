import { API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

const API_PATH = 'https://cms-api.doinstruct-test.com';

interface Send {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	data?: any;
	accessToken?: string;
}

export async function send({ method, path, data, accessToken }: Send) {
	const headers: Record<string, string> = {};

	// Pass API key for all request
	headers['x-api-key'] = API_KEY;

	if (data) {
		headers['Content-Type'] = 'application/json';
	}

	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const options: RequestInit = {
		method,
		headers,
		...(data ? { body: JSON.stringify(data) } : {})
	};

	const res = await fetch(`${API_PATH}/${path}`, options);

	if (!res.ok) {
		const errorBody = await res.json().catch(() => null);

		const errorMessage = errorBody?.message || `Error: ${res.statusText}`;

		throw error(res.status, errorMessage);
	}

	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}
}
